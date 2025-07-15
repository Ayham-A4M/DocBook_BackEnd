require('dotenv');
const gemeni = require('@google/genai')
const ai = new gemeni.GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY });
const getChatResponse = async (message) => {
    try {
        const response = await ai.models.generateContent({
            model:"gemini-2.5-flash-preview-05-20",
            contents: message,
        });
        return response;
    } catch (error) {
        console.error("[gemini Utility Error]:", error);
        throw error; // Let the controller handle it
    }
}
module.exports = getChatResponse