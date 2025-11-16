
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";


const Sidebar = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/sessions`);
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleNewChat = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/new-chat`);
      const data = await res.json();
      if (data.id) {
        navigate(`/chat/${data.id}`);
        fetchSessions();
      }
    } catch (err) {
      console.error("Error creating new chat:", err);
    }
  };

  const isActiveSession = (id) => location.pathname === `/chat/${id}`;

  return (
    <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <span className="font-semibold text-sm">Sessions</span>
        <button
          onClick={handleNewChat}
          className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="p-3 text-sm text-gray-500">Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="p-3 text-sm text-gray-500">
            No sessions yet. Create a new chat.
          </p>
        ) : (
          <ul className="p-2 space-y-1">
            {sessions.map((session) => (
              <li key={session.id}>
                <button
                  onClick={() => navigate(`/chat/${session.id}`)}
                  className={`w-full text-left px-2 py-2 rounded text-sm truncate ${
                    isActiveSession(session.id)
                      ? "bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-900"
                  }`}
                >
                  {session.title || session.id}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
