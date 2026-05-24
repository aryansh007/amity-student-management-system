import React, { useState } from 'react';
import api from '../services/api';
import '../styles/forms.css';

const PaymentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    amount: '2000',
    paymentDate: '',
    paymentMethod: 'Cash',
    feesStatus: 'Partial'
  });

  const amountOptions = ['2000', '5000', '10000', '20000'];

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
    <form className="payment-form" onSubmit={handleSubmit}>
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
        <label>Amount</label>
        <select
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        >
          {amountOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Fees Status</label>
        <select
          name="feesStatus"
          value={formData.feesStatus}
          onChange={handleChange}
          required
        >
          <option value="Paid">Paid</option>
          <option value="Partial">Partial</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>
      <div className="form-group">
        <label>Payment Date</label>
        <input
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
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

export default PaymentForm;