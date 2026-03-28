import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="container">
      <h2>Profile</h2>

      {user ? (
        <div style={{marginTop: 8}}>
          <div><b>Name:</b> {user.name}</div>
          <div><b>Email:</b> {user.email}</div>
          <div><b>Role:</b> {user.role}</div>
        </div>
      ) : (
        <p>Not logged in.</p>
      )}
    </div>
  );
}