import React from 'react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="student-card">
      <div className="student-header">
        <h3>{student.name}</h3>
        <div className="student-actions">
          <button onClick={() => onEdit(student)}>Edit</button>
          <button onClick={() => onDelete(student.id)}>Delete</button>
        </div>
      </div>
      <div className="student-details">
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Attendance:</strong> {student.attendance}%</p>
        <p><strong>Fees Status:</strong> 
          <span className={`status-${student.feesStatus}`}>
            {student.feesStatus}
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentCard;