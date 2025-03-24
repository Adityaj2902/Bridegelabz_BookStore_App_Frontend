import React from 'react';

const OrderSummaryComponent = React.memo(({ 
  cartItems, 
  subtotal, 
  discount, 
  total,
  onCheckout,
  buttonText = "CHECKOUT"
}) => {
  if (!cartItems.length) return null;

  return (
    <div className="order-summary-wrapper">
      <h2 className="section-title">Order Summary</h2>
      
      <div className="summary-row">
        <span className="label">Price ({cartItems.length} items)</span>
        <span className="value">Rs. {subtotal.toFixed(2)}</span>
      </div>
      
      <div className="summary-row">
        <span className="label">Discount</span>
        <span className="value discount">- Rs. {discount.toFixed(2)}</span>
      </div>
      
      <div className="summary-row">
        <span className="label">Delivery Charges</span>
        <span className="value free">FREE</span>
      </div>
      
      <div className="summary-row total">
        <span className="label">Total Amount</span>
        <span className="value">Rs. {total.toFixed(2)}</span>
      </div>
      
      <button 
        className="checkout-btn"
        onClick={onCheckout}
      >
        {buttonText}
      </button>
    </div>
  );
});

export default OrderSummaryComponent; 