// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignUp from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Home/:userId" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
