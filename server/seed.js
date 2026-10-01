import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDatabase } from "./config/db.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";

dotenv.config();

const passwordHash = await bcrypt.hash("Connect123!", 12);

await connectDatabase();

await Promise.all([
  User.deleteMany({ email: { $in: ["alex@connectsphere.dev", "maya@connectsphere.dev"] } })
]);

const alex = await User.create({
  name: "Alex Morgan",
  username: "alexmorgan",
  email: "alex@connectsphere.dev",
  passwordHash,
  bio: "Frontend builder • coffee • campus communities",
  avatarUrl: "https://i.pravatar.cc/160?img=12"
});

const maya = await User.create({
  name: "Maya Patel",
  username: "mayapatel",
  email: "maya@connectsphere.dev",
  passwordHash,
  bio: "Product-minded developer exploring social platforms.",
  avatarUrl: "https://i.pravatar.cc/160?img=47"
});

alex.following.addToSet(maya._id);
maya.followers.addToSet(alex._id);
await Promise.all([alex.save(), maya.save()]);

const post1 = await Post.create({
  author: alex._id,
  content: "Welcome to ConnectSphere! Building a clean social workflow is a great way to learn how frontend, APIs and databases fit together.",
  likes: [maya._id]
});
const post2 = await Post.create({
  author: maya._id,
  content: "What feature should a campus-focused social platform add next? I would vote for searchable communities and better event discovery."
});
await Comment.create({ post: post1._id, author: maya._id, text: "The architecture feels nicely modular already." });
await Comment.create({ post: post2._id, author: alex._id, text: "Event discovery would be useful!" });

console.log("Seed complete. Demo login:");
console.log("alex@connectsphere.dev / Connect123!");
console.log("maya@connectsphere.dev / Connect123!");
await mongoose.disconnect();
