import React, { useState, useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import api from '../services/api';
import '../styles/fees.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchFees();
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const fetchFees = async () => {
    try {
      setLoading(true);
      const data = await api.getFees();
      setFees(data);
    } catch (error) {
      console.error('Failed to fetch fees:', error);
    } finally {
      setLoading(false);
    }
  };

  const paidFees = fees.filter(fee => fee.status === 'Paid').length;
  const unpaidFees = fees.filter(fee => fee.status === 'Unpaid').length;
  const partialFees = fees.filter(fee => fee.status === 'Partial').length;

  const chartData = {
    labels: ['Paid', 'Unpaid', 'Partial'],
    datasets: [
      {
        data: [paidFees, unpaidFees, partialFees],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
        hoverBackgroundColor: ['#66BB6A', '#EF5350', '#FFEE58'],
      },
    ],
  };

  return (
    <div className="fees-page">
      <h1>Fees</h1>
      {loading ? (
        <div className="loading">Loading fee records...</div>
      ) : fees.length === 0 ? (
        <div className="empty-state">No fee records found</div>
      ) : (
        <div className="fees-content">
          <div className="chart-container">
            <Pie data={chartData} ref={chartRef} />
          </div>
          <div className="fees-list">
            {fees.map(fee => (
              <div key={fee.id} className="fee-item">
                <p>Student ID: {fee.studentId}</p>
                <p>Amount: ₹{fee.amount}</p>
                <p>Status: {fee.status}</p>
                <p>Date: {fee.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Fees;
