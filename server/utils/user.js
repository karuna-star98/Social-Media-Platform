export function publicUser(user) {
  return {
    id: user._id?.toString?.() ?? user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio || "",
    avatarUrl: user.avatarUrl || "",
    followersCount: user.followers?.length ?? 0,
    followingCount: user.following?.length ?? 0,
    createdAt: user.createdAt
  };
}
