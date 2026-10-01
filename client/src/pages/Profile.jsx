import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api.js";
import ProfileHeader from "../components/ProfileHeader.jsx";
import PostCard from "../components/PostCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true); setError("");
    try { setProfile(await api.profile(username)); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  useEffect(()=>{ load(); }, [username]);

  if (loading) return <main className="container page-padding"><LoadingSpinner label="Loading profile…"/></main>;
  if (error) return <main className="container page-padding"><ErrorMessage message={error} onRetry={load}/></main>;

  function onFollowChange(result) {
    setProfile((current)=>({ ...current, following: result.following, followerCount: result.followerCount }));
  }

  return <main className="container page-padding profile-page"><ProfileHeader profile={profile} onFollowChange={onFollowChange}/><div className="profile-tabs"><span className="active">Posts <b>{profile.posts.length}</b></span><div><Link to={`/profile/${profile.username}/network/followers`}>Followers {profile.followerCount}</Link><Link to={`/profile/${profile.username}/network/following`}>Following {profile.followingCount}</Link></div></div>{profile.posts.length ? <div className="feed-list narrow">{profile.posts.map((post)=><PostCard key={post._id} post={post}/>)}</div> : <div className="state-card"><h3>No posts yet</h3><p>This profile has not published anything.</p></div>}</main>;
}
