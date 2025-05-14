import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Get API URL from environment variable, fallback to localhost if not set
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/users`, newUser);
      setNewUser({ name: '', email: '' });
      fetchUsers();
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user. Please try again.');
    }
  };

  return (
    <div className="user-list">
      <h2>User Management</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>

      {error && <div className="error">{error}</div>}
      
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;