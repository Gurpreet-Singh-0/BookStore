import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookSection({ data }) {
  const [books, setBooks] = useState(data);
  const [editingBook, setEditingBook] = useState(null);
  const [updatedBook, setUpdatedBook] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    setBooks(data);
  }, [data]);

  const handleEdit = (book) => {
    setEditingBook(book);
    setUpdatedBook({ ...book }); // Initialize with current book details
    setFile(null); // Reset file input
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = updatedBook.image;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const uploadResponse = await axios.patch(`${import.meta.env.VITE_SERVER}/api/v1/users/updateImg/${updatedBook._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadResponse.data.url; // Assuming the response contains the new image URL
      }

      const response = await axios.put(`${import.meta.env.VITE_SERVER}/api/v1/users/updateBook/${updatedBook._id}`, {
        ...updatedBook,
        image: imageUrl
      });
      
      const updatedBooks = books.map((book) =>
        book._id === response.data.data._id ? response.data.data : book
      );
      setBooks(updatedBooks);
      setEditingBook(null); // Close the form after update
    } catch (error) {
      console.error("Error updating book", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/api/v1/users/deleteBook/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <div className='d-flex justify-content-around align-items-center flex-wrap my-3'>
      {editingBook && (
        <div className="update-form">
          <h4>Update Book</h4>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Book Name</label>
              <input
                type="text"
                name="bookName"
                className="form-control"
                value={updatedBook.bookName || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                type="text"
                name="author"
                className="form-control"
                value={updatedBook.author || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                value={updatedBook.description || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={updatedBook.price || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
              />
              {updatedBook.image && !file && (
                <img src={updatedBook.image} alt="Current" style={{ width: '100px', marginTop: '10px' }} />
              )}
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingBook(null)}>Cancel</button>
          </form>
        </div>
      )}

      {books && books.map((item) => (
        <div key={item._id} className="card" style={{ width: "18rem", margin: "1rem" }}>
          <img className="card-img-top" src={item.image} alt={item.bookName} style={{ height: "12rem", objectFit: "cover" }} />
          <div className="card-body">
            <h5 className="card-title">{item.bookName}</h5>
            <p>By {item.author}</p>
            <p className="card-text">{item.description}</p>
            <a
              target='_blank'
              rel="noopener noreferrer"
              href="https://www.amazon.in/s?k=amazon+prime+membership"
              className="btn btn-primary"
            >
              ₹ {item.price}
            </a>
            <div className='mt-2 d-flex justify-content-center justify-content-around'>
              <button className='btn btn-success me-3' onClick={() => handleEdit(item)}>Update</button>
              <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
