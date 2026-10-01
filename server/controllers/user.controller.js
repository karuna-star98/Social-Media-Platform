import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

function userCard(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    username: user.username,
    avatarUrl: user.avatarUrl || ""
  };
}

export async function getProfile(req, res, next) {
  try {
    const username = req.params.username.toLowerCase();
    const user = await User.findOne({ username }).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    const [posts, sessionUser] = await Promise.all([
      Post.find({ author: user._id }).populate("author", "name username avatarUrl").sort({ createdAt: -1 }).limit(30),
      req.userId ? User.findById(req.userId).select("following") : null
    ]);

    const following = Boolean(sessionUser?.following?.some((id) => id.equals(user._id)));

    res.json({
      id: user._id,
      name: user.name,
      username: user.username,
      bio: user.bio || "",
      avatarUrl: user.avatarUrl || "",
      createdAt: user.createdAt,
      followers: user.followers.map(userCard),
      followingList: user.following.map(userCard),
      followerCount: user.followers.length,
      followingCount: user.following.length,
      following,
      isOwnProfile: Boolean(req.userId && user._id.toString() === req.userId),
      posts
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const { name, bio, avatarUrl } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: "Name is required" });
    if ((bio || "").length > 280) return res.status(400).json({ message: "Bio must be 280 characters or less" });

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name: name.trim(),
        bio: bio?.trim?.() || "",
        avatarUrl: avatarUrl?.trim?.() || ""
      },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function toggleFollow(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid user id" });
    if (req.params.id === req.userId) return res.status(400).json({ message: "You cannot follow yourself" });

    const [target, current] = await Promise.all([
      User.findById(req.params.id),
      User.findById(req.userId)
    ]);
    if (!target || !current) return res.status(404).json({ message: "User not found" });

    const following = current.following.some((id) => id.equals(target._id));

    if (following) {
      current.following.pull(target._id);
      target.followers.pull(current._id);
    } else {
      current.following.addToSet(target._id);
      target.followers.addToSet(current._id);
    }

    await Promise.all([current.save(), target.save()]);

    res.json({
      following: !following,
      followerCount: target.followers.length
    });
  } catch (error) {
    next(error);
  }
}

export async function listUsers(req, res, next) {
  try {
    const q = (req.query.q || "").trim().toLowerCase();
    if (!q) return res.json([]);
    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const users = await User.find({ $or: [{ username: regex }, { name: regex }] })
      .select("name username avatarUrl followers following")
      .limit(15);
    res.json(users.map((u) => ({ ...userCard(u), followerCount: u.followers.length, followingCount: u.following.length })));
  } catch (error) {
    next(error);
  }
}

export async function getNetwork(req, res, next) {
  try {
    const user = await User.findOne({ username: req.params.username }).select("username followers following");
    if (!user) return res.status(404).json({ message: "User not found" });

    const type = req.params.type === "following" ? "following" : "followers";
    const ids = user[type];
    const people = await User.find({ _id: { $in: ids } }).select("name username avatarUrl followers following");
    const current = req.userId ? await User.findById(req.userId).select("following") : null;
    const byId = new Map(people.map((person) => [person._id.toString(), person]));
    const ordered = ids.map((id) => byId.get(id.toString())).filter(Boolean);
    res.json({
      type,
      username: user.username,
      users: ordered.map((person) => ({
        ...userCard(person),
        followerCount: person.followers.length,
        followingCount: person.following.length,
        following: Boolean(current?.following?.some((id) => id.equals(person._id)))
      }))
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyStats(req, res, next) {
  try {
    const [user, postCount, commentCount] = await Promise.all([
      User.findById(req.userId).select("followers following"),
      Post.countDocuments({ author: req.userId }),
      Comment.countDocuments({ author: req.userId })
    ]);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ posts: postCount, followers: user.followers.length, following: user.following.length, comments: commentCount });
  } catch (error) {
    next(error);
  }
}
