import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import FlashMessage from '../components/FlashMessage'
import SmallEligibilityTest from '../components/SmallEligibilityTest'

export default function HealthSettings() {
  const initialValues = {
    name: JSON.parse(Cookies.get('user')).user.name,
    email: JSON.parse(Cookies.get('user')).user.email,
    phoneNumber: JSON.parse(Cookies.get('user')).user.phoneNumber || '',
    bloodtype: JSON.parse(Cookies.get('user')).user.bloodtype || '',
    address: JSON.parse(Cookies.get('user')).user.address || '',
    city: JSON.parse(Cookies.get('user')).user.city || '',
    state: JSON.parse(Cookies.get('user')).user.state || '',
    password: '',
    userType: JSON.parse(Cookies.get('user')).user.userType || 'donor',
    id: JSON.parse(Cookies.get('user')).user.id
  }

  const [formValues, setFormValues] = useState(initialValues)
  const [flashMessage, setFlashMessage] = useState('');
  const [flashType, setFlashType] = useState('');
  const [showSurvey, setShowSurvey] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => {
      const newValues = { ...prevValues, [name]: value };
      if (name === 'userType') {
        if( value ==='donor' ){
          if(!JSON.parse(Cookies.get('data')).data){
            setShowSurvey(true);
          }
          else{
            newValues.isHealthy = JSON.parse(Cookies.get('data')).data.isHealthy;
            newValues.isAdult = JSON.parse(Cookies.get('data')).data.isAdult;
            newValues.lastDonated = JSON.parse(Cookies.get('data')).data.lastDonated;
            newValues.lastBloodDonated = JSON.parse(Cookies.get('data')).data.lastDonated === 'never' ? '1753-01-01' : JSON.parse(Cookies.get('data')).data.lastDonated;
          }
        }
      }
      return newValues;
    });
    if (name === 'userType' && value === 'donor' && !JSON.parse(Cookies.get('data')).data) {
      try {
        const response = await axios.put("http://localhost:8080/settings/ChangeToDonor/" + formValues.id, formValues.password);
        Cookies.set('data', { data: { isAdult: formValues.isAdult, isHealthy: formValues.isHealthy, lastDonated: formValues.lastDonated } });
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.put("http://localhost:8080/settings/" + formValues.id, formValues);
        console.log(response.data);
        const { id, name, email, phoneNumber, bloodtype, address, city, state, password, userType } = formValues;
        const filteredData0 = { user: { id, name, email, phoneNumber, bloodtype, address, city, state, password, userType } };
        Cookies.set('user', JSON.stringify(filteredData0), { expires: 60 });
        setFlashMessage('Updated Details Successfully!');
        setFlashType('success');
    } catch (err) {
        console.log(err);
        setFlashMessage('An error occurred. Please try again.');
        setFlashType('error');
    }
    console.log(formValues)
    setTimeout(() => {
      setFlashMessage('');
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {showSurvey && <SmallEligibilityTest/>}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Settings</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                disabled
                value={formValues.email}
                // onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formValues.phoneNumber}
                disabled
                // onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="bloodtype" className="block text-sm font-medium text-gray-700">Blood Group</label>
              <select
                id="bloodtype"
                name="bloodtype"
                value={formValues.bloodtype}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formValues.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={formValues.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <input
                id="state"
                name="state"
                type="state"
                value={formValues.state}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter new password (leave blank to keep current)"
              />
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">User Type</label>
              <select
                id="userType"
                name="userType"
                value={formValues.userType}
                onChange={handleChange}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="donor">Donor</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Settings
            </button>
          </form>
          <FlashMessage message={flashMessage} type={flashType} />
        </div>
      </div>
    </div>
  )
}