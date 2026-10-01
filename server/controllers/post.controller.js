import mongoose from "mongoose";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export async function listPosts(req, res, next) {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 30, 1), 50);
    const posts = await Post.find()
      .populate("author", "name username avatarUrl")
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(posts);
  } catch (error) {
    next(error);
  }
}

export async function getPost(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid post id" });
    const post = await Post.findById(req.params.id).populate("author", "name username avatarUrl");
    if (!post) return res.status(404).json({ message: "Post not found" });
    const comments = await Comment.find({ post: post._id })
      .populate("author", "name username avatarUrl")
      .sort({ createdAt: 1 });
    res.json({ post, comments });
  } catch (error) {
    next(error);
  }
}

export async function createPost(req, res, next) {
  try {
    const { content, imageUrl = "" } = req.body;
    if (!content?.trim()) return res.status(400).json({ message: "Post content is required" });

    const post = await Post.create({
      author: req.userId,
      content: content.trim(),
      imageUrl: imageUrl?.trim?.() || ""
    });
    await post.populate("author", "name username avatarUrl");
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
}

export async function toggleLike(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid post id" });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const index = post.likes.findIndex((id) => id.toString() === req.userId);
    if (index >= 0) post.likes.splice(index, 1);
    else post.likes.push(req.userId);

    await post.save();
    res.json({ liked: index < 0, likeCount: post.likes.length });
  } catch (error) {
    next(error);
  }
}

export async function deletePost(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid post id" });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.userId) return res.status(403).json({ message: "Not allowed" });

    await Promise.all([post.deleteOne(), Comment.deleteMany({ post: post._id })]);
    res.json({ message: "Post deleted" });
  } catch (error) {
    next(error);
  }
}
