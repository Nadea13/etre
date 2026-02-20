'use client'

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';
import ProductGrid from './components/ProductGrid';
import Marquee from './components/Marquee';
import CollectionsTeaser from './components/CollectionsTeaser';
import Footer from './components/Footer';

const EtreLandingPage = () => {
    return (
        <div className='bg-white font-display antialiased selection:bg-[#C4002E] selection:text-white'>
            {/* Global Noise Overlay */}
            <div className='fixed inset-0 pointer-events-none z-50 mix-blend-overlay bg-noise opacity-20'></div>

            {/* Main Container */}
            <div className='relative flex min-h-screen w-full flex-col overflow-x-hidden text-black'>
                <Header />
                <Hero />
                <FeaturedSection />
                <ProductGrid />
                <Marquee />
                <CollectionsTeaser />
                <Footer />
            </div>
        </div>
    );
};

export default EtreLandingPage;