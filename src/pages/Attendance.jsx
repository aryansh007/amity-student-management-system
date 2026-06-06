import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/attendance.css';

// Register ChartJS Elements for Admin Section
ChartJS.register(ArcElement, Tooltip, Legend);

const Attendance = () => {
  const isStudent = localStorage.getItem('role') === 'student';
  const today = new Date();

  // ==========================================
  // 1. STUDENT ROLE STATES & CODES
  // ==========================================
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper logic to compute cell markings based on user constraints
  const getDayStatus = (year, month, day) => {
    const targetDate = new Date(year, month, day);
    
    // Future date shielding
    if (targetDate > today) return { status: '', label: '' };

    const dayOfWeek = targetDate.getDay(); 

    // May Month -> Whole month holiday
    if (month === 4) return { status: 'holiday', label: 'H' };

    // November Month -> Diwali Day (e.g. Nov 12)
    if (month === 10 && day === 12) return { status: 'holiday', label: 'H' };

    // June 16 to July 14 Exam Window
    if ((month === 5 && day >= 16) || (month === 6 && day <= 14)) {
      const examDays = [16, 18, 22, 25, 29, 2, 6]; 
      if (month === 5 && examDays.slice(0, 5).includes(day)) return { status: 'exam', label: 'E' };
      if (month === 6 && examDays.slice(5).includes(day)) return { status: 'exam', label: 'E' };
      return { status: 'holiday', label: 'H' }; 
    }

    // Weekend Rule
    if (dayOfWeek === 0 || dayOfWeek === 6) return { status: 'holiday', label: 'H' };

    // Inject exactly 2 Absents per month on first two working weekdays
    let workingDayCount = 0;
    for (let d = 1; d <= day; d++) {
      const tempDate = new Date(year, month, d);
      const tempWDay = tempDate.getDay();
      if (tempWDay !== 0 && tempWDay !== 6 && !(month === 10 && d === 12)) {
        workingDayCount++;
      }
    }
    if (workingDayCount === 1 || workingDayCount === 2) {
      return { status: 'absent', label: 'A' };
    }

    return { status: 'present', label: 'P' };
  };

  // Student Grid calculations
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const blanks = Array(firstDayIndex).fill(null);
  const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);
  const gridCells = [...blanks, ...daysArray];

  // ==========================================
  // 2. ADMIN ROLE STATES & CODES
  // ==========================================
  const [searchTerm, setSearchTerm] = useState('');
  const [adminStudents, setAdminStudents] = useState([]);

  const mockStudentsData = [
    { id: 'AMITY001', name: 'Aditya Gautam', course: 'BCA', attendance: 87, email: 'aditya@amity.com' },
    { id: 'AMITY002', name: 'Aryan Sharma', course: 'BCA', attendance: 72, email: 'aryan@amity.com' },
    { id: 'AMITY003', name: 'Piyush Jain', course: 'B.Tech', attendance: 91, email: 'piyush@amity.com' },
    { id: 'AMITY004', name: 'Deepika Singh', course: 'B.Tech', attendance: 64, email: 'deepika@amity.com' },
    { id: 'AMITY005', name: 'Rahul Verma', course: 'MCA', attendance: 78, email: 'rahul@amity.com' },
    { id: 'AMITY006', name: 'Sneha Reddy', course: 'MCA', attendance: 69, email: 'sneha@amity.com' },
    { id: 'AMITY007', name: 'Vikram Malhotra', course: 'MBA', attendance: 85, email: 'vikram@amity.com' },
    { id: 'AMITY008', name: 'Ananya Iyer', course: 'MBA', attendance: 74, email: 'ananya@amity.com' },
    { id: 'AMITY009', name: 'Rohan Mehra', course: 'BCA', attendance: 80, email: 'rohan@amity.com' },
    { id: 'AMITY010', name: 'Kriti Sanon', course: 'B.Tech', attendance: 76, email: 'kriti@amity.com' },
  ];

  useEffect(() => {
    if (!isStudent) {
      setAdminStudents(mockStudentsData);
    }
  }, [isStudent]);

  // Chart configs
  const generateChartData = (above75, below75) => ({
    labels: ['Above 75%', 'Below 75%'],
    datasets: [
      {
        data: [above75, below75],
        backgroundColor: ['#28a745', '#dc3545'],
        hoverBackgroundColor: ['#218838', '#c82333'],
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
    },
    maintainAspectRatio: false
  };

  const filteredStudents = adminStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="attendance-page-wrapper" style={{ padding: '15px', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      <h2 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '22px' }}>
        {isStudent ? 'Your Attendance Dashboard' : 'Dean / Admin Analytics Portal'}
      </h2>

      {/* ==========================================
          RENDER VIEW 1: STUDENT MAIN DASHBOARD (70:30 Splitscreen)
          ========================================== */}
      {isStudent ? (
        <div className="main-calendar-layout" style={{ 
          display: 'flex', 
          gap: '20px', 
          alignItems: 'stretch',
          height: 'calc(90vh - 180px)' 
        }}>
          
          {/* Calendar Plate (70% Width) */}
          <div className="calendar-card-box" style={{ 
            flex: '0 0 70%', 
            width: '70%',
            background: '#ffffff', 
            borderRadius: '10px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)', 
            padding: '15px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Header Switcher controls */}
            <div className="calendar-header" style={{ display: 'flex', justifyBetween: 'center', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <button 
                onClick={() => currentMonth === 0 ? (setCurrentMonth(11), setCurrentYear(p => p - 1)) : setCurrentMonth(p => p - 1)} 
                style={{ padding: '6px 12px', background: '#0a2558', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
              >
                ◀ Prev
              </button>
              <h3 style={{ margin: 0, color: '#0a2558', fontSize: '18px' }}>
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button 
                onClick={() => currentMonth === 11 ? (setCurrentMonth(0), setCurrentYear(p => p + 1)) : setCurrentMonth(p => p + 1)} 
                disabled={currentMonth === today.getMonth() && currentYear === today.getFullYear()}
                style={{ 
                  padding: '6px 12px', 
                  background: (currentMonth === today.getMonth() && currentYear === today.getFullYear()) ? '#cccccc' : '#0a2558', 
                  color: '#fff', border: 'none', borderRadius: '4px', 
                  cursor: (currentMonth === today.getMonth() && currentYear === today.getFullYear()) ? 'not-allowed' : 'pointer',
                  fontSize: '13px' 
                }}
              >
                Next ▶
              </button>
            </div>

            {/* Matrix headers */}
            <div className="days-grid-header" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 'bold', marginBottom: '5px', color: '#555', fontSize: '13px' }}>
              {daysOfWeek.map(d => <div key={d} style={{ padding: '4px 0' }}>{d}</div>)}
            </div>

            {/* Days Loop Wrapper */}
            <div className="calendar-days-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', flex: 1 }}>
              {gridCells.map((day, idx) => {
                if (day === null) {
                  return (
                    <div key={`blank-${idx}`} style={{ maxHeight: '44px', background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '6px', boxSizing: 'border-box' }}></div>
                  );
                }

                const { status, label } = getDayStatus(currentYear, currentMonth, day);
                let cellBg = '#ffffff'; let cellColor = '#333';
                if (status === 'present') { cellBg = '#d4edda'; cellColor = '#155724'; }
                else if (status === 'absent') { cellBg = '#f8d7da'; cellColor = '#721c24'; }
                else if (status === 'holiday') { cellBg = '#fff3cd'; cellColor = '#856404'; }
                else if (status === 'exam') { cellBg = '#cce5ff'; cellColor = '#004085'; }

                return (
                  <div key={`day-${day}`} style={{
                    maxHeight: '44px', background: cellBg, color: cellColor,
                    border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box'
                  }}>
                    <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{day}</span>
                    {label && <span style={{ fontSize: '10px', fontWeight: 'bold', background: 'rgba(255,255,255,0.7)', padding: '1px 4px', borderRadius: '3px' }}>{label}</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Panel Guide (30% Width) */}
          <div className="legend-sidebar-panel" style={{ 
            flex: '0 0 30%', 
            width: '30%',
            background: '#ffffff', 
            borderRadius: '10px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)', 
            padding: '15px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ borderBottom: '2px solid #0a2558', paddingBottom: '6px', marginTop: 0, color: '#0a2558', fontSize: '15px' }}>Attendance Legend</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: '#d4edda', borderRadius: '6px' }}><div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#155724', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px' }}>P</div><div><strong style={{ color: '#155724', fontSize: '12px' }}>Present</strong></div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: '#f8d7da', borderRadius: '6px' }}><div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#721c24', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px' }}>A</div><div><strong style={{ color: '#721c24', fontSize: '12px' }}>Absent</strong></div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: '#fff3cd', borderRadius: '6px' }}><div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#856404', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px' }}>H</div><div><strong style={{ color: '#856404', fontSize: '12px' }}>Holiday</strong></div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: '#cce5ff', borderRadius: '6px' }}><div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#004085', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px' }}>E</div><div><strong style={{ color: '#004085', fontSize: '12px' }}>Exam Day</strong></div></div>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#888', textAlign: 'center' }}>Live System Date: <strong>{today.toLocaleDateString('en-GB')}</strong></div>
          </div>
        </div>
      ) : (
        
        /* ==========================================
            RENDER VIEW 2: ADMIN CORE ANALYTICS (Charts + Search Directory)
            ========================================== */
        <div className="admin-attendance-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Charts Row Matrix Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {/* Chart 1 */}
            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#0a2558', fontSize: '14px' }}>BCA Attendance Ratio</h4>
              <div style={{ width: '100%', height: '130px', position: 'relative' }}>
                <Pie data={generateChartData(2, 1)} options={chartOptions} />
              </div>
            </div>
            {/* Chart 2 */}
            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#0a2558', fontSize: '14px' }}>B.Tech Attendance Ratio</h4>
              <div style={{ width: '100%', height: '130px', position: 'relative' }}>
                <Pie data={generateChartData(2, 1)} options={chartOptions} />
              </div>
            </div>
            {/* Chart 3 */}
            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#0a2558', fontSize: '14px' }}>MCA Attendance Ratio</h4>
              <div style={{ width: '100%', height: '130px', position: 'relative' }}>
                <Pie data={generateChartData(1, 1)} options={chartOptions} />
              </div>
            </div>
            {/* Chart 4 */}
            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#0a2558', fontSize: '14px' }}>MBA Attendance Ratio</h4>
              <div style={{ width: '100%', height: '130px', position: 'relative' }}>
                <Pie data={generateChartData(1, 1)} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Directory log box */}
          <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ margin: 0, color: '#0a2558', fontSize: '16px' }}>Student Attendance Directory</h3>
              
              <input
                type="text"
                placeholder="🔍 Search by student name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '280px', padding: '8px 12px', border: '1px solid #ccc',
                  borderRadius: '6px', outline: 'none', fontSize: '13px'
                }}
              />
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#0a2558', color: '#fff' }}>
                    <th style={{ padding: '10px' }}>Student ID</th>
                    <th style={{ padding: '10px' }}>Full Name</th>
                    <th style={{ padding: '10px' }}>Course Track</th>
                    <th style={{ padding: '10px' }}>Email Address</th>
                    <th style={{ padding: '10px' }}>Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, idx) => (
                      <tr key={student.id} style={{ borderBottom: '1px solid #eee', background: idx % 2 === 0 ? '#fdfdfd' : '#ffffff' }}>
                        <td style={{ padding: '10px', fontWeight: 'bold', color: '#555' }}>{student.id}</td>
                        <td style={{ padding: '10px', fontWeight: '500' }}>{student.name}</td>
                        <td style={{ padding: '10px' }}><span style={{ background: '#e6f0ff', color: '#007bff', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px' }}>{student.course}</span></td>
                        <td style={{ padding: '10px', color: '#666' }}>{student.email}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{ 
                            color: student.attendance >= 75 ? '#28a745' : '#dc3545', 
                            fontWeight: 'bold', background: student.attendance >= 75 ? '#e2f0d9' : '#fce4e4',
                            padding: '4px 8px', borderRadius: '4px', fontSize: '12px'
                          }}>
                            {student.attendance}% {student.attendance >= 75 ? '✔️' : '⚠️'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#999', fontWeight: 'bold' }}>
                        No students found matching your search term.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Attendance;