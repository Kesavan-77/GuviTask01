// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';
import '../Styles/Signup.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password!==formData.confirmPassword){
      alert("Password does not match");
    }
    else{
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  };

  return (
    <div className='signup'>
      <div className='container'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} required/>

        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} required/>

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required/>

        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" onChange={handleChange} required/>

        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to = '/'>login</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
