const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const User = require('../models/User');
const Constituency = require('../models/Constituency');
const CitizenSuggestion = require('../models/CitizenSuggestion');
const AIAnalysis = require('../models/AIAnalysis');
const PublicDataset = require('../models/PublicDataset');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/peoplepriority-ai';

const seedDatabase = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(dbURI);
    console.log('MongoDB Connected successfully.');

    // Clear existing collections
    console.log('Cleaning collections...');
    await User.deleteMany({});
    await Constituency.deleteMany({});
    await CitizenSuggestion.deleteMany({});
    await AIAnalysis.deleteMany({});
    await PublicDataset.deleteMany({});

    console.log('Seeding Constituencies...');
    // Seed Constituencies
    const northwest = await Constituency.create({
      constituencyName: 'North-West Constituency',
      state: 'Delhi',
      district: 'North-West Delhi',
      mpName: 'Hon. Rajesh Kumar',
      population: 450000,
      area: 120
    });

    console.log('Seeding Public Datasets (Demographics / Census)...');
    // Seed Public Census Data
    const dataset = await PublicDataset.create({
      constituencyId: northwest._id,
      demographics: {
        totalPopulation: 450000,
        literacyRate: 81.2,
        unemploymentRate: 7.8
      },
      infrastructureGaps: {
        schoolsShortageCount: 12,
        hospitalsShortageCount: 4,
        internetConnectivityPercent: 68.5
      },
      criticalNeedsRankings: ['Water Drainage Grid', 'Public Lighting', 'Pothole Patching', 'Garbage Sorting Yard']
    });

    console.log('Seeding Users...');
    // Seed Default Users
    const mp = await User.create({
      fullName: 'Hon. Rajesh Kumar',
      email: 'rajesh@gov.in',
      password: 'password123', // Will be hashed via pre-save hook in User model
      role: 'MP',
      phone: '+919999999999',
      preferredLanguage: 'English',
      constituencyId: northwest._id
    });

    const citizen = await User.create({
      fullName: 'Arjun Sharma',
      email: 'arjun@gmail.com',
      password: 'password123',
      role: 'Citizen',
      phone: '+918888888888',
      preferredLanguage: 'Hindi',
      constituencyId: northwest._id
    });

    console.log('Seeding Citizen Suggestions & AI Analyses...');
    // Seed Citizen Suggestions
    const suggestionsData = [
      {
        userId: citizen._id,
        constituencyId: northwest._id,
        title: 'Broken Water Pipe & Waste Flooding',
        originalText: 'Large water pipeline rupture near Sector 4 community park has flooded the walking tracks and mixed with local garbage. Poses serious health risks.',
        translatedText: 'Large water pipeline rupture near Sector 4 community park has flooded the walking tracks and mixed with local garbage. Poses serious health risks.',
        submissionType: 'Text',
        location: {
          type: 'Point',
          coordinates: [77.1025, 28.7041] // [lng, lat]
        },
        address: 'Near Sector 4 Community Park, Ward 7',
        status: 'Reviewed'
      },
      {
        userId: citizen._id,
        constituencyId: northwest._id,
        title: 'Faulty Streetlights & Safety Issues',
        originalText: 'Over 8 streetlights on Ring Road Sector B have been non-functional for 2 weeks, leading to safety concerns for evening commuters.',
        translatedText: 'Over 8 streetlights on Ring Road Sector B have been non-functional for 2 weeks, leading to safety concerns for evening commuters.',
        submissionType: 'Text',
        location: {
          type: 'Point',
          coordinates: [77.1054, 28.7078]
        },
        address: 'Ring Road Sector B Main Crossing, Ward 5',
        status: 'Pending'
      },
      {
        userId: citizen._id,
        constituencyId: northwest._id,
        title: 'Open Drainage Grate Near Primary School',
        originalText: 'An open sewer storm drain is left uncovered right in front of the gate of Ward 5 primary school. Children play nearby.',
        translatedText: 'An open sewer storm drain is left uncovered right in front of the gate of Ward 5 primary school. Children play nearby.',
        submissionType: 'Voice',
        location: {
          type: 'Point',
          coordinates: [77.1098, 28.7123]
        },
        address: 'Primary School Main Gate, Ward 5',
        status: 'Reviewed'
      }
    ];

    for (const sugg of suggestionsData) {
      const createdSugg = await CitizenSuggestion.create(sugg);

      // Create AI Analysis for each
      let category = 'Water';
      let urgency = 'High';
      let summary = 'Water pipe leakage flooding park walkway';

      if (createdSugg.title.includes('Streetlights')) {
        category = 'Electricity';
        urgency = 'High';
        summary = 'Unlit Sector B Ring Road area raising evening security risks.';
      } else if (createdSugg.title.includes('Drainage')) {
        category = 'Sanitation';
        urgency = 'Critical';
        summary = 'Open stormwater sewer grate exposing children to high falling hazards.';
      }

      await AIAnalysis.create({
        suggestionId: createdSugg._id,
        detectedCategory: category,
        aiSummary: summary,
        urgency: urgency,
        confidenceScore: 0.94,
        extractedKeywords: [category.toLowerCase(), 'hazard', 'repair', 'outage'],
        translatedText: createdSugg.translatedText
      });
    }

    console.log('Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding database failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
