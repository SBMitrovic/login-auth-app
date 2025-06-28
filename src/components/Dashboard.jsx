import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.email}!</p>
      <p>Role: {user?.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
