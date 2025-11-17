
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import ChatWindow from "./components/ChatWindow.jsx";

const AppLayout = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const isLanding = !sessionId;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar: top on mobile, left on desktop */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-3 md:px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h1
            className="text-lg md:text-xl font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Lumibyte Chat
          </h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </header>

        {/* Content */}
        <main className="flex-1 p-3 md:p-4 overflow-y-auto">
          {isLanding ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-3">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Welcome to Lumibyte Chat
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-md mb-4">
                Start a new conversation from the sessions panel or select an
                existing session to view its history and send messages.
              </p>
            </div>
          ) : (
            <ChatWindow />
          )}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage once
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
        setTheme(saved);
    }
  }, []);

  // Apply/remove .dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <Routes>
      <Route
        path="/"
        element={<AppLayout theme={theme} toggleTheme={toggleTheme} />}
      />
      <Route
        path="/chat/:sessionId"
        element={<AppLayout theme={theme} toggleTheme={toggleTheme} />}
      />
    </Routes>
  );
};

export default App;
