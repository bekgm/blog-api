
const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, body, author } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }
    const blog = await Blog.create({ title, body, author });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};
