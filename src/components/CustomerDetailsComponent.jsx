import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const CustomerDetailsComponent = React.memo(({ onBack, onNext }) => {
  const [customerDetails, setCustomerDetails] = useState({
    fullName: 'Poonam Yadav',
    mobile: '8167895478',
    type: 'WORK',
    address: 'BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore',
    city: 'Bengaluru',
    state: 'Karnataka'
  });

  const handleChange = (field, value) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="customer-details">
      <h2 className="section-title">Customer Details</h2>
      
      <div className="form-group">
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              value={customerDetails.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div className="form-col">
            <label htmlFor="mobile">Mobile Number</label>
            <input 
              type="text" 
              id="mobile" 
              value={customerDetails.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>
      
      <div className="address-type">
        <div className="address-type-label">
          <span className="number">1.</span>
          <span className="type">{customerDetails.type}</span>
        </div>
        <div className="address-input">
          <label htmlFor="address">Address</label>
          <textarea 
            id="address" 
            value={customerDetails.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="form-textarea"
            rows="3"
          />
        </div>
      </div>
      
      <div className="form-group">
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="city">city/town</label>
            <input 
              type="text" 
              id="city" 
              value={customerDetails.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div className="form-col">
            <label htmlFor="state">State</label>
            <input 
              type="text" 
              id="state" 
              value={customerDetails.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>
      
      <div className="button-container">
        <button className="back-btn" onClick={onBack}>
          <FaArrowLeft style={{ marginRight: '10px' }} />
          Back to Cart
        </button>
        <button className="place-order-btn" onClick={onNext}>
          Proceed to Payment
          <FaArrowRight style={{ marginLeft: '10px' }} />
        </button>
      </div>
    </div>
  );
});

export default CustomerDetailsComponent; 