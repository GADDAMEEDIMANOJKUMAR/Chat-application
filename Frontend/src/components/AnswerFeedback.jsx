// src/components/AnswerFeedback.jsx
import React, { useState } from "react";

const AnswerFeedback = () => {
  const [feedback, setFeedback] = useState(null); // "like" | "dislike" | null

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
      <span>Was this answer helpful?</span>
      <button
        type="button"
        onClick={() => setFeedback("like")}
        className={`px-2 py-1 rounded border ${
          feedback === "like"
            ? "border-green-500 text-green-600"
            : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        👍
      </button>
      <button
        type="button"
        onClick={() => setFeedback("dislike")}
        className={`px-2 py-1 rounded border ${
          feedback === "dislike"
            ? "border-red-500 text-red-600"
            : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        👎
      </button>
    </div>
  );
};

export default AnswerFeedback;
