import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OtpVerification = () => {
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);

  const [timeLeft, setTimeLeft] = useState(50); // ⏱️ Timer set to 50 seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });

    if (!vantaEffect.current && window.VANTA && window.VANTA.TRUNK) {
      vantaEffect.current = window.VANTA.TRUNK({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0x222426,
        color: 0x98465f,
        spacing: 0,
        chaos: 1,
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  // ⏳ Countdown Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const secs = timeLeft % 60;
    return `00:${secs < 10 ? '0' : ''}${secs} left`;
  };

  const handleResend = () => {
    console.log('OTP resent!');
    setTimeLeft(50); // Reset timer
    setCanResend(false);
    // API call to resend OTP can go here
  };

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    if (otp.some((d) => d === '')) return alert('Please enter the full OTP');
    console.log('OTP entered:', otp.join(''));
    // Navigate to next screen
  };

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-between px-8 relative overflow-hidden"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/signin')}
        className="absolute top-6 left-6 z-20 text-white hover:text-red-400 transition"
        data-aos="fade-right"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Left Side Text */}
      <div className="text-white max-w-xl z-10" data-aos="fade-left">
        <h1 className="text-6xl lg:text-7xl font-extrabold tracking-wide leading-tight">
          VERIFY <br /> OTP
        </h1>
        <p className="text-2xl mt-4 font-light" data-aos="fade-up" data-aos-delay="100">
          Security First
        </p>
        <p className="text-xl mt-4 font-light" data-aos="fade-up" data-aos-delay="200">
          "Enter the 4-digit code we sent to your mobile."
        </p>
      </div>

      {/* OTP Card */}
      <div
        className="bg-gray-50 p-6 rounded-2xl shadow-xl w-full max-w-sm z-10 text-center"
        data-aos="zoom-in"
      >
        <div className="flex flex-col items-center space-y-2 mb-6" data-aos="fade-down">
          <img src="/assets/chatbot-logo.png" alt="SaveLife Logo" className="w-16 h-16" />
          <h1 className="text-2xl font-semibold text-red-600">SaveLife</h1>
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-2" data-aos="fade-up">
          Enter 4-digit OTP
        </h2>
        <p className="text-sm text-gray-600 mb-4" data-aos="fade-up" data-aos-delay="100">
          We’ve sent a code to your registered mobile number
        </p>

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-3 mb-4" data-aos="zoom-in-up" data-aos-delay="200">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl outline-none focus:ring-2 focus:ring-red-500"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>

        {/* Timer or Resend Option */}
        <div className="text-sm mb-6 text-gray-700" data-aos="fade-up">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-red-600 font-semibold hover:underline"
            >
              Resend Code
            </button>
          ) : (
            <span>⏱️ {formatTime()}</span>
          )}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-700 transition"
          data-aos="fade-up"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
