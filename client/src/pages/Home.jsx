import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import PostForm from "../components/PostForm.jsx";
import PostCard from "../components/PostCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Avatar from "../components/Avatar.jsx";
import Icon from "../components/Icon.jsx";

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);

  async function load() {
    setLoading(true); setError("");
    try { setPosts(await api.posts()); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (!user) { setStats(null); return; }
    api.myStats().then(setStats).catch(() => {});
  }, [user, posts.length]);
  useEffect(() => {
    const id = setTimeout(() => {
      if (query.trim().length < 2) { setResults([]); return; }
      api.searchUsers(query).then(setResults).catch(() => setResults([]));
    }, 250);
    return () => clearTimeout(id);
  }, [query]);

  const empty = useMemo(() => !loading && posts.length === 0 && !error, [loading, posts.length, error]);

  return <main className="app-shell container">
    <div className="home-layout">
      <aside className="sidebar-left">
        <div className="side-profile card">{user ? <><Avatar user={user} size="lg"/><strong>{user.name}</strong><span>@{user.username}</span><div className="side-profile-stats"><span><b>{stats?.posts ?? "—"}</b>posts</span><span><b>{stats?.followers ?? "—"}</b>followers</span></div><Link className="btn btn-secondary full" to={`/profile/${user.username}`}>View profile</Link></> : <><span className="eyebrow">Guest mode</span><h3>Join the conversation.</h3><p>Sign in to publish, like, comment and follow people.</p><div className="side-actions"><Link className="btn btn-primary full" to="/login">Sign in</Link><Link className="btn btn-secondary full" to="/register">Register</Link></div></>}</div>
        <div className="side-menu card"><Link className="active" to="/"><Icon name="home"/> Home</Link>{user && <><Link to={`/profile/${user.username}`}><Icon name="user"/> My profile</Link><Link to={`/profile/${user.username}/network/followers`}><Icon name="users"/> Network</Link><Link to="/settings/profile"><Icon name="settings"/> Settings</Link></>}</div>
      </aside>

      <section className="feed-column">
        <div className="feed-toolbar"><div><span className="eyebrow">Your feed</span><h1>Latest conversations</h1></div><button className="icon-btn" onClick={load} title="Refresh"><Icon name="spark"/></button></div>
        {user && <PostForm onCreated={(post)=>setPosts((current)=>[post,...current])} />}
        {error && <ErrorMessage message={error} onRetry={load} />}
        {loading ? <LoadingSpinner label="Loading your feed…" /> : empty ? <div className="state-card"><div className="empty-icon"><Icon name="spark" size={26}/></div><h3>No posts yet</h3><p>Be the first person to share something with your community.</p></div> : <div className="feed-list">{posts.map((post)=><PostCard key={post._id} post={post} onDeleted={(id)=>setPosts((current)=>current.filter((item)=>item._id!==id))}/>)}</div>}
      </section>

      <aside className="sidebar-right">
        <div className="search-box card"><div className="search-input"><Icon name="search" size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Find people" /></div>{results.length > 0 && <div className="search-results">{results.map((person)=><Link key={person.id} to={`/profile/${person.username}`} onClick={()=>setQuery("")}><Avatar user={person} size="sm"/><div><strong>{person.name}</strong><span>@{person.username}</span></div></Link>)}</div>}</div>
        <div className="insight-card card"><span className="eyebrow">Built for proof</span><h3>Real full-stack workflow.</h3><p>Authentication, persistent content, relationships and UI state all work together through the API.</p><div className="pill-row"><span>React</span><span>Express</span><span>MongoDB</span></div></div>
      </aside>
    </div>
  </main>;
}
