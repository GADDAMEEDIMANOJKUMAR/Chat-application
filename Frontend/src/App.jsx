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
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h1
            className="text-xl font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Lumibyte Chat
          </h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </header>
        <main className="flex-1 p-4 overflow-y-auto">
          {isLanding ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-semibold mb-2">
                Welcome to Lumibyte Chat
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mb-4">
                Start a new conversation from the sidebar or select an existing
                session to view its history and send messages.
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
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") {
        return saved;
      }
    } catch (e) {
      // ignore (e.g., SSR or blocked storage)
    }
    return "light";
  });

  //  Toggle .dark on <html> and persist preference
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore storage errors
    }
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
