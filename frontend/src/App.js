import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./App.css";
import yourImage from './librarybg.jpg';

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // New state for selected book

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/books");
    setBooks(res.data);
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    fetchBooks();
  };

  const updateBook = async (id, updatedBookData) => {
    await axios.put(`http://localhost:5000/books/${id}`, updatedBookData);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Router>
      <img src={yourImage} alt="Library" style={{ width: '100%', height: '10%' }} />
      <div className="container">
        <h1>Library Management</h1>

        <nav className="nav">
          <Link to="/">Book List</Link>&nbsp;
          <Link
            to="/add"
            onClick={() => setSelectedBook(null)} // Reset selectedBook when adding a new book
          >
            Add Book
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <BookList
                books={books}
                deleteBook={deleteBook}
                setSelectedBook={setSelectedBook} // Pass selectedBook setter
              />
            }
          />
          <Route
            path="/add"
            element={
              <BookForm
                fetchBooks={fetchBooks}
                selectedBook={selectedBook} // Pass selectedBook
                updateBook={updateBook}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
