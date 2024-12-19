import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../../component/newscard/NewsCard";

const Home = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    // details: "",
    content: "",
    image: null, // File object for image upload
  });
  const [postMessage, setPostMessage] = useState(null);
  const itemsPerPage = 12;

  // Get the Bearer token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null); // Reset error state before making the request
      try {
        const response = await axios.get("http://localhost:4000/api/blogs", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the headers
          },
        });
        setNews(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching news."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchNews(); // Only fetch if there's a token
  }, [token]);

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNews = news.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPost((prev) => ({ ...prev, image: file }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setPostMessage(null);

    const formData = new FormData();
    formData.append("title", newPost.title);
    // formData.append("details", newPost.details);
    formData.append("content", newPost.content);
    if (newPost.image) {
      formData.append("image", newPost.image);
    }

    try {
      if (!token) {
        setPostMessage("You must be logged in to create a post.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/blogs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Send the token
          },
        }
      );

      setPostMessage("Post created successfully!");
      setNews([response.data, ...news]); // Add new post to the news list
      setNewPost({ title: "", content: "", image: null }); // Clear form
    } catch (err) {
      console.error("Error creating post:", err);
      setPostMessage(
        err.response?.data?.message ||
          "An error occurred while creating the post."
      );
    }
  };

  return (
    <div className="flex justify-center bg-white dark:bg-gray-900">
      <div className="min-w-0 max-w-[1500px]">
        <div className="p-6 bg-white dark:bg-gray-900">
          {/* Post Creation Form */}
          <div className="mb-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Create a New Post
            </h2>
            <form onSubmit={handleCreatePost} className="grid gap-4">
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                placeholder="Post Title"
                required
                className="p-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <textarea
                type="text"
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                placeholder="Post Content"
                required
                className="p-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                rows="4"
              />
              {/* <textarea
                name="details"
                value={newPost.content}
                onChange={handleInputChange}
                placeholder="Post Content"
                required
                className="p-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                rows="4"
              /> */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="p-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Create Post
              </button>
            </form>
            {postMessage && (
              <p className="mt-4 text-center text-sm text-green-500 dark:text-red-500">
                {postMessage}
              </p>
            )}
          </div>

          {/* Loading and Error State */}
          {loading && (
            <div className="text-center">
              <p className="text-blue-500 text-lg">Loading...</p>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          )}

          {/* Displaying the News */}
          {!loading && !error && (
            <>
              {news.length === 0 ? (
                <div className="col-span-full text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h2 className="text-2xl font-bold text-red-500">
                    No Posts Available
                  </h2>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedNews.map((newsItem) => (
                    <NewsCard key={newsItem._id} news={newsItem} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
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
