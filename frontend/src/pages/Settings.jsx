import React, { useEffect, useState } from 'react'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addMonths, subMonths } from 'date-fns'
import Cookies from 'js-cookie'
import axios from 'axios'
import FlashMessage from '../components/FlashMessage'

export default function HealthSettings() {
  let initialValues = {
    name: JSON.parse(Cookies.get('user')).user.name,
    email: JSON.parse(Cookies.get('user')).user.email,
    phoneNumber: JSON.parse(Cookies.get('user')).user.phoneNumber || '',
    bloodtype: JSON.parse(Cookies.get('user')).user.bloodtype || '',
    address: JSON.parse(Cookies.get('user')).user.address || '',
    city: JSON.parse(Cookies.get('user')).user.city || '',
    state: JSON.parse(Cookies.get('user')).user.state || '',
    password: '',
    userType: JSON.parse(Cookies.get('user')).user.userType || 'donor',
    id: JSON.parse(Cookies.get('user')).user.id,
  }

  try{
    if(JSON.parse(Cookies.get('user')).user.userType==="donor"){
      initialValues = {
        ...initialValues,
        isCAge: JSON.parse(Cookies.get('data')).data.isAdult === 1 ? 'yes' : 'no',
        hasDisease: JSON.parse(Cookies.get('data')).data.isHealthy === 1 ? 'no' : 'yes',
        lastBloodDonated: (new Date(JSON.parse(Cookies.get('data')).data.lastDonated).toISOString().split('T')[0]) === '1753-01-01' ? 'never' : (new Date(JSON.parse(Cookies.get('data')).data.lastDonated).toISOString().split('T')[0]),
        canDonateBlood: 1,
        isHealthy: JSON.parse(Cookies.get('data')).data.isHealthy,
        isAdult: JSON.parse(Cookies.get('data')).data.isAdult,
        lastDonated: JSON.parse(Cookies.get('data')).data.lastDonated
      };
    }
  } catch(err){
    console.log(err);
  }

  const [formValues, setFormValues] = useState(initialValues)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [flashMessage, setFlashMessage] = useState('');
  const [flashType, setFlashType] = useState('');

  useEffect(() => {
    if(JSON.parse(Cookies.get('user')).user.userType==="donor"){
    const fetchCanDonate = async () => {
      try {
        console.log(formValues.id)
        const response = await axios.post("http://localhost:8080/candonate", { user_id: formValues.id });
        setFormValues(prevValues => ({
          ...prevValues,
          canDonateBlood: response.data.canDonate === 1 ? "yes" : "no"
        }));
        console.log(response);
      } catch (Err) {
        console.log(Err);
      }
    };

    fetchCanDonate();
  }
  }, [formValues.id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => {
      const newValues = { ...prevValues, [name]: value };
      if (name === 'hasDisease') {
        newValues.isHealthy = value === 'yes' ? 0 : 1;
      }
      if (name === 'isCAge'){
        newValues.isAdult = value === 'yes' ? 1 : 0;
      }
      if (name === 'lastBloodDonated') {
        if (value === 'never') {
          newValues.lastDonated = '1753-01-01';
        } else {
          const selectedDate = new Date(value);
          newValues.lastDonated = selectedDate.toISOString().split('T')[0];
        }
      }
      if (name === 'userType') {
        if( value ==='donor' ){
          if(JSON.parse(Cookies.get('data')).data){
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
    if(formValues.lastDonated <= new Date().toISOString().split('T')[0]){
      try {
        const response = await axios.put("http://localhost:8080/settings/" + formValues.id, formValues);
        console.log(response.data);
        const { isAdult, isHealthy, lastDonated } = formValues;
        const filteredData = { data: { isAdult, isHealthy, lastDonated } };
        Cookies.set('data', JSON.stringify(filteredData), { expires: 60 });
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
    } else {
      setFlashMessage('Last Blood Donated should be Greater than todays Date!');
      setFlashType('error');
    }
    console.log(formValues)
    setTimeout(() => {
      setFlashMessage('');
    }, 3000);
  }

  const renderCalendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
    const dates = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      dates.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(currentYear, currentMonth, i));
    }
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg w-64">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="text-gray-600 hover:text-gray-800">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-bold">{format(currentDate, 'MMMM yyyy')}</span>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="text-gray-600 hover:text-gray-800">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {days.map(day => (
            <div key={day} className="text-center font-medium text-gray-600">{day}</div>
          ))}
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => {
                if (date) {
                  const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                  setFormValues(prevValues => ({
                    ...prevValues,
                    lastBloodDonated: adjustedDate.toISOString().split('T')[0],
                    lastDonated: adjustedDate.toISOString().split('T')[0]
                  }));
                  setIsCalendarOpen(false);
                }
              }}
              className={`text-center p-1 rounded-full ${
                date
                  ? 'hover:bg-blue-100'
                  : 'text-gray-400'
              } ${
                date && date.toDateString() === new Date().toDateString()
                  ? 'bg-blue-500 text-white'
                  : ''
              } ${
                date && formValues.lastBloodDonated && date.toDateString() === new Date(formValues.lastBloodDonated).toDateString()
                  ? 'bg-blue-200'
                  : ''
              }`}
              disabled={!date}
            >
              {date ? date.getDate() : ''}
            </button>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="donor">Donor</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">Is your age between 18 and 65?</span>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isCAge"
                    value="yes"
                    checked={formValues.isCAge === "yes"}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isCAge"
                    value="no"
                    checked={formValues.isCAge === "no"}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div className="relative">
              <span className="block text-sm font-medium text-gray-700 mb-2">When did you donate blood last?</span>
              <div className="flex items-center space-x-4 mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="lastBloodDonated"
                    value="never"
                    checked={formValues.lastBloodDonated === "never"}
                    onChange={() => {
                      setFormValues(prevValues => ({
                        ...prevValues,
                        lastBloodDonated: "never",
                        lastDonated: '1753-01-01'
                      }));
                      setIsCalendarOpen(false);
                    }}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Never</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="lastBloodDonated"
                    value="date"
                    checked={formValues.lastBloodDonated !== "never"}
                    onChange={() => {
                      if (formValues.lastBloodDonated === "never") {
                        setFormValues(prevValues => ({
                          ...prevValues,
                          lastBloodDonated: null,
                          lastDonated: null
                        }));
                      }
                      setIsCalendarOpen(true);
                    }}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Select Date</span>
                </label>
              </div>
              {formValues.lastBloodDonated !== "never" && (
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="w-full px-4 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
                    {formValues.lastBloodDonated && formValues.lastBloodDonated !== "never" ? format(new Date(formValues.lastBloodDonated), "PPP") : "Pick a date"}
                  </div>
                </button>
              )}
              {isCalendarOpen && (
                <div className="absolute z-10 mt-1">
                  {renderCalendar()}
                </div>
              )}
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">Do you have any chronic diseases like heart disease, diabetes, or cancer?</span>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="hasDisease"
                    value="yes"
                    checked={formValues.hasDisease === "yes"}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="hasDisease"
                    value="no"
                    checked={formValues.hasDisease === "no"}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">Can you donate blood?</span>
              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    formValues.canDonateBlood === "yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {formValues.canDonateBlood === "yes" ? "Yes, you can donate blood" : "No, you cannot donate blood"}
                </span>
              </div>
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