import React, { useEffect, useState } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from '../service/DepartmentService'; // Adjust the path if necessary

const Department = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [credits, setCredits] = useState('');
  const [editId, setEditId] = useState(null); 
  const [editName, setEditName] = useState(''); 
  const [editCredits, setEditCredits] = useState(''); 

  useEffect(() => {
    fetchUsers().then(data => setUsers(data));
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newUser = await addUser(name, credits);
    if (newUser) {
      setUsers([...users, newUser]);
      setName('');
      setCredits('');
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await updateUser(editId, editName, editCredits);
    if (updatedUser) {
      setUsers(users.map(user => (user.id === editId ? updatedUser : user)));
      setEditId(null); // Clear edit state
      setEditName(''); // Clear input
      setEditCredits(''); // Clear input
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEditClick = (user) => {
    setEditId(user.id); // Set the ID of the user to be edited
    setEditName(user.name); // Pre-fill name input with the user's name
    setEditCredits(user.credits); // Pre-fill credits input with the user's credits
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Department Page</h1>
      
      {/* Add User Form */}
      <form onSubmit={handleAddSubmit} className="mb-6 space-y-4">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="credits"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            placeholder="Credits"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add User
        </button>
      </form>

      {/* Edit User Form */}
      {editId && (
        <form onSubmit={handleEditSubmit} className="mb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={editName} // Controlled input for name
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Edit Name"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="credits"
              value={editCredits} // Controlled input for credits
              onChange={(e) => setEditCredits(e.target.value)}
              placeholder="Edit Credits"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="space-x-4"> 
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Update User
            </button>
            <button
              type="button"
              onClick={() => {
                setEditId(null); // Clear edit form when canceled
                setEditName('');
                setEditCredits('');
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* User List */}
      <ul className="space-y-2">
        {users.length > 0 ? (
          users.map(user => (
            <li key={user.id} className="p-2 bg-white border border-gray-200 rounded-md shadow-sm flex justify-between items-center">
              <span>Name: {user.course_name} - Credits: {user.credits}</span>
              <div className="space-x-4">
                <button
                  onClick={() => handleEditClick(user)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="p-2 bg-white border border-gray-200 rounded-md shadow-sm">No users found</li>
        )}
      </ul>
    </div>
  );
};

export default Department;
