import React from 'react';
import PropTypes from 'prop-types';

const DonorCard = ({ name, address, city, state, bloodType, onSelect }) => {
  return (
    <div className="donor-card p-4 border rounded shadow-md mb-4 ">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-700">Address: {address}</p>
      <p className="text-gray-700">City: {city}</p>
      <p className="text-gray-700">State: {state}</p>
      <p className="text-gray-700">Blood Type: {bloodType}</p>
      <button 
        onClick={onSelect} 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Select this donor
      </button>
    </div>
  );
};

DonorCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  bloodType: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DonorCard;