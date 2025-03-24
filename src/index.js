import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RoutingModule from './routing/RoutingModule';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutingModule />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to reportWebVitals and log the results in a non-production environment
// Only measuring in development
if (process.env.NODE_ENV !== 'production') {
  reportWebVitals(console.log);
}
