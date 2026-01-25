
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className='relative pt-16 min-h-[90vh] flex flex-col justify-end pb-12 overflow-hidden border-b border-gray-700'>

            <div className='absolute inset-0 z-0 bg-cover bg-center bg-no-repeat'
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent'></div>
                <div className='absolute inset-0 bg-black/20 mix-blend-multiply'></div>
            </div>

            <div className='relative z-10 px-0 px-6 max-w-7xl mx-auto w-full flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-6xl md:text-8xl font-bold leading-[0.85] tracking-tighter uppercase drop-shadow-2xl'>
                        Redefine<br /><span className='text-[#AC593B]'>Your</span><br />Motion.
                    </h1>
                    <div className='h-1.5 w-24 bg-[#AC593B] mt-6 mb-2'></div>
                    <p className='text-gray-300 text-sm md:text-lg font-medium tracking-wide max-w-sm uppercase'>
                        Experience the fusion of elite performance and street aesthetics.
                    </p>
                </div>
                <div className='pt-4'>
                    <button className='group relative overflow-hidden bg-[#AC593B] text-white px-10 py-5 w-full md:w-auto min-w-[240px] text-center font-bold tracking-widest text-sm uppercase transition-all active:scale-95 hover:bg-[#914a31] rounded-none shadow-xl'>
                        <span className='relative z-10 text-lg flex items-center justify-center gap-3'>
                            Explore Collection
                            <ArrowRight className='w-5 h-5 transition-transform group-hover:translate-x-2' />
                        </span>
                    </button>
                </div>
            </div>

            <div className='absolute bottom-4 right-4 text-[10px] text-gray-500 font-mono tracking-widest opacity-60'>
                SYS.V.1.0 // EST.2026 // COLOR.REF.#AC593B
            </div>
        </section>
    );
};

export default Hero;
