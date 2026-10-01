import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Avatar from "../components/Avatar.jsx";
import FollowButton from "../components/FollowButton.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function Network() {
  const { username, type } = useParams();
  const { user } = useAuth();
  const normalizedType = type === "following" ? "following" : "followers";
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(()=>{ setData(null); setError(""); api.network(username, normalizedType).then(setData).catch((err)=>setError(err.message)); }, [username, normalizedType]);
  if (error) return <main className="container page-padding"><ErrorMessage message={error}/></main>;
  if (!data) return <main className="container page-padding"><LoadingSpinner label="Loading network…"/></main>;

  return <main className="container page-padding"><div className="network-top"><div><span className="eyebrow">Network</span><h1>@{data.username}'s {normalizedType}</h1></div><Link className="btn btn-secondary" to={`/profile/${data.username}`}>Back to profile</Link></div><div className="people-grid">{data.users.map((person)=><article className="person-card card" key={person.id}><Avatar user={person} size="lg"/><div className="person-main"><Link to={`/profile/${person.username}`}><h3>{person.name}</h3><p>@{person.username}</p></Link><div className="person-stats"><span>{person.followerCount} followers</span><span>{person.followingCount} following</span></div></div>{user?.id!==person.id && <FollowButton userId={person.id} initialFollowing={person.following}/>}</article>)}{data.users.length===0 && <div className="state-card"><h3>No connections here yet</h3><p>This list will populate as social relationships grow.</p></div>}</div></main>;
}
