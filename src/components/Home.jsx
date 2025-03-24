import React, { useState, useCallback, useMemo } from 'react';
import BookCard from './BookCard';
import { useBookContext } from '../contexts/BookContext';
import './Home.scss';

const Home = () => {
  const [sortBy, setSortBy] = useState('relevance');
  const { books } = useBookContext();
  const totalItems = books.length;
  
  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);
  
  // Memoize the sorted books
  const sortedBooks = useMemo(() => {
    let sorted = [...books];
    
    switch(sortBy) {
      case 'price-low':
        sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Keep original order for relevance
        break;
    }
    
    return sorted;
  }, [sortBy, books]);
  
  const renderBookGrid = useMemo(() => {
    return (
      <div className="books-grid">
        {sortedBooks.map(book => (
          <div className="book-item" key={book._id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    );
  }, [sortedBooks]);
  
  return (
    <div className="home-page">
      <main className="content">
        <div className="books-section">
          <div className="section-header">
            <h1 className="section-title">Books <span className="item-count">({totalItems} items)</span></h1>
            
            <div className="sort-container">
              <select 
                className="sort-select"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="relevance">Sort by relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>
          
          {renderBookGrid}
          
          <div className="pagination">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
            <button className="page-btn">5</button>
            <button className="page-btn">6</button>
            <button className="page-btn">7</button>
            <button className="page-btn">8</button>
            <span className="page-separator">...</span>
            <button className="page-btn">18</button>
            <button className="page-btn next">
              <span>→</span>
            </button>
          </div>
        </div>
      </main>
      
      <footer className="site-footer">
        <p>Copyright © 2020, Bookstore Private Limited. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default React.memo(Home); 