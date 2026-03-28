import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">Track-Drug</div>
      {user && (
        <ul className="navbar-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/medicines">Medicines</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/suppliers">Suppliers</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/reports">Reports</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      )}
    </nav>
  );
}
