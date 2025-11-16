// mockData.js

// List of all sessions for sidebar
let sessions = [
  {
    id: "session-1",
    title: "React Basics Chat"
  },
  {
    id: "session-2",
    title: "Node.js Overview"
  }
];

// Conversation history for each session
// Key = sessionId, Value = array of messages
// Each message: { role: "user" | "assistant", content: "text" }
let conversations = {
  "session-1": [
    { role: "user", content: "What is React?" },
    { role: "assistant", content: "React is a JavaScript library for building UIs." }
  ],
  "session-2": [
    { role: "user", content: "What is Node.js?" },
    { role: "assistant", content: "Node.js is a JavaScript runtime built on Chrome's V8 engine." }
  ]
};

// Helper function to generate a new mock session ID
function createNewSession() {
  const newId = `session-${sessions.length + 1}`;
  const newSession = {
    id: newId,
    title: `New Chat ${sessions.length + 1}`
  };  

  sessions.push(newSession);
  conversations[newId] = []; // start with empty conversation

  return newSession;
}

// Helper function to get a session's conversation
function getSessionById(id) {
  const session = sessions.find((s) => s.id === id);
  if (!session) return null;

  return {
    ...session,
    messages: conversations[id] || []
  };
}


function addChatMessage(sessionId, question) {
  if (!conversations[sessionId]) {
    conversations[sessionId] = [];
    sessions.push({
      id: sessionId,
      title: `Imported Session (${sessionId})`,
    });
  }

  // Add user message
  conversations[sessionId].push({
    role: "user",
    content: question,
  });

  // 🔹 Dummy descriptive answer
  const answerText = `
Here is some sample structured data related to your question: "${question}".
This is just mock data coming from the backend API.
  `.trim();

  // 🔹 Dummy tabular data (you can customize this as you like)
  const tableData = {
    columns: ["ID", "Name", "Category", "Score"],
    rows: [
      [1, "Alpha", "Performance", 85],
      [2, "Beta", "Performance", 78],
      [3, "Gamma", "Stability", 92],
      [4, "Delta", "Usability", 88],
    ],
  };

  // Store assistant message in conversation history
  conversations[sessionId].push({
    role: "assistant",
    content: answerText,
  });

  // 🔹 Return structured response for frontend
  return {
    sessionId,
    description: answerText, // extra field (optional)
    table: tableData,
  };
}

module.exports = {
  sessions,
  conversations,
  createNewSession,
  getSessionById,
  addChatMessage,
};

// // Helper function to add a new chat turn and return mock structured response
// function addChatMessage(sessionId, question) {
//   // ensure session exists
//   if (!conversations[sessionId]) {
//     // if session not found, initialize it
//     conversations[sessionId] = [];
//     sessions.push({
//       id: sessionId,
//       title: `Imported Session (${sessionId})`
//     });
//   }

//   // Add user message to conversation
//   conversations[sessionId].push({
//     role: "user",
//     content: question
//   });

//   // Prepare a mock assistant answer text
//   const answerText = `Here is a mock structured response based on your question: "${question}"`;

//   // Example structured (tabular) mock data
//   const tableData = {
//     columns: ["Metric", "Value"],
//     rows: [
//       ["Question Length (characters)", question.length],
//       ["Word Count", question.trim().split(/\s+/).length],
//       ["Session ID", sessionId]
//     ]
//   };

//   // Add assistant message to conversation
//   conversations[sessionId].push({
//     role: "assistant",
//     content: answerText
//   });

//   // Return what the API should send back
//   return {
//     sessionId,
//     answerText,
//     table: tableData
//   };
// }

// module.exports = {
//   sessions,
//   conversations,
//   createNewSession,
//   getSessionById,
//   addChatMessage
// };
