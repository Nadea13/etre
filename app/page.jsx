'use client'

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import ProductGrid from './components/ProductGrid';
import Marquee from './components/Marquee';
import CollectionsTeaser from './components/CollectionsTeaser';
import Footer from './components/Footer';
import AboutPopup from './components/AboutPopup';

const EtreLandingPage = () => {
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 64; // Height of header is h-16 (64px)
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className='bg-white font-display antialiased selection:bg-[#C4002E] selection:text-white'>
            {/* Global Noise Overlay */}
            <div className='fixed inset-0 pointer-events-none z-50 mix-blend-overlay bg-noise opacity-20'></div>

            {/* Main Container */}
            <div className='relative flex min-h-screen w-full flex-col overflow-x-hidden text-black'>
                <Header onOpenAbout={() => setIsAboutOpen(true)} onScrollToSection={scrollToSection} />
                <Hero />
                <ProductSection />
                <ProductGrid />
                <Marquee />
                <CollectionsTeaser />
                <Footer onOpenAbout={() => setIsAboutOpen(true)} onScrollToSection={scrollToSection} />
            </div>

            <AboutPopup isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        </div>
    );
};

export default EtreLandingPage;
