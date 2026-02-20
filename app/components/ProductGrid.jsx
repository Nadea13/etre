
import React from 'react';
import { Plus } from 'lucide-react';

const ProductGrid = () => {
    return (
        <section className='bg-white px-6 py-8'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-6 max-w-7xl mx-auto'>

                {/* Product Grid Item 1 */}
                <div className='flex flex-col bg-white border border-gray-200 group hover:border-[#C4002E]/50 transition-all duration-300'>
                    <div className='relative w-full aspect-[4/5] bg-gray-100 overflow-hidden'>
                        <div className='absolute inset-0 bg-cover bg-center transition-all duration-700 scale-100 group-hover:scale-110'
                            style={{ backgroundImage: 'url(/uploads/486A9484.jpg)' }}></div>
                        {/* <div className='absolute top-3 left-3 bg-[#C4002E] px-2 py-1 text-[9px] font-bold text-white uppercase tracking-tighter'>
                            Best Seller
                        </div> */}
                        <div className='absolute top-3 left-3 bg-black text-white px-2 py-1 text-[9px] font-bold uppercase tracking-tighter'>
                            New Arrival
                        </div>
                    </div>
                    <div className='p-4 flex flex-col justify-between gap-3 border-t border-gray-200'>
                        <div>
                            <h3 className='text-xs md:text-sm font-bold uppercase leading-tight text-black group-hover:text-[#C4002E] transition-colors'>The Signature Training Tee</h3>
                            <p className='text-[10px] md:text-xs text-gray-500 mt-1 uppercase'>Breathable Mesh</p>
                        </div>
                        <div className='flex items-center justify-between mt-1'>
                            <span className='text-sm md:text-base font-bold text-black'>1,700 THB</span>
                            <button className='bg-[#C4002E] text-white h-8 w-8 flex items-center justify-center hover:bg-black hover:text-white transition-all'>
                                <Plus className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid Item 2 */}
                <div className='flex flex-col bg-white border border-gray-200 group hover:border-[#C4002E]/50 transition-all duration-300'>
                    <div className='relative w-full aspect-[4/5] bg-gray-100 overflow-hidden'>
                        <div className='absolute inset-0 bg-cover bg-center transition-all duration-700 scale-100 group-hover:scale-110'
                            style={{ backgroundImage: 'url(/uploads/486A9348.jpg)' }}></div>
                        <div className='absolute top-3 left-3 bg-black text-white px-2 py-1 text-[9px] font-bold uppercase tracking-tighter'>
                            New Arrival
                        </div>
                    </div>
                    <div className='p-4 flex flex-col justify-between gap-3 border-t border-gray-200'>
                        <div>
                            <h3 className='text-xs md:text-sm font-bold uppercase leading-tight text-black group-hover:text-[#C4002E] transition-colors'>The Ultra Cloud</h3>
                            <p className='text-[10px] md:text-xs text-gray-500 mt-1 uppercase'>High Impact</p>
                        </div>
                        <div className='flex items-center justify-between mt-1'>
                            <span className='text-sm md:text-base font-bold text-black'>2,300 THB</span>
                            <button className='bg-[#C4002E] text-white h-8 w-8 flex items-center justify-center hover:bg-black hover:text-white transition-all'>
                                <Plus className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid Item 3 */}
                <div className='flex flex-col bg-white border border-gray-200 group hover:border-[#C4002E]/50 transition-all duration-300'>
                    <div className='relative w-full aspect-[4/5] bg-gray-100 overflow-hidden'>
                        <div className='absolute inset-0 bg-cover bg-center transition-all duration-700 scale-100 group-hover:scale-110'
                            style={{ backgroundImage: 'url(/uploads/486A0313.jpg)' }}></div>
                        <div className='absolute top-3 left-3 bg-black text-white px-2 py-1 text-[9px] font-bold uppercase tracking-tighter'>
                            New Arrival
                        </div>
                    </div>
                    <div className='p-4 flex flex-col justify-between gap-3 border-t border-gray-200'>
                        <div>
                            <h3 className='text-xs md:text-sm font-bold uppercase leading-tight text-black group-hover:text-[#C4002E] transition-colors'>The Signature Active</h3>
                            <p className='text-[10px] md:text-xs text-gray-500 mt-1 uppercase'>Breathable Mesh</p>
                        </div>
                        <div className='flex items-center justify-between mt-1'>
                            <span className='text-sm md:text-base font-bold text-black'>2,190 THB</span>
                            <button className='bg-[#C4002E] text-white h-8 w-8 flex items-center justify-center hover:bg-black hover:text-white transition-all'>
                                <Plus className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid Item 4
                <div className='flex flex-col bg-white border border-gray-200 group hover:border-[#C4002E]/50 transition-all duration-300'>
                    <div className='relative w-full aspect-[4/5] bg-gray-100 overflow-hidden'>
                        <div className='absolute inset-0 bg-cover bg-center transition-all duration-700 scale-100 group-hover:scale-110'
                            style={{ backgroundImage: 'url(/uploads/model-004.jpg)' }}></div>
                    </div>
                    <div className='p-4 flex flex-col justify-between gap-3 border-t border-gray-200'>
                        <div>
                            <h3 className='text-xs md:text-sm font-bold uppercase leading-tight text-black group-hover:text-[#C4002E] transition-colors'>Velocity Leggings</h3>
                            <p className='text-[10px] md:text-xs text-gray-500 mt-1 uppercase'>High Impact</p>
                        </div>
                        <div className='flex items-center justify-between mt-1'>
                            <span className='text-sm md:text-base font-bold text-black'>390 THB</span>
                            <button className='bg-[#C4002E] text-white h-8 w-8 flex items-center justify-center hover:bg-black hover:text-white transition-all'>
                                <Plus className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default ProductGrid;
