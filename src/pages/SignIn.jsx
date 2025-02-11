import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Power4 } from 'gsap/all';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const buttonRef = useRef(null);
  const socialRef = useRef(null);
  const switchRef = useRef(null);

  useEffect(() => {
    const animElements = [
      nameRef.current,
      emailRef.current,
      passwordRef.current,
      buttonRef.current
    ].filter(el => el !== null);
  
    if (animElements.length > 0) {
      gsap.from(animElements, {
        duration: 0.8,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        delay: 0.2,
        ease: Power4.easeOut
      });
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
  
    if (isSignUp) {
      // Filter nulls for email and password
      const emailPassword = [emailRef.current, passwordRef.current].filter(el => el);
      tl.to(emailPassword, {
        duration: 0.6,
        x: -30,
        opacity: 0,
        ease: Power4.easeIn
      })
        .to(emailPassword, {
          duration: 0,
          x: 30
        })
        .fromTo(nameRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.6, ease: Power4.easeOut }
        )
        .fromTo(
          emailPassword,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: Power4.easeOut },
          "-=0.4"
        );
    } else {
      tl.to(nameRef.current, {
        duration: 0.6,
        x: 30,
        opacity: 0,
        ease: Power4.easeIn
      })
        .to(
          [emailRef.current, passwordRef.current].filter(el => el),
          {
            duration: 0.6,
            x: 30,
            opacity: 0,
            ease: Power4.easeIn
          }
        )
        .to(
          [emailRef.current, passwordRef.current].filter(el => el),
          {
            duration: 0,
            x: -30
          }
        )
        .fromTo(
          [emailRef.current, passwordRef.current].filter(el => el),
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: Power4.easeOut },
          "-=0.4"
        );
    }
  
    tl.fromTo(
      [socialRef.current, switchRef.current].filter(el => el),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: Power4.easeOut },
      "-=0.3"
    );
  }, [isSignUp]);
  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = 'Invalid email address';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-purple-500/30 rounded-full"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Auth Card */}
      <div ref={formRef} className="relative z-10 bg-white/5 backdrop-blur-xl shadow-2xl w-full max-w-md p-8 rounded-3xl border border-white/10">
        <div className="flex justify-center mb-8">
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            DevCollab
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div ref={nameRef}>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input input-bordered w-full bg-white/5 text-white placeholder-white/50 border-white/10 focus:border-purple-400"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div ref={emailRef}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input input-bordered w-full bg-white/5 text-white placeholder-white/50 border-white/10 focus:border-purple-400"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div ref={passwordRef}>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input input-bordered w-full bg-white/5 text-white placeholder-white/50 border-white/10 focus:border-purple-400"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <div ref={buttonRef}>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-block bg-gradient-to-r from-purple-500 to-blue-500 border-none text-white hover:from-purple-600 hover:to-blue-600"
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : isSignUp ? (
                'Sign Up'
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <div ref={socialRef} className="divider my-6 text-white/30">OR</div>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn btn-outline btn-square border-white/20 hover:border-purple-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn btn-outline btn-square border-white/20 hover:border-purple-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 16 16">
              <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </motion.button>
        </div>

        <p ref={switchRef} className="mt-6 text-center text-white/70">
          {isSignUp ? 'Already have an account? ' : 'Need an account? '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;