// src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../Styles/Home.css'

const Home = () => {
    const { userId } = useParams();
    const [homeData, setHomeData] = useState({
      name: '',
      age: '',
      gender: '',
      dob: '',
      mobile: '',
    });
  
    const [isEditMode, setIsEditMode] = useState(false);
  
    useEffect(() => {
        console.log('User ID:', userId);
        const fetchHome = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/Home/${userId}`);
            if (response.data) {
              setHomeData(response.data);
              setIsEditMode(!response.data.age && !response.data.gender && !response.data.dob && !response.data.mobile);
            } else {
              setIsEditMode(true);
            }
          } catch (error) {
            console.error(error.response.data.message);
          }
        };
      
        fetchHome();
      }, [userId]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setHomeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSave = async () => {
      try {
        await axios.put(`http://localhost:5000/Home/${userId}`, homeData);
        setIsEditMode(false);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

  return (
    <div className='home'>
      <div className='container'>
      {isEditMode ? (
        <>
        <h2>welcome {homeData.name}</h2>
        <form onSubmit={handleSave}>
          <label>
            Age:
          </label>
          <input type="text" name="age" value={homeData.age} onChange={handleInputChange} />
          <label>
            Gender:
          </label>
          <input type="text" name="gender" value={homeData.gender} onChange={handleInputChange} />
          <label>
            DOB:
          </label>
          <input type="text" name="dob" value={homeData.dob} onChange={handleInputChange} />
          <label>
            Mobile:
          </label>
          <input type="text" name="mobile" value={homeData.mobile} onChange={handleInputChange} />
          <button type="submit">Save</button>
          </form>
        </>
      ) : (
        <>
        <div className='details'>
          <h2>User details</h2>
          <p>Name: {homeData.name}</p>
          <p>Age: {homeData.age}</p>
          <p>Gender: {homeData.gender}</p>
          <p>DOB: {homeData.dob}</p>
          <p>Mobile: {homeData.mobile}</p>
          </div>
          <Link to='/'><button>Signout</button></Link>
        </>
      )}
      </div>
    </div>
  );
};

export default Home;
