const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // details: { type: String, required: true },
  author: { type: String },
  image: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
    },
  ],
  datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
