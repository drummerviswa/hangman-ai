const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateWordAndHint() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Ensure "gemini-pro" is correct
        const prompt = "Generate a single English word for a hangman game and provide a short, one-sentence hint for the word. Respond in JSON format with 'word' and 'hint' keys.";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return JSON.parse(text);
    } catch (error) {
        console.error("Error generating word and hint:", error);
        return { word: "ERROR", hint: "Error generating word and hint." };
    }
}

app.get('/gameData', async (req, res) => {
    try {
        const gameData = await generateWordAndHint();
        res.json(gameData);
    } catch (error) {
        console.error("Error generating game data:", error);
        res.status(500).json({ error: "Failed to generate game data." });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});