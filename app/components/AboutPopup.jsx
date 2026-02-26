'use client'
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const AboutPopup = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 lg:p-12">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content - Matching ProductDetail Structure */}
            <div className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col h-full max-h-[90vh] md:max-h-[85vh] animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-white/50 hover:bg-black/10 p-2 rounded-full transition-colors text-black backdrop-blur-md"
                >
                    <X className="w-6 h-6" />
                </button>



                {/* Info Area */}
                <div className="w-full flex flex-col bg-white h-auto overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-8 md:p-12 flex flex-col gap-10 scroll-smooth">
                        {/* Header Box */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[#C4002E] font-bold text-xs tracking-widest uppercase">The Brand Story</span>
                            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-black leading-tight uppercase">
                                About ÊTRE
                            </h2>
                        </div>

                        <div className="h-px bg-gray-100 w-full"></div>

                        {/* Content Blocks */}
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-6 h-px bg-[#C4002E]"></span>
                                    The Concept
                                </span>
                                <div className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-wrap space-y-4 font-light">
                                    <p>
                                        <strong className="font-semibold text-black tracking-wide">ÊTRE</strong> เราเชื่อว่าภาพลักษณ์ที่ดูดีและประสิทธิภาพในการใช้ชีวิตควรเป็นเรื่องเดียวกัน เราจึงตั้งใจที่จะทลายกำแพงระหว่าง "เครื่องแต่งกายทางธุรกิจ" และ "เสื้อผ้ากีฬา" เพื่อสร้างมาตรฐานใหม่ที่ตอบโจทย์ไลฟ์สไตล์ของผู้นำยุคใหม่ได้อย่างแท้จริง
                                    </p>
                                    <p>
                                        เราเริ่มต้นจากการสังเกตวิถีชีวิตของผู้บริหาร เจ้าของกิจการ นักลงทุนและคนทำงานระดับมืออาชีพ ที่ต้องบริหารจัดการทั้งหน้าที่การงานและวินัยในการดูแลตัวเอง หลายครั้งที่เครื่องแต่งกายกลายเป็นข้อจำกัด ทั้งในแง่ของกาลเทศะและความสะดวกสบาย
                                    </p>
                                    <p>
                                        เราจึงพัฒนาเครื่องแต่งกายในรูปแบบ <strong className="text-black font-medium">"The Suit of Activewear"</strong> โดยนำศาสตร์แห่งการตัดเย็บที่เน้นโครงสร้างและรูปทรง มาผสานเข้ากับนวัตกรรมสิ่งทอที่ยืดหยุ่นและระบายอากาศได้ดี ผลลัพธ์ที่ได้คือเสื้อผ้าที่มีความภูมิฐาน อยู่ทรง และสะอาดตาพอสำหรับการพบปะทางธุรกิจ แต่ในขณะเดียวกันก็มีความคล่องตัวสูงพร้อมสำหรับการออกกำลังกายในทันที
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-6 h-px bg-[#C4002E]"></span>
                                    Target Audience
                                </span>
                                <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-wrap font-light">
                                    เราไม่ได้ออกแบบมาเพื่อคนกลุ่มใดกลุ่มหนึ่งตามอายุ แต่เราออกแบบมาเพื่อ "ทัศนคติ" ของคนที่พิถีพิถันในรายละเอียด คนที่ประสบความสำเร็จแต่เลือกจะนำเสนอความหรูหราผ่านคุณภาพที่เรียบง่าย <span className="italic">(Quiet Luxury)</span> และมีความปรารถนาที่จะส่งต่อทัศนคติที่ดีผ่านการให้เกียรติสถานที่และคนรอบข้าง
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-6 h-px bg-[#C4002E]"></span>
                                    Our Promise
                                </span>
                                <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-wrap font-light">
                                    <strong className="text-black font-medium">ÊTRE</strong> จะยังคงยึดมั่นในมาตรฐานการผลิตที่ประณีต ตั้งแต่การเลือกวัสดุไปจนถึงรายละเอียดการเย็บที่เล็กที่สุด เราไม่ได้มุ่งหวังเพียงแค่การขายเสื้อผ้า แต่เรามุ่งหวังที่จะเป็นส่วนหนึ่งที่ช่วยส่งเสริมความมั่นใจและประสิทธิภาพในทุกช่วงเวลาของชีวิตคุณ
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Fixed Footer Area Matching ProductDetail Add to Cart */}
                    <div className="p-8 border-t border-gray-100 bg-white flex justify-between items-center bg-gray-50/50">
                        <p className="text-lg md:text-xl font-medium tracking-wide italic text-gray-800 font-serif">" Rise with Confidence. "</p>
                        <p className="text-xl md:text-2xl font-bold tracking-widest uppercase text-black">ÊTRE.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutPopup;
