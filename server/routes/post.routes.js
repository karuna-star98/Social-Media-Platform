import express from "express";
import { listPosts, getPost, createPost, toggleLike, deletePost } from "../controllers/post.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.get("/", listPosts);
router.get("/:id", getPost);
router.post("/", requireAuth, createPost);
router.post("/:id/like", requireAuth, toggleLike);
router.delete("/:id", requireAuth, deletePost);

export default router;
