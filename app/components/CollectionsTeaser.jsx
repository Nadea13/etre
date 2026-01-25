
import React from 'react';

const CollectionsTeaser = () => {
    return (
        <section className='py-20 px-6 max-w-7xl mx-auto w-full'>
            <div className='flex items-center justify-between mb-12'>
                <h3 className='text-2xl font-bold uppercase tracking-tight'>Collections</h3>
                <a className='text-xs text-[#AC593B] font-bold uppercase tracking-widest border-b-2 border-[#AC593B] pb-1 hover:text-white hover:border-white transition-all' href='#'>View All Gear</a>
            </div>
            <div className='grid md:grid-cols-2 gap-6'>
                <div className='relative h-64 md:h-80 w-full overflow-hidden group cursor-pointer border border-gray-800'>
                    <div className='absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110'
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBiUlhY_Xa-KuviM2cmcN3cm5sq33L46znXTzvGCQKNq_MwvOB5-5aOrElCEyHpY4yIGMsnOI3b5W-sxzlQve-yxsq2zHoeXknIKBkpk2p0BVlIV-RWzk4klhLD3UFmn_eQujJQYNTB1RGoyDjFv57YtHO5ggqalzE_avL7PwCnIB7ZcdPt8oGuZ-Y72d8oKBkgENY-f2dQQYfIJDzne7rWMLyuPmIX7KNC3nAwb3RlcDrGp1SVS6sNUKVgMHIysro2wmr37ms4mKD')" }}></div>
                    <div className='absolute inset-0 bg-black/60 group-hover:bg-[#AC593B]/40 transition-colors duration-500'></div>
                    <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <h4 className='text-3xl font-bold text-white uppercase tracking-tighter mb-2'>
                            Urban Ops
                        </h4>
                        <div className='h-1 w-12 bg-[#AC593B] group-hover:w-24 transition-all duration-500'></div>
                    </div>
                </div>
                <div className='relative h-64 md:h-80 w-full overflow-hidden group cursor-pointer border border-gray-800'>
                    <div className='absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110'
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7hj9-gGpEYBhetnzVUxgCScds6Bgd6GZnlZei--6TakjqLXDP1HWUZ-DqgttQu5hfxvGQFX9qvREqbbmCgS5LpnlZezShqM63ybW-8PCtRxxF0tZoPE432Bq5jEgfCO9u_g-7cWoN9b6L3C2FE_K3eXBqAe1smNNKJvrKwF__11gCrhGXtDFRU4uXt7-wKMnYa7vSc7CVz9hGSed67DY1FwBPgUVAlsdDxH0Czrki3HWfM5HXHeLkNdbmOHgSI4gjsVC2f8c0Dp00')" }}></div>
                    <div className='absolute inset-0 bg-black/60 group-hover:bg-[#AC593B]/40 transition-colors duration-500'></div>
                    <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <h4 className='text-3xl font-bold text-white uppercase tracking-tighter mb-2'>
                            Night Run
                        </h4>
                        <div className='h-1 w-12 bg-[#AC593B] group-hover:w-24 transition-all duration-500'></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollectionsTeaser;
