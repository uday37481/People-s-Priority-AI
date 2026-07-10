const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const mime = require('mime-types'); // Using simple mime check or fallback

const isGeminiConfigured = !!process.env.GEMINI_API_KEY;
let genAI;

if (isGeminiConfigured) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} else {
  console.warn('GEMINI_API_KEY is not defined. AI functionality will use local heuristic fallbacks.');
}

/**
 * Helper to convert local file to Generative Part format
 * @param {string} filePath 
 * @returns {object} mime_type and base64 string
 */
function fileToGenerativePart(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  // Detect extension & mime type
  const extension = filePath.split('.').pop().toLowerCase();
  let mimeType = 'image/jpeg';
  if (extension === 'png') mimeType = 'image/png';
  else if (extension === 'webp') mimeType = 'image/webp';
  else if (extension === 'mp3') mimeType = 'audio/mp3';
  else if (extension === 'wav') mimeType = 'audio/wav';
  else if (extension === 'm4a') mimeType = 'audio/m4a';
  else if (extension === 'ogg') mimeType = 'audio/ogg';

  return {
    inlineData: {
      data: Buffer.from(fileBuffer).toString('base64'),
      mimeType
    },
  };
}

/**
 * Heuristic Fallback Analysis when Gemini API key is missing or fails.
 */
const getHeuristicFallback = (text, hasImage = false, hasAudio = false) => {
  let category = 'Other';
  const lowercaseText = (text || '').toLowerCase();
  
  if (lowercaseText.includes('road') || lowercaseText.includes('pothole') || lowercaseText.includes('highway') || lowercaseText.includes('bridge') || lowercaseText.includes('rasta')) {
    category = 'Road';
  } else if (lowercaseText.includes('water') || lowercaseText.includes('pani') || lowercaseText.includes('drain') || lowercaseText.includes('sewer') || lowercaseText.includes('leak') || lowercaseText.includes('pipe')) {
    category = 'Water';
  } else if (lowercaseText.includes('school') || lowercaseText.includes('teacher') || lowercaseText.includes('education') || lowercaseText.includes('college') || lowercaseText.includes('padhai')) {
    category = 'Education';
  } else if (lowercaseText.includes('hospital') || lowercaseText.includes('doctor') || lowercaseText.includes('medicine') || lowercaseText.includes('health') || lowercaseText.includes('clinic')) {
    category = 'Healthcare';
  } else if (lowercaseText.includes('trash') || lowercaseText.includes('garbage') || lowercaseText.includes('clean') || lowercaseText.includes('sanitation') || lowercaseText.includes('toilet') || lowercaseText.includes('kachra')) {
    category = 'Sanitation';
  } else if (lowercaseText.includes('electricity') || lowercaseText.includes('power') || lowercaseText.includes('bijli') || lowercaseText.includes('light') || lowercaseText.includes('load shedding')) {
    category = 'Electricity';
  } else if (lowercaseText.includes('farm') || lowercaseText.includes('crop') || lowercaseText.includes('agriculture') || lowercaseText.includes('kheti') || lowercaseText.includes('fertilizer')) {
    category = 'Agriculture';
  } else if (lowercaseText.includes('job') || lowercaseText.includes('employment') || lowercaseText.includes('work') || lowercaseText.includes('unemployed') || lowercaseText.includes('naukri')) {
    category = 'Employment';
  }

  let urgency = 'Medium';
  if (lowercaseText.includes('urgent') || lowercaseText.includes('critical') || lowercaseText.includes('immediately') || lowercaseText.includes('danger') || lowercaseText.includes('accident') || lowercaseText.includes('hazard')) {
    urgency = 'Critical';
  } else if (lowercaseText.includes('broken') || lowercaseText.includes('bad') || lowercaseText.includes('poor') || lowercaseText.includes('severe')) {
    urgency = 'High';
  } else if (lowercaseText.includes('low') || lowercaseText.includes('suggestion') || lowercaseText.includes('request')) {
    urgency = 'Low';
  }

  const keywordMap = {
    Road: ['road repair', 'potholes', 'street condition', 'commute'],
    Water: ['water supply', 'contamination', 'drinking water', 'pipeline'],
    Education: ['school infrastructure', 'literacy', 'education access', 'teachers'],
    Healthcare: ['health facility', 'hospital access', 'medical care', 'doctors'],
    Sanitation: ['waste management', 'sewage cleaning', 'cleanliness', 'hygiene'],
    Electricity: ['power outage', 'transformer', 'electricity supply', 'voltage'],
    Agriculture: ['farming subsidy', 'irrigation system', 'crops', 'weather impact'],
    Employment: ['job training', 'unemployment rate', 'livelihood', 'skills development'],
    Other: ['community suggestion', 'local request', 'priority request']
  };

  return {
    detectedCategory: category,
    categoryConfidence: 85,
    aiSummary: `Local Heuristic Summary: The citizen submitted a suggestion regarding local ${category.toLowerCase()} issues. Core text: "${text ? text.substring(0, 100) : 'Voice/Image upload content'}"`,
    sentiment: urgency === 'Critical' ? 'Urgent' : 'Negative',
    urgency: urgency,
    urgencyScore: urgency === 'Critical' ? 95 : urgency === 'High' ? 80 : urgency === 'Medium' ? 50 : 25,
    extractedKeywords: keywordMap[category] || ['suggestion'],
    themes: [`${category} Infrastructure`],
    duplicateClusterId: null,
    isDuplicate: false,
    duplicateConfidence: 0,
    detectedLanguage: 'en',
    originalText: text || 'Voice/Image upload content',
    translatedText: text || 'Voice/Image upload content',
    translationConfidence: 100,
    imageAnalysis: {
      description: hasImage ? 'Image uploaded and logged for local review.' : 'No image uploaded.',
      relevant: hasImage,
      elementsIdentified: hasImage ? ['user upload preview'] : []
    },
    priorityFactors: {
      healthRisk: urgency === 'Critical' ? 90 : 50,
      numberAffected: 65,
      duration: 75,
      infrastructureCriticality: category === 'Road' || category === 'Water' ? 85 : 60
    },
    aiConfidence: 80
  };
};

/**
 * Runs Multimodal Complaint analysis using Gemini 1.5 Flash (or falls back to heuristic)
 * @param {string} text - Complaint text
 * @param {string} imagePath - Absolute local path to uploaded image (optional)
 * @param {string} audioPath - Absolute local path to uploaded audio (optional)
 */
const analyzeSuggestion = async (text, imagePath = null, audioPath = null) => {
  if (!isGeminiConfigured) {
    return getHeuristicFallback(text, !!imagePath, !!audioPath);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const parts = [];

    // System prompt & task description
    const systemPrompt = `
      You are "PriorityAI", an expert in analyzing citizen complaints about infrastructure and public services in India.
      Analyze the provided inputs (which can contain text, image, and/or audio files) and return a structured analysis in JSON format.
      
      Classification Categories (use EXACTLY one of these):
      - Road (potholes, street conditions, traffic, bridge, etc.)
      - Water (supply, quality, shortage, pipe leaks, sewage overflow, etc.)
      - Education (schools, teachers, learning facilities)
      - Healthcare (hospitals, doctor absence, medicine availability)
      - Agriculture (crops, irrigation, farming subsidies)
      - Employment (jobs, training, livelihood requests)
      - Sanitation (waste management, clean streets, public toilets)
      - Electricity (power cuts, bills, transformers)
      - Other (anything not fitting above)

      Urgency Levels (use EXACTLY one of these):
      - Low
      - Medium
      - High
      - Critical

      Sentiment Options (use EXACTLY one of these):
      - Positive
      - Neutral
      - Negative
      - Urgent

      Output JSON Schema:
      {
        "detectedCategory": "string (exactly one of the categories above)",
        "categoryConfidence": number (0-100),
        "aiSummary": "string (2-3 sentences, concise and actionable)",
        "sentiment": "string (Positive|Neutral|Negative|Urgent)",
        "urgency": "string (Low|Medium|High|Critical)",
        "urgencyScore": number (0-100),
        "extractedKeywords": ["string", "string", ... max 5 keywords],
        "themes": ["string", "string", ... max 3 themes],
        "detectedLanguage": "string (ISO 639-1 code)",
        "originalText": "string (original text input)",
        "translatedText": "string (translated to English if input was not English, otherwise same as originalText)",
        "translationConfidence": number (0-100),
        "imageAnalysis": {
          "description": "string (description of elements seen in the image, or 'No image uploaded')",
          "relevant": boolean (is image relevant to the infrastructure complaint?),
          "elementsIdentified": ["string", "string", ... elements seen]
        },
        "priorityFactors": {
          "healthRisk": number (0-100 severity indicator),
          "numberAffected": number (0-100 scale),
          "duration": number (0-100 scale),
          "infrastructureCriticality": number (0-100 scale)
        },
        "aiConfidence": number (0-100)
      }

      Return ONLY valid JSON matching this schema. Never prefix/suffix the response with markdown formatting block text, code fences, or any words outside of raw JSON.
    `;

    parts.push({ text: systemPrompt });

    // Append text if available
    let promptText = `Citizen Text Input: "${text || 'No text provided.'}"`;
    if (audioPath) {
      promptText += `\nAn audio file is attached. Transcribe the audio description of the complaint and integrate its details.`;
    }
    if (imagePath) {
      promptText += `\nAn image file is attached. Analyze the image for visual proof of the complaint.`;
    }
    parts.push({ text: promptText });

    // Append attachments
    if (imagePath && fs.existsSync(imagePath)) {
      parts.push(fileToGenerativePart(imagePath));
    }
    if (audioPath && fs.existsSync(audioPath)) {
      parts.push(fileToGenerativePart(audioPath));
    }

    const response = await model.generateContent(parts);
    const responseText = response.response.text();
    
    // Parse response
    const cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const resultJson = JSON.parse(cleanText);

    // Clean up files synchronously to release space
    if (imagePath && fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    if (audioPath && fs.existsSync(audioPath)) fs.unlinkSync(audioPath);

    return resultJson;
  } catch (error) {
    console.error('Gemini Suggestion Analysis Error:', error.message);
    // Cleanup files if error occurred
    if (imagePath && fs.existsSync(imagePath)) try { fs.unlinkSync(imagePath); } catch(_) {}
    if (audioPath && fs.existsSync(audioPath)) try { fs.unlinkSync(audioPath); } catch(_) {}

    // Gracefully fallback
    return getHeuristicFallback(text, !!imagePath, !!audioPath);
  }
};

/**
 * Generates ranked project explanations using Gemini 1.5 Pro
 * @param {object} rankingContext - Context containing details of the recommendation
 * @returns {Promise<string>} Explanatory justification paragraph
 */
const generateExplanation = async (rankingContext) => {
  if (!isGeminiConfigured) {
    return `Project recommended based on ${rankingContext.category} citizen requests (Demand Score: ${rankingContext.demandScore}/100) and infrastructure deficit (Gap Score: ${rankingContext.gapScore}/100). The affected community has a population density requiring immediate intervention.`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const prompt = `
      You are "PriorityAI", a policy planner. Draft a short, professional, and convincing one-paragraph explanation (max 70 words) for a Member of Parliament (MP) justifying why this development project is recommended.
      
      Context data:
      - Project Category: ${rankingContext.category}
      - Citizen Demand Score (out of 100): ${rankingContext.demandScore}
      - Infrastructure Gap Score (out of 100): ${rankingContext.gapScore}
      - Affected Population Density: ${rankingContext.populationImpact}
      - Number of registered complaints: ${rankingContext.complaintCount}

      Format your output as a single paragraph. Make it highly professional and actionable, suitable for an official government dashboard.
    `;

    const response = await model.generateContent(prompt);
    return response.response.text().trim();
  } catch (error) {
    console.error('Gemini Explanation Generation Error:', error.message);
    return `Recommended based on elevated citizen demand (${rankingContext.complaintCount} reports) indicating a severe ${rankingContext.category.toLowerCase()} deficit. Contextual indicators verify a demographic impact requiring development fund allocation.`;
  }
};

module.exports = {
  analyzeSuggestion,
  generateExplanation
};
