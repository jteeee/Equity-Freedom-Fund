import { GoogleGenAI, Type } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the Senior Portfolio Strategist for the "Equity Freedom Exchange Fund". 
Your audience is High-Net-Worth individuals (Tech/Healthcare execs) with $1M-$10M in concentrated stock (ESPP/RSUs).
Your goal is to explain the benefits of a Section 721 Exchange Fund.

Key Knowledge Base:
- Problem: Selling concentrated stock triggers ~35% tax immediate loss.
- Solution: Contribution to our Exchange Fund is a non-taxable event (IRC Section 721).
- Portfolio: 80% Diversified Blue-Chip Equities / 20% Private Credit & Real Estate (for yield/compliance).
- Strategy: "Vintage Laddering" - contributing annually creates liquidity events annually after the 7-year hold.
- Tone: Institutional, sophisticated, authoritative, yet clear. 

Do not give specific financial advice. Always end with a disclaimer that you are an AI assistant.
`;

export const streamAdvisorChat = async (
  history: Array<{ role: string; parts: { text: string }[] }>,
  message: string
) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history,
    });

    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};

export const searchMarketData = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Search for recent news, stock performance, and analyst sentiment regarding: ${query}. Summarize the implications for a long-term holder.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => chunk.web).filter(Boolean) || []
    };
  } catch (error) {
    console.error("Search Error:", error);
    throw error;
  }
};