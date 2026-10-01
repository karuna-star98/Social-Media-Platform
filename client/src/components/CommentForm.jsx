import { useState } from "react";
import { api } from "../services/api.js";

export default function CommentForm({ postId, onAdded }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!text.trim() || busy) return;
    setBusy(true);
    try {
      const comment = await api.addComment(postId, text);
      onAdded?.(comment);
      setText("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="comment-form" onSubmit={submit}>
      <input maxLength={500} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a thoughtful comment…" />
      <button className="btn btn-primary" disabled={busy || !text.trim()}>{busy ? "Posting" : "Comment"}</button>
    </form>
  );
}
