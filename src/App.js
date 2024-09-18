import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Department from './components/Department';
import Course from './components/Course';
import Subjects from './components/Subjects';
import Examination from './components/Examination';
import Results from './components/Results';
import Academics from './components/Academics';
import Signup from './components/Signup';  // Import Signup component
import Signin from './components/Signin';  // Import Signin component

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} /> {/* Show Signin page at root path */}

          {/* Protected routes */}
          <Route path="/hello/*" element={
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-grow p-4">
                <Routes>
                  <Route path="department" element={<Department />} />
                  <Route path="course" element={<Course />} />
                  <Route path="subjects" element={<Subjects />} />
                  <Route path="examination" element={<Examination />} />
                  <Route path="results" element={<Results />} />
                  <Route path="academics" element={<Academics />} />
                  <Route path="/" element={<Department />} /> {/* Default route inside /hello */}
                </Routes>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
