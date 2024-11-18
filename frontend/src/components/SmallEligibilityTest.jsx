import React, { useState } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import FlashMessage from './FlashMessage';


const EligibilityTest = () => {
    const [answers, setAnswers] = useState({
        email: JSON.parse((Cookies.get('user'))).email,
        isAdult: '',
        isHealthy: '',
        lastDonated: ''
    });
    const [showSurvey, setShowSurvey] = useState(true);
    const [flashMessage, setFlashMessage] = useState('');
    const [flashType, setFlashType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(answers);

    // Convert isAdult and isHealthy to 1 or 0
    const updatedAnswers = {
        ...answers,
        isAdult: answers.isAdult === 'yes' ? 1 : 0,
        isHealthy: answers.isHealthy === 'yes' ? 0 : 1,
    };

    // Convert lastDonated to appropriate date
    const currentDate = new Date();
    if (answers.lastDonated === 'never') {
        updatedAnswers.lastDonated = '2024-01-01';
    } else if (answers.lastDonated === 'lessThan56Days') {
        updatedAnswers.lastDonated = currentDate.toISOString().split('T')[0];
    } else if (answers.lastDonated === 'moreThan56Days') {
        const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 56));
        updatedAnswers.lastDonated = pastDate.toISOString().split('T')[0];
    }

    console.log({updatedAnswers});
    setAnswers(updatedAnswers);

    try {
        const response = await axios.post("http://localhost:8080/quick_survey", updatedAnswers);
        Cookies.set('Data', JSON.stringify(updatedAnswers));
        setFlashMessage('Thank you for taking the survey!');
        setFlashType('success');
        setShowSurvey(false);
      } catch (err) {
        console.log(err);
        setFlashMessage('An error occurred. Please try again.');
        setFlashType('error');
      }
  
      setTimeout(() => {
        setFlashMessage('');
      }, 3000);
    };

    // console.log(JSON.parse((Cookies.get('user'))).email);

    return showSurvey ? (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 bg-opacity-50 backdrop-blur-sm absolute" id="QuickSurvey">
            <div className="w-full max-w-lg p-6 my-10 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Quick Survey</h2>
                <span className='block font-normal text-center text-gray-800'>(You can change this later in settings)</span>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div className="mt-4">
                            <label className="block text-gray-700">Are you between 18 and 65 years old?</label>
                            <select
                                name="isAdult"
                                value={answers.isAdult}
                                onChange={handleChange}
                                required
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Do you have any chronic diseases like heart disease, diabetes, or cancer?</label>
                            <select
                                name="isHealthy"
                                value={answers.isHealthy}
                                onChange={handleChange}
                                required
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">When did you last donate blood?</label>
                            <select
                                name="lastDonated"
                                value={answers.lastDonated}
                                onChange={handleChange}
                                required
                                className="block w-full px-3 py-2 mt-1 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="never">Never</option>
                                <option value="lessThan56Days">Less than 56 days ago</option>
                                <option value="moreThan56Days">More than 56 days ago</option>
                            </select>
                        </div>
                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                    </div>
                </form>
                <FlashMessage message={flashMessage} type={flashType} />
            </div>
        </div>
    ) : (
          <FlashMessage message={flashMessage} type={flashType} />
      );
}

export default EligibilityTest;