import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Avatar from "./Avatar.jsx";
import LikeButton from "./LikeButton.jsx";
import CommentList from "./CommentList.jsx";
import CommentForm from "./CommentForm.jsx";
import Icon from "./Icon.jsx";

function timeLabel(date) {
  const seconds = Math.max(1, Math.round((Date.now() - new Date(date).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return new Date(date).toLocaleDateString();
}

export default function PostCard({ post, onDeleted, compact = false }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [comments, setComments] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const initialLiked = useMemo(() => Boolean(user && post.likes?.some?.((id) => (id?._id || id).toString() === user.id)), [user, post.likes]);

  async function toggleComments() {
    const next = !showComments;
    setShowComments(next);
    if (next && comments === null) {
      setCommentLoading(true);
      try { setComments(await api.comments(post._id)); } finally { setCommentLoading(false); }
    }
  }

  async function deletePost() {
    if (!window.confirm("Delete this post?")) return;
    await api.deletePost(post._id);
    onDeleted?.(post._id);
  }

  return (
    <article className="post-card">
      <div className="post-head">
        <Link to={`/profile/${post.author.username}`} className="author-link">
          <Avatar user={post.author} size="md" />
          <div><strong>{post.author.name}</strong><span>@{post.author.username}</span></div>
        </Link>
        <div className="post-meta"><time>{timeLabel(post.createdAt)}</time>{user?.id === post.author._id && <button className="icon-btn danger" onClick={deletePost} title="Delete post"><Icon name="trash" size={16}/></button>}</div>
      </div>

      <Link to={`/post/${post._id}`} className="post-content-link">
        <p className="post-content">{post.content}</p>
        {post.imageUrl && <img className="post-image" src={post.imageUrl} alt="Post attachment" loading="lazy" />}
      </Link>

      <div className="post-actions">
        <LikeButton postId={post._id} initialLiked={initialLiked} initialCount={post.likes?.length || 0} />
        <button className={`action-btn ${showComments ? "active" : ""}`} onClick={toggleComments}><Icon name="comment" size={17}/><span>{comments?.length ?? "Comments"}</span></button>
        {!compact && <button className="action-btn" onClick={() => navigate(`/post/${post._id}`)}><Icon name="arrow" size={17}/><span>Open</span></button>}
      </div>

      {showComments && (
        <div className="comments-panel">
          {commentLoading ? <div className="inline-loading">Loading comments…</div> : <CommentList comments={comments || []} onDeleted={(id) => setComments((current) => current.filter((c) => c._id !== id))} />}
          {user && <CommentForm postId={post._id} onAdded={(comment) => setComments((current) => [...(current || []), comment])} />}
        </div>
      )}
    </article>
  );
}
