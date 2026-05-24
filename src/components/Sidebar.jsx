import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const role = localStorage.getItem('role');
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {role === 'admin' && (
          <>
            <li><Link to="/students">Students</Link></li>
            <li><Link to="/college-profile">College Profile</Link></li>
            <li><Link to="/our-campuses">Our Campuses</Link></li>

          </>
        )}
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/fees">Fees</Link></li>
        <li><Link to="/courses">Courses</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;