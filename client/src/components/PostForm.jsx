import { useState } from "react";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Avatar from "./Avatar.jsx";
import Icon from "./Icon.jsx";

export default function PostForm({ onCreated }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!content.trim()) return;
    setBusy(true);
    try {
      const post = await api.createPost({ content, imageUrl });
      onCreated?.(post);
      setContent("");
      setImageUrl("");
      setShowImage(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="composer" onSubmit={submit}>
      <Avatar user={user} size="md" />
      <div className="composer-main">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength={2000} placeholder="What are you building, learning or thinking about?" />
        {showImage && <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Optional image URL" />}
        {error && <p className="form-error">{error}</p>}
        <div className="composer-actions">
          <button type="button" className="tool-btn" onClick={() => setShowImage((v) => !v)}><Icon name="image" size={17}/> Image URL</button>
          <span className="char-count">{content.length}/2000</span>
          <button className="btn btn-primary" disabled={busy || !content.trim()}>{busy ? "Publishing…" : "Publish"}</button>
        </div>
      </div>
    </form>
  );
}
