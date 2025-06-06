const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// --- NEW: Server-side memory for recently used words/hints ---
// Store up to the last N words to avoid immediate repetition.
// You can adjust this number (e.g., 5-10 words)
const recentWords = [];
const MAX_RECENT_WORDS = 5; // Keep track of the last 5 words

async function generateWordAndHint() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or "gemini-1.5-pro"

        // --- NEW: Dynamically build the prompt with exclusion list ---
        let promptText = "Generate a single English word for a hangman game and provide a short, one-sentence hint for the word. Respond strictly in JSON format with 'word' and 'hint' keys. The word should be a common noun, suitable for a general audience.";

        if (recentWords.length > 0) {
            const excludedWords = recentWords.map(w => `'${w}'`).join(', ');
            promptText += ` Ensure the word is not one of the following recently used words: ${excludedWords}. Also, try to pick a word from a different category or theme than recently generated words.`;
        }
        // --- END NEW PROMPT BUILDING ---

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: promptText }] }],
        });
        const response = await result.response;
        let text = response.text();

        // JSON Extraction Logic (as you have it)
        const jsonStartIndex = text.indexOf('```json');
        const jsonEndIndex = text.lastIndexOf('```');

        if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonStartIndex < jsonEndIndex) {
            text = text.substring(jsonStartIndex + '```json'.length, jsonEndIndex).trim();
        } else {
            console.warn("Gemini response was not wrapped in a ```json code block. Attempting direct parse.");
        }

        const parsedData = JSON.parse(text);

        // --- NEW: Add the new word to the recentWords list ---
        if (parsedData.word) {
            // Convert to lowercase to handle case variations (e.g., "Kolam" vs "kolam")
            const newWordLower = parsedData.word.toLowerCase();
            if (!recentWords.includes(newWordLower)) {
                recentWords.push(newWordLower);
                if (recentWords.length > MAX_RECENT_WORDS) {
                    recentWords.shift(); // Remove the oldest word if capacity is exceeded
                }
            }
        }
        // --- END NEW RECENT WORDS MANAGEMENT ---

        console.log("Game data sent:", parsedData); // Log what's being sent
        return parsedData;

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