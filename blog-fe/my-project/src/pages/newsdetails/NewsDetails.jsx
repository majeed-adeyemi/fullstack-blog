import React, { useState } from "react";
import { useParams } from "react-router-dom";
import newsData from "../../news.json";

const NewsDetails = () => {
  const { id } = useParams();
  const news = newsData.find((n) => n.id === parseInt(id));
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [showError, setShowError] = useState(false); // New state for error message visibility

  const handleCommentSubmit = () => {
    if (name.trim() && comment.trim()) {
      setComments([
        ...comments,
        { name: name.trim(), comment: comment.trim() },
      ]);
      setName("");
      setComment("");
      setShowError(false); // Reset error state after successful submission
    } else {
      setShowError(true); // Show error if inputs are invalid
    }
  };

  if (!news) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-red-500">News not found</h1>
        <p className="text-gray-700 mt-4">
          The news item you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 py-10">
      <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-600">
        {/* News Image */}
        {news.imageUrl && (
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-64 object-cover rounded-lg mb-6 text-gray-800 dark:text-white"
          />
        )}

        {/* News Title and Details */}
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          {news.title}
        </h1>
        <p className="text-gray-800 dark:text-gray-300 mb-2">{news.details}</p>

        <br />

        {/* Date */}
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-300 mb-6">{`Published on: ${news.date}`}</p>

        {/* Comments Section */}
        <h3 className="text-xl font-semibold mb-4 dark:text-gray-300">
          Comments
        </h3>
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <div
              key={index}
              className="my-2 p-3 border dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 dark:shadow-gray-600 shadow-md"
            >
              <strong className="text-blue-500 text-[18px]">{c.name}</strong>
              <p className="text-gray-700 dark:text-gray-200">{c.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-800 dark:text-gray-300">
            No comments yet. Be the first to comment!
          </p>
        )}

        {/* Add Comment Form */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2 dark:text-gray-300">
            Add a Comment
          </h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Your Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Comment
            </button>
          </div>
          {/* Error Message */}
          {showError && (
            <p className="text-sm text-red-500 mt-2">
              Both name and comment are required to submit.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
