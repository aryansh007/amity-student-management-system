import React from 'react';
import '../styles/college-profile.css';

const CollegeProfile = () => {
  // Mock data for Amity Noida
  const campusInfo = {
    name: 'Amity University, Noida',
    history: 'Established in 2005, Amity University Noida is one of the leading private universities in India.',
    location: 'Sector 125, Noida, Uttar Pradesh',
    area: 'Spread over 60 acres',
    totalStudents: 15000,
    totalCourses: 150,
  };

  const facultyDetails = [
    { name: 'Dr. Rajesh Kumar', department: 'Computer Science', role: 'Professor' },
    { name: 'Dr. Priya Sharma', department: 'Business Administration', role: 'Associate Professor' },
  ];

  const placementStats = {
    topRecruiters: ['Google', 'Microsoft', 'Amazon'],
    averageSalary: '8.5 LPA',
  };

  return (
    <div className="college-profile-page">
      <h1>{campusInfo.name}</h1>
      
      {/* Campus Info Section */}
      <div className="section">
        <h2>Campus Information</h2>
        <p>History: {campusInfo.history}</p>
        <p>Location: {campusInfo.location}</p>
        <p>Area: {campusInfo.area}</p>
        <p>Total Students: {campusInfo.totalStudents}</p>
        <p>Total Courses: {campusInfo.totalCourses}</p>
      </div>

      {/* Faculty Details Section */}
      <div className="section">
        <h2>Faculty Details</h2>
        <div className="faculty-grid">
          {facultyDetails.map((faculty, index) => (
            <div className="faculty-card" key={index}>
              <p>Name: {faculty.name}</p>
              <p>Department: {faculty.department}</p>
              <p>Role: {faculty.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Stats Section */}
      <div className="section">
        <h2>Placement Statistics</h2>
        <p>Top Recruiters: {placementStats.topRecruiters.join(', ')}</p>
        <p>Average Salary: {placementStats.averageSalary}</p>
      </div>
    </div>
  );
};

export default CollegeProfile;