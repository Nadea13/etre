'use client'
import React, { useState, useEffect } from 'react';

const Header = ({ onOpenAbout, onScrollToSection }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-transparent border-b border-transparent'}`}>
            <div className='flex items-center h-16 px-6 max-w-7xl mx-auto w-full gap-4'>

                <button className={`flex items-center justify-center -ml-2 hover:text-[#C4002E] transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>
                    <span className='material-symbols-outlined text-3xl'></span>
                </button>

                <div className='w-12 h-12 flex items-center justify-center'>
                    <svg viewBox="0 0 605 228" fill="none" className='w-10 h-10' xmlns="http://www.w3.org/2000/svg">
                        <path d="M158.57 106.998C261.882 85.8724 365.982 81.8046 470.698 83.5762C470.451 86.4614 469.128 86.3858 468.013 86.4512C429.481 88.7116 391.196 93.2618 352.962 98.4333C318.831 103.05 284.892 108.701 251.38 116.642C226.913 122.439 202.651 129.036 180.046 140.49C175.133 142.98 170.27 145.592 166.263 149.433C160.894 154.579 161.562 159.48 168.189 162.95C179.696 168.974 192.304 170.765 204.977 170.867C252.296 171.247 299.618 171.257 346.938 171.282C431.255 171.325 515.571 171.276 599.888 171.272C601.506 171.272 603.189 170.992 604.854 172.033C604.482 174.192 602.628 174.426 601.268 175.044C564.13 191.937 526.975 208.79 489.828 225.662C487.053 226.923 484.208 227.498 481.129 227.497C359.32 227.47 237.51 227.651 115.702 227.376C87.9383 227.313 60.1316 226.253 32.9218 219.519C26.0894 217.828 19.4999 215.58 13.2748 212.328C-1.12503 204.804 -3.99055 192.305 5.56438 179.165C12.9297 169.036 22.5278 161.328 32.7004 154.301C55.0121 138.887 79.9866 129.258 105.592 121.014C122.873 115.45 140.46 111.067 158.57 106.998Z" fill="black" />
                        <path d="M130.213 89.0189C114.953 92.9441 100.226 97.2344 85.4595 101.728C88.5407 96.4123 93.0529 92.8131 97.5919 89.3084C123.325 69.439 152.432 55.9577 182.742 44.8929C228.562 28.166 276.014 18.0441 324.193 11.3558C363.091 5.95589 402.199 3.08059 441.534 2.64284C465.68 2.37417 489.852 2.56896 513.976 1.68832C535.133 0.915916 556.275 1.18508 577.421 0.866691C584.372 0.762046 591.3 -0.490456 598.482 0.213737C598.332 2.88439 596.142 3.0071 594.691 3.69204C566.983 16.7665 539.248 29.7833 511.519 42.8128C506.095 45.3614 500.389 47.4496 495.309 50.5603C485.079 56.8247 473.935 58.2378 462.327 58.2606C443.336 58.2979 424.335 58.1256 405.356 58.6616C373.253 59.5683 341.163 60.8675 309.124 63.2882C286.242 65.0169 263.379 67.008 240.62 69.7988C204.645 74.2101 168.829 79.7559 133.552 88.3124C132.582 88.5476 131.593 88.7024 130.213 89.0189Z" fill="#C4002E" />
                    </svg>
                </div>

                <a className={`text-3xl font-bold tracking-widest uppercase hover:text-[#C4002E] transition-colors ${scrolled ? 'text-black' : 'text-white'}`} href='/'>ÊTRE</a>

                <div className="flex-1"></div>

                <div className="flex gap-4">
                    <button onClick={() => onScrollToSection('products')} className={`text-sm tracking-widest uppercase hover:text-[#C4002E] transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>Products</button>
                    <button onClick={() => onScrollToSection('collections')} className={`text-sm tracking-widest uppercase hover:text-[#C4002E] transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>Collections</button>
                </div>

                <button
                    onClick={onOpenAbout}
                    className={`text-sm tracking-widest uppercase hover:text-[#C4002E] transition-colors ${scrolled ? 'text-black' : 'text-white'}`}
                >
                    About
                </button>

            </div>

        </header>
    );
};

export default Header;
