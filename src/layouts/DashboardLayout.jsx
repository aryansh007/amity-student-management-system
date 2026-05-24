import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;