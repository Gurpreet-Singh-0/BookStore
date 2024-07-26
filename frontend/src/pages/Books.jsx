import React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios";
import BookSection from '../components/BookSection';

export default function Books() {
  const[data,setData] = useState();
    useEffect(()=>{
      const fetchData = async()=>{
        await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/users/getBooks`).then((data)=>{setData(data.data.data)
          // console.log(data.data.data)
          // console.log(Array.isArray(data.data.data))
        });
      }
      fetchData();
    }) 

  return (

    <div className='bg-dark' style={{minHeight:"91.5vh"}}>
      <div className='d-flex justify-content-center align-items-center py-3'>
      <h4 className='text-white'>Books Section</h4>
      </div>
      {data? (<div className='text-white'>
        <BookSection data={data} />
        </div>):
      (<div>Loading...</div>)}
    </div>
  )
}
