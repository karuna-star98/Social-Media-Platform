import { useState } from "react";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Icon from "./Icon.jsx";

export default function LikeButton({ postId, initialLiked, initialCount }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    if (!user || busy) return;
    setBusy(true);
    try {
      const result = await api.likePost(postId);
      setLiked(result.liked);
      setCount(result.likeCount);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button className={`action-btn ${liked ? "is-liked" : ""}`} onClick={toggle} disabled={!user || busy} title={!user ? "Login to like" : "Like this post"}>
      <Icon name="heart" size={17} />
      <span>{count}</span>
    </button>
  );
}
