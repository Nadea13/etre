
'use client'
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const slides = [
    '/uploads/486A0090.jpg',
    '/uploads/486A9348.jpg',
    '/uploads/486A0070.jpg',
    '/uploads/486A9732.jpg',
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className='relative pt-16 min-h-[90vh] flex flex-col justify-end pb-12 overflow-hidden border-b border-gray-200'>

            {slides.map((src, i) => (
                <div key={i}
                    className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url('${src}')` }}>
                </div>
            ))}

            <div className='absolute inset-0 z-[1] bg-gradient-to-t from-white via-white/10 to-transparent'></div>
            <div className='absolute inset-0 z-[1] bg-white/10'></div>

            <div className='relative z-10 px-6 max-w-7xl mx-auto w-full flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-5xl md:text-7xl font-bold leading-[0.85] tracking-tighter drop-shadow-2xl'>
                        <span className='text-[#C4002E]'>Rise</span><br />With<br /><span className='text-[#C4002E]'>Confidence.</span>
                    </h1>
                    <div className='h-1.5 w-24 bg-[#C4002E] mt-4'></div>
                </div>
                <div className='pt-4'>
                    <button className='group relative overflow-hidden bg-[#C4002E] text-white px-10 py-5 w-full md:w-auto min-w-[240px] text-center font-bold tracking-widest text-sm transition-all active:scale-95 hover:bg-[#914a31] rounded-none shadow-xl'>
                        <span className='relative z-10 text-lg flex items-center justify-center gap-3'>
                            Explore Collection
                            <ArrowRight className='w-5 h-5 transition-transform group-hover:translate-x-2' />
                        </span>
                    </button>
                </div>
            </div>

            {/* Slide indicators */}
            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2'>
                {slides.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                        className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-[#C4002E]' : 'w-4 bg-black/30 hover:bg-white/50'}`} />
                ))}
            </div>

            <div className='absolute bottom-4 right-4 text-[10px] text-gray-500 font-mono tracking-widest opacity-60'>
                SYS.V.1.0 // EST.2026 // COLOR.REF.#C4002E
            </div>
        </section>
    );
};

export default Hero;
