import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SignUp = ({ onToggle }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up attempt with:', name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-80 w-full max-w-4xl flex rounded-3xl shadow-2xl overflow-hidden backdrop-filter backdrop-blur-lg">
        <motion.div 
          className="w-full lg:w-1/2 p-12 space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold text-blue-800 mb-4">Create Account</h2>
          <p className="text-blue-600 mb-8">Sign up for a new account</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm font-bold text-blue-700 block mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-bold text-blue-700 block mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold text-blue-700 block mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-bold hover:opacity-90 transition duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center">
            <p className="text-sm text-blue-600">Already have an account? 
              <button onClick={onToggle} className="text-blue-800 hover:text-blue-900 ml-1 font-bold">Sign in</button>
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 p-12 hidden lg:block relative"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="absolute inset-0 bg-white opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-white text-6xl font-bold mb-6">Hello, Friend!</h2>
            <p className="text-blue-100 text-lg mb-8">
              Enter your personal details and start your journey with us
            </p>
            <button 
              onClick={onToggle} 
              className="bg-transparent border-2 border-white text-white py-3 px-6 rounded-full font-bold hover:bg-white hover:text-blue-600 transition duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;