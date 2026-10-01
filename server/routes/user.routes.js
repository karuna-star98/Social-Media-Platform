import express from "express";
import { getProfile, updateProfile, toggleFollow, listUsers, getNetwork, getMyStats } from "../controllers/user.controller.js";
import { optionalAuth, requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.get("/search", listUsers);
router.get("/me/stats", requireAuth, getMyStats);
router.put("/me", requireAuth, updateProfile);
router.get("/:username/network/:type", optionalAuth, getNetwork);
router.get("/:username", optionalAuth, getProfile);
router.post("/:id/follow", requireAuth, toggleFollow);
router.delete("/:id/follow", requireAuth, toggleFollow);

export default router;
