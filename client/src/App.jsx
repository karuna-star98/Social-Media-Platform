import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Avatar from "./components/Avatar.jsx";
import Icon from "./components/Icon.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import Network from "./pages/Network.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import NotFound from "./pages/NotFound.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const publicLanding = location.pathname === "/" && !user;
  return <header className={`topbar ${publicLanding ? "transparent" : ""}`}><div className="container topbar-inner"><Link to="/" className="brand"><span className="brand-mark">C</span><span>ConnectSphere</span></Link>{user ? <nav className="nav-links"><Link className={location.pathname === "/" ? "active" : ""} to="/"><Icon name="home" size={17}/> Home</Link><Link className={location.pathname.includes(`/profile/${user.username}`) ? "active" : ""} to={`/profile/${user.username}`}><Avatar user={user} size="xs"/>{user.name.split(" ")[0]}</Link><button className="nav-logout" onClick={logout}><Icon name="logout" size={17}/> Logout</button></nav> : <nav className="nav-links"><Link to="/login">Sign in</Link><Link to="/register" className="btn btn-primary btn-sm">Get started</Link></nav>}</div></header>;
}


function RootPage() {
  const { user } = useAuth();
  return user ? <Home /> : <Landing />;
}

function AppRoutes(){return <><Navbar/><Routes><Route path="/" element={<RootPage/>}/><Route path="/feed" element={<Navigate to="/" replace/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/profile/:username" element={<Profile/>}/><Route path="/profile/:username/network/:type" element={<Network/>}/><Route path="/post/:id" element={<PostDetail/>}/><Route path="/settings/profile" element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/><Route path="*" element={<NotFound/>}/></Routes></>}

export default function App(){return <AuthProvider><BrowserRouter><AppRoutes/></BrowserRouter></AuthProvider>}
