
import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className='bg-gray-50 border-t border-gray-200 py-16 px-5 mt-auto'>
            <div className='px-6 max-w-7xl mx-auto flex flex-col gap-12'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                    <div className='flex flex-col gap-4'>
                        <h5 className='text-[#C4002E] font-bold uppercase text-xs tracking-widest'>Navigation</h5>
                        <div className='flex flex-col gap-2 text-sm text-gray-400'>
                            <a className='hover:text-black transition-colors' href='#'>Shop</a>
                            <a className='hover:text-black transition-colors' href='#'>Collections</a>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h5 className='text-[#C4002E] font-bold uppercase text-xs tracking-widest'>Company</h5>
                        <div className='flex flex-col gap-2 text-sm text-gray-400'>
                            <a className='hover:text-black transition-colors' href='#'>About</a>
                            <a className='hover:text-black transition-colors' href='#'>Contact</a>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-12 border-t border-gray-200'>
                    <div className='flex gap-6'>
                        <a className='text-gray-500 hover:text-[#C4002E] transition-colors' href='#'>
                            <Instagram />
                        </a>
                        <a className='text-gray-500 hover:text-[#C4002E] transition-colors' href='#'>
                            <Twitter />
                        </a>
                        <a className='text-gray-500 hover:text-[#C4002E] transition-colors' href='#'>
                            <Facebook />
                        </a>
                    </div>
                    <p className='text-[10px] text-gray-600 font-mono text-left md:text-right'>
                        © 2026 ÊTRE SPORTSWEAR. DESIGNED BY THE OBSESSED.<br />
                        ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
