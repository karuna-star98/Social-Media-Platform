import mongoose from "mongoose";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export async function listComments(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.postId)) return res.status(400).json({ message: "Invalid post id" });
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "name username avatarUrl")
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    next(error);
  }
}

export async function addComment(req, res, next) {
  try {
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ message: "Comment is required" });
    if (!mongoose.isValidObjectId(req.params.postId)) return res.status(400).json({ message: "Invalid post id" });

    const postExists = await Post.exists({ _id: req.params.postId });
    if (!postExists) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
      post: req.params.postId,
      author: req.userId,
      text: text.trim()
    });
    await comment.populate("author", "name username avatarUrl");
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid comment id" });
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.author.toString() !== req.userId) return res.status(403).json({ message: "Not allowed" });

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
}
