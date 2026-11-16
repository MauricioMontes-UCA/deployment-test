import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const memberSince = new Date(user.createdAt).toLocaleDateString();

  return (
    <main className="screen-center">
      <section className="panel">
        <header className="panel-header">
          <span className="brand">MY LOGIN</span>
          <h1>Welcome, {user.name}</h1>
          <p className="muted">You are signed in.</p>
        </header>
        <dl className="details">
          <dt>Email</dt>
          <dd>{user.email}</dd>
          <dt>Member since</dt>
          <dd>{memberSince}</dd>
        </dl>
        <button type="button" className="button button-outline" onClick={logout}>
          Sign out
        </button>
      </section>
    </main>
  );
}
