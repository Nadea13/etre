import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

const LineIcon = ({ size = 24, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.029 2 1 5.936 1 11C1 15.633 5.22 19.327 10.495 19.917C10.5859 19.9255 10.6727 19.9587 10.746 20.013C10.796 20.053 10.815 20.093 10.819 20.138C10.889 20.843 10.735 21.79 10.532 22.323C10.5033 22.3987 10.4935 22.4802 10.5033 22.5606C10.5131 22.641 10.5423 22.7177 10.5883 22.7843C10.6344 22.8509 10.6959 22.9053 10.7676 22.9429C10.8393 22.9805 10.919 23.0001 11 23C11.141 23 11.3 22.958 11.433 22.918C11.581 22.872 11.758 22.807 11.956 22.726C12.4573 22.515 12.9488 22.2815 13.429 22.026C14.8218 21.2924 16.1525 20.4466 17.408 19.497C18.808 18.434 20.198 17.159 21.24 15.735C22.28 14.312 23 12.709 23 11C23 5.936 17.971 2 12 2ZM4.25 8.5H5.75V12.25H8V13.75H4.25V8.5ZM8.75 8.5V13.75H10.25V8.5H8.75ZM10.75 8.5H12.45L13.75 10.938V8.5H15.25V13.75H13.55L12.25 11.312V13.75H10.75V8.5ZM15.75 8.5H19V10H17.25V10.375H19V11.875H17.25V12.25H19V13.75H15.75V8.5Z" />
    </svg>

);

const TikTokIcon = ({ size = 24, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M16.6 5.82C15.9166 5.03953 15.5399 4.0374 15.54 3H12.45V15.4C12.4267 16.0712 12.1436 16.7071 11.6603 17.1735C11.1771 17.6399 10.5316 17.9004 9.86003 17.9C8.44003 17.9 7.26003 16.74 7.26003 15.3C7.26003 13.58 8.92003 12.29 10.63 12.82V9.66C7.18003 9.2 4.16003 11.88 4.16003 15.3C4.16003 18.63 6.92003 21 9.85003 21C12.99 21 15.54 18.45 15.54 15.3V9.01C16.793 9.90985 18.2974 10.3926 19.84 10.39V7.3C19.84 7.3 17.96 7.39 16.6 5.82Z" />
    </svg>

);

const Footer = () => {
    return (
        <footer className='bg-gray-50 border-t border-gray-200 py-16 px-5 mt-auto'>
            <div className='px-6 max-w-7xl mx-auto flex flex-col gap-12'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                    <div className='flex flex-col gap-4'>
                        <h5 className='text-[#C4002E] font-bold text-xs tracking-widest'>Navigation</h5>
                        <div className='flex flex-col gap-2 text-sm text-gray-400'>
                            <a className='hover:text-black transition-colors' href='#'>Shop</a>
                            <a className='hover:text-black transition-colors' href='#'>Collections</a>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h5 className='text-[#C4002E] font-bold text-xs tracking-widest'>Shop</h5>
                        <div className='flex flex-col gap-2 text-sm text-gray-400'>
                            <a className='hover:text-black transition-colors' href='#'>About</a>
                            <a className='hover:text-black transition-colors' href='#'>Contact</a>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-12 border-t border-gray-200'>
                    <div className='flex gap-6'>
                        <a className='text-gray-500 hover:text-[#C4002E] transition-colors' href='https://www.instagram.com/etre42_th/'>
                            <Instagram />
                        </a>
                        <a className='text-gray-500 hover:text-[#C4002E] transition-colors' href='#'>
                            <LineIcon />
                        </a>
                        <a className='text-gray-500 hover:text-[#C4002E] transition-colors' href='https://www.facebook.com/profile.php?id=61577902331062'>
                            <Facebook />
                        </a>
                        <a className='text-gray-500 hover:text-[#C4002E] transition-colors' href='https://www.tiktok.com/@etcomps.24?_r=1&_t=ZS-948o6ufPGMi'>
                            <TikTokIcon />
                        </a>
                    </div>
                    <p className='text-[10px] text-gray-600 font-mono text-left md:text-right'>
                        © 2026 ÊTRE Rise With Confidence.<br />
                        ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
