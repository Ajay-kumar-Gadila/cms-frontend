import React, { useState, useEffect } from 'react';
import { fetchSubjects, addSubject, updateSubject, deleteSubject } from '../service/subjectsService';
import 'tailwindcss/tailwind.css';

const Results = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ subject_name: '', credits: '', semester: '' });
  const [editSubjectId, setEditSubjectId] = useState(null);

  useEffect(() => {
    const getSubjects = async () => {
      const subjectsData = await fetchSubjects();
      setSubjects(subjectsData);
    };

    getSubjects();
  }, []);

  const handleAddSubject = async () => {
    const addedSubject = await addSubject(newSubject.subject_name, newSubject.credits, newSubject.semester);
    if (addedSubject) {
      setSubjects([...subjects, addedSubject]);
      setNewSubject({ subject_name: '', credits: '', semester: '' });
    }
  };

  const handleUpdateSubject = async () => {
    if (editSubjectId !== null) {
      const updatedSubject = await updateSubject(editSubjectId, newSubject.subject_name, newSubject.credits, newSubject.semester);
      if (updatedSubject) {
        setSubjects(subjects.map(sub => sub.subject_id === editSubjectId ? updatedSubject : sub));
        setEditSubjectId(null);
        setNewSubject({ subject_name: '', credits: '', semester: '' });
      }
    }
  };

  const handleDeleteSubject = async (id) => {
    await deleteSubject(id);
    setSubjects(subjects.filter(sub => sub.subject_id !== id));
  };

  const handleEditClick = (subject) => {
    setEditSubjectId(subject.subject_id);
    setNewSubject({ subject_name: subject.subject_name, credits: subject.credits, semester: subject.semester });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Subjects Management</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Subject List</h2>
        <ul className="bg-white shadow-md rounded-lg">
          {subjects.map(subject => (
            <li key={subject.subject_id} className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <p className="text-lg font-medium">{subject.subject_name}</p>
                <p className="text-sm text-gray-600">Credits: {subject.credits} | Semester: {subject.semester}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(subject)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSubject(subject.subject_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">{editSubjectId ? 'Update Subject' : 'Add New Subject'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="subject_name">Subject Name</label>
          <input
            type="text"
            id="subject_name"
            placeholder="Subject Name"
            value={newSubject.subject_name}
            onChange={(e) => setNewSubject({ ...newSubject, subject_name: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="credits">Credits</label>
          <input
            type="number"
            id="credits"
            placeholder="Credits"
            value={newSubject.credits}
            onChange={(e) => setNewSubject({ ...newSubject, credits: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="semester">Semester</label>
          <input
            type="text"
            id="semester"
            placeholder="Semester"
            value={newSubject.semester}
            onChange={(e) => setNewSubject({ ...newSubject, semester: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          onClick={editSubjectId === null ? handleAddSubject : handleUpdateSubject}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editSubjectId === null ? 'Add Subject' : 'Update Subject'}
        </button>
      </div>
    </div>
  );
};

export default Results;
