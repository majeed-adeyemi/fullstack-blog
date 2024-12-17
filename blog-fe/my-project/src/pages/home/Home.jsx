import React, { useState } from "react";
import NewsCard from "../../component/newscard/NewsCard";

const Home = ({ news }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate the indexes for slicing the news data
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNews = news.slice(startIndex, endIndex);

  // Handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex justify-center bg-white dark:bg-gray-900">
      <div className="min-w-0 max-w-[1500px]">
        <div className="p-6 bg-white dark:bg-gray-900">
          {/* News Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedNews.length > 0 ? (
              paginatedNews.map((newsItem, index) => (
                <NewsCard
                  key={newsItem.id || `${newsItem.title}-${index}`}
                  news={newsItem}
                />
              ))
            ) : (
              <div className="col-span-full text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold text-red-500">
                  Post not found
                </h2>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                className="px-3 py-1 rounded-md bg-blue-500 text-white disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1
                      ? "bg-blue-700 text-white"
                      : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded-md bg-blue-500 text-white disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
