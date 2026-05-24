import React, { useState } from 'react';

const StudentForm = ({ initialData = {}, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    course: initialData.course || '',
    attendance: initialData.attendance || 0,
    feesStatus: initialData.feesStatus || 'unpaid'
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
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Course</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
        </select>
      </div>
      <div className="form-group">
        <label>Attendance %</label>
        <input
          type="number"
          name="attendance"
          min="0"
          max="100"
          value={formData.attendance}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Fees Status</label>
        <select
          name="feesStatus"
          value={formData.feesStatus}
          onChange={handleChange}
          required
        >
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="partial">Partial</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;