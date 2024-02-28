// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Login.css'

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/', formData);
      if (response && response.data) {
        console.log(response.data);
        navigate(`/Home/${response.data.userId}`);
      } else {
        alert('Response data is undefined.');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='LoginPage'>
      <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>
      <p>Dont have an account? <Link to = '/signup'>signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
