import axios from 'axios';

// Base URL for API requests
const BASE_URL = 'http://localhost:5000/api/subjects';

// Function to fetch all subjects
export const fetchSubjects = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
};

// Function to fetch a single subject by ID
export const fetchSubjectById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subject:', error);
    return null;
  }
};

// Function to add a new subject
export const addSubject = async (subject_name, credits, semester) => {
  try {
    const response = await axios.post(BASE_URL, { subject_name, credits, semester });
    return response.data;
  } catch (error) {
    console.error('Error adding subject:', error);
    return null;
  }
};

// Function to update an existing subject
export const updateSubject = async (id, subject_name, credits, semester) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, { subject_name, credits, semester });
    return response.data;
  } catch (error) {
    console.error('Error updating subject:', error);
    return null;
  }
};

// Function to delete a subject by ID
export const deleteSubject = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return { message: 'Subject deleted successfully' };
  } catch (error) {
    console.error('Error deleting subject:', error);
    return { message: 'Error deleting subject' };
  }
};
