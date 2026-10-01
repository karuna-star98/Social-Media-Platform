import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Avatar from "./Avatar.jsx";
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

export default function CommentList({ comments, onDeleted }) {
  const { user } = useAuth();
  if (!comments.length) return <div className="empty-comments">No comments yet. Start the conversation.</div>;

  async function remove(id) {
    if (!window.confirm("Delete this comment?")) return;
    await api.deleteComment(id);
    onDeleted?.(id);
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div className="comment-item" key={comment._id}>
          <Avatar user={comment.author} size="sm" />
          <div className="comment-body">
            <div className="comment-topline"><strong>{comment.author.name}</strong><span>@{comment.author.username}</span><time>{timeLabel(comment.createdAt)}</time></div>
            <p>{comment.text}</p>
          </div>
          {user?.id === (comment.author._id || comment.author.id)?.toString() && <button className="icon-btn danger" onClick={() => remove(comment._id)} title="Delete comment"><Icon name="trash" size={15} /></button>}
        </div>
      ))}
    </div>
  );
}
