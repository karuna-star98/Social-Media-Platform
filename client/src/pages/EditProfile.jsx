import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Avatar from "../components/Avatar.jsx";

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", bio:"", avatarUrl:"" });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(()=>{ if(user) setForm({name:user.name||"",bio:user.bio||"",avatarUrl:user.avatarUrl||""}); }, [user]);

  async function submit(event) {
    event.preventDefault(); setError(""); setSaved(""); setBusy(true);
    try { const updated = await api.updateProfile(form); setUser(updated); setSaved("Profile updated successfully."); setTimeout(()=>navigate(`/profile/${updated.username}`), 600); }
    catch(err){ setError(err.message); }
    finally { setBusy(false); }
  }

  return <main className="container page-padding"><div className="settings-shell"><div><span className="eyebrow">Settings</span><h1>Edit profile</h1><p className="muted">Keep the public profile aligned with what you're working on now.</p></div><form className="settings-form card" onSubmit={submit}>{error && <div className="form-error prominent">{error}</div>}{saved && <div className="success-message">{saved}</div>}<div className="profile-preview"><Avatar user={{...user, ...form}} size="xl"/><div><h3>{form.name || user?.name}</h3><p>@{user?.username}</p></div></div><label>Name<input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></label><label>Bio<textarea maxLength={280} value={form.bio} onChange={(e)=>setForm({...form,bio:e.target.value})}/></label><label>Avatar URL<input value={form.avatarUrl} onChange={(e)=>setForm({...form,avatarUrl:e.target.value})} placeholder="https://…"/></label><div className="settings-actions"><button type="button" className="btn btn-secondary" onClick={()=>navigate(-1)}>Cancel</button><button className="btn btn-primary" disabled={busy}>{busy?"Saving…":"Save changes"}</button></div></form></div></main>;
}
