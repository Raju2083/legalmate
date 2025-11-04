import { GoogleGenAI, Chat } from "@google/genai";
import { LANGUAGES } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const chatSessions = new Map<string, Chat>();

const getChatSession = (languageCode: string): Chat => {
  if (chatSessions.has(languageCode)) {
    return chatSessions.get(languageCode)!;
  }

  const languageName = LANGUAGES[languageCode] || 'English';

  const chat: Chat = ai.chats.create({
    model: 'gemini-2.5-pro',
    config: {
      systemInstruction: `You are LegalMate, a friendly and professional AI-powered law consultant. 
      Respond ONLY in ${languageName}.
      Your role is to provide clear, helpful, and general legal information. 
      You must always include a disclaimer at the end of every response. The disclaimer is: "Disclaimer: I am an AI assistant and this is not legal advice. Please consult with a qualified legal professional for your specific situation."
      You MUST translate this disclaimer into ${languageName} as well.
      Keep your responses concise and easy to understand.`,
    },
  });

  chatSessions.set(languageCode, chat);
  return chat;
};

export const sendMessageToGemini = async (message: string, languageCode: string): Promise<string> => {
  try {
    const chat = getChatSession(languageCode);
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};