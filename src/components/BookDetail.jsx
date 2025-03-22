import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import CustomerFeedback from './CustomerFeedback';
import './BookDetail.scss';

// Sample book data
const booksData = [
  {
    id: 1,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/dont-make-me-think.jpg",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    reviewsList: [
      {
        id: 1,
        user: {
          id: 'AC',
          name: 'Aniket Chile',
        },
        rating: 3,
        comment: "Good product. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct."
      },
      {
        id: 2,
        user: {
          id: 'SB',
          name: 'Shweta Bodkar',
        },
        rating: 4,
        comment: "Good product. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct."
      }
    ]
  },
  {
    id: 2,
    title: "React Material-UI",
    author: "Steve Krug",
    rating: 4.4,
    reviews: 30,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/react-material.jpg",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    reviewsList: []
  }
];

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we simulate finding the book by ID
    const foundBook = booksData.find(book => book.id === parseInt(id, 10));
    setBook(foundBook);
    setLoading(false);
  }, [id]);
  
  // Helper function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`star ${i <= rating ? 'filled' : 'empty'}`}
        >
          ★
        </span>
      );
    }
    
    return stars;
  };
  
  if (loading) {
    return (
      <div className="book-detail-page">
        <Navbar />
        <div className="loading">Loading...</div>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="book-detail-page">
        <Navbar />
        <div className="error-message">Book not found</div>
      </div>
    );
  }
  
  return (
    <div className="book-detail-page">
      <Navbar />
      
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="separator">/</span>
        <span className="current">Book({book.id})</span>
      </div>
      
      <div className="book-detail-container">
        <div className="book-detail-left">
          <div className="thumbnail-list">
            <div className="thumbnail active">
              <img src={book.image} alt={book.title} />
            </div>
            <div className="thumbnail">
              <img src="/images/books/dont-make-me-think.svg" alt="Alternate view" />
            </div>
          </div>
          
          <div className="main-image-container">
            <img src={book.image} alt={book.title} className="main-image" />
          </div>
          
          <div className="action-buttons">
            <button className="add-to-bag">ADD TO BAG</button>
            <button className="wishlist">
              <span className="heart-icon">♡</span> WISHLIST
            </button>
          </div>
        </div>
        
        <div className="book-detail-right">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author">by {book.author}</p>
          
          <div className="book-rating">
            <div className="rating-value">{book.rating}</div>
            <div className="rating-stars">{renderStars(book.rating)}</div>
            <div className="review-count">({book.reviews})</div>
          </div>
          
          <div className="book-price">
            <span className="current-price">Rs.{book.price}</span>
            <span className="original-price">Rs.{book.originalPrice}</span>
          </div>
          
          <div className="book-detail-section">
            <h3 className="section-title">• Book Detail</h3>
            <p className="book-description">{book.description}</p>
          </div>
          
          <CustomerFeedback bookId={book.id} reviews={book.reviewsList} />
        </div>
      </div>
    </div>
  );
};

export default BookDetail; 