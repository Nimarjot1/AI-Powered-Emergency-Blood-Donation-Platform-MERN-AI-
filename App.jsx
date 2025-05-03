import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SignIn from './components/SignIn';
import OtpVerification from './components/OtpVerification';
import DonorForm from './components/DonorForm';  
import FindDonor from './components/Finddonor';

function App() {
  return (
    <Router>
      <div className="pt-16">
        <Navbar />

        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/donate" element={<DonorForm />} />
          <Route path="/find-donor" element={<FindDonor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;