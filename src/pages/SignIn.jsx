import { motion } from 'framer-motion';
import { useState } from 'react';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-30"
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, x: isSignUp ? -100 : 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isSignUp ? 100 : -100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-lg shadow-xl w-[400px] p-8 rounded-2xl border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {/* Form Inputs */}
        <form className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full bg-white/20 text-white"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full bg-white/20 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full bg-white/20 text-white"
          />
          <button className="btn btn-primary w-full">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Continue with Options */}
        <div className="mt-4 text-center space-y-2">
          <p className="text-white/70">or continue with</p>
          <div className="flex justify-center gap-4">
            <button className="btn btn-outline border-white/20 text-white">
              Google
            </button>
            <button className="btn btn-outline border-white/20 text-white">
              GitHub
            </button>
          </div>
        </div>

        {/* Toggle Sign In/Sign Up */}
        <div className="mt-4 text-center">
          <p
            className="text-white/70 cursor-pointer hover:text-white transition"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
