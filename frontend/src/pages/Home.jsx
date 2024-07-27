import React, { useEffect, useState } from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://api.unsplash.com/photos/random/?query=library&client_id=${import.meta.env.VITE_SECRET}`);
        setImage(res.data.urls.raw);
      } catch (error) {
        console.error("Unable to load home image:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='Home-Page bg-dark text-white container-fluid d-flex justify-content-center align-items-center'>
      <div className='row container'>
        <div className='col-lg-6 d-flex justify-content-center align-items-start flex-column' style={{height: "91.5vh"}}>
          <h2 style={{fontSize: "70px"}}>Book Store</h2>
          <h3 style={{fontSize: "40px"}}>By Preet</h3>
          <p className='mb-0' style={{color: "silver"}}>Checkout Available Books Here</p>
          <Link to="/books" className='viewBook my-3'>View Books <span></span><span></span><span></span><span></span></Link>
        </div>
        <div className='col-lg-6 d-flex justify-content-center align-items-end flex-column' style={{height: "91.5vh"}}>
          <img src={image} alt="logo" className='image-fluid homeimg' />
        </div>
      </div>
    </div>
  );
}
