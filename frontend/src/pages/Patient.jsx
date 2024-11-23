import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import ReqDonor from '../components/ReqDonor';

const Patient = () => {
  const [data, setData] = useState(null);
  const [showDonors, setshowDonors] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkUserType = () => {
      try {
        if (JSON.parse(Cookies.get("user")).user.userType === 'patient') {
          setShowSurvey(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkUserType();

    const fetchData = async () => {
      try {
        const cookieData = JSON.parse(Cookies.get("data"));
        setData(cookieData.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setshowDonors(true);
  };

  const user = JSON.parse(Cookies.get("user")).user;

  return (
    <div className='center'>
      <div className="h-screen w-screen">
        {showDonors && <ReqDonor user_id={user.id} password={user.password} bloodType={user.bloodtype} />}
        
        {!showDonors &&<div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-900">Request Blood</h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && <div className="text-red-500 text-center">{error}</div>}
              <div className="rounded-md shadow-sm">
                <div>
                  <button
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md group hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Request Blood for Blood Group {user.bloodtype} for {user.name}
                  </button>
                  <p className="text-sm text-gray-600">Note that your name and address will be shared with the selected donor for the convenience.</p>
                </div>
              </div>
            </form>
          </div>
        </div>
}
      </div>
    </div>
  );
};

export default Patient;



{/* {donors.map((donor)=>(
    <div className="donor" key={donor.Did}>
        {donor.photo && <img src={donor.photo} alt=""/>}
        <h3>Name: {donor.name}</h3> 
        <span>Phone Number: {donor.phone}</span>  <br/>
        <span>Email Id: {donor.email}</span>  <br/>
        <span>Blood Type: {donor.BloodType}</span>  <br/>
        <span>Healthy: {donor.Healthy}</span>  <br/>
        <span>Addicted: {donor.Addicted}</span>  <br/>
        <span>Photo: {donor.photo}</span>  <br/>
        <button className='deletebtn' onClick={()=>handleDelete(donor.Did)}>Delete</button>
    </div>
))} */}