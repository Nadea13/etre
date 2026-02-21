
'use client'
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

const ProductDetail = ({ isOpen, onClose, product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState('M');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setCurrentImageIndex(0);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
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
                <div className="relative w-full md:w-3/5 bg-gray-50 flex flex-col h-1/2 md:h-auto">
                    <div className="relative flex-1 overflow-hidden flex items-center justify-center">
                        <img
                            src={product.images[currentImageIndex]}
                            alt={product.name}
                            className="w-full h-full object-cover object-center transition-all duration-500 transform hover:scale-105"
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
                    <div className="flex gap-2 p-4 overflow-x-auto bg-white border-t border-gray-100">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`relative w-20 h-20 flex-shrink-0 border-2 transition-all ${currentImageIndex === idx ? 'border-[#C4002E]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col gap-8 bg-white h-1/2 md:h-auto">
                    <div className="flex flex-col gap-2">
                        <span className="text-[#C4002E] font-bold text-xs tracking-widest uppercase">{product.collection}</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-black leading-tight">
                            {product.name}
                        </h2>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                            {product.price}
                        </p>
                    </div>

                    <div className="h-px bg-gray-100 w-full"></div>

                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Select Size</span>
                            <button className="text-[10px] text-gray-400 border-b border-gray-400 hover:text-black hover:border-black transition-all">Size Guide</button>
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

                    <div className="flex flex-col gap-3">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Description</span>
                        <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                            {product.description || "No description available for this product."}
                        </p>
                    </div>

                    <div className="mt-auto pt-8">
                        <button className="w-full bg-[#C4002E] text-white py-5 font-bold tracking-widest text-sm uppercase flex items-center justify-center gap-4 transition-all hover:bg-black active:scale-95 shadow-xl">
                            <ShoppingBag className="w-5 h-5" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
