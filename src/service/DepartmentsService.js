import axios from "axios";

const BASE_URL = "http://localhost:5000/api/department";  // Assuming this is your department API endpoint

// Fetch all departments
export const fetchDepartments = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};

// Add a new department
export const addDepartment = async (department_name, department_head) => {
  try {
    const response = await axios.post(BASE_URL, { department_name, department_head });
    return response.data;
  } catch (error) {
    console.error("Error adding department:", error);
    return null;
  }
};

// Update a department
export const updateDepartment = async (id, department_name, department_head) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, { department_name, department_head });
    return response.data;
  } catch (error) {
    console.error("Error updating department:", error);
    return null;
  }
};

// Delete a department
export const deleteDepartment = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting department:", error);
  }
};
