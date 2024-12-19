const express = require("express");
const {
  createPost,
  getPosts,
  likePost,
  commentPost,
} = require("../controllers/blogController");
const verifyToken = require("../middleware/auth"); // Import verifyToken
const upload = require("../middleware/upload"); // Assuming you have an upload middleware for file upload

const router = express.Router();

// Blog Routes
router.post("/", verifyToken, upload.single("image"), createPost); // Create post with image upload
router.get("/", getPosts); // Get all posts
router.post("/:id/like", verifyToken, likePost); // Like a post
router.post("/:id/comment", verifyToken, commentPost); // Add comment to a post

module.exports = router;
