import React, { useState, useEffect } from 'react';
import '../styles/attendance.css';

const Attendance = () => {
  const isStudent = localStorage.getItem('role') === 'student';
  const [attendanceData, setAttendanceData] = useState([]);

  // Mock weekly attendance data for Rahul Sharma
  const mockAttendance = [
    { day: 'Monday', status: 'Present' },
    { day: 'Tuesday', status: 'Present' },
    { day: 'Wednesday', status: 'Absent' },
    { day: 'Thursday', status: 'Present' },
    { day: 'Friday', status: 'Present' },
    { day: 'Saturday', status: 'Present' },
  ];

  useEffect(() => {
    if (isStudent) {
      setAttendanceData(mockAttendance);
    } else {
      // Fetch students data for admin
      fetch('/db.json')
        .then((response) => response.json())
        .then((data) => {
          setAttendanceData(data.students);
        });
    }
  }, [isStudent]);

  return (
    <div className="attendance-container">
      <h1>{isStudent ? 'Your Attendance' : 'Student Attendance'}</h1>
      
      {isStudent ? (
        <div className="student-calendar">
          <h2>Weekly Attendance</h2>
          <div className="calendar-grid">
            {mockAttendance.map((day, index) => (
              <div key={index} className="calendar-day">
                <h3>{day.day}</h3>
                <p className={day.status.toLowerCase()}>{day.status}</p>
              </div>
            ))}
          </div>
          <div className="attendance-summary">
            <p>Total Attendance: 87%</p>
          </div>
        </div>
      ) : (
        <div className="admin-attendance">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name or ID"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className="attendance-list">
            {attendanceData.map((student) => (
              <div key={student.id} className="student-card">
                <h2>{student.name}</h2>
                <p>ID: {student.id}</p>
                <p>Course: {student.course}</p>
                <p style={{ color: student.attendance < 75 ? 'red' : 'green' }}>
                  Attendance: {student.attendance}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;