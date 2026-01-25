
'use client'
import React from 'react';

const Marquee = () => {
    return (
        <section className='py-20 bg-black border-y border-gray-800 overflow-hidden relative group'>
            <div className='absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none'></div>
            <div className='absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none'></div>

            <div className='flex whitespace-nowrap'>
                <div className='flex gap-12 animate-marquee items-center'>
                    <h2 className='text-5xl md:text-7xl font-bold text-transparent stroke-text uppercase tracking-tighter'>
                        Être: To Be Performance. <span className='text-[#AC593B]'>To Be Style.</span> To Be Unstoppable. <span className='text-white'>ÊTRE</span>
                    </h2>
                    <h2 className='text-5xl md:text-7xl font-bold text-transparent stroke-text uppercase tracking-tighter'>
                        Être: To Be Performance. <span className='text-[#AC593B]'>To Be Style.</span> To Be Unstoppable. <span className='text-white'>ÊTRE</span>
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
