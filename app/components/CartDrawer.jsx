'use client'
import React, { useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
    const { 
        cartItems, 
        isCartOpen, 
        setIsCartOpen, 
        removeFromCart, 
        updateQuantity, 
        cartTotal,
        clearCart 
    } = useCart();

    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isCartOpen]);

    const handleCheckout = () => {
        const message = cartItems.map(item => 
            `- ${item.name} (Size: ${item.selectedSize}) ${item.quantity} ชิ้น ราคา ${item.price} บาท`
        ).join('\n');
        
        const totalText = `รวมเป็นเงิน ${cartTotal.toLocaleString()} บาท`;
        const finalMessage = `สนใจสั่งซื้อสินค้า:\n${message}\n\n${totalText}`;
        
        const lineUrl = `https://line.me/R/oaMessage/@806rsfmj/?${encodeURIComponent(finalMessage)}`;
        window.open(lineUrl, '_blank');
    };

    return (
        <div className={`fixed inset-0 z-[60] overflow-hidden transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className={`relative w-screen max-w-md pointer-events-auto transition-transform duration-500 ease-in-out transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="h-full flex flex-col bg-white shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold tracking-tighter uppercase text-black">Your Cart</h2>
                                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">
                                    {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                                </span>
                            </div>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-black/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-black" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                                    <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center">
                                        <ShoppingCart className="w-10 h-10 text-black/20" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-xl font-bold text-gray-900">Your cart is empty</p>
                                        <p className="text-sm text-gray-400">Time to add some styles to your wardrobe.</p>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setIsCartOpen(false);
                                            const element = document.getElementById('products');
                                            if (element) {
                                                const headerOffset = 64;
                                                const elementPosition = element.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: "smooth"
                                                });
                                            }
                                        }}
                                        className="bg-[#C4002E] text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-lg"
                                    >
                                        Shop Now
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-8">
                                    {cartItems.map((item, idx) => (
                                        <div key={`${item.id}-${item.selectedSize}-${idx}`} className="flex gap-4">
                                            <div className="w-24 h-24 bg-gray-50 flex-shrink-0 border border-gray-100">
                                                <img src={item.mainImage} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-0.5">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-sm text-black uppercase leading-tight">{item.name}</h3>
                                                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Size: {item.selectedSize}</p>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                        className="text-gray-300 hover:text-[#C4002E] transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <div className="flex items-center border border-gray-200">
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                                            className="p-1.5 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3 text-black" />
                                                        </button>
                                                        <span className="w-8 text-center text-xs font-bold text-black">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                                            className="p-1.5 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3 text-black" />
                                                        </button>
                                                    </div>
                                                    <p className="font-bold text-sm text-black">
                                                        {(parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toLocaleString()} THB
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-8 border-t border-gray-100 bg-gray-50 flex flex-col gap-6">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                                        <span className="text-gray-900 font-bold">{cartTotal.toLocaleString()} THB</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                                        <span className="text-[#C4002E] uppercase tracking-widest text-[10px] font-bold">FREE</span>
                                    </div>
                                    <div className="h-px bg-gray-200 my-1"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-black uppercase tracking-widest text-xs font-bold">Total</span>
                                        <span className="text-xl font-extrabold text-[#C4002E] tracking-tighter">{cartTotal.toLocaleString()} THB</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    className="w-full bg-[#C4002E] text-white py-5 font-bold tracking-widest text-sm uppercase flex items-center justify-center gap-4 transition-all hover:bg-black active:scale-95 shadow-xl"
                                >
                                    Order via LINE
                                    <ArrowRight className="w-5 h-5" />
                                </button>

                                <button 
                                    onClick={clearCart}
                                    className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-[#C4002E] transition-colors"
                                >
                                    Clear Shopping Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
