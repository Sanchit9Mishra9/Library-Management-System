import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import "../css/Book.css";
const Books = ({ roleApp }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/book/books")
      .then((res) => {
        setBooks(res.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  let k = books.map((book) => book.author);
  return (
    <div className="book-list">
      {books.map((book) => {
        return <BookCard key={book._id} roleApp={roleApp} book={book} />;
      })}
    </div>
  );
};

export default Books;
