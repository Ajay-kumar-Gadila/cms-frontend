import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import Tailwind CSS (assuming you've added the directives to this file)
import App from './App'; // Main App component
import reportWebVitals from './reportWebVitals'; // Optional performance measurement

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
