import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DarkModeProvider from "./component/darkmodecontext/DarkModeContext";
import Navbar from "./component/navbar/Navbar";
import newsData from "./news.json"
import Home from "./pages/home/Home";
import NewsDetails from "./pages/newsdetails/NewsDetails";
import Footer from "./component/footer/Footer";
import BackToTop from "./component/backtotop/Backtotop";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateRoute from "./component/privateroute/privateRoute";
import About from "./pages/about/About";
import Latestnews from "./pages/latestnews/Latestnews";
import Contact from "./pages/contact/Contact";

const App = () => {
  const [filteredNews, setFilteredNews] = useState(newsData);

  return (
    <DarkModeProvider>
      <Router>
        <Navbar news={newsData} setFilteredNews={setFilteredNews} />
        <Routes>
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home news={filteredNews} />} />
            <Route path="/news/:id" element={<NewsDetails news={newsData} />} />
            <Route path="/latestnews" element={<Latestnews />} />
          </Route>
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <BackToTop />
        <Footer />
      </Router>
    </DarkModeProvider>
  );
};

export default App;
