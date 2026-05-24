import React, { useState } from 'react';
import '../styles/our-campuses.css';

const OurCampuses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const campusesPerPage = 4;

  const campuses = [
    {
      name: 'Amity Noida',
      location: 'Sector 125, Noida, Uttar Pradesh',
      established: 2005,
      keyFeature: 'Flagship campus with 60-acre infrastructure'
    },
    {
      name: 'Amity Jaipur',
      location: 'Jaipur, Rajasthan',
      established: 2008,
      keyFeature: 'State-of-the-art facilities in a heritage city'
    },
    {
      name: 'Amity Kolkata',
      location: 'Kolkata, West Bengal',
      established: 2010,
      keyFeature: 'Focus on eastern India education hub'
    },
    {
      name: 'Amity Ranchi',
      location: 'Ranchi, Jharkhand',
      established: 2016,
      keyFeature: 'Emerging campus with modern amenities'
    },
    {
      name: 'Amity Patna',
      location: 'Patna, Bihar',
      established: 2017,
      keyFeature: 'Growing presence in Bihar'
    },
    {
      name: 'Amity Mohali',
      location: 'Mohali, Punjab',
      established: 2014,
      keyFeature: 'Strong focus on research and innovation'
    },
    {
      name: 'Amity Lucknow',
      location: 'Lucknow, Uttar Pradesh',
      established: 2011,
      keyFeature: 'Premier institute in Uttar Pradesh'
    },
    {
      name: 'Amity Bengaluru',
      location: 'Bengaluru, Karnataka',
      established: 2015,
      keyFeature: 'Tech-focused campus in India\'s Silicon Valley'
    },
    {
      name: 'Amity Mumbai',
      location: 'Mumbai, Maharashtra',
      established: 2013,
      keyFeature: 'Financial and media industry connections'
    },
    {
      name: 'Amity Gwalior',
      location: 'Gwalior, Madhya Pradesh',
      established: 2012,
      keyFeature: 'Strong engineering programs'
    }
  ];

  // Pagination logic
  const indexOfLastCampus = currentPage * campusesPerPage;
  const indexOfFirstCampus = indexOfLastCampus - campusesPerPage;
  const currentCampuses = campuses.slice(indexOfFirstCampus, indexOfLastCampus);
  const totalPages = Math.ceil(campuses.length / campusesPerPage);

  return (
    <div className="our-campuses-page">
      <h1>Our Campuses</h1>
      
      <div className="campuses-grid">
        {currentCampuses.map((campus, index) => (
          <div className="campus-card" key={index}>
            <div className="campus-content">
              <h2>{campus.name}</h2>
              <p><strong>Location:</strong> {campus.location}</p>
              <p><strong>Established:</strong> {campus.established}</p>
              <p><strong>Key Feature:</strong> {campus.keyFeature}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OurCampuses;