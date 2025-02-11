import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = false;
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if(latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    });

  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ 
      opacity: hidden ? 0 : 1,
      y: hidden ? -20 : 0
    }}
    transition={{ 
      duration: 0.3,
      ease: "easeInOut"
    }}
    className="navbar bg-base-200 shadow-xl px-6 md:px-10 rounded-[2rem] fixed top-6 left-0 right-0 mx-auto w-full max-w-[95%] z-50 border border-neutral/10 h-20"
    >
      {/* Left side */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevCollab</Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <input 
            type="text" 
            placeholder="Search..." 
            className="input input-bordered input-sm" 
          />
        </div>

        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img 
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                  alt="Profile" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li>
                <button onClick={() => console.log('Logout')}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signin')}
              className="btn btn-primary btn-sm"
            >
              Sign In
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NavBar;