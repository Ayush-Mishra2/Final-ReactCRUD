import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookList.css";
const BookList = ({ books, deleteBook, setSelectedBook }) => {
  const navigate = useNavigate();

  const handleUpdate = (book) => {
    setSelectedBook(book); // Set the selected book for editing
    navigate("/add"); // Navigate to the add/edit form
  };

  return (
    <div>
      <h2>Books:</h2>
      <table className="book-table">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Description</th>
            <th>Author</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.BookName}</td>
              <td>{book.Description}</td>
              <td>{book.Author}</td>
              <td>{book.Comment}</td>
              <td>{book.Status}</td>
              <td>
                <button onClick={() => handleUpdate(book)}>Update</button>
                <button onClick={() => deleteBook(book._id)} style={{ marginLeft: '8px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;