import { GoogleGenAI, ThinkingLevel } from "@google/genai";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateComplexQuery(userQuery: string) {
  const prompt = `You are an expert tutor and study assistant.
The user is looking for revision notes. They have described what they need in natural language.
Your goal is to figure out the best search terms for SaveMyExams PDF notes.
Analyze their request and provide a concise, highly relevant search topic or keyword phrase.
If they describe a concept (e.g., "mixing acid and base"), identify the formal topic name (e.g., "Titration").
Return ONLY the suggested topic/keyword string, nothing else.

User query: ${userQuery}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating query:", error);
    throw error;
  }
}
