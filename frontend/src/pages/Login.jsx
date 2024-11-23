import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", formData);
      console.log(response);

      if (response.status === 200) {
        if (formData.rememberMe) {
          // Store user data in cookies
          // Cookies.set('user', JSON.stringify(response.data.user));
          const { id, name, email, phoneNumber, bloodtype, address, city, state, password, userType } = response.data.user;
          const filteredData0 = { user: { id, name, email, phoneNumber, bloodtype, address, city, state, password, userType } };
          Cookies.set('user', JSON.stringify(filteredData0), { expires: 60 });
          
            const { isAdult, isHealthy, lastDonated } = response.data.user;
            const filteredData = { data: { isAdult, isHealthy, lastDonated } };
            if(isAdult && isHealthy && lastDonated){
              Cookies.set('data', JSON.stringify(filteredData), { expires: 60 });
            }
        }
        else{
          const { id, name, email, phoneNumber, bloodtype, address, city, state, password, userType } = response.data.user;
          const filteredData0 = { user: { id, name, email, phoneNumber, bloodtype, address, city, state, password, userType } };
          Cookies.set('user', JSON.stringify(filteredData0));
          
          const { isAdult, isHealthy, lastDonated } = response.data.user;
          const filteredData = { data: { isAdult, isHealthy, lastDonated } };
          if(isAdult && isHealthy && lastDonated){
            Cookies.set('data', JSON.stringify(filteredData));
          }
        }
        setUser(response.data);
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
      } else if (err.response && err.response.status === 404) {
        setError(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="rounded-md shadow-sm">
            <div className="mt-4">
              <label htmlFor="login-method" className="sr-only">Email or Phone Number</label>
              <input
              id="login-method"
              name="emailOrPhone"
              type="text"
              autoComplete="emailOrPhone"
              required
              value={formData.emailOrPhone}
              onChange={handleChange}
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email or Phone Number"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;