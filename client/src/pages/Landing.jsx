import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";

const highlights = [
  ["01", "Build your profile", "Create a focused identity with your name, handle, bio and avatar."],
  ["02", "Share ideas", "Publish posts, attach an optional image URL and keep your feed moving."],
  ["03", "Connect", "Follow people, discuss ideas in comments and engage with posts through likes."]
];

export default function Landing() {
  return (
    <main className="landing-page">
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow"><Icon name="spark" size={15}/> Full-stack social platform</span>
          <h1>Where people, ideas and progress <span>connect.</span></h1>
          <p>ConnectSphere is a clean, internship-ready social platform built with React, Node.js, Express and MongoDB — designed to demonstrate real full-stack workflows, not just a static UI.</p>
          <div className="hero-actions"><Link to="/register" className="btn btn-primary btn-lg">Create account <Icon name="arrow" size={18}/></Link><Link to="/login" className="btn btn-secondary btn-lg">Sign in</Link></div>
          <div className="hero-proof"><span><Icon name="check" size={15}/> JWT auth</span><span><Icon name="check" size={15}/> MongoDB</span><span><Icon name="check" size={15}/> REST APIs</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-card hero-card-main"><div className="mini-brand"><span className="brand-mark">C</span><strong>ConnectSphere</strong></div><div className="hero-stat-row"><div><small>Community</small><strong>24.8k</strong></div><div><small>Conversations</small><strong>8.2k</strong></div></div><div className="mock-post"><div className="mock-avatar"/><div><strong>Build in public.</strong><p>Small releases, honest feedback, better products.</p></div></div><div className="mock-bar"/><div className="mock-bar short"/></div>
          <div className="floating-badge badge-one"><Icon name="heart" size={16}/> 2.4k likes</div>
          <div className="floating-badge badge-two"><Icon name="users" size={16}/> 284 new connections</div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading"><span className="eyebrow">Core workflow</span><h2>Simple enough to learn. Structured enough to impress.</h2></div>
        <div className="feature-grid">{highlights.map(([number, title, text]) => <article key={number} className="feature-card"><div className="feature-number">{number}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
    </main>
  );
}
