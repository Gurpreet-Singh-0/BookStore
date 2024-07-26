import React from 'react'
import Form from 'react-bootstrap/Form';
import "./Button.css"

export default function AddBooks() {
  return (
    <div className='bg-dark d-flex justify-content-center align-items-center' style={{minHeight:"91.5vh"}}>
        <div className='container p-4'>
         <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1 ">
        <Form.Label style={{color:"white"}}>Book Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your Book Name" />
      </Form.Group>


      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1 ">
        <Form.Label style={{color:"white"}}>Author</Form.Label>
        <Form.Control type="text" placeholder="Enter the Author Name" />
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1 ">
        <Form.Label style={{color:"white"}}>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter the description" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1 ">
        <Form.Label style={{color:"white"}}>Price</Form.Label>
        <Form.Control type="number" placeholder="Enter your Book Price" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1 ">
        <Form.Label style={{color:"white"}}>Book Cover</Form.Label>
        <Form.Control type="file" placeholder="Enter Image of the Book" />
      </Form.Group>

    </Form>
    <button type='submit' className='button'>Submit</button>
    </div>
    </div>
  )
}
