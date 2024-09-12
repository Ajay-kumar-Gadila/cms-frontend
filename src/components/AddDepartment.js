// api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const fetchMessage = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};

export const addUser = async (name, email) => {
  try {
    const response = await axios.post(API_URL, { name, email });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};
