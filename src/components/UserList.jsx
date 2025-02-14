import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching users');
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting user');
    }
  };

  return (
    <div className="user-list">
      <h2>Users</h2>
      {error && <div className="error">{error}</div>}

      <div className="user-grid">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.password}</p>
            <p>Role: {user.role}</p>
            <button onClick={() => handleDelete(user._id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;