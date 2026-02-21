
'use client'
import React from 'react';

const Marquee = () => {
    return (
        <section className='py-20 bg-white border-y border-gray-200 overflow-hidden relative group'>
            <div className='absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none'></div>
            <div className='absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none'></div>

            <div className='flex whitespace-nowrap'>
                <div className='flex gap-16 animate-marquee items-center'>
                    <h2 className='text-5xl md:text-7xl font-bold tracking-tighter'>
                        <span className='text-black'>Être</span> <span className='text-[#C4002E]'>Rise With Confidence</span> <span className='text-black/20 mx-4'> </span> <span className='text-black'>Être</span> <span className='text-[#C4002E]'>Rise With Confidence</span> <span className='text-black/20 mx-4'> </span>
                    </h2>
                    <h2 className='text-5xl md:text-7xl font-bold tracking-tighter'>
                        <span className='text-black'>Être</span> <span className='text-[#C4002E]'>Rise With Confidence</span> <span className='text-black/20 mx-4'> </span> <span className='text-black'>Être</span> <span className='text-[#C4002E]'>Rise With Confidence</span> <span className='text-black/20 mx-4'> </span>
                    </h2>
                </div>
            </div>

            <style jsx>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
                }
                
                .animate-marquee {
                    display: flex;
                    animation: marquee 40s linear infinite;
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Marquee;
