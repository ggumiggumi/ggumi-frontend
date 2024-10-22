import React from "react";
import PropTypes from "prop-types";
import "../styles/BookItem.css";

const BookItem = ({ book }) => {
  return (
    <div className="searched-book-item">
      <img src={book.image} alt={book.title} className="searched-book-image" />
      <div className="searched-book-details">
        <p className="searched-book-title">{book.title}</p>
        <p className="searched-book-author">
          {book.author} | {book.publisher} | {book.date}
        </p>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookItem;
