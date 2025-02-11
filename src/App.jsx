// App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  const location = useLocation();
  const hideNavbar = ['/signin', '/signup'].includes(location.pathname);

  return (
    <>
      <div className="app-wrapper">
      {!hideNavbar && <NavBar />}
      <main className="flex-grow">
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </AnimatePresence>
      </main>
      </div>
    </>
  );
}

export default App;