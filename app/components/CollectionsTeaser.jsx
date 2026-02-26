
import React from 'react';

const CollectionsTeaser = () => {
    return (
        <section id="collections" className='w-full'>
            <div className='border-b border-gray-200 bg-white py-8'>
                <div className='flex items-end justify-between px-6 max-w-7xl mx-auto w-full'>
                    <h2 className='text-2xl font-bold tracking-tight text-black flex items-center gap-3'>
                        Collections
                    </h2>
                </div>
            </div>

            <div className='py-20 px-6 max-w-7xl mx-auto w-full'>
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
            </div>
        </section>
    );
};

export default CollectionsTeaser;
