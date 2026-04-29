
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingCart, CheckCircle2, Minus, Plus } from 'lucide-react';
import Image from 'next/image';

import { useCart } from '../context/CartContext';

const ProductDetail = ({ isOpen, onClose, product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addToCart } = useCart();
    const sizeGuideRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setCurrentImageIndex(0);
            setQuantity(1);
            setAddedToCart(false);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        addToCart(product, selectedSize, quantity);
        setAddedToCart(true);
        // Reset "Added" state after 2 seconds
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const scrollToSizeGuide = () => {
        sizeGuideRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-12">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-6xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[85vh] animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-black/10 p-2 rounded-full transition-colors text-black"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Left: Image Gallery */}
                <div className="relative w-full md:w-3/5 bg-gray-50 flex flex-col h-1/2 md:h-auto border-b md:border-b-0 md:border-r border-gray-100">
                    <div className="relative flex-1 overflow-hidden flex items-center justify-center">
                        <Image
                            src={product.images[currentImageIndex]}
                            alt={product.name}
                            fill
                            className="object-cover object-center transition-all duration-500 transform hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            priority
                        />

                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 hover:bg-white transition-all shadow-md rounded-full"
                                >
                                    <ChevronLeft className="w-5 h-5 text-black" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 hover:bg-white transition-all shadow-md rounded-full"
                                >
                                    <ChevronRight className="w-5 h-5 text-black" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 p-4 overflow-x-auto bg-white border-t border-gray-100 scrollbar-hide">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`relative w-20 h-20 flex-shrink-0 border-2 transition-all ${currentImageIndex === idx ? 'border-[#C4002E]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <Image 
                                    src={img} 
                                    alt="" 
                                    fill
                                    className="object-cover" 
                                    sizes="80px"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="w-full md:w-2/5 flex flex-col bg-white h-1/2 md:h-auto overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-8 md:p-10 flex flex-col gap-8 scroll-smooth">
                        <div className="flex flex-col gap-2">
                            <span className="text-[#C4002E] font-bold text-xs tracking-widest uppercase">{product.collection}</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-black leading-tight">
                                {product.name}
                            </h2>
                            <p className="text-2xl font-bold text-[#C4002E] mt-2">
                                {product.price}
                            </p>
                        </div>

                        <div className="h-px bg-gray-100 w-full"></div>

                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Select Size</span>
                                <button
                                    onClick={scrollToSizeGuide}
                                    className="text-[10px] text-gray-400 border-b border-gray-400 hover:text-black hover:border-black transition-all"
                                >
                                    Size Guide
                                </button>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 flex items-center justify-center font-bold text-sm border-2 transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-transparent text-gray-400 border-gray-200 hover:border-black hover:text-black'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Quantity</span>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center border-2 border-gray-100">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <Minus className="w-4 h-4 text-black" />
                                    </button>
                                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <Plus className="w-4 h-4 text-black" />
                                    </button>
                                </div>
                                <p className="text-xs text-[#C4002E] font-bold uppercase tracking-widest">
                                    {(parseFloat(product.price.replace(/[^0-9.-]+/g, "")) * quantity).toLocaleString()} THB
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Description</span>
                            <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                                {product.description || "No description available for this product."}
                            </p>
                        </div>

                        {/* Size Guide Images Section */}
                        <div ref={sizeGuideRef} className="flex flex-col gap-4 pt-4">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Size Guide</span>
                            <div className="flex flex-col gap-4">
                                <div className="relative w-full aspect-[3/4]">
                                    <Image 
                                        src="/uploads/IMG_1432.JPG" 
                                        alt="Size Guide 1" 
                                        fill
                                        className="object-contain border border-gray-100" 
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                </div>
                                <div className="relative w-full aspect-[3/4]">
                                    <Image 
                                        src="/uploads/IMG_1433.JPG" 
                                        alt="Size Guide 2" 
                                        fill
                                        className="object-contain border border-gray-100" 
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border-t border-gray-100 bg-white">
                        <button
                            onClick={handleAddToCart}
                            className={`w-full py-5 font-bold tracking-widest text-sm uppercase flex items-center justify-center gap-4 transition-all active:scale-95 shadow-xl ${addedToCart ? 'bg-green-600 text-white' : 'bg-[#C4002E] text-white hover:bg-black'}`}
                        >
                            {addedToCart ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
