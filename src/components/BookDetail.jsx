import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import CustomerFeedback from './CustomerFeedback';
import { useBookContext } from '../contexts/BookContext';
import useImageLoader from '../utils/useImageLoader';
import { getBookById as getBookByIdApi } from '../utils/backend.api';
import './BookDetail.scss';

const BookDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { addToCart, addToWishlist, getBookById } = useBookContext();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchBook = async () => {
      setLoading(true);
      try {
        // First try to fetch from API
        const bookData = await getBookByIdApi(id);
        
        if (isMounted) {
          setBook(bookData);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching book from API:', err);
        
        if (isMounted) {
          // Fallback to context if API fails
          const contextBook = getBookById(id);
          
          if (contextBook) {
            setBook(contextBook);
          } else {
            setError('Book not found');
          }
          setLoading(false);
        }
      }
    };
    
    fetchBook();
    
    return () => {
      isMounted = false;
    };
  }, [id, getBookById]);
  
  // Use our custom image loader hook for optimized image loading
  const { loading: imageLoading, currentSrc } = useImageLoader(
    book?.bookImage,
    '/images/placeholder.svg'
  );
  
  // Memoized handlers
  const handleAddToCart = useCallback(() => {
    if (book) {
      addToCart(book._id);
    }
  }, [book, addToCart]);
  
  const handleAddToWishlist = useCallback(() => {
    if (book) {
      addToWishlist(book._id);
    }
  }, [book, addToWishlist]);
  
  // Helper function to render stars based on rating - memoized
  const renderStars = useCallback((rating) => {
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
  }, []);
  
  // Memoize the component rendering based on loading state
  const renderContent = useMemo(() => {
    if (loading) {
      return (
        <div className="book-detail-page">
          <div className="loading">Loading...</div>
        </div>
      );
    }
    
    if (error || !book) {
      return (
        <div className="book-detail-page">
          <div className="error-message">{error || 'Book not found'}</div>
        </div>
      );
    }
    
    return (
      <div className="book-detail-page">
        <div className="breadcrumb">
          <Link to="/dashboard" className="breadcrumb-link">Home</Link>
          <span className="separator">/</span>
          <span className="current">Book({book._id})</span>
        </div>
        
        <div className="book-detail-container">
          <div className="book-detail-left">
            <div className="thumbnail-list">
              <div className="thumbnail active">
                <img 
                  src={currentSrc} 
                  alt={book.bookName} 
                  className={imageLoading ? 'loading' : ''}
                />
              </div>
              <div className="thumbnail">
                <img src="/images/books/dont-make-me-think.svg" alt="Alternate view" />
              </div>
            </div>
            
            <div className="main-image-container">
              <img 
                src={currentSrc} 
                alt={book.bookName} 
                className={`main-image ${imageLoading ? 'loading' : ''}`}
              />
            </div>
            
            <div className="action-buttons">
              <button 
                className="add-to-bag"
                onClick={handleAddToCart}
              >
                ADD TO BAG
              </button>
              <button 
                className="wishlist"
                onClick={handleAddToWishlist}
              >
                <span className="heart-icon">♡</span> WISHLIST
              </button>
            </div>
          </div>
          
          <div className="book-detail-right">
            <h1 className="book-title">{book.bookName}</h1>
            <p className="book-author">by {book.author}</p>
            
            <div className="book-rating">
              <div className="rating-value">{book.rating || 0}</div>
              <div className="rating-stars">{renderStars(book.rating || 0)}</div>
              <div className="review-count">({book.reviews || 0})</div>
            </div>
            
            <div className="book-price">
              <span className="current-price">Rs.{book.discountPrice || book.price}</span>
              {book.discountPrice && book.price > book.discountPrice && (
                <span className="original-price">Rs.{book.price}</span>
              )}
            </div>
            
            <div className="book-detail-section">
              <h3 className="section-title">• Book Detail</h3>
              <p className="book-description">{book.description}</p>
            </div>
            
            <CustomerFeedback bookId={book._id} reviews={book.reviewsList || []} />
          </div>
        </div>
      </div>
    );
  }, [book, loading, error, renderStars, imageLoading, currentSrc, handleAddToCart, handleAddToWishlist]);
  
  return renderContent;
};

export default React.memo(BookDetail); 