import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden  ">
      {/* Background layers */}
      <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#152a2a] via-[#1a1f2e] to-[#2e1a1a] opacity-20" />
      </div>

      {/* Animated floating elements */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 bg-white/10 rounded-lg rotate-45"
            initial={{ y: 0, x: 0 }}
            animate={{ 
              y: [0, -40, 0],
              x: [-10, 10, -10]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Build Your Dream Team
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Connect with talented developers, showcase your projects, and collaborate on amazing ideas. Whether you're building the next big thing or looking to join exciting ventures - start here.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all"
            >
              Find Projects
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all"
            >
              Post Project
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
          className="mt-12 grid grid-cols-3 max-w-md mx-auto gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >

            {[
              { value: '1k+', label: 'Active Projects' },
              { value: '5k+', label: 'Developers' },
              { value: '200+', label: 'Successful Teams' }
            ].map((stat, index) => (
              <div key={index} className="text-center px-2">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
