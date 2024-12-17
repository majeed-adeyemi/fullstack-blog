const Blog = require("../models/Blog");

const createPost = async (req, res) => {
  try {
    const { title, content, details, author, image } = req.body;
    // const image = req.file ? req.file.path : null; // Get the uploaded image path

    const newPost = new Blog({
      title,
      content,
      details,
      author,
      image,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating post" });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Blog.find().populate("likes").populate("comments.user");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = req.user.id; // Assuming `req.user` contains the logged-in user's ID

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((like) => like.toString() !== userId);
      await post.save();
      return res.json({ message: "Post unliked", post });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.json({ message: "Post liked", post });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error liking post" });
  }
};

const commentPost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const { text } = req.body;
    const userId = req.user.id;

    post.comments.push({ user: userId, text });
    await post.save();
    res.json({ message: "Comment added", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding comment" });
  }
};

module.exports = { createPost, getPosts, likePost, commentPost };
