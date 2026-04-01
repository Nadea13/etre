'use client'
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const TermsConditionsPopup = ({ isOpen, onClose }) => {
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

            {/* Modal Content */}
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
                            <span className="text-[#C4002E] font-bold text-xs tracking-widest uppercase">เงื่อนไขการซื้อขาย</span>
                            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-black leading-tight uppercase">
                                Terms & Conditions
                            </h2>
                            <p className="text-sm text-gray-400 mt-2 font-light">มีผลบังคับใช้ตั้งแต่วันที่ 28 กุมภาพันธ์ 2569 | Effective 28 February 2026</p>
                        </div>

                        <div className="h-px bg-gray-100 w-full"></div>

                        {/* Content Blocks */}
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-6 h-px bg-[#C4002E]"></span>
                                    01 การสั่งซื้อและการชำระเงิน | Order & Payment
                                </span>
                                <div className="text-gray-600 space-y-3 text-[15px] font-light pl-8">
                                    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">ช่องทางสั่งซื้อ</span>
                                        <span>Instagram DM: @etre42_th / Website / Line Official</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">วิธีชำระเงิน</span>
                                        <span>โอนเงินผ่านธนาคาร (Bank Transfer) บัญชี นาย อริย สุทธิสาร เท่านั้น</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">ระยะเวลาชำระ</span>
                                        <span>กรุณาชำระภายใน 24 ชั่วโมงหลังยืนยันออเดอร์</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">การยืนยันออเดอร์</span>
                                        <span>ออเดอร์จะถือว่าสมบูรณ์เมื่อได้รับหลักฐานการชำระเงินแล้วเท่านั้น</span>
                                    </div>
                                    <p className="pt-2 text-sm italic text-gray-500">
                                        Orders are confirmed only upon receipt of payment. ÊTRE reserves the right to cancel unconfirmed orders after 24 hours.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-6 h-px bg-[#C4002E]"></span>
                                    02 การจัดส่ง | Shipping & Delivery
                                </span>
                                <div className="text-gray-600 space-y-3 text-[15px] font-light pl-8">
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">ระยะเวลาเตรียมออเดอร์</span>
                                        <span>1 วันทำการหลังได้รับการชำระเงิน</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">ระยะเวลาจัดส่ง (กรุงเทพฯ)</span>
                                        <span>1–2 วันทำการ</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">ระยะเวลาจัดส่ง (ต่างจังหวัด)</span>
                                        <span>2–3 วันทำการ</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">ค่าจัดส่ง</span>
                                        <span>แจ้งให้ทราบตอนยืนยันออเดอร์ / ตามจริง</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">Tracking</span>
                                        <span>แจ้ง Tracking Number ทาง DM หลังจัดส่ง</span>
                                    </div>
                                    <p className="pt-2 text-sm italic text-gray-500">
                                        Delivery times are estimates and may vary due to circumstances beyond our control. ÊTRE will notify customers of any significant delays.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-6 h-px bg-[#C4002E]"></span>
                                    03 นโยบายการเปลี่ยนไซส์ | Size Guarantee Policy
                                </span>
                                <div className="text-gray-600 space-y-3 text-[15px] font-light pl-8">
                                    <p className="flex items-center gap-2 text-black font-medium pb-2">
                                        เราเชื่อว่าทุกคนสมควรได้เสื้อที่พอดีตัว — เปลี่ยนไซส์ได้ ไม่มีคำถาม
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">เงื่อนไขการเปลี่ยน</span>
                                        <span>เปลี่ยนได้ 1 ครั้งต่อออเดอร์ ภายใน 7 วันหลังได้รับสินค้า</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">สภาพสินค้า</span>
                                        <span>ต้องไม่ผ่านการใช้งาน ป้ายยังอยู่ครบ สภาพเดิม</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">ไซส์ที่เปลี่ยนได้</span>
                                        <span>เปลี่ยนเป็นไซส์อื่นของสินค้าชนิดเดียวกัน</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">ค่าจัดส่งในการเปลี่ยน</span>
                                        <span>ลูกค้ารับผิดชอบค่าส่งกลับ / ÊTRE รับผิดชอบค่าส่งไปใหม่</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">วิธีแจ้งเปลี่ยน</span>
                                        <span>ติดต่อ @etre42_th ทาง DM พร้อมแนบรูปสินค้าและเหตุผล</span>
                                    </div>
                                    <p className="pt-2 text-sm italic text-gray-500">
                                        Size exchanges are subject to stock availability. If the requested size is unavailable, we will offer an alternative or store credit.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-6 h-px bg-[#C4002E]"></span>
                                    04 การยกเลิกคำสั่งซื้อ | Order Cancellation
                                </span>
                                <div className="text-gray-600 space-y-3 text-[15px] font-light pl-8">
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">ยกเลิกได้</span>
                                        <span>เฉพาะก่อนชำระเงินเท่านั้น — หากยังไม่ได้โอนเงิน สามารถแจ้งยกเลิกได้ทันที</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">ยกเลิกไม่ได้</span>
                                        <span>เมื่อชำระเงินแล้ว ถือว่าออเดอร์สมบูรณ์ ไม่สามารถยกเลิกหรือคืนเงินได้ทุกกรณี</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">หลังได้รับสินค้า</span>
                                        <span>หากไซส์ไม่พอดี สามารถเปลี่ยนไซส์ได้ตาม Size Guarantee Policy เท่านั้น</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
                                        <span className="font-semibold text-black">วิธีแจ้งยกเลิก (ก่อนโอน)</span>
                                        <span>ติดต่อ @etre42_th ทาง DM พร้อมระบุหมายเลขออเดอร์</span>
                                    </div>

                                    <div className="mt-4 p-4 bg-gray-50 border-l-2 border-[#C4002E]">
                                        <p className="flex items-start gap-2 text-sm">
                                            <span>⚠️</span>
                                            <span>
                                                <strong className="text-black">เมื่อชำระเงินแล้ว ไม่สามารถยกเลิกหรือคืนเงินได้ทุกกรณี</strong><br />
                                                — กรุณาตรวจสอบออเดอร์ให้ถูกต้องก่อนโอนเงินทุกครั้ง
                                            </span>
                                        </p>
                                    </div>

                                    <p className="pt-2 text-sm italic text-gray-500">
                                        All sales are final upon payment. No refunds will be issued after payment is received. For size issues, please refer to our Size Guarantee Policy.
                                    </p>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 w-full mt-4"></div>

                            <div className="flex flex-col items-center justify-center text-center gap-2 pt-4">
                                <p className="text-gray-600 font-medium">มีคำถามเพิ่มเติม ติดต่อเราได้เลยครับ</p>
                                <p className="text-gray-500 font-light text-sm">Instagram: @etre42_th | For any questions, please contact us directly</p>
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

export default TermsConditionsPopup;
