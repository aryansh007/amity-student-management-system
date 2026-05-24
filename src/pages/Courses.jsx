import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import api from '../services/api';
import '../styles/courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await api.getCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: courses.map(course => course.name),
    datasets: [
      {
        data: courses.map(course => course.studentsEnrolled),
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FFC107',
          '#9C27B0',
          '#607D8B',
        ],
        hoverBackgroundColor: [
          '#66BB6A',
          '#42A5F5',
          '#FFEE58',
          '#AB47BC',
          '#78909C',
        ],
      },
    ],
  };

  return (
    <div className="courses-page">
      <h1>Courses</h1>
      {loading ? (
        <div className="loading">Loading courses...</div>
      ) : courses.length === 0 ? (
        <div className="empty-state">No courses found</div>
      ) : (
        <div className="courses-content">
          <div className="chart-container">
            <Pie data={chartData} />
          </div>
          <div className="courses-list">
            {courses.map(course => (
              <div key={course.id} className="course-item">
                <h3>{course.name}</h3>
                <p>Duration: {course.duration}</p>
                <p>Students Enrolled: {course.studentsEnrolled}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
