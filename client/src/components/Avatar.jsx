export default function Avatar({ user, size = "md" }) {
  const label = user?.name || user?.username || "User";
  const fallback = label.slice(0, 1).toUpperCase();
  return (
    <div className={`avatar avatar-${size}`} aria-label={label}>
      {user?.avatarUrl ? <img src={user.avatarUrl} alt={label} /> : <span>{fallback}</span>}
    </div>
  );
}
