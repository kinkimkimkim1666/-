import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateLuckyGreeting = async (): Promise<string> => {
  const ai = getClient();
  if (!ai) {
    return "恭喜發財！祝你好運連連！(請配置 API Key 以獲取 AI 祝福)";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a short, very creative, and festive Chinese New Year greeting (Traditional Chinese) for a lucky draw winner. Maximum 20 words. Focus on luck, wealth, and happiness.",
    });
    return response.text || "龍年行大運，財源滾滾來！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "心想事成，萬事如意！";
  }
};