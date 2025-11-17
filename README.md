# Chat-application
Lumibyte  Assignment
# React + Vite
# 💬 Lumibyte Chat Application

A responsive, single-page chat application that simulates a basic conversational interface like ChatGPT. Built for the Lumibyte assignment using **React + Vite + TailwindCSS** for the frontend and **Node.js + Express** for the backend.

---

## 🚀 Features

* 🗂️ Session-based conversation saving
* 💬 Chat-like UI with user-bot interaction
* 📊 Structured/tabular responses from backend
* 🌓 Light/Dark theme toggle (manual control)
* 🌐 Fully deployed frontend and backend
* 🔄 Persistent theme using localStorage

---

## 🛠️ Tech Stack

### Frontend

* React (via Vite)
* TailwindCSS (v4 + `@tailwindcss/vite`)
* React Router (SPA)
* Environment variables via Vite

### Backend

* Node.js (v18+)
* Express.js
* CORS-enabled REST API
* Mock session data with static JSON

---

## 📁 Project Structure

```
Lumibyte Assignment
├── backend
│   ├── server.js
│   ├── mockData.js
│   └── package.json
|
└── frontend
    ├── src
    │   ├── components/
    │   │   ├── Sidebar.jsx
    │   │   ├── ChatWindow.jsx
    │   │   ├── ThemeToggle.jsx
    │   │   ├── TableResponse.jsx
    │   │   └── AnswerFeedback.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── vite.config.js
```

---

## 🧠 How It Works

1. The **backend** exposes REST endpoints to serve:

   * List of past sessions
   * New session ID generator
   * Full conversation history
   * Mock "AI" responses with structured data

2. The **frontend** acts as a single-page application (SPA) that:

   * Displays sessions in a sidebar
   * Shows chat messages in a conversation view
   * Sends user input to backend and renders responses (including tables)
   * Allows switching between light/dark themes

---

## 🔧 Setup Instructions (Local Development)

### Backend

```bash
cd backend
npm install
npm run dev    # nodemon or node server.js
```

* Runs at: [http://localhost:5000](http://localhost:5000)

### Frontend

```bash
cd frontend
npm install
npm run dev    # starts Vite dev server
```

* Runs at: [http://localhost:5173](http://localhost:5173)

Make sure your backend is running before sending chat requests.

---

## 🌍 Deployment

### Backend (Render)

* Public URL: **[https://chat-application-svt0.onrender.com]**

### Frontend (Vercel)

* Live URL: **[https://chat-application-iou7m135u-manoj-kumar-gaddameedis-projects.vercel.app/]**
* Environment Variable:

  ```
  VITE_API_BASE=https://your-backend-url.onrender.com
  ```

---

## 🧪 API Endpoints (Backend)

| Method | Endpoint           | Description                          |
| ------ | ------------------ | ------------------------------------ |
| GET    | `/api/sessions`    | Fetch list of all sessions (sidebar) |
| GET    | `/api/new-chat`    | Create and return new session ID     |
| GET    | `/api/session/:id` | Get messages for a specific session  |
| POST   | `/api/chat/:id`    | Accept message and return response   |

---

## 🌓 Theme Handling (Tailwind v4)

Used Tailwind's new dark mode configuration:

```css
/* index.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

Theme persistence is handled with React's `useState`, `useEffect`, and `localStorage`.

---

## ✍️ Author

**Manoj Kumar**
Frontend Developer
GitHub: [https://github.com/GADDAMEEDIMANOJKUMAR]
