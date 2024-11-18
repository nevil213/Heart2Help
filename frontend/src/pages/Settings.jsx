import React, { useState } from 'react';
import Cookies from 'js-cookie'

function Settings({setUser}) {

    const values = {
        name : JSON.parse(Cookies.get('user')).user.name,
        email : JSON.parse(Cookies.get('user')).user.email,
        isAdult : JSON.parse(Cookies.get('user')).user.isAdult === 1 ? 'yes' : 'no',
        isHealthy : JSON.parse(Cookies.get('user')).user.isHealthy === 1 ? 'yes' : 'no',
        lastDonated : new Date(JSON.parse(Cookies.get('user')).user.lastDonated).toISOString().split('T')[0]
    }

    const [name, setName] = useState(values.name);
    const [isAdult, setisAdult] = useState(values.isAdult);
    const [isHealthy, setisHealthy] = useState(values.isHealthy);
    const [lastDonationDate, setLastDonationDate] = useState(values.lastDonated);
    const [canDonate, setCanDonate] = useState('yes');

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold">Settings</h1>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Is your age between 18 and 65?</label>
                <select
                    value={isAdult}
                    onChange={(e) => setisAdult(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Do you have any chronic diseases like heart disease, diabetes, or cancer?</label>
                <select
                    value={isHealthy}
                    onChange={(e) => setisHealthy(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">When did you donate blood last?</label>
                <input
                    type="date"
                    value={lastDonationDate}
                    onChange={(e) => setLastDonationDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Can you donate blood?</label>
                <select
                    value={canDonate}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
        </div>
    );
}

export default Settings;