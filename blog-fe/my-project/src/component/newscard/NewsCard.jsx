import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <div className="grid border dark:border-gray-600 rounded-md p-4 shadow-lg dark:shadow-gray-600">
      {/* Display the image */}
      {news.imageUrl && (
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-48 object-cover rounded-md mb-4 text-gray-800 dark:text-white"
        />
      )}
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
        {news.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">{news.content}</p>

      <div className="self-end">
        <Link
          to={`/news/${news.id}`}
          className="text-blue-500 underline mt-4 block"
        >
          Read More
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {news.date}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
