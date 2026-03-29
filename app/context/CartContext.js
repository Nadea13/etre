'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('etre-cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart from localStorage', e);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('etre-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, size, qty = 1) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === product.id && item.selectedSize === size
            );

            if (existingItemIndex > -1) {
                // Item already exists, create new array with updated item to avoid mutation
                return prevItems.map((item, index) => 
                    index === existingItemIndex 
                        ? { ...item, quantity: item.quantity + qty } 
                        : item
                );
            } else {
                // New item
                return [...prevItems, { ...product, selectedSize: size, quantity: qty }];
            }
        });
        // setIsCartOpen(true); // Don't open cart automatically anymore
    };

    const removeFromCart = (productId, size) => {
        setCartItems((prevItems) => 
            prevItems.filter((item) => !(item.id === productId && item.selectedSize === size))
        );
    };

    const updateQuantity = (productId, size, quantity) => {
        if (quantity < 1) return;
        setCartItems((prevItems) => {
            return prevItems.map((item) => 
                (item.id === productId && item.selectedSize === size) 
                    ? { ...item, quantity } 
                    : item
            );
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => {
        // Remove currency symbols and commas before parsing
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return total + (price * item.quantity);
    }, 0);

    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            setIsCartOpen,
            cartTotal,
            itemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
