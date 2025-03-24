import React, { useCallback } from 'react';
import useImageLoader from '../utils/useImageLoader';

const CartItemComponent = React.memo(({ item, updateQuantity, removeItem }) => {
  // Use image loader for optimized loading
  const { loading, currentSrc } = useImageLoader(
    item.bookImage,
    '/images/placeholder.svg'
  );

  const handleIncrease = useCallback(() => {
    updateQuantity(item.id, item.quantity + 1);
  }, [item.id, item.quantity, updateQuantity]);

  const handleDecrease = useCallback(() => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  }, [item.id, item.quantity, updateQuantity]);

  const handleRemove = useCallback(() => {
    removeItem(item.id);
  }, [item.id, removeItem]);

  return (
    <div className="cart-item">
      <div className="item-image">
        <img 
          src={currentSrc} 
          alt={item.bookName} 
          className={loading ? 'loading' : ''}
        />
      </div>
      
      <div className="item-details">
        <h3 className="item-title">{item.bookName}</h3>
        <p className="item-author">by {item.author}</p>
        <p className="item-price">
          Rs. {item.discountPrice || item.price} 
          {item.price && item.discountPrice && item.price > item.discountPrice && (
            <span className="original-price">Rs. {item.price}</span>
          )}
        </p>
        
        <div className="item-actions">
          <div className="quantity-controls">
            <button 
              className="quantity-btn minus" 
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <input 
              type="text" 
              className="quantity-input" 
              value={item.quantity} 
              readOnly 
            />
            <button 
              className="quantity-btn plus" 
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
          
          <button 
            className="remove-btn"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
});

export default CartItemComponent; 