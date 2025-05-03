// src/pages/HeroSection.jsx

import React, { useEffect } from 'react';
import { Lightbulb, Pencil } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const StepCard = ({ number, text, animation }) => (
  <div className="flex flex-col items-center relative" data-aos={animation}>
    <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center font-bold text-3xl bg-white absolute -top-5 z-10">
      {number}
    </div>
    <div className="bg-white p-10 rounded-full shadow-2xl w-[380px] h-[380px] flex flex-col items-center justify-center text-center">
      <Pencil className="w-12 h-12 mb-4 text-black" />
      <p className="text-red-800 font-medium text-lg">{text}</p>
    </div>
  </div>
);

const HeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-green-50 flex flex-col items-center px-6 py-20 space-y-16 overflow-y-auto">

      {/* Info Box */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm max-w-md w-full flex items-start gap-3" data-aos="fade-right">
        <Lightbulb className="w-6 h-6 text-yellow-500 mt-1" />
        <div>
          <div className="font-semibold text-gray-800">Heads up!</div>
          <p className="text-gray-600 text-sm">
            Your blood donation can save a life and help others.
          </p>
        </div>
      </div>

      {/* Donate Now Button */}
      <button
        onClick={() => navigate('/donate')}
        className="bg-white shadow-md px-8 py-3 rounded-full font-semibold text-gray-700 hover:shadow-lg transition cursor-pointer"
        data-aos="fade-left"
      >
        DONATE NOW
      </button>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-center" data-aos="fade-up">
        Save Lives <span className="text-red-700">Step Up</span>
      </h1>

      {/* Subtext */}
      <p className="text-gray-700 text-center max-w-2xl" data-aos="fade-up">
        Donate blood to save lives. Your blood donation can save a life and help
        others to live a better life and make a better future for their families.
      </p>

      {/* Our Mission Section */}
      <div className="w-full bg-white py-16 px-6 rounded-xl shadow-sm" data-aos="fade-up">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold text-red-700">Our Mission</h2>
          <p className="text-gray-800 text-xl leading-relaxed">
            Our mission is to address the critical need for blood supply in the country by connecting donors and recipients.
            We provide a seamless platform for blood donations, bridging the gap in the supply chain. With a reliable system,
            through compassion and unity, we inspire more donors, saving lives one donation at a time.
          </p>
        </div>
      </div>

      {/* How to Get Blood Section */}
      <div className="w-full py-24 px-6 relative" data-aos="fade-up">
        <h2 className="text-5xl font-bold text-center text-red-700 mb-24">
          How to get Blood?
        </h2>

        <div className="relative w-full max-w-6xl mx-auto h-[600px]">
          {/* Center Heart Image */}
          <div className="absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center" data-aos="zoom-in">
            <img
              src="/assets/connect.png"
              alt="Center"
              className="w-[300px] h-[200px] object-contain mb-4"
            />
            <hr className="w-300 border-t-2 border-gray-400 rounded-full" />
          </div>

          {/* Step 1 - Top */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <StepCard
              number="1"
              text="Donate blood and save lives, your contribution can make a difference."
              animation="fade-up"
            />
          </div>

          {/* Step 2 - Bottom Left */}
          <div className="absolute bottom-0 left-0">
            <StepCard
              number="2"
              text="Help those in need by donating blood, a selfless act of kindness"
              animation="fade-right"
            />
          </div>

          {/* Step 3 - Bottom Right */}
          <div className="absolute bottom-0 right-0">
            <StepCard
              number="3"
              text="Need blood? Connect with blood banks or donors to get the support you require"
              animation="fade-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
