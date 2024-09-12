import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const addUser = async (name, email) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users', { name, email });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    return null;
  }
};

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers().then(data => setUsers(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await addUser(name, email);
    if (newUser) {
      setUsers([...users, newUser]);
      setName('');
      setEmail('');
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Add User</button>
      </form>
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user.id}>
              Name: {user.name} - Email: {user.email}
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
}

export default App;
