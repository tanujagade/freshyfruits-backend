import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Explicitly passing the API key object fixes the internal 'project' undefined error
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const askFreshyBot = async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "Message content is required" });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: `You are 'Freshy Bot', an expert AI chatbot for 'Freshy Fruits', a premium MERN stack fruit e-commerce platform. 
        Your duties:
        1. Answer queries about fruit health benefits, nutritional value, storage instructions, and recipes.
        2. Help with store concepts (e.g., shipping policies, choosing fresh produce).
        3. Keep your answers brief, engaging, and friendly.
        4. CRITICAL RULE: If the user asks about anything completely unrelated to fruits, nutrition, or your store (like coding, history, or movie advice), politely decline and redirect them back to fruits.`,
      }
    });

    return res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Failed to communicate with Freshy Bot." });
  }
};