// server.js

const express = require("express");
const cors = require("cors");
const {
  sessions,
  createNewSession,
  getSessionById,
  addChatMessage
} = require("./mockData");

const app = express();
const PORT = 5000; // you can change if needed

// Middleware
app.use(cors()); // allows requests from frontend (React)
app.use(express.json()); // parses JSON body from POST requests

// Simple health check route
app.get("/", (req, res) => {
  res.send("Chat API is running 🚀");
});

/**
 * GET /api/sessions
 * Returns list of all session IDs and titles
 * Used to show past chats in the sidebar
 */
app.get("/api/sessions", (req, res) => {
  res.json({
    sessions
  });
});

/**
 * GET /api/new-chat
 * Creates a new mock chat session and returns its ID
 * Used when user clicks "New Chat"
 */
app.get("/api/new-chat", (req, res) => {
  const newSession = createNewSession();
  res.json(newSession);
});

/**
 * GET /api/session/:id
 * Returns the full conversation history for a given session
 */
app.get("/api/session/:id", (req, res) => {
  const sessionId = req.params.id;
  const sessionData = getSessionById(sessionId);

  if (!sessionData) {
    return res.status(404).json({ error: "Session not found" });
  }

  res.json(sessionData);
});

/**
 * POST /api/chat/:id
 * Accepts a user question and returns:
 * - descriptive answer text
 * - structured table data
 *
 * Expected body: { "question": "your text here" }
 */


app.post("/api/chat/:id", (req, res) => {
  const sessionId = req.params.id;
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    return res
      .status(400)
      .json({ error: "Question is required and must be a string" });
  }

  const responsePayload = addChatMessage(sessionId, question);

  res.json(responsePayload);
});


// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
