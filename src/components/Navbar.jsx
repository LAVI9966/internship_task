import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import './Navbar.css'; // Import the CSS file for navbar styling

function Navbar() {
  const { token, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="nav-logo">User Management</Link>
      </div>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/users" className="nav-item">Users</Link>
            <Link to={`/update-user/`} className="nav-item">Update User</Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-item">Login</Link>
            <Link to="/signup" className="nav-item">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
