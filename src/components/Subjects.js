import React, { useEffect, useState } from 'react';
import { fetchPeople, addPerson, updatePerson, deletePerson } from '../service/peopleService';

const Subjects = () => {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    gender: 'Male',
    date_of_birth: '',
    address: '',
    role: 'Student',
    roll_number: '',
    department_id: '',
    admission_date: '',
    employee_id: '',
    hire_date: ''
  });

  useEffect(() => {
    // Fetch people when the component is mounted
    const getPeople = async () => {
      const peopleData = await fetchPeople();
      setPeople(peopleData);
    };

    getPeople();
  }, []);

  const handleAddPerson = async () => {
    const addedPerson = await addPerson(newPerson);
    if (addedPerson) {
      setPeople([...people, addedPerson]);
      setNewPerson({
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        gender: 'Male',
        date_of_birth: '',
        address: '',
        role: 'Student',
        roll_number: '',
        department_id: '',
        admission_date: '',
        employee_id: '',
        hire_date: ''
      });
    }
  };

  const handleUpdatePerson = async (id) => {
    const updatedPerson = await updatePerson(id, newPerson);
    if (updatedPerson) {
      setPeople(people.map(person => person.person_id === id ? updatedPerson : person));
    }
  };

  const handleDeletePerson = async (id) => {
    await deletePerson(id);
    setPeople(people.filter(person => person.person_id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">People Management</h1>

      {/* Render people list */}
      <ul className="mb-4">
        {people.map(person => (
          <li key={person.person_id} className="mb-2 flex justify-between items-center p-2 border border-gray-200 rounded">
            <div>
              {person.first_name} {person.last_name} - {person.email}
            </div>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleUpdatePerson(person.person_id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDeletePerson(person.person_id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Form to add/update person */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="First Name"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.first_name}
          onChange={(e) => setNewPerson({ ...newPerson, first_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.last_name}
          onChange={(e) => setNewPerson({ ...newPerson, last_name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.email}
          onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.mobile_number}
          onChange={(e) => setNewPerson({ ...newPerson, mobile_number: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.date_of_birth}
          onChange={(e) => setNewPerson({ ...newPerson, date_of_birth: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.address}
          onChange={(e) => setNewPerson({ ...newPerson, address: e.target.value })}
        />
        <select
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.role}
          onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value })}
        >
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
        </select>
        <input
          type="text"
          placeholder="Roll Number"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.roll_number}
          onChange={(e) => setNewPerson({ ...newPerson, roll_number: e.target.value })}
        />
        <input
          type="number"
          placeholder="Department ID"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.department_id}
          onChange={(e) => setNewPerson({ ...newPerson, department_id: parseInt(e.target.value) })}
        />
        <input
          type="date"
          placeholder="Admission Date"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.admission_date}
          onChange={(e) => setNewPerson({ ...newPerson, admission_date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Employee ID"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.employee_id}
          onChange={(e) => setNewPerson({ ...newPerson, employee_id: e.target.value })}
        />
        <input
          type="date"
          placeholder="Hire Date"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
          value={newPerson.hire_date}
          onChange={(e) => setNewPerson({ ...newPerson, hire_date: e.target.value })}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleAddPerson}
        >
          Add Person
        </button>
      </div>
    </div>
  );
};

export default Subjects;
