import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Define the API endpoint for sending prompts to Google Generative AI
app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  // Check if prompt is provided
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const MODEL_NAME = "gemini-1.5-flash"; // Model name
    const API_KEY = process.env.GOOGLE_API_KEY; // Get API key from .env

    if (!API_KEY) {
      return res.status(500).json({ error: "Google API key is missing" });
    }

    const genAI = new GoogleGenerativeAI(API_KEY); // Initialize the GoogleGenerativeAI client
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topP: 1,
      topK: 1,
      maxOutputTokens: 500,
    };

    const chat = model.startChat({
      generationConfig,
      history: [],
    });

    // Send the prompt to the model and get the response
    const result = await chat.sendMessage(prompt);
    const response = result.response.text(); // Extract response text

    console.log("AI Response:", response);

    // Return the AI response to the frontend
    res.json({ response });
  } catch (error) {
    console.error("Error in chat API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
