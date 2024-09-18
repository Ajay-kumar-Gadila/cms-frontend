// src/components/Results.js
import React, { useEffect, useState } from 'react';
import { fetchResults } from '../service/ResultsService';

const Examination = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getResults = async () => {
      try {
        const data = await fetchResults();
        setResults(data);
      } catch (err) {
        setError('Failed to fetch results');
      }
    };

    getResults();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Results</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200 border-b border-gray-300">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Student Name</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Exam Name</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Course Name</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Marks</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                      {result.student_first_name} {result.student_last_name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                      {result.exam_name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                      {result.course_name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                      {result.obtained_marks}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                      {result.grade}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 px-4 text-center text-gray-600">
                    No results available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Examination;
