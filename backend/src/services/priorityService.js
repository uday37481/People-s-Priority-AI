const CitizenSuggestion = require('../models/CitizenSuggestion');
const AIAnalysis = require('../models/AIAnalysis');
const PublicDataset = require('../models/PublicDataset');
const DevelopmentProject = require('../models/DevelopmentProject');
const PriorityRecommendation = require('../models/PriorityRecommendation');
const geminiService = require('./geminiService');
const mongoose = require('mongoose');

/**
 * Calculates priority recommendations for a constituency and updates PriorityRecommendation collection.
 * @param {string} constituencyId - ID of the constituency
 */
const calculatePriorities = async (constituencyId) => {
  if (!constituencyId) return [];

  try {
    const constituencyObjectId = new mongoose.Types.ObjectId(constituencyId);

    // 1. Fetch public dataset
    const dataset = await PublicDataset.findOne({ constituencyId: constituencyObjectId });
    const population = dataset ? dataset.population : 50000; // fallback default
    
    // 2. Fetch existing projects (active/ongoing/completed)
    const existingProjects = await DevelopmentProject.find({ constituencyId: constituencyObjectId });

    // 3. Aggregate citizen complaints count and average urgency by category
    const activeComplaints = await CitizenSuggestion.aggregate([
      {
        $match: {
          constituencyId: constituencyObjectId,
          status: { $ne: 'Resolved' }
        }
      },
      {
        $lookup: {
          from: 'aianalyses',
          localField: '_id',
          foreignField: 'suggestionId',
          as: 'aiInfo'
        }
      },
      { $unwind: '$aiInfo' },
      {
        $group: {
          _id: '$aiInfo.detectedCategory',
          count: { $sum: 1 },
          avgUrgencyScore: { $avg: '$aiInfo.urgencyScore' }
        }
      }
    ]);

    const categories = ['Road', 'Water', 'Education', 'Healthcare', 'Agriculture', 'Employment', 'Sanitation', 'Electricity', 'Other'];
    const recommendationsData = [];

    // Calculate score for each category
    for (const cat of categories) {
      const complaintInfo = activeComplaints.find(c => c._id === cat) || { count: 0, avgUrgencyScore: 50 };
      
      // A. Citizen Demand Score (40% weight)
      // Max citizen demand score is capped at 50 active complaints
      const citizenDemandScore = Math.min(Math.round((complaintInfo.count / 50) * 100), 100);

      // B. Infrastructure Gap Score (25% weight)
      let infrastructureGapScore = 30; // base fallback
      if (dataset) {
        if (cat === 'Road') {
          infrastructureGapScore = 100 - (dataset.roadCoverage || 50);
        } else if (cat === 'Water') {
          infrastructureGapScore = 100 - (dataset.drinkingWaterCoverage || 50);
        } else if (cat === 'Education') {
          const targetSchools = Math.max(1, Math.round(population / 2000));
          const actualSchools = dataset.schoolCount || 0;
          infrastructureGapScore = Math.max(0, Math.min(100, Math.round(((targetSchools - actualSchools) / targetSchools) * 100)));
        } else if (cat === 'Healthcare') {
          const targetHospitals = Math.max(1, Math.round(population / 5000));
          const actualHospitals = dataset.hospitalCount || 0;
          infrastructureGapScore = Math.max(0, Math.min(100, Math.round(((targetHospitals - actualHospitals) / targetHospitals) * 100)));
        } else if (cat === 'Employment') {
          infrastructureGapScore = Math.min((dataset.unemploymentRate || 5) * 5, 100);
        } else if (cat === 'Sanitation') {
          infrastructureGapScore = 100 - (dataset.drinkingWaterCoverage || 60); // link as proxy
        } else if (cat === 'Electricity') {
          infrastructureGapScore = 100 - (dataset.internetCoverage || 70); // proxy
        }
      }

      // C. Demographic Need Score (20% weight)
      // Scaled up to a maximum population reference of 250,000 citizens
      const demographicNeedScore = Math.min(Math.round((population / 250000) * 100), 100);

      // D. AI Urgency Score (10% weight)
      const aiUrgencyScore = complaintInfo.avgUrgencyScore || 50;

      // E. Project Bonus Score (5% weight)
      // If there are NO active/ongoing projects in this category, grant a full 100 bonus
      const categoryProjects = existingProjects.filter(p => p.category === cat && p.status !== 'Completed');
      const projectBonusScore = categoryProjects.length === 0 ? 100 : 0;

      // Calculate final weighted score
      const aiPriorityScore = Math.round(
        (0.40 * citizenDemandScore) +
        (0.25 * infrastructureGapScore) +
        (0.20 * demographicNeedScore) +
        (0.10 * aiUrgencyScore) +
        (0.05 * projectBonusScore)
      );

      recommendationsData.push({
        projectCategory: cat,
        citizenDemandScore,
        infrastructureGapScore,
        demographicNeedScore,
        aiPriorityScore,
        complaintCount: complaintInfo.count
      });
    }

    // Sort by priority score and keep top 5
    recommendationsData.sort((a, b) => b.aiPriorityScore - a.aiPriorityScore);
    const topRecommendations = recommendationsData.slice(0, 5);

    // Delete old recommendations for this constituency
    await PriorityRecommendation.deleteMany({ constituencyId: constituencyObjectId });

    // Build model rows with AI explanations
    const docsToInsert = [];
    let rank = 1;
    for (const rec of topRecommendations) {
      // Get explainable AI reasoning from Gemini
      const justification = await geminiService.generateExplanation({
        category: rec.projectCategory,
        demandScore: rec.citizenDemandScore,
        gapScore: rec.infrastructureGapScore,
        populationImpact: population,
        complaintCount: rec.complaintCount
      });

      docsToInsert.push({
        constituencyId: constituencyObjectId,
        projectCategory: rec.projectCategory,
        citizenDemandScore: rec.citizenDemandScore,
        infrastructureGapScore: rec.infrastructureGapScore,
        demographicNeedScore: rec.demographicNeedScore,
        aiPriorityScore: rec.aiPriorityScore,
        priorityRank: rank++,
        aiReason: justification
      });
    }

    const insertedDocs = await PriorityRecommendation.insertMany(docsToInsert);
    return insertedDocs;
  } catch (error) {
    console.error('Error generating priorities:', error);
    return [];
  }
};

module.exports = {
  calculatePriorities
};
