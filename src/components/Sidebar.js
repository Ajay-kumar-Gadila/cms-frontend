import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar border-end">
      <div className="sidebar-header border-bottom">
        <div className="sidebar-brand">University of Florida</div>
      </div>
      <ul className="sidebar-nav">
        <li className="nav-title">Big Data</li>
        <li className="nav-item">
          <Link className="nav-link" to="/hello/department">
            <i className="nav-icon cil-speedometer"></i> Department
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/hello/course">
            <i className="nav-icon cil-speedometer"></i> Course
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/hello/subjects">
            <i className="nav-icon cil-speedometer"></i> Subjects
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/hello/examination">
            <i className="nav-icon cil-speedometer"></i> Examination
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/hello/results">
            <i className="nav-icon cil-speedometer"></i> Results
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/hello/academics">
            <i className="nav-icon cil-speedometer"></i> Academics
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer border-top d-flex my-auto pt-12">
        <div className="flex"> 
          <button
            className="sidebar-toggler px-4 py-2 text-lg text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="button"
          >
            Toggle Sidebar
          </button>
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
