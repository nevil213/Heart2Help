import React from 'react';

const FlashMessage = ({ message, type }) => {
  if (!message) return null;

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  return (
    <div className={`fixed top-4 right-4 p-4 border-l-4 ${getTypeClasses()} rounded shadow-md`}>
      {message}
    </div>
  );
};

export default FlashMessage;