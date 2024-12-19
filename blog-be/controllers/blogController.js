const Blog = require("../models/Blog");
const path = require("path");

// Controller to create a post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ message: "Image is required." });
    }

    const user = req.user; // The authenticated user object
    const author = `${user.firstName} ${user.lastName}`;

    // console.log("Image saved to:", image);

    const newPost = new Blog({ title, content, author, image });
    await newPost.save();

    const imageUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/${path.basename(image)}`;

    res.status(201).json({
      message: "Post created successfully!",
      post: { ...newPost._doc, image: imageUrl },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Failed to create post.", error: error.message });
  }
};

// Controller to get posts
const getPosts = async (req, res) => {
  try {
    const posts = await Blog.find().populate("likes comments.user");

    const postsWithImageURL = posts.map((post) => ({
      ...post.toObject(),
      image: post.image
        ? `${req.protocol}://${req.get("host")}/uploads/${path.basename(
            post.image
          )}`
        : null,
    }));

    res.status(200).json(postsWithImageURL);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch posts.", error: error.message });
  }
};

// Controller to like a post
const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Blog.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this post." });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: "Post liked successfully!", post });
  } catch (error) {
    console.error("Error liking post:", error);
    res
      .status(500)
      .json({ message: "Failed to like post.", error: error.message });
  }
};

// Controller to comment on a post
const commentPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    const userId = req.user.id;

    const post = await Blog.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    post.comments.push({ user: userId, text });
    await post.save();

    res.status(200).json({ message: "Comment added successfully!", post });
  } catch (error) {
    console.error("Error commenting on post:", error);
    res
      .status(500)
      .json({ message: "Failed to add comment.", error: error.message });
  }
};

module.exports = { createPost, getPosts, likePost, commentPost };
