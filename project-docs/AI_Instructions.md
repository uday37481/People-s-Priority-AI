# AI Instructions

## Part 1 – AI Architecture & Gemini Integration

### Document Overview

This document provides comprehensive guidelines for implementing and using AI capabilities in the PeoplePriority AI platform, including Gemini API integration, prompt engineering, AI workflows, and production best practices.

### AI Overview

The platform uses **Google Gemini API** as its primary AI engine to provide intelligent citizen complaint analysis, demand prioritization, and constituency insights. Gemini's multimodal capabilities (text, image, audio) enable a seamless citizen experience across multiple submission channels.

### AI Responsibilities

The AI system is responsible for:

1. **Language Detection & Translation** - Detecting the language of submissions and translating to English for processing
2. **Complaint Categorization** - Classifying complaints into predefined categories (Road, Water, Education, Healthcare, Agriculture, Employment, Sanitation, Electricity, Other)
3. **AI Summary Generation** - Creating concise, actionable summaries of citizen submissions
4. **Keyword Extraction** - Identifying key terms and topics from complaints
5. **Sentiment Analysis** - Determining the emotional tone (Positive, Neutral, Negative, Urgent)
6. **Urgency Prediction** - Assessing the priority level (Low, Medium, High, Critical)
7. **Duplicate Detection** - Identifying similar complaints from different citizens
8. **Demand Hotspot Identification** - Geospatial clustering of similar issues
9. **Priority Recommendation** - Calculating development priorities using multi-factor scoring
10. **Explainable AI Reasoning** - Providing clear justifications for AI decisions

### AI Workflow

```
Citizen Submission (Text/Image/Audio)
           ↓
Input Validation & Sanitization
           ↓
Language Detection
           ↓
Translation (if needed)
           ↓
Multimodal Processing (Gemini API)
           ↓
┌─────────────────────────────────────┐
│    Parallel AI Analysis             │
│  ├─ Categorization                 │
│  ├─ Summarization                  │
│  ├─ Keyword Extraction             │
│  ├─ Sentiment Analysis             │
│  ├─ Urgency Prediction             │
│  └─ Duplicate Detection            │
└─────────────────────────────────────┘
           ↓
AI Response Validation & Parsing
           ↓
Store in aiAnalysis Collection
           ↓
Demand Hotspot Calculation
           ↓
Priority Recommendation Generation
           ↓
Update MP Dashboard
```

### AI Pipeline Architecture

**Components:**

1. **API Gateway** - Centralized access to Gemini API with retry logic and rate limiting
2. **Prompt Builder** - Dynamic prompt construction based on submission type
3. **AI Response Parser** - Validates and parses JSON outputs from Gemini
4. **Analysis Service** - Orchestrates the AI pipeline flow
5. **Storage Layer** - Saves AI results to MongoDB
6. **Quality Monitor** - Tracks AI performance and detects drift

### Gemini Integration

**API Client Setup:**

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-pro' 
});

// For multimodal (images/audio)
const visionModel = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash' 
});
```

**Model Selection:**

- **gemini-1.5-pro** - Primary model for complex analysis, prioritization, reasoning
- **gemini-1.5-flash** - Faster, cheaper for simple tasks (categorization, summarization)
- **gemini-2.0-flash-exp** - Experimental, latest features (optional)

### AI Request Lifecycle

1. **Request Preparation**
   - Sanitize user input
   - Remove PII if needed
   - Format data for AI consumption

2. **Prompt Assembly**
   - Combine system prompt, context, user input
   - Add few-shot examples if needed
   - Enforce JSON output format

3. **API Call**
   - Implement timeout handling
   - Add retry logic for failures
   - Track token usage

4. **Response Handling**
   - Parse and validate JSON
   - Extract required fields
   - Handle incomplete/malformed outputs
   - Store raw response for debugging

5. **Result Storage**
   - Save analysis to database
   - Log AI metrics
   - Trigger downstream processes

### Prompt Engineering Strategy

**Core Principles:**

1. **Clarity** - Be specific and unambiguous
2. **Structure** - Use delimiters and sections
3. **Examples** - Provide few-shot learning examples
4. **Constraints** - Define output format clearly
5. **Persona** - Give the AI a consistent role
6. **Safety** - Instruct on appropriate responses

**Prompt Structure:**

```
[SYSTEM INSTRUCTIONS]
[PERSONA DEFINITION]
[OUTPUT REQUIREMENTS]
[CONTEXT INFORMATION]
[FEW-SHOT EXAMPLES]
[USER INPUT]
```

### System Prompt

```
You are "PriorityAI", an expert in analyzing citizen complaints about infrastructure and public services in India. Your role is to help MPs make data-driven decisions by providing accurate, actionable insights from citizen submissions.

Key Responsibilities:
- Analyze complaints objectively without bias
- Focus on factual content rather than emotional language
- Provide clear, specific categories and summaries
- Always respond in valid JSON format as specified
- Be transparent about confidence levels in your predictions
- Do not fabricate information not present in the input

You must respond ONLY with valid JSON matching the schema provided. Never include explanatory text outside the JSON structure.
```

### Context Prompt

```
Current Context:
- Constituency: {{constituencyName}}
- Current Date: {{currentDate}}
- Existing Complaints in Similar Area: {{recentComplaintsCount}}
- Historical Category Distribution: {{categoryDistribution}}

Classification Categories (use EXACTLY these):
- Road
- Water
- Education
- Healthcare
- Agriculture
- Employment
- Sanitation
- Electricity
- Other

Urgency Levels (use EXACTLY these):
- Low
- Medium
- High
- Critical

Sentiment Options (use EXACTLY these):
- Positive
- Neutral
- Negative
- Urgent
```

### User Prompt

```
Analyze the following citizen complaint and provide a structured analysis:

Complaint Text: {{complaintText}}
Location: {{location}}
Submission Type: {{submissionType}}
Attachments: {{hasAttachments ? 'Yes' : 'No'}}

Return ONLY a JSON object with the following structure:
{
  "detectedLanguage": "string (ISO 639-1 code)",
  "category": "string (one of the classification categories)",
  "confidence": number (0-100),
  "summary": "string (2-3 sentences, actionable)",
  "sentiment": "string",
  "urgency": "string",
  "keywords": ["string", "string", "string", "string", "string"],
  "needsTranslation": boolean,
  "originalLanguageText": "string (only if needsTranslation is true)",
  "duplicateCheck": {
    "isPotentialDuplicate": boolean,
    "similarComplaintIds": ["string"],
    "duplicateConfidence": number (0-100)
  }
}
```

### AI Processing Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│              Start AI Analysis                      │
└──────────────────────┬──────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│  Check submission type & prepare data               │
│  - Text → direct processing                         │
│  - Image → OCR + visual analysis                    │
│  - Audio → speech-to-text first                     │
└──────────────────────┬──────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│  Assemble comprehensive prompt with context         │
└──────────────────────┬──────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│  Call Gemini API with timeout & retry logic         │
└──────────────────────┬──────────────────────────────┘
                       ↓
          ┌────────────┴────────────┐
          ↓                         ↓
    Success?                   Handle Error
          ↓                         ↓
┌──────────────────┐    ┌───────────────────┐
│ Parse & Validate │    │ Retry or fallback  │
│     JSON Output  │    │   to simpler model │
└────────┬─────────┘    └─────────┬─────────┘
         ↓                        ↓
┌──────────────────┐    ┌───────────────────┐
│ Store AI results │    │ Log failure &     │
│   in database    │    │   use defaults    │
└────────┬─────────┘    └─────────┬─────────┘
         ↓                        ↓
         └────────────┬────────────┘
                      ↓
    ┌───────────────────────────┐
    │ Trigger priority & hotspot │
    │       calculation         │
    └───────────────────────────┘
```

### AI Design Principles

1. **Explainability First** - Always provide reasoning for AI decisions
2. **Privacy by Design** - Never expose personal citizen data in outputs
3. **Fallback Ready** - Have default behaviors for AI failures
4. **Human in the Loop** - Allow MP review of high-stakes decisions
5. **Continuous Learning** - Log outputs for future improvement
6. **Bias Mitigation** - Regularly audit for demographic biases
7. **Performance Optimized** - Cache frequent AI operations

---

## Part 2 – Prompt Library & JSON Output

### Complaint Categorization Prompt

```
Categorize this citizen complaint into one of the categories.

Categories:
- Road (potholes, street conditions, traffic, accidents)
- Water (supply, quality, shortage, contamination)
- Education (schools, teachers, facilities, admissions)
- Healthcare (hospitals, doctors, medicine, emergencies)
- Agriculture (crops, irrigation, subsidies, weather)
- Employment (jobs, unemployment, skills training)
- Sanitation (waste, sewage, cleanliness, toilets)
- Electricity (power cuts, supply, bills, infrastructure)
- Other (anything not fitting above)

Complaint: "{{complaint}}"

Return JSON:
{
  "category": "exact category name",
  "confidence": 0-100,
  "reasoning": "brief explanation of categorization"
}
```

### Translation Prompt

```
Translate the following citizen complaint to English while preserving the original meaning and emotional tone. If it's already in English, return it as-is.

Original Text ({{detectedLanguage}}):
{{originalText}}

Return JSON:
{
  "translatedText": "English translation",
  "originalLanguage": "{{detectedLanguage}}",
  "needsTranslation": boolean,
  "translationConfidence": 0-100
}
```

### Speech-to-Text Flow

**Note:** Use Gemini's multimodal capabilities or a dedicated speech-to-text service for audio submissions.

For audio files:

1. Convert audio to supported format (MP3, WAV, OGG)
2. Use Gemini vision/audio model for transcription
3. Pass transcript to text analysis pipeline

Prompt for audio analysis:

```
Transcribe and analyze this audio recording of a citizen complaint. Provide:
1. Full transcript of the audio
2. Summary of the complaint
3. Any location details mentioned
4. Urgency assessment

Return JSON:
{
  "transcript": "full audio transcript",
  "summary": "concise summary",
  "location": "location if mentioned",
  "urgency": "Low/Medium/High/Critical",
  "backgroundNoiseNotes": "any notes about audio quality"
}
```

### Summarization Prompt

```
Create a concise, actionable summary of this citizen complaint (max 150 words). Focus on:
- What is the specific issue?
- Where is it happening?
- Who is affected?
- How urgent is it?
- What action is being requested?

Original Complaint:
{{complaintText}}

Return JSON:
{
  "summary": "concise, actionable summary",
  "keyPoints": ["point1", "point2", "point3"],
  "requestedAction": "what the citizen wants done"
}
```

### Priority Detection Prompt

```
Analyze this complaint and assess its priority level based on:
- Number of people affected
- Health/safety implications
- Duration of the problem
- Previous similar complaints

Complaint Analysis:
- Category: {{category}}
- Summary: {{summary}}
- Location: {{location}}
- Sentiment: {{sentiment}}

Priority Scale: Low, Medium, High, Critical

Return JSON:
{
  "priority": "Low|Medium|High|Critical",
  "priorityScore": 0-100,
  "priorityFactors": {
    "healthRisk": 0-100,
    "numberAffected": 0-100,
    "duration": 0-100,
    "infrastructureCriticality": 0-100
  },
  "priorityReasoning": "clear explanation of why this priority was assigned"
}
```

### Theme Extraction Prompt

```
Extract key themes and keywords from this citizen complaint. Include:
- Infrastructure issues mentioned
- Specific locations
- Stakeholders involved
- Timeline references

Complaint: {{complaintText}}

Return JSON:
{
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7", "keyword8"],
  "themes": ["theme1", "theme2", "theme3"],
  "specificLocations": ["location1", "location2"],
  "temporalReferences": ["timeline info"],
  "mentionedOrganizations": ["org1", "org2"]
}
```

### Duplicate Detection Prompt

```
Compare this new complaint with existing complaints to identify potential duplicates.

New Complaint:
- ID: {{newComplaintId}}
- Category: {{category}}
- Summary: {{summary}}
- Location: {{location}}

Existing Complaints ({{count}}):
{{existingComplaintsList}}

Return JSON:
{
  "isPotentialDuplicate": boolean,
  "duplicateComplaintIds": ["id1", "id2"],
  "similarityScores": {
    "id1": 0-100,
    "id2": 0-100
  },
  "duplicateReasoning": "why these are considered similar",
  "shouldMerge": boolean,
  "mergeSuggestion": "how to merge if applicable"
}
```

### AI Recommendation Prompt

```
Generate development project recommendations for this constituency based on:

1. Citizen demand data:
   - Top complaints: {{topComplaints}}
   - Hotspot locations: {{hotspots}}

2. Public dataset context:
   - Population: {{population}}
   - Literacy rate: {{literacyRate}}
   - Existing infrastructure: {{infrastructure}}

3. Current development projects:
   {{currentProjects}}

Provide 5 prioritized recommendations with:
- Project title
- Justification based on data
- Estimated impact
- Implementation timeline suggestion

Return JSON:
{
  "recommendations": [
    {
      "rank": 1-5,
      "projectTitle": "string",
      "category": "Road|Water|Education|Healthcare|Sanitation|Electricity|Other",
      "priorityScore": 0-100,
      "justification": {
        "citizenDemand": "explanation",
        "infrastructureNeed": "explanation",
        "demographicFactors": "explanation"
      },
      "estimatedImpact": {
        "peopleBenefited": number,
        "geographicCoverage": "description",
        "timelineEstimate": "short|medium|long term"
      },
      "aiConfidence": 0-100,
      "supportingComplaintIds": ["id1", "id2", "id3"]
    }
  ],
  "methodology": "brief explanation of prioritization approach"
}
```

### Prompt Templates

**Template 1: Standard Analysis (Text Only)**

```javascript
const buildStandardAnalysisPrompt = (complaint, context) => {
  return `
${SYSTEM_PROMPT}

Context:
- Constituency: ${context.constituency}
- Date: ${context.date}
- Recent complaints: ${context.recentComplaintsCount}

Complaint to analyze:
"""
${complaint.text}
"""

Location: ${complaint.location || 'Not specified'}

${USER_PROMPT}
  `;
};
```

**Template 2: Multimodal Analysis (With Image)**

```javascript
const buildMultimodalPrompt = (complaint, imageData) => {
  return {
    contents: [
      {
        role: 'user',
        parts: [
          { text: `${SYSTEM_PROMPT}\n\nAnalyze this complaint and image.` },
          { text: `Complaint text: ${complaint.text}` },
          {
            inline_data: {
              mime_type: 'image/jpeg',
              data: imageData
            }
          },
          { text: 'Provide the standard JSON analysis plus a description of what you see in the image.' }
        ]
      }
    ]
  };
};
```

### Expected JSON Schema

**Full AI Analysis Output Schema:**

```json
{
  "suggestionId": "ObjectId reference",
  "detectedCategory": "Road|Water|Education|Healthcare|Agriculture|Employment|Sanitation|Electricity|Other",
  "categoryConfidence": 95,
  "aiSummary": "Concise, actionable summary of the complaint",
  "sentiment": "Positive|Neutral|Negative|Urgent",
  "urgency": "Low|Medium|High|Critical",
  "urgencyScore": 85,
  "extractedKeywords": [
    "potholes",
    "road damage",
    "school zone",
    "accident risk",
    "urgent repair"
  ],
  "themes": [
    "Road Infrastructure",
    "Safety Concern"
  ],
  "duplicateClusterId": "cluster_123",
  "isDuplicate": false,
  "duplicateConfidence": 15,
  "detectedLanguage": "hi",
  "originalText": "Original non-English text if applicable",
  "translatedText": "English translation",
  "translationConfidence": 92,
  "imageAnalysis": {
    "description": "Description of uploaded image",
    "relevant": true,
    "elementsIdentified": ["pothole", "damaged road"]
  },
  "priorityFactors": {
    "healthRisk": 70,
    "numberAffected": 60,
    "duration": 80,
    "infrastructureCriticality": 85
  },
  "aiConfidence": 91,
  "processedAt": "2026-07-07T10:30:00Z",
  "modelVersion": "gemini-1.5-pro",
  "promptTokens": 450,
  "responseTokens": 320,
  "totalTokens": 770
}
```

### Multiple Example Inputs

**Example 1: Road Complaint (Hindi)**

```json
{
  "input": {
    "text": "सरकार से निवेदन है कि हमारे गांव की मुख्य सड़क बहुत खराब है। कई गड्ढे हैं जिससे दुर्घटनाएं हो रही हैं। स्कूल जाने वाले बच्चों को बहुत दिक्कत हो रही है। कृपया सड़क की मरम्मत कराएं।",
    "location": {
      "lat": 28.7041,
      "lng": 77.1025,
      "address": "Village XYZ, District ABC"
    },
    "submissionType": "text"
  }
}
```

**Example 2: Water Complaint (English, with image)**

```json
{
  "input": {
    "text": "The water supply in our area has been contaminated for the past 2 weeks. The water is brown and smells bad. Many people are getting sick with stomach issues. I've attached a photo showing the water color. Please test the water immediately and fix the supply.",
    "location": {
      "lat": 19.0760,
      "lng": 72.8777
    },
    "submissionType": "image",
    "hasImage": true
  }
}
```

**Example 3: Healthcare Complaint (Mixed Language)**

```json
{
  "input": {
    "text": "Hamare paas hospital nahi hai. PHC mein doctor nahi aate. Emergency ke liye 50km jaana padta hai. Please ek hospital banaye. Our village needs basic healthcare facilities urgently.",
    "location": {
      "lat": 22.5726,
      "lng": 88.3639
    },
    "submissionType": "text"
  }
}
```

### Multiple Expected Outputs

**Expected Output for Example 1:**

```json
{
  "detectedCategory": "Road",
  "categoryConfidence": 98,
  "aiSummary": "Citizens report severe road damage with multiple potholes in Village XYZ. The poor road conditions are causing accidents and creating difficulties for school children. Immediate repair is requested.",
  "sentiment": "Urgent",
  "urgency": "High",
  "urgencyScore": 88,
  "extractedKeywords": [
    "road damage",
    "potholes",
    "accidents",
    "school children",
    "repair request",
    "village road"
  ],
  "themes": ["Road Infrastructure", "Public Safety"],
  "detectedLanguage": "hi",
  "translatedText": "The government is requested that the main road of our village is very bad. There are many potholes due to which accidents are happening. Children going to school are facing a lot of difficulty. Please get the road repaired.",
  "translationConfidence": 96,
  "priorityFactors": {
    "healthRisk": 75,
    "numberAffected": 80,
    "duration": 70,
    "infrastructureCriticality": 85
  },
  "aiConfidence": 95
}
```

**Expected Output for Example 2:**

```json
{
  "detectedCategory": "Water",
  "categoryConfidence": 99,
  "aiSummary": "Residents report contaminated brown water with bad odor for 2 weeks. Multiple people are sick with stomach issues. Photo shows discolored water. Immediate water testing and supply repair requested.",
  "sentiment": "Urgent",
  "urgency": "Critical",
  "urgencyScore": 95,
  "extractedKeywords": [
    "water contamination",
    "brown water",
    "bad odor",
    "sickness",
    "stomach issues",
    "water testing",
    "water supply",
    "emergency"
  ],
  "themes": ["Water Quality", "Public Health Emergency"],
  "detectedLanguage": "en",
  "translatedText": "The water supply in our area has been contaminated for the past 2 weeks...",
  "translationConfidence": 100,
  "imageAnalysis": {
    "description": "Image shows a glass filled with brown, discolored water. The water appears murky and unsafe for consumption.",
    "relevant": true,
    "elementsIdentified": ["discolored water", "glass container"]
  },
  "priorityFactors": {
    "healthRisk": 98,
    "numberAffected": 85,
    "duration": 80,
    "infrastructureCriticality": 95
  },
  "aiConfidence": 98
}
```

---

## Part 3 – Production AI Guide

### Token Optimization

**Strategies to Reduce Token Usage:**

1. **Model Selection**
   - Use gemini-1.5-flash for routine tasks
   - Reserve gemini-1.5-pro for complex reasoning

2. **Prompt Compression**
   - Remove redundant instructions
   - Use concise few-shot examples (max 2-3)
   - Truncate long context when possible

3. **Output Constraints**
   - Specify maximum lengths for text fields
   - Limit array sizes (keywords: 5-8 items)
   - Use enum values instead of free text

4. **Caching Strategy**
   - Cache duplicate analysis requests
   - Reuse category predictions for similar complaints
   - Implement time-based cache invalidation

```javascript
const TOKEN_LIMITS = {
  'gemini-1.5-pro': { input: 2000000, output: 8192 },
  'gemini-1.5-flash': { input: 1000000, output: 8192 }
};

const estimateTokens = (text) => {
  // Rough estimate: ~4 characters per token
  return Math.ceil(text.length / 4);
};

const truncateContext = (text, maxTokens) => {
  const maxChars = maxTokens * 4;
  if (text.length <= maxChars) return text;
  return text.substring(0, maxChars - 100) + '\n[Content truncated]';
};
```

### Context Management

**Best Practices:**

1. **Context Window Management**
   - Keep total tokens under 80% of model limit
   - Prioritize recent complaints in context
   - Summarize older complaints to save space

2. **Relevant Information Only**
   - Don't include unrelated public dataset data
   - Filter recent complaints by category/location
   - Remove duplicate context information

3. **Dynamic Context Assembly**
   - Build context based on complaint category
   - Include similar historical complaints
   - Add constituency-specific context

```javascript
const buildContext = (complaint, constituency) => {
  const context = [];
  
  // Add constituency basics
  context.push(`Constituency: ${constituency.name}`);
  context.push(`Population: ${constituency.population}`);
  
  // Add similar recent complaints (max 5)
  const similarComplaints = await getSimilarComplaints(complaint, 5);
  if (similarComplaints.length > 0) {
    context.push('\nSimilar Recent Complaints:');
    similarComplaints.forEach(c => {
      context.push(`- ${c.category}: ${c.summary.substring(0, 100)}...`);
    });
  }
  
  return context.join('\n');
};
```

### Error Handling

**Common AI Error Scenarios:**

1. **Invalid JSON Output**
   - Retry with more explicit format instructions
   - Fall back to simpler, structured outputs
   - Use regex to extract partial valid JSON

2. **Hallucinations**
   - Validate outputs against expected enums
   - Cross-check with known data
   - Set confidence thresholds

3. **Content Filters**
   - Handle safety blocked responses gracefully
   - Log but don't expose safety reasons
   - Route to human review when blocked

```javascript
class AIError extends Error {
  constructor(type, message, retryable = false) {
    super(message);
    this.type = type;
    this.retryable = retryable;
  }
}

const handleAIError = (error) => {
  if (error.message.includes('safety')) {
    throw new AIError('CONTENT_BLOCKED', 'Content blocked by safety filters', false);
  }
  if (error.status === 429) {
    throw new AIError('RATE_LIMIT', 'Rate limit exceeded', true);
  }
  if (error.status >= 500) {
    throw new AIError('SERVER_ERROR', 'Server error', true);
  }
  throw new AIError('UNKNOWN', error.message, true);
};
```

### Retry Strategy

**Exponential Backoff with Jitter:**

```javascript
const retryAIRequest = async (fn, maxRetries = 3) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (!error.retryable) break;
      
      // Exponential backoff with jitter
      const baseDelay = Math.pow(2, i) * 1000;
      const jitter = Math.random() * 500;
      const delay = baseDelay + jitter;
      
      console.log(`Retry ${i + 1}/${maxRetries} in ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};
```

**Retry Eligibility:**
- ✅ 429 Rate Limits (with backoff)
- ✅ 5xx Server Errors
- ✅ Network timeouts
- ❌ Invalid JSON (fallback instead)
- ❌ Content blocked (never retry)
- ❌ Authentication errors (fix config first)

### Fallback Strategy

**Tiered Fallback System:**

1. **Tier 1: Model Fallback**
   - Try gemini-1.5-pro first
   - Fall back to gemini-1.5-flash
   - Last resort: simpler rule-based system

2. **Tier 2: Analysis Fallback**
   - If full analysis fails, try just categorization
   - If categorization fails, use keyword-based fallback
   - Manual review queue as ultimate fallback

```javascript
const analyzeWithFallback = async (complaint) => {
  try {
    return await analyzeWithGeminiPro(complaint);
  } catch (error) {
    console.log('Pro model failed, trying Flash');
    
    try {
      return await analyzeWithGeminiFlash(complaint);
    } catch (error2) {
      console.log('Flash also failed, using fallback');
      
      return {
        detectedCategory: getCategoryFromKeywords(complaint.text),
        aiSummary: complaint.text.substring(0, 200) + '...',
        sentiment: 'Neutral',
        urgency: 'Medium',
        extractedKeywords: extractSimpleKeywords(complaint.text),
        aiConfidence: 50,
        needsReview: true,
        fallbackUsed: true
      };
    }
  }
};
```

### API Limits

**Gemini API Limits (as of 2026):**

| Model | RPM (Requests/Min) | TPM (Tokens/Min) | RPD (Requests/Day) |
|-------|-------------------|-----------------|-------------------|
| Gemini 1.5 Pro | 500 | 5,000,000 | 10,000 |
| Gemini 1.5 Flash | 1,000 | 10,000,000 | 100,000 |

**Monitoring Implementation:**

```javascript
class RateLimiter {
  constructor() {
    this.requests = [];
    this.tokens = [];
    this.DAILY_LIMIT = 9000; // 90% of allowed
    this.MINUTE_LIMIT = 450;
  }
  
  async acquire(tokens) {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const oneDayAgo = now - 86400000;
    
    // Clean up old entries
    this.requests = this.requests.filter(t => t > oneDayAgo);
    this.tokens = this.tokens.filter(t => t.timestamp > oneMinuteAgo);
    
    // Check limits
    const recentRequests = this.requests.filter(t => t > oneMinuteAgo);
    const recentTokens = this.tokens.reduce((sum, t) => sum + t.count, 0);
    
    if (this.requests.length >= this.DAILY_LIMIT) {
      throw new Error('Daily rate limit exceeded');
    }
    if (recentRequests.length >= this.MINUTE_LIMIT) {
      throw new Error('Minute rate limit exceeded');
    }
    
    // Record usage
    this.requests.push(now);
    this.tokens.push({ timestamp: now, count: tokens });
    
    return true;
  }
}
```

### Rate Limiting

**Implementation Pattern:**

1. **Client-Side Throttling**
   - Queue requests when approaching limits
   - Prioritize urgent submissions
   - Batch similar analysis requests

2. **Server-Side Limits**
   - Per-user rate limiting
   - Per-constituency quotas
   - Admin override capability

3. **Smart Queueing**
   - Real-time complaints: high priority
   - Batch analysis: low priority
   - Admin requests: highest priority

### Hallucination Prevention

**Strategies:**

1. **Ground Truth Validation**
   - Verify locations against map data
   - Cross-check categories against keywords
   - Validate confidence scores make sense

2. **Constrained Outputs**
   - Use enums instead of free text
   - Define strict JSON schemas
   - Set reasonable bounds for numeric fields

3. **Few-Shot Examples**
   - Show correct outputs in prompts
   - Include edge cases
   - Demonstrate expected confidence levels

4. **Confidence Thresholds**
   - Flag low-confidence results for review
   - Auto-escalate to MP when confidence < 70%
   - Log confidence distributions over time

```javascript
const validateAIOutput = (output) => {
  const issues = [];
  
  // Validate category is in allowed list
  const validCategories = ['Road', 'Water', 'Education', 'Healthcare', 
                          'Agriculture', 'Employment', 'Sanitation', 'Electricity', 'Other'];
  if (!validCategories.includes(output.detectedCategory)) {
    issues.push('Invalid category');
    output.detectedCategory = 'Other';
  }
  
  // Validate confidence score
  if (output.aiConfidence < 0 || output.aiConfidence > 100) {
    issues.push('Invalid confidence score');
    output.aiConfidence = Math.min(100, Math.max(0, output.aiConfidence || 50));
  }
  
  // Flag low confidence for review
  if (output.aiConfidence < 70) {
    output.needsHumanReview = true;
  }
  
  return { valid: issues.length === 0, issues, output };
};
```

### Security Considerations

**Critical Measures:**

1. **Prompt Injection Protection**
   - Sanitize all user inputs
   - Use delimiters around user content
   - Avoid reflecting user input in system prompts

2. **API Key Security**
   - Never expose keys in frontend
   - Use environment variables
   - Rotate keys periodically

3. **Data Privacy**
   - Don't send PII to AI unless necessary
   - Anonymize data when possible
   - Log without exposing sensitive information

4. **Output Validation**
   - Never execute AI-generated code
   - Sanitize before storing in database
   - Escape when displaying to users

```javascript
const sanitizeForAI = (text) => {
  // Remove potential prompt injection patterns
  return text
    .replace(/Ignore previous instructions/gi, '[REDACTED]')
    .replace(/System prompt/gi, '[REDACTED]')
    .replace(/You are/gi, '[USER STATED: You are]')
    .trim();
};

const wrapUserInput = (text) => {
  return `\n---BEGIN USER COMPLAINT---\n${text}\n---END USER COMPLAINT---\n`;
};
```

### Privacy Guidelines

**Data Handling Rules:**

1. **Minimize Data Sent to AI**
   - Extract only what's needed
   - Redact personal identifiers
   - Anonymize location if possible

2. **Storage of AI Data**
   - Keep raw prompts but anonymize
   - Separate AI analysis from PII
   - Set retention policies

3. **Transparency**
   - Tell citizens their data is AI-processed
   - Explain how AI is used
   - Allow opt-out of non-essential features

```javascript
const anonymizeComplaint = (complaint) => {
  const anonymized = { ...complaint };
  
  // Remove personal info
  delete anonymized.userId;
  delete anonymized.userEmail;
  delete anonymized.phone;
  
  // Anonymize location (round to 2 decimal places)
  if (anonymized.location) {
    anonymized.location = {
      lat: Math.round(anonymized.location.lat * 100) / 100,
      lng: Math.round(anonymized.location.lng * 100) / 100
    };
  }
  
  return anonymized;
};
```

### AI Best Practices

**Development Workflow:**

1. **Test Early, Test Often**
   - Build a test suite of example complaints
   - Test across languages and categories
   - Validate edge cases

2. **Version Your Prompts**
   - Store prompts in version control
   - Track changes and performance
   - A/B test prompt variations

3. **Monitor Continuously**
   - Track accuracy over time
   - Watch for drift in categories
   - Monitor confidence distribution

4. **Document Everything**
   - Keep a prompt change log
   - Document failure modes
   - Record lessons learned

**Code Checklist:**
- ✅ All prompts in constants, not hardcoded
- ✅ Proper error handling with retries
- ✅ Input sanitization
- ✅ Output validation
- ✅ Token usage tracking
- ✅ Rate limiting implemented
- ✅ Fallback logic in place
- ✅ Comprehensive logging

### Monitoring AI Quality

**Key Metrics to Track:**

1. **Accuracy Metrics**
   - Classification accuracy (human-validated)
   - Summary quality ratings
   - Priority agreement with MPs

2. **Performance Metrics**
   - Average response time
   - Token efficiency
   - Error rates

3. **Usage Metrics**
   - Daily/weekly API calls
   - Token consumption trends
   - Cost per submission

**Dashboard Implementation:**

```javascript
const trackAIStats = async (analysis) => {
  await AIAnalytics.create({
    model: analysis.modelVersion,
    category: analysis.detectedCategory,
    confidence: analysis.aiConfidence,
    tokensUsed: analysis.totalTokens,
    responseTime: analysis.responseTime,
    hasError: analysis.hasError,
    errorType: analysis.errorType,
    fallbackUsed: analysis.fallbackUsed,
    needsReview: analysis.needsHumanReview,
    timestamp: new Date()
  });
};

const getAIStats = async (days = 30) => {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  
  return await AIAnalytics.aggregate([
    { $match: { timestamp: { $gte: since } } },
    {
      $group: {
        _id: '$category',
        avgConfidence: { $avg: '$confidence' },
        avgTokens: { $avg: '$tokensUsed' },
        errorRate: { $avg: { $cond: ['$hasError', 1, 0] } },
        count: { $sum: 1 }
      }
    }
  ]);
};
```

### Future AI Enhancements

**Short Term (0-3 months):**

1. **Better Multilingual Support**
   - Add more Indian languages
   - Improve translation accuracy
   - Language-specific prompt tuning

2. **Fine-Tuning (if needed)**
   - Collect labeled examples from real usage
   - Fine-tune smaller model for specific tasks
   - A/B test against base model

3. **Semantic Search**
   - Vector embeddings for complaints
   - Better duplicate detection
   - Semantic similarity search

**Medium Term (3-6 months):**

1. **Custom ML Models**
   - Train classification model on local data
   - Build custom prioritization algorithm
   - Reduce API costs

2. **Real-Time Updates**
   - Streaming analysis for large batches
   - WebSocket updates to dashboards
   - Live priority recalculation

3. **Predictive Analytics**
   - Predict future complaint hotspots
   - Forecast infrastructure needs
   - Early warning system

**Long Term (6+ months):**

1. **Multi-Modal Fusion**
   - Better integration of text, image, audio
   - Cross-modal analysis
   - Richer insights from multiple inputs

2. **Agentic AI**
   - AI that can research multiple data sources
   - Autonomous report generation
   - Interactive MP assistant

3. **Federated Learning**
   - Train across constituencies
   - Privacy-preserving model updates
   - No central data collection

### Developer Notes

**Getting Started Checklist:**

1. **API Setup**
   - [ ] Get Gemini API key from Google AI Studio
   - [ ] Store key in environment variables
   - [ ] Install @google/generative-ai package
   - [ ] Set up basic API client

2. **Prompt Testing**
   - [ ] Test classification prompt with examples
   - [ ] Verify JSON output parsing works
   - [ ] Test error handling
   - [ ] Validate multi-language support

3. **Pipeline Integration**
   - [ ] Connect to complaint submission flow
   - [ ] Set up database schema for AI results
   - [ ] Add async processing if needed
   - [ ] Implement fallback strategy

4. **Production Readiness**
   - [ ] Add logging and monitoring
   - [ ] Set up rate limiting
   - [ ] Implement retries with backoff
   - [ ] Add quality validation

**Debugging Tips:**

- **Log raw prompts and responses** (anonymized) for debugging
- **Start with simple prompts**, add complexity gradually
- **Test edge cases** first (empty text, very long text, mixed languages)
- **Use AI Studio playground** to iterate before coding
- **Monitor token usage** closely - costs add up!

**Common Pitfalls to Avoid:**

❌ Don't over-engineer the first version - get basics working first
❌ Don't skip error handling - AI will fail, plan for it
❌ Don't hardcode prompts - make them configurable
❌ Don't forget about rate limits - they will be hit
❌ Don't skip validation - AI outputs can't be trusted blindly

### Final Notes

**Remember:**

- AI is a tool to assist, not replace human judgment
- Always provide an escape hatch for human review
- Monitor continuously - AI performance drifts over time
- Be transparent about AI usage with users
- Prioritize privacy and security at every step

This document will evolve as we learn from real-world usage. Keep it updated with lessons learned and improvements made to the AI system!

