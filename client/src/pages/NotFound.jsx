import { Link } from "react-router-dom";
export default function NotFound(){return <main className="container page-padding"><div className="state-card"><span className="eyebrow">404</span><h1>Page not found</h1><p>The route you opened does not exist.</p><Link to="/" className="btn btn-primary">Back home</Link></div></main>;}
