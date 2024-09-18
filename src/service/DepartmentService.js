import axios from 'axios';

// Function to fetch users from the API
export const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Function to add a new user
export const addUser = async (course_name, credits) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users', { course_name, credits });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    return null;
  }
};

// Function to update an existing user
export const updateUser = async (id, course_name, credits) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/users/${id}`, { course_name, credits });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

// Function to delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
