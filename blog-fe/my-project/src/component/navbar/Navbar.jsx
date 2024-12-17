import React, { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../darkmodecontext/DarkModeContext";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ news, setFilteredNews }) => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setIsSticky(false);
    } else if (currentScrollY < lastScrollY) {
      setIsSticky(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMenuOpen]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredNews(news);
      return;
    }

    const filtered = news.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    setFilteredNews(filtered.length ? filtered : [{ title: "Post not found" }]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className={`${
        isSticky
          ? "sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-600"
          : "bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-600"
      } transition-transform duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              <a href="/">My Blog</a>
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <a href="/" className="text-[18px] text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">
              Home
            </a>
            <a href="/about" className="text-[18px] text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">
              About us
            </a>
            <a href="/latestnews" className="text-[18px] text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">
              Latest News
            </a>
            <a href="/contact" className="text-[18px] text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">
              Contact
            </a>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
                Logout
              </button>
            ) : (
              <a href="/login" className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Login
              </a>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={toggleDarkMode} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              {darkMode ? <FaSun className="h-6 w-6 text-yellow-500" /> : <FaMoon className="h-6 w-6 text-gray-800" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-700 dark:text-gray-300 focus:outline-none">
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-0" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute top-16 py-8 left-0 w-full bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 z-10">
            <div className="space-y-4 p-4 relative">
              <button onClick={() => setIsMenuOpen(false)} className="absolute -top-3 right-4 text-gray-700 dark:text-gray-300">
                <FaTimes className="h-6 w-6" />
              </button>
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <a href="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">Home</a>
              <a href="/about" className="block text-[18px] text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">About us</a>
              <a href="/latestnews" className="block text-[18px] text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">Latest News</a>
              <a href="/contact" className="block text-[18px] text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">Contact</a>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="block px-4 py-2 text-center text-white bg-red-500 rounded-lg hover:bg-red-600">
                  Logout
                </button>
              ) : (
                <a href="/login" className="block px-4 py-2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  Login
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
