import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Sign-Up Service
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Sign-up failed:", error);
    throw error;
  }
};

// Sign-In Service
export const signin = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/signin",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
