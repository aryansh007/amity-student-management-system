import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const role = localStorage.getItem('role');
  return (
    <div className="sidebar">
      <ul>
        {/* Link ko li ke bahar lapet diya */}
        <Link to="/dashboard"><li>Dashboard</li></Link>
        
        {role === 'admin' && (
          <>
            <Link to="/students"><li>Students</li></Link>
            <Link to="/college-profile"><li>College Profile</li></Link>
            <Link to="/our-campuses"><li>Our Campuses</li></Link>
          </>
        )}
        
        <Link to="/attendance"><li>Attendance</li></Link>
        <Link to="/fees"><li>Fees</li></Link>
        <Link to="/courses"><li>Courses</li></Link>
      </ul>
    </div>
  );
};

export default Sidebar;