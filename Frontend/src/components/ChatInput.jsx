// src/components/ChatInput.jsx
import React, { useState } from "react";

const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-800 pt-3 mt-3"
    >
      <textarea
        className="flex-1 resize-none rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        rows={2}
        placeholder="Ask your question..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium ${
          disabled
            ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
