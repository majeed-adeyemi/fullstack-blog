import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <div className="grid border dark:border-gray-600 rounded-md p-4 shadow-lg dark:shadow-gray-600">
      {/* Display the image */}
      {news.image ? (
        <img
          src={news.image} // Assuming the `image` field contains the URL or image path
          alt={news.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 rounded-md mb-4 flex items-center justify-center text-center text-gray-500">
          No Image Available
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {news.title}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        {news.content && news.content.length > 100
          ? `${news.content.slice(0, 100)}...`
          : news.content}
      </p>
      <Link
        to={`/news/${news._id}`}
        className="text-blue-500 dark:text-blue-300 text-sm font-semibold"
      >
        Read More
      </Link>
    </div>
  );
};

export default NewsCard;
