// src/components/ThreeLinks.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const ThreeLinks = () => {
  return (
    <div className="flex justify-center gap-10 py-12 flex-wrap">
      <Link to="/blood-request">
        <img
          src="/assets/blood-request.png"
          alt="Blood Request"
          className="w-40 h-40 hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <Link to="/donate">
        <img
          src="/assets/donate.png"
          alt="Donate"
          className="w-40 h-40 hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <Link to="/find-donor">
        <img
          src="/assets/find-donor.png"
          alt="Find Donor"
          className="w-40 h-40 hover:scale-105 transition-transform duration-300"
        />
      </Link>
    </div>
  );
};

export default ThreeLinks;
