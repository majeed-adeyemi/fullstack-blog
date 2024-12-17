import React from "react";
import { Link } from "react-router-dom";
import { GiSelfLove } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-gray-300 dark:bg-gray-950 text-gray-900 dark:text-white py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo and About */}
          <div>
            <h2 className="text-xl font-bold mb-2">
              <a href="/">My Blog</a>
            </h2>
            <p className="text-gray-800 dark:text-gray-400 text-[17px]">
              Bringing you the latest updates with detailed information.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-800 dark:text-gray-400 hover:text-blue-400 lg:text-[17px]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-800 dark:text-gray-400 hover:text-blue-400 lg:text-[17px]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-gray-800 dark:text-gray-400 hover:text-blue-400 lg:text-[17px]"
                >
                  Latest News
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-800 dark:text-gray-400 hover:text-blue-400 lg:text-[17px]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-bold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.675 0h-21.35C.599 0 0 .6 0 1.343v21.314C0 23.399.599 24 1.325 24h11.495V14.708h-3.104v-3.626h3.104V8.414c0-3.066 1.864-4.737 4.588-4.737 1.305 0 2.428.097 2.752.14v3.192h-1.888c-1.479 0-1.766.703-1.766 1.733v2.277h3.54l-.462 3.626h-3.078V24h6.045c.726 0 1.325-.601 1.325-1.343V1.343C24 .6 23.401 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 4.557a9.956 9.956 0 0 1-2.828.775 4.993 4.993 0 0 0 2.165-2.752 9.963 9.963 0 0 1-3.127 1.184A4.962 4.962 0 0 0 16.616 3c-2.733 0-4.948 2.223-4.948 4.963 0 .388.042.764.125 1.127A14.044 14.044 0 0 1 1.67 3.149a4.927 4.927 0 0 0-.668 2.494 4.96 4.96 0 0 0 2.2 4.131 4.935 4.935 0 0 1-2.24-.62v.061c0 2.394 1.696 4.386 3.947 4.836a4.98 4.98 0 0 1-2.234.084 4.965 4.965 0 0 0 4.632 3.436A9.942 9.942 0 0 1 .6 20.2a13.972 13.972 0 0 0 7.548 2.212c9.051 0 13.998-7.496 13.998-13.986 0-.212-.005-.423-.014-.634A10.012 10.012 0 0 0 24 4.557z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C8.74 0 8.332.014 7.052.072 5.77.131 4.832.295 4.09.576a4.921 4.921 0 0 0-1.711 1.091A4.921 4.921 0 0 0 .576 4.09c-.281.742-.445 1.68-.504 2.962C0 8.33 0 8.74 0 12s.014 3.669.072 4.948c.059 1.282.223 2.22.504 2.962a4.921 4.921 0 0 0 1.091 1.711 4.921 4.921 0 0 0 1.711 1.091c.742.281 1.68.445 2.962.504C8.33 24 8.74 24 12 24s3.669-.014 4.948-.072c1.282-.059 2.22-.223 2.962-.504a4.921 4.921 0 0 0 1.711-1.091 4.921 4.921 0 0 0 1.091-1.711c.281-.742.445-1.68.504-2.962C24 15.669 24 15.259 24 12s-.014-3.669-.072-4.948c-.059-1.282-.223-2.22-.504-2.962a4.921 4.921 0 0 0-1.091-1.711A4.921 4.921 0 0 0 19.91.576c-.742-.281-1.68-.445-2.962-.504C15.669 0 15.259 0 12 0zm0 5.838c3.396 0 6.162 2.766 6.162 6.162S15.396 18.162 12 18.162 5.838 15.396 5.838 12 8.604 5.838 12 5.838zM18.405 4.478a1.375 1.375 0 1 1 0 2.75 1.375 1.375 0 0 1 0-2.75zM12 7.88a4.12 4.12 0 1 0 0 8.24 4.12 4.12 0 0 0 0-8.24z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-600" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm lg:text-md text-gray-500">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
          <p className="items-center text-sm lg:text-md text-gray-500">
            Built with{" "}
            <span className="text-red-500 text-[20px]">&hearts;</span> by Majeed
            A. Adeyemi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
