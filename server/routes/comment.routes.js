import express from "express";
import { listComments, addComment, deleteComment } from "../controllers/comment.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.get("/post/:postId", listComments);
router.post("/post/:postId", requireAuth, addComment);
router.delete("/:id", requireAuth, deleteComment);

export default router;
