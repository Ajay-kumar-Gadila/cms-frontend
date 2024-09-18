// src/service/ResultsService.js
import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export const fetchResults = async () => {
  try {
    const response = await axios.get(`${API_URL}/results`);
    return response.data;
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
};
