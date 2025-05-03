import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-100 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/">
          <div className="text-2xl font-bold text-red-800 border-2 border-red-800 rounded-full p-2">
            🩸
          </div>
        </Link>

        {/* Right-side Buttons and Icons */}
        <div className="flex items-center space-x-6">
          
          {/* Donate Button */}
          <div className="flex flex-col items-center">
            <Link to="/donate">
              <img
                src="/assets/blood-donor.png"
                alt="Donate"
                className="w-10 h-10 hover:scale-110 transition"
              />
            </Link>
            <span className="text-sm text-gray-700 mt-1">Donate</span>
          </div>

          {/* Find Donor Button */}
          <div className="flex flex-col items-center">
            <Link to="/find-donor">
              <img
                src="/assets/find-donor.png"
                alt="Find Donor"
                className="w-10 h-10 hover:scale-110 transition"
              />
            </Link>
            <span className="text-sm text-gray-700 mt-1">Find Donor</span>
          </div>

          {/* Auth Section */}
          {user ? (
            <button
              onClick={handleLogout}
              title={`Logout (${user?.mobile || 'User'})`}
              className="text-red-700 hover:text-red-800 transition"
            >
              <UserCircle className="w-8 h-8" />
            </button>
          ) : (
            <Link to="/signin">
              <button className="px-4 py-2 rounded-md border border-red-700 text-red-700 hover:bg-red-50 transition cursor-pointer">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
