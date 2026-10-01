import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { publicUser } from "../utils/user.js";

function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function normalizeEmail(value = "") {
  return value.trim().toLowerCase();
}

function normalizeUsername(value = "") {
  return value.trim().toLowerCase();
}

export async function register(req, res, next) {
  try {
    const { name, username, email, password } = req.body;
    if (!name?.trim() || !username?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedUsername = normalizeUsername(username);

    const exists = await User.findOne({ $or: [{ email: normalizedEmail }, { username: normalizedUsername }] });
    if (exists) return res.status(409).json({ message: "Email or username already exists" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      username: normalizedUsername,
      email: normalizedEmail,
      passwordHash
    });

    res.status(201).json({ token: createToken(user._id.toString()), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email: normalizeEmail(email) });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ token: createToken(user._id.toString()), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(publicUser(user));
  } catch (error) {
    next(error);
  }
}
