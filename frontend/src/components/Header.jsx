import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleMouseEnter = () => {
    setIsSubMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src="H2H_.png" alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex space-x-4">
            <Link to="/about" className="text-gray-700 hover:text-red-600">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-red-600">
              Services
            </Link>
          </div>
          <div className="md:hidden flex items-center justify-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="relative flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
          >
            <button
              onClick={toggleSubMenu}
              className="text-gray-700 focus:outline-none flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <span>{JSON.parse(Cookies.get("user")).user.name}</span>
            </button>
            {isSubMenuOpen && (
              <div className="absolute right-0 mt-[13.5rem] w-48 bg-white border border-gray-200 rounded-md shadow-lg"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  to="/help"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Help
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/about"
              className="block text-gray-700 hover:text-red-600"
            >
              About
            </Link>
            <Link
              to="/services"
              className="block text-gray-700 hover:text-red-600"
            >
              Services
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
