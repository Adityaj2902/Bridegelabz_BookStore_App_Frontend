import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { 
  getAllBooks, 
  getBookById as getBookByIdApi, 
  getCartItems, 
  addToCart as addToCartApi, 
  updateCartQuantity as updateCartQuantityApi, 
  removeFromCart as removeFromCartApi,
  getWishlistItems,
  addToWishlist as addToWishlistApi,
  removeFromWishlist as removeFromWishlistApi
} from '../utils/backend.api';
import { booksData } from '../utils/bookData'; // Fallback data

// Create context
const BookContext = createContext();

// Custom hook to use the context
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load books from API on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        if (data && Array.isArray(data)) {
          setBooks(data);
        } else {
          // Fallback to static data if API fails
          console.warn('Using fallback book data');
          setBooks(booksData);
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books');
        // Fallback to static data if API fails
        setBooks(booksData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);
  
  // Load cart items from API when user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems();
        if (data) {
          setCart(data);
        }
      } catch (err) {
        console.error('Error fetching cart items:', err);
      }
    };
    
    fetchCartItems();
  }, []);
  
  // Load wishlist items from API when user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    
    const fetchWishlistItems = async () => {
      try {
        const data = await getWishlistItems();
        if (data) {
          setWishlist(data);
        }
      } catch (err) {
        console.error('Error fetching wishlist items:', err);
      }
    };
    
    fetchWishlistItems();
  }, []);
  
  // Memoized function to get book by ID
  const getBookById = useCallback((id) => {
    return books.find(book => 
      book._id === id || 
      book._id === String(id) || 
      String(book._id) === id
    ) || null;
  }, [books]);
  
  // Memoized cart operations
  const addToCart = useCallback(async (bookId) => {
    try {
      await addToCartApi(bookId, 1);
      
      // Optimistically update UI
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === bookId);
        
        if (existingItem) {
          // If item already exists, increase quantity
          return prevCart.map(item => 
            item.id === bookId 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
        } else {
          // Add new item with quantity 1
          return [...prevCart, { id: bookId, quantity: 1 }];
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }, []);
  
  const removeFromCart = useCallback(async (bookId) => {
    try {
      await removeFromCartApi(bookId);
      
      // Optimistically update UI
      setCart(prevCart => prevCart.filter(item => item.id !== bookId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }, []);
  
  // Add a dedicated method to update cart item quantity
  const updateCartQuantity = useCallback(async (bookId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCartApi(bookId);
        setCart(prevCart => prevCart.filter(item => item.id !== bookId));
        return;
      }
      
      await updateCartQuantityApi(bookId, quantity);
      
      // Optimistically update UI
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === bookId);
        
        if (existingItem) {
          // Update quantity of existing item
          return prevCart.map(item => 
            item.id === bookId 
              ? { ...item, quantity } 
              : item
          );
        } else if (quantity > 0) {
          // Add new item with specified quantity
          return [...prevCart, { id: bookId, quantity }];
        }
        
        return prevCart;
      });
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  }, []);
  
  // Memoized wishlist operations
  const addToWishlist = useCallback(async (bookId) => {
    try {
      await addToWishlistApi(bookId);
      
      // Optimistically update UI
      setWishlist(prevWishlist => {
        if (prevWishlist.includes(bookId)) {
          return prevWishlist;
        }
        return [...prevWishlist, bookId];
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  }, []);
  
  const removeFromWishlist = useCallback(async (bookId) => {
    try {
      await removeFromWishlistApi(bookId);
      
      // Optimistically update UI
      setWishlist(prevWishlist => prevWishlist.filter(id => id !== bookId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  }, []);
  
  // Memoize the context value to prevent unnecessary rerenders
  const contextValue = useMemo(() => ({
    books,
    cart,
    wishlist,
    loading,
    error,
    getBookById,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist
  }), [
    books,
    cart,
    wishlist,
    loading,
    error,
    getBookById,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist
  ]);
  
  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContext; 