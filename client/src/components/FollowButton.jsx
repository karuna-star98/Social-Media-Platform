import { useEffect, useState } from "react";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function FollowButton({ userId, initialFollowing, onChange }) {
  const { user } = useAuth();
  const [following, setFollowing] = useState(Boolean(initialFollowing));
  const [busy, setBusy] = useState(false);

  useEffect(() => setFollowing(Boolean(initialFollowing)), [initialFollowing]);

  async function toggle() {
    if (!user || busy || user.id === userId) return;
    setBusy(true);
    try {
      const result = following ? await api.unfollowUser(userId) : await api.followUser(userId);
      setFollowing(result.following);
      onChange?.(result);
    } finally {
      setBusy(false);
    }
  }

  if (!user || user.id === userId) return null;
  return <button className={`btn ${following ? "btn-secondary" : "btn-primary"}`} onClick={toggle} disabled={busy}>{busy ? "…" : following ? "Following" : "Follow"}</button>;
}
