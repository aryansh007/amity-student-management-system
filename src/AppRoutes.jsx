import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import CollegeProfile from './pages/CollegeProfile';
import OurCampuses from './pages/OurCampuses';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <Fees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        {localStorage.getItem('role') === 'admin' && (
          <>
            <Route
              path="/students"
              element={
                <ProtectedRoute>
                  <Students />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/college-profile"
              element={
                <ProtectedRoute>
                  <CollegeProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/our-campuses"
              element={
                <ProtectedRoute>
                  <OurCampuses />
                </ProtectedRoute>
              }
            />
          </>
        )}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;