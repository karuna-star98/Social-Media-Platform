import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Icon from "../components/Icon.jsx";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/" replace />;

  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try { login(await api.login(form)); navigate(location.state?.from || "/", { replace: true }); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <main className="auth-page"><div className="auth-panel card"><div className="auth-brand"><span className="brand-mark">C</span><strong>ConnectSphere</strong></div><span className="eyebrow">Welcome back</span><h1>Sign in to your community.</h1><p className="muted">Continue building your profile and connecting with people.</p><form onSubmit={submit} className="stack-form">{error && <div className="form-error prominent">{error}</div>}<label>Email<input type="email" required value={form.email} onChange={(e) => setForm({...form, email:e.target.value})} placeholder="you@example.com" /></label><label>Password<input type="password" required value={form.password} onChange={(e) => setForm({...form, password:e.target.value})} placeholder="••••••••" /></label><button className="btn btn-primary btn-lg" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button></form><p className="switch-link">New here? <Link to="/register">Create an account</Link></p></div></main>;
}
