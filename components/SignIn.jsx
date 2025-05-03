import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Lock, ArrowLeft, User } from 'lucide-react';  // Added User icon for profile
import { motion } from 'framer-motion';

const SignIn = () => {
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state

  useEffect(() => {
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

  const handleSignIn = () => {
    if (!mobile || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    console.log('User signed in');
    setIsLoggedIn(true);  // Mark the user as logged in
    navigate('/');  // Navigate to home page after login
  };

  const handleForgetPassword = () => {
    if (!mobile) {
      setError('Please enter your mobile number to continue.');
      return;
    }
    setError('');
    navigate('/otp-verification');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);  // Mark the user as logged out
  };

  return (
    <motion.div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-between px-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: 'easeInOut' }}
    >
      <motion.button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 text-white hover:text-red-400 transition"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      <motion.div
        className="text-white max-w-xl z-10"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1.4, ease: 'easeOut' }}
      >
        <h1 className="text-6xl lg:text-7xl font-extrabold tracking-wide leading-tight">
          SAVE <br /> LIVES
        </h1>
        <p className="text-2xl mt-4 font-light">Step Up</p>
        <p className="text-xl mt-4 font-light">"Every drop counts — be the reason someone lives today."</p>
      </motion.div>

      <motion.div
        className="bg-gray-50 p-6 rounded-2xl shadow-xl w-full max-w-sm z-10"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.4, ease: 'easeOut' }}
      >
        <motion.div
          className="flex flex-col items-center space-y-2 mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <img src="/assets/chatbot-logo.png" alt="SaveLife Logo" className="w-16 h-16" />
          <h1 className="text-2xl font-semibold text-red-600">SaveLife</h1>
        </motion.div>

        <div className="text-center space-y-2 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Hello! Welcome Back</h2>
          <p className="text-gray-600 text-sm">Sign in to your Account</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

        <motion.div
          className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Phone className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number"
            className="bg-transparent outline-none w-full"
          />
        </motion.div>

        <motion.div
          className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <Lock className="w-5 h-5 text-gray-500" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent outline-none w-full"
          />
        </motion.div>

        <div className="flex justify-between items-center text-sm mb-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-red-600" />
            Remember me
          </label>
          <button
            onClick={handleForgetPassword}
            className="text-red-600 hover:underline"
          >
            Forget password?
          </button>
        </div>

        {!isLoggedIn ? (
          <motion.button
            onClick={handleSignIn}
            className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Sign In
          </motion.button>
        ) : (
          <motion.button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <User className="w-6 h-6 inline-block mr-2" /> Log Out
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SignIn;
