import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Avatar from "../components/Avatar.jsx";
import LikeButton from "../components/LikeButton.jsx";
import CommentList from "../components/CommentList.jsx";
import CommentForm from "../components/CommentForm.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ setLoading(true); api.post(id).then(setData).catch((err)=>setError(err.message)).finally(()=>setLoading(false)); }, [id]);

  if (loading) return <main className="container page-padding"><LoadingSpinner label="Opening post…"/></main>;
  if (error) return <main className="container page-padding"><ErrorMessage message={error}/></main>;
  const { post, comments } = data;
  const initialLiked = Boolean(user && post.likes?.some?.((like)=>(like?._id||like).toString()===user.id));

  return <main className="container page-padding"><div className="detail-shell card"><div className="post-head"><Link to={`/profile/${post.author.username}`} className="author-link"><Avatar user={post.author} size="lg"/><div><strong>{post.author.name}</strong><span>@{post.author.username}</span></div></Link><time>{new Date(post.createdAt).toLocaleString()}</time></div><p className="detail-content">{post.content}</p>{post.imageUrl && <img className="post-image detail-image" src={post.imageUrl} alt="Post attachment"/>}<div className="detail-actions"><LikeButton postId={post._id} initialLiked={initialLiked} initialCount={post.likes.length}/><span className="detail-comments">{comments.length} comments</span></div><div className="detail-comments-section"><div className="section-heading compact"><span className="eyebrow">Conversation</span><h2>Comments</h2></div><CommentList comments={comments} onDeleted={(commentId)=>setData((current)=>({...current,comments:current.comments.filter((c)=>c._id!==commentId)}))}/>{user && <CommentForm postId={post._id} onAdded={(comment)=>setData((current)=>({...current,comments:[...current.comments, comment]}))}/>}</div></div></main>;
}
