import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateOptimizedPrompt(type: "Image" | "Video" | "Text" | "Website", input: string): Promise<string> {
  const instructions = {
    Image: "You are an expert AI prompt engineer for image generation models (like Midjourney, DALL-E, Stable Diffusion). Translate the user's idea (in any language) to English, and create a highly detailed, descriptive image generation prompt. Include details about style, lighting, camera angle, subject, environment, and mood. Output ONLY the prompt itself.",
    Video: "You are an expert AI prompt engineer for video generation models (like Runway, Sora, Veo). Translate the user's idea (in any language) to English, and create a highly detailed video generation prompt. Describe the camera movement, subject action, lighting, environment, and frame rate/cinematography style. Output ONLY the prompt itself.",
    Text: "You are an expert AI prompt engineer for large language models (like ChatGPT, Gemini). Translate the user's idea (in any language) to English, and formulate an optimal multi-step or detailed prompt that will yield the best textual response. Specify persona, format, constraints, and goal. Output ONLY the prompt itself.",
    Website: "You are an expert AI prompt engineer for AI web development tools (like v0, AI Studio). Translate the user's idea (in any language) to English, and formulate a detailed prompt outlining the UI/UX, sections, color scheme, interactions, and structure of the website. Output ONLY the prompt itself."
  };

  const systemInstruction = instructions[type];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: input,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Failed to generate prompt.";
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
}
