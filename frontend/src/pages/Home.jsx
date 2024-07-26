import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <div className='Home-Page bg-dark text-white container-fluid d-flex justify-content-center align-items-center'>
      <div className='row container'>
    <div className='col-lg-6 d-flex justify-content-center align-items-start flex-column'
    style={{height:"91.5vh"}}>
      <h2 style={{fontSize:"70px"}}>Book Store </h2>
      <h3 style={{fontSize:"40px"}}>By Preet</h3>
      <p  className='mb-0' style={{color:"silver"}}>Checkout Available Books Here</p>
      <Link to="/books" className='viewBook my-3'>View Books <span></span><span></span><span></span><span></span></Link>
    </div>
    <div className='col-lg-6 d-flex justify-content-center align-items-end flex-column'
    style={{height:"91.5vh"}}>
     
     <img src="https://images.unsplash.com/photo-1494809610410-160faaed4de0?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="logo"
     className='image-fluid homeimg' />
    </div>
      </div>
    </div>
  )
}
