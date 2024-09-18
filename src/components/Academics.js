
import React, { useEffect, useState } from "react";
import { fetchDepartments, addDepartment, updateDepartment, deleteDepartment } from "../service/DepartmentsService";

const Academics = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ department_name: "", department_head: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Fetch departments when the component is mounted
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };

    getDepartments();
  }, []);

  const handleAddDepartment = async () => {
    const addedDepartment = await addDepartment(newDepartment.department_name, newDepartment.department_head);
    if (addedDepartment) {
      setDepartments([...departments, addedDepartment]);
      setNewDepartment({ department_name: "", department_head: "" }); // Clear input fields
    }
  };

  const handleUpdateDepartment = async () => {
    if (editingId) {
      const updatedDepartment = await updateDepartment(editingId, newDepartment.department_name, newDepartment.department_head);
      if (updatedDepartment) {
        setDepartments(departments.map(dept => dept.id === editingId ? updatedDepartment : dept));
        setEditingId(null); // Clear editing ID
        setNewDepartment({ department_name: "", department_head: "" }); // Clear input fields
      }
    }
  };

  const handleDeleteDepartment = async (id) => {
    await deleteDepartment(id);
    setDepartments(departments.filter(dept => dept.id !== id));
  };

  const handleEditClick = (department) => {
    setNewDepartment({
      department_name: department.department_name,
      department_head: department.department_head
    });
    setEditingId(department.id);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Department Management</h1>

      {/* Render department list */}
      <ul className="space-y-2 mb-4">
        {departments.map(department => (
          <li key={department.id} className="flex items-center justify-between bg-white p-4 shadow rounded-lg">
            <div>
              <h2 className="text-lg font-semibold">{department.department_name}</h2>
              <p className="text-gray-600">Head: {department.department_head}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleEditClick(department)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDeleteDepartment(department.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Form to add/update department */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Update Department" : "Add Department"}</h2>
        <input
          type="text"
          placeholder="Department Name"
          value={newDepartment.department_name}
          onChange={(e) => setNewDepartment({ ...newDepartment, department_name: e.target.value })}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Department Head"
          value={newDepartment.department_head}
          onChange={(e) => setNewDepartment({ ...newDepartment, department_head: e.target.value })}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
        {editingId ? (
          <button
            onClick={handleUpdateDepartment}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update Department
          </button>
        ) : (
          <button
            onClick={handleAddDepartment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Department
          </button>
        )}
      </div>
    </div>
  );
};

export default Academics;
