// BookCard.js
import React from 'react';
import '../styles/BookCard.css'; 

const BookCard = ({ title, image }) => {
    return (
        <div className="book-card">
            <img src={image} alt={title} className="book-image" />
        </div>
    );
};

export default BookCard;