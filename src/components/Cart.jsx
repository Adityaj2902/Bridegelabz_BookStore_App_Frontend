import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Navbar from './Navbar';
import { useBookContext } from '../contexts/BookContext';
import CartItemComponent from './CartItemComponent';
import CustomerDetailsComponent from './CustomerDetailsComponent';
import OrderSummaryComponent from './OrderSummaryComponent';
import './Cart.scss';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, getBookById } = useBookContext();
  const [activeView, setActiveView] = useState('cart'); // 'cart', 'delivery', 'payment'
  
  // Debug cart data
  useEffect(() => {
    console.log('Cart items:', cart);
  }, [cart]);
  
  // Memoize cart items with book details
  const cartItemsWithDetails = useMemo(() => {
    return cart.map(item => {
      const book = getBookById(item.id);
      if (!book) return null;
      
      return {
        ...item,
        bookName: book.bookName,
        author: book.author,
        price: book.price,
        discountPrice: book.discountPrice,
        bookImage: book.bookImage
      };
    }).filter(Boolean); // Remove any null items
  }, [cart, getBookById]);
  
  const totalItems = useMemo(() => {
    return cartItemsWithDetails.reduce((total, item) => total + item.quantity, 0);
  }, [cartItemsWithDetails]);
  
  const subtotal = useMemo(() => {
    return cartItemsWithDetails.reduce((total, item) => {
      const price = item.discountPrice !== undefined ? item.discountPrice : (item.price !== undefined ? item.price : 0);
      return total + price * item.quantity;
    }, 0);
  }, [cartItemsWithDetails]);
  
  const discount = useMemo(() => {
    return cartItemsWithDetails.reduce((total, item) => {
      if (item.price !== undefined && item.discountPrice !== undefined && item.price > item.discountPrice) {
        return total + ((item.price - item.discountPrice) * item.quantity);
      }
      return total;
    }, 0);
  }, [cartItemsWithDetails]);
  
  const total = useMemo(() => subtotal - discount, [subtotal, discount]);
  
  // Handle view navigation
  const handleNextView = () => {
    if (activeView === 'cart') {
      setActiveView('delivery');
    } else if (activeView === 'delivery') {
      setActiveView('payment');
    }
  };
  
  const handlePreviousView = () => {
    if (activeView === 'delivery') {
      setActiveView('cart');
    } else if (activeView === 'payment') {
      setActiveView('delivery');
    }
  };
  
  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="separator">/</span>
          <span className="current">Shopping Cart</span>
        </div>
        
        {!cartItemsWithDetails || cartItemsWithDetails.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add items to your cart to continue shopping</p>
            <Link to="/" className="shop-now-btn">Shop Now</Link>
          </div>
        ) : (
          <>
            {/* View Navigation Tabs */}
            <div className="view-tabs">
              <div 
                className={`tab ${activeView === 'cart' ? 'active' : ''}`} 
                onClick={() => setActiveView('cart')}
              >
                <span className="tab-number">1</span>
                <span className="tab-name">Cart</span>
              </div>
              <div className="tab-divider"></div>
              <div 
                className={`tab ${activeView === 'delivery' ? 'active' : ''}`} 
                onClick={() => activeView === 'payment' ? setActiveView('delivery') : null}
              >
                <span className="tab-number">2</span>
                <span className="tab-name">Delivery</span>
              </div>
              <div className="tab-divider"></div>
              <div 
                className={`tab ${activeView === 'payment' ? 'active' : ''}`}
              >
                <span className="tab-number">3</span>
                <span className="tab-name">Payment</span>
              </div>
            </div>
            
            <div className="cart-main-content">
              {activeView === 'cart' && (
                <>
                  <div className="cart-section">
                    <h2 className="cart-title">My Cart ({totalItems} items)</h2>
                    
                    <div className="location-wrapper">
                      <span className="location-icon"><FaMapMarkerAlt /></span>
                      <div className="location-details">
                        <span>Delivery to</span>
                        <select className="location-select">
                          <option>Washington, DC 20500, USA</option>
                          <option>New York, NY 10001, USA</option>
                          <option>Los Angeles, CA 90001, USA</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="cart-items-list">
                      {cartItemsWithDetails.map((item) => (
                        <CartItemComponent 
                          key={item.id}
                          item={item}
                          updateQuantity={updateCartQuantity}
                          removeItem={removeFromCart}
                        />
                      ))}
                    </div>
                    
                    <button className="place-order-btn" onClick={handleNextView}>
                      Proceed to Delivery
                      <FaArrowRight style={{ marginLeft: '10px' }} />
                    </button>
                  </div>
                  
                  <div className="summary-section">
                    <OrderSummaryComponent 
                      cartItems={cartItemsWithDetails}
                      subtotal={subtotal}
                      discount={discount}
                      total={total}
                      onCheckout={handleNextView}
                      buttonText="Proceed to Delivery"
                    />
                  </div>
                </>
              )}
              
              {activeView === 'delivery' && (
                <>
                  <div className="customer-section">
                    <h2 className="section-title">Delivery Information</h2>
                    <CustomerDetailsComponent onBack={handlePreviousView} onNext={handleNextView} />
                  </div>
                  
                  <div className="summary-section">
                    <OrderSummaryComponent 
                      cartItems={cartItemsWithDetails}
                      subtotal={subtotal}
                      discount={discount}
                      total={total}
                      onCheckout={handleNextView}
                      buttonText="Proceed to Payment"
                    />
                  </div>
                </>
              )}
              
              {activeView === 'payment' && (
                <>
                  <div className="payment-section">
                    <h2 className="section-title">Payment</h2>
                    <div className="payment-options">
                      <div className="payment-method">
                        <h3>Select Payment Method</h3>
                        <div className="payment-method-options">
                          <div className="payment-option">
                            <input type="radio" id="credit-card" name="payment-method" defaultChecked />
                            <label htmlFor="credit-card">Credit/Debit Card</label>
                          </div>
                          <div className="payment-option">
                            <input type="radio" id="paypal" name="payment-method" />
                            <label htmlFor="paypal">PayPal</label>
                          </div>
                          <div className="payment-option">
                            <input type="radio" id="bank-transfer" name="payment-method" />
                            <label htmlFor="bank-transfer">Direct Bank Transfer</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card-details">
                        <h3>Card Details</h3>
                        <div className="form-row">
                          <div className="form-col">
                            <label>Card Number</label>
                            <input type="text" className="form-input" placeholder="**** **** **** ****" />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-col">
                            <label>Expiry Date</label>
                            <input type="text" className="form-input" placeholder="MM/YY" />
                          </div>
                          <div className="form-col">
                            <label>CVV</label>
                            <input type="text" className="form-input" placeholder="***" />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-col">
                            <label>Cardholder Name</label>
                            <input type="text" className="form-input" placeholder="Name on card" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="button-container">
                        <button className="back-btn" onClick={handlePreviousView}>
                          Back to Delivery
                        </button>
                        <button className="place-order-btn">
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="summary-section">
                    <OrderSummaryComponent 
                      cartItems={cartItemsWithDetails}
                      subtotal={subtotal}
                      discount={discount}
                      total={total}
                      onCheckout={() => {}}
                      buttonText="Place Order"
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 