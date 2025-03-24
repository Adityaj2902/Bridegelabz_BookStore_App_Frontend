import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBookContext } from '../contexts/BookContext';
import useImageLoader from '../utils/useImageLoader';
import './WishlistContainer.scss';

const WishlistItem = React.memo(({ book, onRemove, onMoveToCart }) => {
  const { loading, currentSrc } = useImageLoader(
    book.bookImage,
    '/images/placeholder.svg'
  );

  return (
    <div className="wishlist-item">
      <div className="item-image">
        <img 
          src={currentSrc} 
          alt={book.bookName} 
          className={loading ? 'loading' : ''}
        />
      </div>
      
      <div className="item-details">
        <h3 className="item-title">{book.bookName}</h3>
        <p className="item-author">by {book.author}</p>
        <p className="item-price">
          Rs. {book.discountPrice || book.price} 
          {book.price && book.discountPrice && book.price > book.discountPrice && (
            <span className="original-price">Rs. {book.price}</span>
          )}
        </p>
        
        <div className="item-actions">
          <button 
            className="move-to-cart-btn"
            onClick={() => onMoveToCart(book._id)}
          >
            Move to Cart
          </button>
          
          <button 
            className="remove-btn"
            onClick={() => onRemove(book._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
});

const WishlistContainer = () => {
  const { wishlist, removeFromWishlist, addToCart, getBookById } = useBookContext();
  
  const wishlistItems = useMemo(() => {
    return wishlist.map(id => {
      const book = getBookById(id);
      return book;
    }).filter(Boolean);
  }, [wishlist, getBookById]);
  
  const handleMoveToCart = (bookId) => {
    addToCart(bookId);
    removeFromWishlist(bookId);
  };
  
  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="separator">/</span>
          <span className="current">My Wishlist</span>
        </div>
        
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <h2>Your wishlist is empty</h2>
            <p>Save items to your wishlist to purchase them later</p>
            <Link to="/" className="shop-now-btn">Shop Now</Link>
          </div>
        ) : (
          <>
            <h1 className="wishlist-title">My Wishlist ({wishlistItems.length} items)</h1>
            
            <div className="wishlist-items-list">
              {wishlistItems.map((book) => (
                <WishlistItem 
                  key={book._id}
                  book={book}
                  onRemove={removeFromWishlist}
                  onMoveToCart={handleMoveToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistContainer; 