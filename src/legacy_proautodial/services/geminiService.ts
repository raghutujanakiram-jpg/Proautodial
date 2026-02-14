
import { GoogleGenAI, Type, GenerateContentResponse, Modality } from "@google/genai";

// Standardizing initialization to use process.env.API_KEY directly as per guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Robust API wrapper with exponential backoff and retry logic.
 * Specifically refined to handle the structure: {"error":{"code":429,"message":"...","status":"RESOURCE_EXHAUSTED"}}
 */
async function callWithRetry<T>(fn: () => Promise<T>, maxRetries = 4, initialDelay = 2000): Promise<T> {
  let lastError: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Extracting status/code from various SDK error formats
      const status = error?.status || error?.error?.status || error?.error?.code || error?.code;
      const message = error?.message || error?.error?.message || "";
      
      const isQuotaError = status === 429 || status === 'RESOURCE_EXHAUSTED' || message.toLowerCase().includes('quota');
      const isServerError = status === 500 || status === 'INTERNAL' || status === 503 || status === 'UNAVAILABLE';
      
      if ((isQuotaError || isServerError) && attempt < maxRetries) {
        // Longer wait for Quota errors to allow rate limit bucket to refill
        const multiplier = isQuotaError ? 3 : 2;
        const delay = initialDelay * Math.pow(multiplier, attempt);
        
        console.warn(`Gemini API [${status}]: Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

/**
 * Real-time Call Insight Generation
 */
export const getCallInsight = async (transcript: string) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following call transcript snippet and provide:
      1. Current Sentiment (Positive/Neutral/Negative)
      2. Suggested Next Response
      3. Key Objection identified (if any)
      
      Transcript: "${transcript}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING },
            suggestedResponse: { type: Type.STRING },
            objection: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  });
};

/**
 * Generate a comprehensive summary of a completed call
 */
export const generateCallSummary = async (fullTranscript: string) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize this call transcript for an executive dashboard. 
      Include: 
      - The primary resolution or outcome.
      - Key follow-up actions.
      - Overall customer satisfaction level.
      
      Transcript: "${fullTranscript}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            outcome: { type: Type.STRING },
            followUps: { type: Type.ARRAY, items: { type: Type.STRING } },
            overallSatisfaction: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  });
};

/**
 * AI-Driven Demo Confirmation
 */
export const generateDemoConfirmation = async (name: string, objective: string) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user ${name} has booked a strategic AI demo with the objective: "${objective}". 
      Write a highly professional, visionary, and concise (2 sentences) confirmation. 
      Mention that our strategic engineers are already drafting a customized roadmap for their specific goal.`,
    });
    return response.text;
  });
};

/**
 * AI-Driven Call Routing Analysis
 */
export const analyzeRoutingLogic = async (leadData: string) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Evaluate this lead data for optimal routing: ${leadData}. 
      Match against these agent skills: [Retention Expert, High-Ticket Closer, Technical Support, Generalist].
      Return the best fit agent type and reasoning.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            targetAgent: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            priority: { type: Type.NUMBER }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  });
};

/**
 * Knowledge Base Document Processing
 */
export const processKnowledgeDoc = async (docText: string, personaObjective: string) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Synthesize this document into a set of core facts and behavioral guardrails for an AI Agent.
      Objective: ${personaObjective}
      Document: ${docText}`,
    });
    return response.text;
  });
};

export const getGeminiProResponse = async (prompt: string) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text;
  });
};

export const getFastResponse = async (prompt: string) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Keep the response extremely brief and efficient: ${prompt}`,
    });
    return response.text;
  });
};

export const processContactSubmission = async (name: string, message: string) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The following is a contact form submission from ${name}: "${message}". 
      Act as an AI assistant for ProAutoDial. Write a professional, extremely concise (2 sentences) 
      confirming receipt.`,
    });
    return response.text;
  });
};

export const getSearchGroundedResponse = async (prompt: string) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || '',
    })).filter((s: any) => s.uri) || [];

    return { text: response.text, sources };
  });
};

export const getMapsGroundedResponse = async (prompt: string, latitude?: number, longitude?: number) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const config: any = {
      tools: [{ googleMaps: {} }],
    };

    if (latitude !== undefined && longitude !== undefined) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: { latitude, longitude }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.maps?.title || 'Map Location',
      uri: chunk.maps?.uri || '',
    })).filter((s: any) => s.uri) || [];

    return { text: response.text, sources };
  });
};

export const getThinkingResponse = async (prompt: string) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      },
    });
    return response.text;
  });
};

export const analyzeImage = async (imageB64: string, prompt: string) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { data: imageB64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      },
    });
    return response.text;
  });
};

export const generateImage = async (prompt: string, aspectRatio: string = "1:1", highQuality: boolean = false) => {
  return callWithRetry(async () => {
    const ai = getAI();
    const model = highQuality ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
    
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [{ text: `Professional tech company branding, clean UI/UX, coral theme: ${prompt}` }] },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          ...(highQuality ? { imageSize: "1K" } : {})
        }
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return imagePart?.inlineData?.data ? `data:image/png;base64,${imagePart.inlineData.data}` : null;
  });
};

export const generateVideoFromImage = async (imageB64: string, prompt: string) => {
  // Video generation is already naturally long-running, so we wrap the initial request
  const ai = getAI();
  let operation = await callWithRetry(async () => {
    return await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      image: {
        imageBytes: imageB64,
        mimeType: 'image/jpeg',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await callWithRetry(async () => {
      return await ai.operations.getVideosOperation({ operation: operation });
    });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  return `${downloadLink}&key=${process.env.API_KEY}`;
};

export const generateSpeech = async (text: string, voiceName: string = 'Kore') => {
  return callWithRetry(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  });
};
