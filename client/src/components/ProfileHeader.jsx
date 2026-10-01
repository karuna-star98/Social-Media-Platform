import { Link } from "react-router-dom";
import Avatar from "./Avatar.jsx";
import FollowButton from "./FollowButton.jsx";
import Icon from "./Icon.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProfileHeader({ profile, onFollowChange }) {
  const { user } = useAuth();
  const own = user?.id === profile.id;
  return (
    <section className="profile-header card">
      <div className="cover-orb" />
      <div className="profile-main">
        <Avatar user={profile} size="xl" />
        <div className="profile-info">
          <div className="profile-title-row"><h1>{profile.name}</h1>{own ? <Link to="/settings/profile" className="btn btn-secondary"><Icon name="edit" size={16}/> Edit profile</Link> : <FollowButton userId={profile.id} initialFollowing={profile.following} onChange={onFollowChange} />}</div>
          <p className="muted">@{profile.username}</p>
          <p className="bio">{profile.bio || "No bio yet."}</p>
          <div className="profile-stats">
            <Link to={`/profile/${profile.username}/network/followers`}><strong>{profile.followerCount}</strong><span>followers</span></Link>
            <Link to={`/profile/${profile.username}/network/following`}><strong>{profile.followingCount}</strong><span>following</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
