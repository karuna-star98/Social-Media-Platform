import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", username:"", email:"", password:"" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/" replace />;

  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try { login(await api.register(form)); navigate("/", { replace:true }); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <main className="auth-page"><div className="auth-panel card wide"><div className="auth-brand"><span className="brand-mark">C</span><strong>ConnectSphere</strong></div><span className="eyebrow">Create your account</span><h1>Start your social space.</h1><p className="muted">A profile, a feed — all in one project.</p><form onSubmit={submit} className="stack-form">{error && <div className="form-error prominent">{error}</div>}<label>Full name<input required minLength={2} value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Your name" /></label><label>Username<input required minLength={3} pattern="[A-Za-z0-9_]+" value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} placeholder="yourhandle" /></label><label>Email<input type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="you@example.com" /></label><label>Password<input type="password" required minLength={6} value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} placeholder="At least 6 characters" /></label><button className="btn btn-primary btn-lg" disabled={busy}>{busy ? "Creating…" : "Create account"}</button></form><p className="switch-link">Already have an account? <Link to="/login">Sign in</Link></p></div></main>;
}
