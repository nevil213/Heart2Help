import React, { useState } from 'react';

const EligibilityTest = () => {
    const [answers, setAnswers] = useState({
        age: '',
        weight: '',
        generalHealth: '',
        hemoglobinLevel: '',
        bloodPressure: '',
        recentDonation: '',
        chronicDiseases: '',
        infectiousDiseases: '',
        medications: '',
        lifestyleTattoo: '',
        lifestyleAlcohol: '',
        travelHistory: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(answers);
        // Add your logic to handle the form submission
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-lg p-6 my-10 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Blood Donation Eligibility Test</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div className="mt-4">
                            <label className="block text-gray-700">Are you between 18 and 65 years old?</label>
                            <select
                                name="age"
                                value={answers.age}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Do you weigh at least 50 kg (110 pounds)?</label>
                            <select
                                name="weight"
                                value={answers.weight}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Are you currently in good health, free from any symptoms of infection (fever, cough, cold)?</label>
                            <select
                                name="generalHealth"
                                value={answers.generalHealth}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Do you have a hemoglobin level of at least 12.5 g/dL (women) or 13 g/dL (men)?</label>
                            <select
                                name="hemoglobinLevel"
                                value={answers.hemoglobinLevel}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                <option value="notSure">Not sure</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Is your blood pressure within a healthy range?</label>
                            <select
                                name="bloodPressure"
                                value={answers.bloodPressure}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                <option value="notSure">Not sure</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">When did you last donate blood?</label>
                            <select
                                name="recentDonation"
                                value={answers.recentDonation}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="never">Never</option>
                                <option value="lessThan56Days">Less than 56 days ago</option>
                                <option value="moreThan56Days">More than 56 days ago</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Do you have any chronic diseases like heart disease, diabetes, or cancer?</label>
                            <select
                                name="chronicDiseases"
                                value={answers.chronicDiseases}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Have you ever tested positive for any infectious diseases like HIV, hepatitis B, hepatitis C, or syphilis?</label>
                            <select
                                name="infectiousDiseases"
                                value={answers.infectiousDiseases}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Are you currently taking any medications?</label>
                            <select
                                name="medications"
                                value={answers.medications}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Have you recently had a tattoo, piercing, or cosmetic procedure in the last 3-6 months?</label>
                            <select
                                name="lifestyleTattoo"
                                value={answers.lifestyleTattoo}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Have you consumed alcohol in the past 24 hours?</label>
                            <select
                                name="lifestyleAlcohol"
                                value={answers.lifestyleAlcohol}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Have you traveled to areas with malaria, Zika virus, or other infectious disease risks in the past 3-6 months?</label>
                            <select
                                name="travelHistory"
                                value={answers.travelHistory}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EligibilityTest;