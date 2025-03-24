import axios from "axios";

const BASE_URL = "http://localhost:5500/api/v1/";
const USER_URL = BASE_URL + "users/";
const BOOK_URL = BASE_URL + "books/";
const CART_URL = BASE_URL + "cart/";
const WISHLIST_URL = BASE_URL + "wishlist/";

// Auth APIs
export const loginApiCall = async (payload) => {
    try {
        let response = await axios.post(`${USER_URL}login`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error("Error in loginApiCall: ", error.response?.data || error.message);
        throw error;
    }
};

export const signupApiCall = async (payload) => {
    try {
        let response = await axios.post(`${USER_URL}register`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error("Error in signupApiCall: ", error.response?.data || error.message);
        throw error;
    }
};

// Book APIs
export const getAllBooks = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(BOOK_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching books: ", error);
        throw error;
    }
};

export const getBookById = async (bookId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BOOK_URL}${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching book ${bookId}: `, error);
        throw error;
    }
};

// Cart APIs
export const getCartItems = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(CART_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cart items: ", error);
        throw error;
    }
};

export const addToCart = async (bookId, quantity = 1) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(CART_URL, {
            bookId,
            quantity
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding to cart: ", error);
        throw error;
    }
};

export const updateCartQuantity = async (bookId, quantity) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.put(`${CART_URL}${bookId}`, {
            quantity
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating cart quantity: ", error);
        throw error;
    }
};

export const removeFromCart = async (bookId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.delete(`${CART_URL}${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing from cart: ", error);
        throw error;
    }
};

// Wishlist APIs
export const getWishlistItems = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(WISHLIST_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist items: ", error);
        throw error;
    }
};

export const addToWishlist = async (bookId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(WISHLIST_URL, {
            bookId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding to wishlist: ", error);
        throw error;
    }
};

export const removeFromWishlist = async (bookId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.delete(`${WISHLIST_URL}${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing from wishlist: ", error);
        throw error;
    }
};