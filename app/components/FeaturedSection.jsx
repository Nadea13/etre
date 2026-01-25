
import React from 'react';
import { LayoutGrid } from 'lucide-react';

const FeaturedSection = () => {
    return (
        <section className='border-b border-gray-700 bg-black py-8'>
            <div className='flex items-end justify-between px-6 max-w-7xl mx-auto w-full'>
                <h2 className='text-xl font-bold tracking-tight text-white uppercase flex items-center gap-3'>
                    <LayoutGrid className='w-5 h-5 text-[#AC593B]' />
                    Featured Gear
                </h2>
                <span className='text-xs text-[#AC593B] font-mono font-bold'>01 / 04</span>
            </div>
        </section>
    );
};

export default FeaturedSection;
