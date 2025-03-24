import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

// Function to delay requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to handle retries with exponential backoff
async function fetchWithRetry(url, data, headers, retries = 3, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.warn(`Rate limited, retrying in ${delayMs}ms...`);
        await delay(delayMs);
        delayMs *= 2; // Increase delay exponentially
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries reached.");
}

// Fetch a random word
app.get("/word", async (req, res) => {
  try {
    const response = await fetchWithRetry(
      OPENAI_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Generate a single random word for a word-guessing game.",
          },
        ],
      },
      { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" }
    );

    res.json({
      word: response.choices?.[0]?.message?.content?.trim() || "react",
    });
  } catch (error) {
    console.error("Error fetching word:", error);
    res
      .status(500)
      .json({ word: "react", error: "Failed to fetch word. Try again later." });
  }
});

// Fetch a hint for the word
app.get("/hint", async (req, res) => {
  const { word } = req.query;

  if (!word) {
    return res.status(400).json({ hint: "No word provided." });
  }

  try {
    const response = await fetchWithRetry(
      OPENAI_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Provide a simple hint for the word: ${word}.`,
          },
        ],
      },
      { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" }
    );

    res.json({
      hint: response.choices?.[0]?.message?.content || "No hint available.",
    });
  } catch (error) {
    console.error("Error fetching hint:", error);
    res
      .status(500)
      .json({
        hint: "Think about programming!",
        error: "Failed to fetch hint. Try again later.",
      });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
