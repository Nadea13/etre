
import React from 'react';

const CollectionsTeaser = () => {
    return (
        <section className='py-20 px-6 max-w-7xl mx-auto w-full'>
            <div className='flex items-center justify-between mb-12'>
                <h3 className='text-2xl font-bold tracking-tight'>Collections</h3>
                <a className='text-xs text-[#C4002E] font-bold tracking-widest border-b-2 border-[#C4002E] pb-1 hover:text-black hover:border-black transition-all' href='#'>View All Gear</a>
            </div>
            <div className='grid md:grid-cols-2 gap-6'>
                <div className='relative h-64 md:h-80 w-full overflow-hidden group cursor-pointer border border-gray-200'>
                    <div className='absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110'
                        style={{ backgroundImage: 'url(/uploads/486A0090_collection.jpg)' }}></div>
                    <div className='absolute inset-0 bg-black/60 group-hover:bg-[#C4002E]/40 transition-colors duration-500'></div>
                    <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <h4 className='text-3xl font-bold text-white tracking-tighter mb-2'>
                            First Collection
                        </h4>
                        <div className='h-1 w-12 bg-[#C4002E] group-hover:w-24 transition-all duration-500'></div>
                    </div>
                </div>
                <div className='relative h-64 md:h-80 w-full overflow-hidden group cursor-pointer border border-gray-800 bg-black'>
                    <div className='absolute inset-0 bg-black/60 group-hover:bg-[#C4002E]/40 transition-colors duration-500'></div>
                    <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <h4 className='text-3xl font-bold text-white tracking-tighter mb-2'>
                            Coming Soon
                        </h4>
                        <div className='h-1 w-12 bg-[#C4002E] group-hover:w-24 transition-all duration-500'></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollectionsTeaser;
