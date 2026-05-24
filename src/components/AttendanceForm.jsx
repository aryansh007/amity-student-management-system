import React, { useState } from 'react';
import api from '../services/api';
import '../styles/forms.css';

const AttendanceForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    date: '',
    status: 'Present'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="attendance-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Student ID</label>
        <input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default AttendanceForm;