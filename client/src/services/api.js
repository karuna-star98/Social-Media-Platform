const API_URL = "http://localhost:5000";
async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });

  const raw = await response.text();
  const data = raw ? JSON.parse(raw) : null;
  if (!response.ok) throw new Error(data?.message || "Request failed");
  return data;
}

export const api = {
  health: () => request("/api/health"),
  register: (body) => request("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => request("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => request("/api/auth/me"),
  posts: (limit = 30) => request(`/api/posts?limit=${limit}`),
  post: (id) => request(`/api/posts/${id}`),
  createPost: (body) => request("/api/posts", { method: "POST", body: JSON.stringify(body) }),
  deletePost: (id) => request(`/api/posts/${id}`, { method: "DELETE" }),
  likePost: (id) => request(`/api/posts/${id}/like`, { method: "POST" }),
  comments: (postId) => request(`/api/comments/post/${postId}`),
  addComment: (postId, text) => request(`/api/comments/post/${postId}`, { method: "POST", body: JSON.stringify({ text }) }),
  deleteComment: (id) => request(`/api/comments/${id}`, { method: "DELETE" }),
  profile: (username) => request(`/api/users/${encodeURIComponent(username)}`),
  updateProfile: (body) => request("/api/users/me", { method: "PUT", body: JSON.stringify(body) }),
  followUser: (id) => request(`/api/users/${id}/follow`, { method: "POST" }),
  unfollowUser: (id) => request(`/api/users/${id}/follow`, { method: "DELETE" }),
  searchUsers: (q) => request(`/api/users/search?q=${encodeURIComponent(q)}`),
  network: (username, type) => request(`/api/users/${encodeURIComponent(username)}/network/${type}`),
  myStats: () => request("/api/users/me/stats")
};
