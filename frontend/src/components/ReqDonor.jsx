import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DonorCard from './DonorCard';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'

const ReqDonor = ({ user_id, password, bloodType }) => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.post("http://localhost:8080/getDonors", { user_id, password, bloodType });
        console.log(response);
        if (response.data) {
          setDonors(response.data);
        } else {
          setDonors([]);
          setError('No donors found.');
        }
      } catch (err) {
        console.log(err);
        setError('Failed to fetch donors. Please try again later.');
      }
    };

    fetchDonors();
  }, [user_id, password, bloodType]);

  const handleSelectDonor = async (donor) => {
    console.log("Selected donor:", donor);
    // Add your logic for handling the selected donor here
    try{
      const response = await axios.post("http://localhost:8080/request-blood", { donorEmail: donor.email, patientName: JSON.parse(Cookies.get("user")).user.name, donorAddress:JSON.parse(Cookies.get("user")).user.address+", " + JSON.parse(Cookies.get("user")).user.city + ", " + JSON.parse(Cookies.get("user")).user.state })
      if(response.status(200)){
        alert("Your Request has been send to Donor "+ donor.name + ", you will be notified when donor accept the request!");
      }
    } catch(err){
      console.log(err);
      alert("an error occured");
    }
  };

  return (
    <div className="donor-list flex flex-col items-center w-full max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg pt-24">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {donors.length > 0 ? (
        donors.map((donor) => (
          <DonorCard
            key={donor.user_id}
            name={donor.name}
            address={donor.address}
            city={donor.city}
            state={donor.state}
            bloodType={donor.bloodtype}
            onSelect={() => handleSelectDonor(donor)}
          />
        ))
      ) : (
        !error && <div className="text-gray-500">No donors available.</div>
      )}
    </div>
  );
};

ReqDonor.propTypes = {
  user_id: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  bloodType: PropTypes.string.isRequired,
};

export default ReqDonor;