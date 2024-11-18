import React from 'react';

function LogoutButton({ handleLogout }) {
  return (
    <div className="fixed top-4 right-4">
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;