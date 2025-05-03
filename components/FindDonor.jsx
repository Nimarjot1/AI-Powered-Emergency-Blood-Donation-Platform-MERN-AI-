import React, { useState, useEffect } from 'react';
import {
  FaSort,
  FaFilter,
  FaCommentDots,
  FaPhoneAlt,
  FaSearch,
} from 'react-icons/fa';

const donors = [
  {
    name: 'Imran Hossen',
    blood: 'B+',
    address: 'Sreekol Laxmikol, Dublia\nPabna Sadar, Pabna',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Farjana Afrin',
    blood: 'O+',
    address: 'Sreekol Laxmikol, Dublia\nPabna Sadar, Pabna',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  // Add more later
];

const FindDonor = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : 'auto';
  }, [selectedIndex]);

  return (
    <div className="relative min-h-screen bg-white p-4 md:p-10 overflow-hidden">
      {/* Blur content when modal open */}
      <div className={`${selectedIndex !== null ? 'blur-sm select-none pointer-events-none' : ''}`}>
        {/* Search */}
        <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center w-full max-w-md mx-auto mb-6 shadow-inner">
          <input
            type="text"
            placeholder="Search by location"
            className="w-full bg-transparent text-gray-700 placeholder-gray-500 outline-none px-2"
          />
          <FaSearch className="text-gray-500 text-xl cursor-pointer" />
        </div>

        {/* Sort & Filter */}
        <div className="flex gap-4 justify-start mb-6 px-2">
          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-sm font-medium shadow-sm cursor-pointer">
            <FaSort />
            Sort
          </button>
          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-sm font-medium shadow-sm cursor-pointer">
            <FaFilter />
            Filter
          </button>
        </div>

        {/* Donor Cards */}
        <div className="space-y-6">
          {donors.map((donor, index) => (
            <div key={index}>
              <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-4">
                  <img
                    src={donor.image}
                    alt={donor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-red-700">{donor.name}</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{donor.address}</p>
                    <div className="flex gap-2 mt-2 text-red-500">
                      <FaCommentDots className="cursor-pointer" />
                      <FaPhoneAlt className="cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xl font-bold text-red-600">{donor.blood}</span>
                  <div className="mt-3 flex flex-col gap-2">
                    <button
                      className="bg-gray-100 text-gray-700 text-sm py-1 px-3 rounded-full cursor-pointer"
                      onClick={() => setSelectedIndex(index)}
                    >
                      View Details
                    </button>
                    <button className="bg-red-500 text-white text-sm py-1 px-3 rounded-full cursor-pointer">
                      Request for Donates
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Card */}
      {selectedIndex !== null && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-6 relative border border-red-100">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
              onClick={() => setSelectedIndex(null)}
            >
              &times;
            </button>
            <div className="flex items-center gap-6">
              <img
                src={donors[selectedIndex].image}
                alt={donors[selectedIndex].name}
                className="w-20 h-20 rounded-full border-4 border-red-300"
              />
              <div>
                <h2 className="text-xl font-bold text-red-700">{donors[selectedIndex].name}</h2>
                <p className="text-gray-600 whitespace-pre-line">{donors[selectedIndex].address}</p>
                <p className="text-red-600 font-semibold mt-1">Blood Group: {donors[selectedIndex].blood}</p>
                <div className="flex gap-3 mt-3">
                  <button className="bg-gray-200 px-4 py-2 rounded-full text-sm font-medium cursor-pointer">
                    Message
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer">
                    Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindDonor;
