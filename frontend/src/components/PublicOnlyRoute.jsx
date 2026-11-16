import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function PublicOnlyRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="screen-center muted">Loading…</div>;
  return user ? <Navigate to="/" replace /> : <Outlet />;
}
