import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import "./Button.css";
import axios from 'axios';

export default function AddBooks() {
  const initialFormData = {
    bookName: "",
    author: "",
    description: "",
    price: "",
    image: null
  };

  const [data, setData] = useState(initialFormData);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('bookName', data.bookName);
    formData.append('author', data.author);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('image', data.image); 

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/users/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res);
      setData(initialFormData);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  const change = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
  
      setData({ ...data, [name]: files[0] }); 
    } else {
      setData({ ...data, [name]: value });
    }
  }

  return (
    <div className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: "91.5vh" }}>
      <div className='container p-4'>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1 ">
            <Form.Label style={{ color: "white" }}>Book Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your Book Name" name="bookName" onChange={change} value={data.bookName} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1 ">
            <Form.Label style={{ color: "white" }}>Author</Form.Label>
            <Form.Control type="text" placeholder="Enter the Author Name" name="author" onChange={change} value={data.author} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1 ">
            <Form.Label style={{ color: "white" }}>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter the description" name="description" onChange={change} value={data.description} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1 ">
            <Form.Label style={{ color: "white" }}>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter your Book Price" name="price" onChange={change} value={data.price} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1 ">
            <Form.Label style={{ color: "white" }}>Book Cover</Form.Label>
            <Form.Control type="file" name="image" onChange={change} />
          </Form.Group>
        </Form>
        <button type='submit' className='button' onClick={submit}>Submit</button>
      </div>
    </div>
  )
}
