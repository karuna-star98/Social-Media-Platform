import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import { connectDatabase } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(cors({ origin: process.env.CLIENT_URL?.split(",").map((item) => item.trim()) || true, credentials: false }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    ok: true,
    service: "ConnectSphere API",
    database: states[mongoose.connection.readyState] || "unknown",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");
  await connectDatabase();
  app.listen(PORT, "0.0.0.0", () =>
  console.log(`API running on port ${PORT}`));
}

start().catch((error) => {
  console.error("Startup failed:", error.message);
  process.exit(1);
});

export default app;
