import React from 'react';

const bloodRequests = [
  {
    name: 'Imran Hossen',
    blood: 'B+',
    address: 'Sreekol Laxmikol, Dublia\nPabna Sadar, Pabna',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  // More requests...
];

const BloodRequest = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-10">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Requested Donors</h1>

      <div className="space-y-6">
        {bloodRequests.map((donor, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <img
                src={donor.image}
                alt={donor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-red-700">{donor.name}</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line">{donor.address}</p>
              </div>
            </div>

            <div className="text-center">
              <span className="text-xl font-bold text-red-600">{donor.blood}</span>
              <div className="mt-3 flex flex-col gap-2">
                <button className="bg-gray-100 text-gray-800 text-sm py-1 px-3 rounded-full cursor-default">
                  View Details
                </button>
                <button className="bg-red-500 text-white text-xs font-medium py-1 px-3 rounded-full cursor-default">
                  Requested
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodRequest;
