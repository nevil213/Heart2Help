import React, { useEffect, useState } from 'react';
import '../index.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Signup({setUser}) {

    const [userData, setUserData] = useState({
        name:'',
        phoneNumber:'',
        email:'',
        password:'',
        bloodType:'',
        role:''
    })

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUserData(prevState=>({...prevState, [e.target.name] : e.target.value}));
    }
    // useEffect(() => {
    //     console.log(userData);
    //   }, [userData]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8080/signup", userData);
          if (response.status === 200) {
            Cookies.set('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            navigate("/");
          }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError(err.response.data.message);
                alert(err.response.data.message); // Show alert for duplicate email or phone number
              } else {
                console.log(err);
              }
        }
      };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={userData.name}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="phone-number" className="sr-only">Phone Number</label>
              <input
                id="phone-number"
                name="phoneNumber"
                type="tel"
                pattern="[0-9]{10}"
                required
                value={userData.phoneNumber}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={userData.email}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength="8"
                value={userData.password}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="blood-type" className="sr-only">Blood Type</label>
              <select
                id="blood-type"
                name="bloodType"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={userData.bloodType}
                onChange={handleChange}
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O+">O+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="AB-">AB-</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="role" className="sr-only">Role</label>
              <select
                id="role"
                name="role"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={userData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="donor">Donor</option>
                <option value="patient">Patient</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;