import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import StudentForm from '../components/StudentForm';
import AttendanceForm from '../components/AttendanceForm';
import PaymentForm from '../components/PaymentForm';
import api from '../services/api';
import hero from '../assets/hero.png'; // Asset image for the ID card

const Dashboard = () => {
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Announcement Carousel State
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  const announcements = [
    "📢 End Semester Exams registration deadline extended to June 12, 2026.",
    "🚀 Cyber Security Workshop by Industry Experts on Friday in Seminar Hall-1.",
    "🏆 Amity Tech Fest 2026 registrations are now open! Check out the portal to participate.",
    "📝 BCA Project Submission Phase-1 guidelines have been uploaded on your email.",
    "🛑 Library timings extended up to 8:00 PM till the conclusion of university exams."
  ];

  // 5 Second Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) => 
        prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [announcements.length]);

  const handleStudentSubmit = async (studentData) => {
    try {
      await api.addStudent(studentData);
      setShowStudentForm(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to add student:', error);
    } finally {
      setShowStudentForm(false)
    }
  };

  const handleAttendanceSubmit = async (attendanceData) => {
    try {
      await api.addAttendance(attendanceData);
      setShowAttendanceForm(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to record attendance:', error);
    } finally {
      setShowAttendanceForm(false)
    }
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      await api.addPayment(paymentData);
      setShowPaymentForm(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to record payment:', error);
    } finally {
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

  // Mock data for Adithya Gautam
  const studentData = {
    name: 'Adithya Gautam',
    course: 'Computer Science',
    email: 'adithya@amity.com',
    feesPaid: 50000,
    totalFees: 100000,
    attendancePercentage: 87
  };

  return (
    <div className="dashboard-page">
      {isStudent ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
          
          {/* FIRST ROW: Your 4 Horizontal Original Cards */}
          <div className="student-dashboard">
            <div className="student-card">
              <h2>Welcome {studentData.name}</h2>
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
            <div className="student-card">
              <h2>Upcoming Events</h2>
              <p>Exam: June 15, 2026</p>
              <p>Project Submission: June 20, 2026</p>
            </div>
          </div>

          {/* SECOND ROW: Three Cards with EXACT Same Width (33.33% each) */}
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            width: '100%',
            flexWrap: 'wrap'
          }}>
            
            {/* Card 1: Today's Timetable (33.33%) */}
            <div className="student-card" style={{ 
              flex: '1 1 calc(33.33% - 14px)', 
              minWidth: '300px', 
              boxSizing: 'border-box',
              margin: 0
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                <h2 style={{ margin: 0 }}>Today's Schedule</h2>
                <span style={{ fontSize: '13px', color: '#666', fontWeight: 'bold' }}>🗓️ June 07, 2026</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: '#f8f9fa', padding: '8px 12px', borderRadius: '6px' }}>
                  <strong>💻 Java Programming</strong>
                  <span style={{ color: '#007bff', fontSize: '13px' }}>09:15 AM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: '#f8f9fa', padding: '8px 12px', borderRadius: '6px' }}>
                  <strong>🌐 Web Dev Lab</strong>
                  <span style={{ color: '#007bff', fontSize: '13px' }}>10:30 AM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: '#f8f9fa', padding: '8px 12px', borderRadius: '6px' }}>
                  <strong>📊 DBMS Lectures</strong>
                  <span style={{ color: '#007bff', fontSize: '13px' }}>01:30 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: '#f8f9fa', padding: '8px 12px', borderRadius: '6px' }}>
                  <strong>📈 Discrete Maths</strong>
                  <span style={{ color: '#007bff', fontSize: '13px' }}>02:45 PM</span>
                </div>
              </div>
            </div>

            {/* Card 2: Infinite Loop Announcements (33.33%) */}
            <div className="student-card" style={{ 
              flex: '1 1 calc(33.33% - 14px)', 
              minWidth: '300px', 
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              margin: 0
            }}>
              <h2>Latest Announcements</h2>
              
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: '#fff9e6', 
                borderLeft: '5px solid #ffc107',
                borderRadius: '6px',
                padding: '15px',
                marginTop: '5px',
                minHeight: '140px'
              }}>
                <p style={{ 
                  fontSize: '15px', 
                  color: '#333', 
                  fontWeight: '500', 
                  margin: 0, 
                  textAlign: 'center',
                  lineHeight: '1.5'
                }}>
                  {announcements[currentAnnouncementIndex]}
                </p>
              </div>

              {/* Slider Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
                {announcements.map((_, index) => (
                  <span 
                    key={index} 
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: currentAnnouncementIndex === index ? '#ffc107' : '#ddd',
                      display: 'inline-block'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Card 3: Student ID Card Card with Top-Right Download Icon (33.33%) */}
            <div className="student-card" style={{ 
              flex: '1 1 calc(33.33% - 14px)', 
              minWidth: '300px', 
              boxSizing: 'border-box',
              position: 'relative', // Absolutely positioned download button handles alignment here
              display: 'flex',
              flexDirection: 'column',
              margin: 0
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h2 style={{ margin: 0 }}>Digital ID Card</h2>
                
                {/* Clean Download Button using standard anchor tags */}
                <a 
                  href={hero} 
                  download="Student_ID_Card.png" 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    color: '#007bff',
                    background: '#e6f0ff',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  title="Download ID Card"
                  onMouseEnter={(e) => e.target.style.background = '#ccdfff'}
                  onMouseLeave={(e) => e.target.style.background = '#e6f0ff'}
                >
                  📥 Download
                </a>
              </div>

              {/* ID Card Image Container */}
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                background: '#f8f9fa',
                borderRadius: '6px',
                padding: '10px',
                overflow: 'hidden'
              }}>
                <img 
                  src={hero} 
                  alt="Student ID Card" 
                  style={{ 
                    maxHeight: '160px', 
                    maxWidth: '100%', 
                    objectFit: 'contain',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }} 
                />
              </div>
            </div>

          </div>
        </div>
      ) : (
        <>
          {/* Admin Dashboard remains untouched */}
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
              <StudentForm onSubmit={handleStudentSubmit} onCancel={() => setShowStudentForm(false)} />
            </div>
          )}

          {showAttendanceForm && (
            <div className="form-modal">
              <AttendanceForm onSubmit={handleAttendanceSubmit} onCancel={() => setShowAttendanceForm(false)} />
            </div>
          )}

          {showPaymentForm && (
            <div className="form-modal">
              <PaymentForm onSubmit={handlePaymentSubmit} onCancel={() => setShowPaymentForm(false)} />
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