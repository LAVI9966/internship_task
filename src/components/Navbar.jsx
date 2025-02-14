import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UpdateUser from './UpdateUser';
function Navbar() {
  const { token, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">User Management</Link>
      </div>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/users">Users</Link>
            <Link to={`/update-user/`}>Update User</Link> {/* Note the change here */}
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;