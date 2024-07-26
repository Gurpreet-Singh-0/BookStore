import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-dark" style={{
      border: "3px solid yellowgreen",
      borderRadius: "8px" 
    }}>
      <Container>
        <Navbar.Brand href="/" style={{ color: 'white' }}>Book Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>HOME</Link>
            <Link to="/books" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>BOOKS</Link>
            <Link to="/addBooks" style={{ color: 'white', textDecoration: 'none' }}>ADD BOOK</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
