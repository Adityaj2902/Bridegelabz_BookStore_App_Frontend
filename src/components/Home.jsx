import React, { useState } from 'react';
import Navbar from './Navbar';
import BookCard from './BookCard';
import './Home.scss';

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
    image: "/images/books/dont-make-me-think.jpg"
  },
  {
    id: 2,
    title: "React Material-UI",
    author: "Steve Krug",
    rating: 4.4,
    reviews: 30,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/react-material.jpg"
  },
  {
    id: 3,
    title: "Mastering SharePoint Framework",
    author: "Steve Krug",
    rating: 4.4,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/sharepoint.jpg"
  },
  {
    id: 4,
    title: "UX For DUMMIES",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/ux-dummies.jpg",
    outOfStock: true
  },
  {
    id: 5,
    title: "UX Design",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/ux-design.jpg"
  },
  {
    id: 6,
    title: "Group Decisions",
    author: "Steve Krug",
    rating: 4.6,
    reviews: 25,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/group-decisions.jpg"
  },
  {
    id: 7,
    title: "Lean UX",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 25,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/lean-ux.jpg"
  },
  {
    id: 8,
    title: "The Design of Everyday Things",
    author: "Steve Krug",
    rating: 4.5,
    reviews: 20,
    price: 1500,
    originalPrice: 2000,
    image: "/images/books/design-everyday.jpg"
  },
];

const Home = () => {
  const [sortBy, setSortBy] = useState('relevance');
  const totalItems = booksData.length;
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  return (
    <div className="home-page">
      <Navbar />
      
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
          
          <div className="books-grid">
            {booksData.map(book => (
              <div className="book-item" key={book.id}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
          
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

export default Home; 