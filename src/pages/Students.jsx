import React, { useState, useEffect } from 'react';
import api from '../services/api';
import StudentForm from '../components/StudentForm';
import StudentCard from '../components/StudentCard';
import '../styles/students.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await api.getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      // Show toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = () => {
    setCurrentStudent(null);
    setShowForm(true);
  };

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setShowForm(true);
  };

  const handleDeleteStudent = async (id) => {
    try {
      await api.deleteStudent(id);
      fetchStudents();
      // Show success toast
    } catch (error) {
      console.error('Failed to delete student:', error);
      // Show error toast
    }
  };

  const handleSubmit = async (studentData) => {
    try {
      if (currentStudent) {
        await api.updateStudent(currentStudent.id, studentData);
      } else {
        await api.addStudent(studentData);
      }
      fetchStudents();
      setShowForm(false);
      // Show success toast
    } catch (error) {
      console.error('Failed to save student:', error);
      // Show error toast
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter ? student.course === courseFilter : true;
    return matchesSearch && matchesCourse;
  });

  const courses = [...new Set(students.map(student => student.course))];

  return (
    <div className="students-page">
      <div className="students-header">
        <h1>Students</h1>
        <button onClick={handleAddStudent}>Add Student</button>
      </div>

      <div className="students-controls">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="">All Courses</option>
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>

      {showForm && (
        <div className="form-modal">
          <StudentForm
            initialData={currentStudent || {}}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            isLoading={loading}
          />
        </div>
      )}

      {loading ? (
        <div className="loading">Loading students...</div>
      ) : filteredStudents.length === 0 ? (
        <div className="empty-state">No students found</div>
      ) : (
        <div className="students-grid">
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;