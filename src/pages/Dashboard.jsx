import React, { useState } from 'react';
import '../styles/dashboard.css';
import StudentForm from '../components/StudentForm';
import AttendanceForm from '../components/AttendanceForm';
import PaymentForm from '../components/PaymentForm';
import api from '../services/api';

const Dashboard = () => {
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleStudentSubmit = async (studentData) => {
    try {
      await api.addStudent(studentData);
      setShowStudentForm(false);
      window.location.reload(); // Refresh to show updates
    } catch (error) {
      console.error('Failed to add student:', error);
    }
    finally{
      setShowStudentForm(false)
    }
  };

  const handleAttendanceSubmit = async (attendanceData) => {
    try {
      await api.addAttendance(attendanceData);
      setShowAttendanceForm(false);
      window.location.reload(); // Refresh to show updates
    } catch (error) {
      console.error('Failed to record attendance:', error);
    }
    finally{
      setShowAttendanceForm(false)
    }
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      await api.addPayment(paymentData);
      setShowPaymentForm(false);
      window.location.reload(); // Refresh to show updates
    } catch (error) {
      console.error('Failed to record payment:', error);
    }
    finally{
      setShowPaymentForm(false)
    }
  };

  // Mock data
  const stats = {
    totalStudents: 124,
    attendancePercentage: 87,
    paidFees: 42,
    coursesCount: 8
  };

  const recentStudents = [
    { id: 1, name: 'Aditya Gautam', course: 'Computer Science', status: 'Active' },
    { id: 2, name: 'Aryan Sharma', course: 'Mathematics', status: 'Active' },
    { id: 3, name: 'Piyush Jain', course: 'Physics', status: 'Inactive' },
    { id: 4, name: 'Deepika Singh', course: 'Chemistry', status: 'Active' },
  ];

  const isStudent = localStorage.getItem('role') === 'student';

  // Mock data for Rahul Sharma
  const studentData = {
    name: 'Rahul Sharma',
    course: 'Computer Science',
    email: 'rahul@amity.com',
    feesPaid: 50000,
    totalFees: 100000,
    attendancePercentage: 87
  };

  return (
    <div className="dashboard-page">
      {isStudent ? (
        <div className="student-dashboard">
          <div className="student-card">
            <h2>Personal Info</h2>
            <p>Name: {studentData.name}</p>
            <p>Course: {studentData.course}</p>
            <p>Email: {studentData.email}</p>
          </div>
          <div className="student-card">
            <h2>Course & Fees</h2>
            <p>Course: {studentData.course}</p>
            <p>Fees Paid: ₹{studentData.feesPaid} / ₹{studentData.totalFees}</p>
          </div>
          <div className="student-card">
            <h2>Attendance</h2>
            <p>Overall: {studentData.attendancePercentage}%</p>
          </div>
        </div>
      ) : (
        <>
          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Students</h3>
              <p>{stats.totalStudents}</p>
            </div>
            <div className="card">
              <h3>Attendance %</h3>
              <p>{stats.attendancePercentage}%</p>
            </div>
            <div className="card">
              <h3>Paid Fees</h3>
              <p>{stats.paidFees}</p>
            </div>
            <div className="card">
              <h3>Courses</h3>
              <p>{stats.coursesCount}</p>
            </div>
          </div>

  <div className="quick-actions">
    <button className="action-btn" onClick={() => setShowStudentForm(true)}>Add Student</button>
    <button className="action-btn" onClick={() => setShowAttendanceForm(true)}>Take Attendance</button>
    <button className="action-btn" onClick={() => setShowPaymentForm(true)}>Record Payment</button>
  </div>

  {showStudentForm && (
    <div className="form-modal">
      <StudentForm
        onSubmit={handleStudentSubmit}
        onCancel={() => setShowStudentForm(false)}
      />
    </div>
  )}

  {showAttendanceForm && (
    <div className="form-modal">
      <AttendanceForm
        onSubmit={handleAttendanceSubmit}
        onCancel={() => setShowAttendanceForm(false)}
      />
    </div>
  )}

  {showPaymentForm && (
    <div className="form-modal">
      <PaymentForm
        onSubmit={handlePaymentSubmit}
        onCancel={() => setShowPaymentForm(false)}
      />
    </div>
  )}

          <div className="recent-students">
            <h2>Recent Students</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;