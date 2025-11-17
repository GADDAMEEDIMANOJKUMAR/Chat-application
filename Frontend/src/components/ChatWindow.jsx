
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput.jsx";
import TableResponse from "./TableResponse.jsx";
import AnswerFeedback from "./AnswerFeedback.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const ChatWindow = () => {
  const { sessionId } = useParams();
  const [sessionTitle, setSessionTitle] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastTable, setLastTable] = useState(null);
  const [lastDescription, setLastDescription] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [sending, setSending] = useState(false);

  // Fetch session history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoadingHistory(true);
        setLastTable(null);
        setLastDescription("");
        const res = await fetch(`${API_BASE}/api/session/${sessionId}`);
        if (!res.ok) throw new Error("Session not found");

        const data = await res.json();
        setSessionTitle(data.title || data.id);
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Error fetching session history:", err);
        setSessionTitle("Unknown Session");
        setMessages([
          {
            role: "assistant",
            content: "Unable to load this session. Please try again.",
          },
        ]);
      } finally {
        setLoadingHistory(false);
      }
    };

    if (sessionId) {
      fetchHistory();
    }
  }, [sessionId]);

  // Send message
  const handleSendMessage = async (question) => {
    try {
      setSending(true);
      // Add user message immediately
      setMessages((prev) => [...prev, { role: "user", content: question }]);

      const res = await fetch(`${API_BASE}/api/chat/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const descriptionText =
        data.description || data.answerText || "Here is your structured answer.";

      // Add assistant message
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: descriptionText },
      ]);

      setLastTable(data.table || null);
      setLastDescription(descriptionText);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong while sending your message.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl w-full mx-auto">
      {/* Session header */}
      <div className="mb-3">
        <h2 className="text-base md:text-lg font-semibold">
          Session: <span className="font-normal">{sessionTitle}</span>
        </h2>
        <p className="text-[10px] md:text-xs text-gray-500">
          Session ID: <code>{sessionId}</code>
        </p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto border border-gray-200 dark:border-gray-800 rounded-md p-3 bg-white dark:bg-gray-950">
        {loadingHistory ? (
          <p className="text-sm text-gray-500">Loading conversation...</p>
        ) : messages.length === 0 ? (
          <p className="text-sm text-gray-500">
            No messages yet. Ask something to start the conversation.
          </p>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-xs md:text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <p className="mb-1 text-[10px] md:text-xs opacity-70">
                    {msg.role === "user" ? "You" : "Assistant"}
                  </p>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Structured response */}
        {lastTable && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-1">
              Structured Response:
            </h3>
            {lastDescription && (
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 whitespace-pre-line">
                {lastDescription}
              </p>
            )}
            <TableResponse table={lastTable} />
            <AnswerFeedback />
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSendMessage} disabled={sending || loadingHistory} />
    </div>
  );
};

export default ChatWindow;
