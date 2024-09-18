import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/people';

export const fetchPeople = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching people:', error);
    return [];
  }
};

export const addPerson = async (person) => {
  try {
    const response = await axios.post(API_BASE_URL, person);
    return response.data;
  } catch (error) {
    console.error('Error adding person:', error);
    return null;
  }
};

export const updatePerson = async (id, person) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, person);
    return response.data;
  } catch (error) {
    console.error('Error updating person:', error);
    return null;
  }
};

export const deletePerson = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting person:', error);
  }
};
