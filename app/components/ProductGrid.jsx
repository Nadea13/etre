'use client'
import React, { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import ProductDetail from './ProductDetail';

const productsData = [
    {
        id: 1,
        name: "The Signature Training Tee",
        price: "1,700 THB",
        collection: "First Collection",
        badge: "Best Seller",
        mainImage: "/uploads/486A9491.jpg",
        images: [
            "/uploads/486A9494.jpg",
            "/uploads/486A9491.jpg",
            "/uploads/486A9487.jpg",
            "/uploads/486A9489.jpg",
            "/uploads/486A9506.jpg",
            "/uploads/486A8944.jpg"
        ],
        description: "THE SUIT OF ACTIVEWEAR: นิยามใหม่ของเสื้อเทรนนิ่งเพื่อผู้บริหารที่ไม่ยอมหยุดนิ่ง\n\nเพราะเราเชื่อว่า \"เวลา\" คือสิ่งที่มีค่าที่สุดสำหรับคุณ เราจึงรังสรรค์เสื้อเทรนนิ่งที่ลายเส้นระหว่างธุรกิจและกีฬามาบรรจบกันอย่างสมบูรณ์แบบ เพื่อตอบโจทย์ไลฟ์สไตล์ที่เร่งรีบแต่ต้องคงความเนี้ยบในทุกมิติ\n\nDESIGNED FOR PRECISION, BUILT FOR PERFORMANCE\n\nเราไม่อยากให้คุณต้องเสียเวลาแม้แต่ 3 นาทีในการเปลี่ยนชุดเพื่อเข้ายิม เสื้อตัวนี้จึงถูกออกแบบมาให้เป็นเสมือน \"สูทในรูปแบบชุดกีฬา\" ที่มอบความสบายสูงสุดและคล่องตัวอย่างเหนือชั้น ตั้งแต่ห้องประชุมไปจนถึงดัมเบลลูกแรกของคุณ\n\nCRAFTSMANSHIP & TEXTURE\n\nFabric Innovation: ตัวผ้ามาพร้อมความยืดหยุ่นสูง(Ultra - Stretch) รองรับทุกการเคลื่อนไหว แต่มีความนุ่มนวลต่อผิวสัมผัส\n\nStructured Silhouette: เราเลือกใช้เนื้อผ้าที่มีน้ำหนักเฉพาะตัว(Weighted Fabric) เพื่อให้เสื้อทิ้งตัวสวยและอยู่ทรงตลอดวัน ไม่ยับง่ายเหมือนเสื้อยืดทั่วไป\n\nTailored Details: * ด้านหน้า: โดดเด่นด้วยดีไซน์การเย็บที่ประณีต  สะท้อนความหรูหราและเพิ่มมิติให้รูปร่างดูสมาร์ท\n\nด้านหลัง: การตัดต่อชิ้นผ้าเพื่อโชว์การเย็บที่นอกจากจะช่วยเรื่องการเคลื่อนไหวแล้ว ยังเสริมบุคลิกให้ดูสง่างามจากทุกมุมมอง\n\nEMBRACE THE UNINTERRUPTED LIFE\n\nนี่ไม่ใช่แค่เสื้อผ้า แต่นี่คือเครื่องมือที่จะช่วยให้คุณบริหารจัดการเวลาได้อย่างมีประสิทธิภาพสูงสุด อย่าปล่อยให้เวลาอันมีค่าต้องหมดไปกับการเปลี่ยนชุด เพราะทุกวินาทีของคุณมีไว้เพื่อสร้างความสำเร็จ",
    },
    {
        id: 2,
        name: "The Signature Active",
        price: "2,190 THB",
        collection: "First Collection",
        badge: "Best Seller",
        mainImage: "/uploads/486A9727.jpg",
        images: [
            "/uploads/S__18292807.jpg",
            "/uploads/486A9058.jpg",
            "/uploads/486A9062.jpg",
            "/uploads/486A9066.jpg",
            "/uploads/486A9070.jpg",
            "/uploads/486A9056.jpg",
            "/uploads/486A9685.jpg",
        ],
        description: "THE EXECUTIVE WARRIOR: นิยามของความเด็ดขาดและความกระชับระดับสูงสุด\nสำหรับผู้หญิงระดับผู้บริหารที่ชีวิตคือการขับเคลื่อน (On the move) และไม่เคยหยุดนิ่ง สปอร์ตบราตัวนี้ถูกออกแบบมาเพื่อเป็น \"ชุดเกราะแห่งความมั่นใจ\" ที่พร้อมลุยไปกับคุณในทุกสถานการณ์ ตั้งแต่การคุมหน้างาน การประชุมที่ต้องเคลื่อนไหวตลอดเวลา ไปจนถึงคลาส Crossfit หรือการวิ่งทำระยะที่ดุดัน\n\nULTIMATE STABILITY & GRIP: ล็อกกระชับ มั่นใจทุกการเคลื่อนไหว\n\nต่างจากเนื้อผ้าเน้นความยืดหยุ่นทั่วไป รุ่นนี้เราเลือกใช้เนื้อผ้าเทคนิคอลที่เน้น \"การคงรูปและความกระชับ\" (High-Compression & Non-Slip) ซึ่งเป็นหัวใจสำคัญสำหรับกิจกรรมที่มีแรงกระแทกสูง (High-Impact) เช่น การวิ่ง หรือ Crossfit\n\nNon-Sliding Fabric: เนื้อผ้าถูกออกแบบมาให้ยึดเกาะกับสรีระได้อย่างดีเยี่ยม ไม่ลื่นไถลหรือเคลื่อนผิดตำแหน่งแม้คุณจะเหงื่อออกมาก หรือต้องเคลื่อนไหวตัวอย่างรวดเร็ว\n\nPrecision Support: ให้การซัพพอร์ตที่แน่นหนา มั่นคง ช่วยลดการสั่นสะเทือนและเพิ่มความคล่องตัวให้คุณโฟกัสกับเป้าหมายได้เต็มที่\n\nFROM SITE VISIT TO SPRINT: จากหน้างานสู่ลู่วิ่ง\n\nนี่คือไอเทมที่ตอบโจทย์ เจ้าของกิจการสายลุย ที่ต้องลงพื้นที่ ตรวจงาน หรือเดินทางบ่อยๆ:\n\nRugged Elegance: ดีไซน์ยังคงความเนี้ยบหรูหราในแบบ \"The Suit of Activewear\" แต่แฝงไปด้วยความทนทาน สวมทับด้วยแจ็คเก็ตเท่ๆ สักตัว คุณก็พร้อมออกไปลุยหน้างานได้อย่างมืออาชีพ\n\nReady for Action: เมื่อภารกิจงานเสร็จสิ้น คุณสามารถพุ่งตัวเข้ายิมหรือสนามวิ่งได้ทันทีโดยไม่ต้องกังวลเรื่องการเปลี่ยนชุดที่วุ่นวาย เพราะเสื้อตัวนี้ถูกสร้างมาเพื่อรองรับการใช้งานที่หนักหน่วงที่สุด\n\nRISE WITH CONFIDENCE: สัญลักษณ์ของผู้ชนะ\n\nโลโก้บนหน้าอกยังคงทำหน้าที่เตือนใจให้คุณ \"Rise with Confidence\" ในทุกก้าวย่าง ไม่ว่าอุปสรรคตรงหน้าจะเป็นงานที่ท้าทายหรือสถิติใหม่ที่ต้องทำลาย เสื้อตัวนี้จะอยู่เคียงข้างให้คุณสง่างามและทรงพลังที่สุดในทุกบทบาท",
    },
    {
        id: 3,
        name: "The Ultra Cloud",
        price: "2,300 THB",
        collection: "First Collection",
        badge: "New Arrival",
        mainImage: "/uploads/486A9333.jpg",
        images: [
            "/uploads/486A9078.jpg",
            "/uploads/486A9088.jpg",
            "/uploads/486A9094.jpg",
            "/uploads/486A9095.jpg",
        ],
        description: "THE EXECUTIVE SERENITY: สปอร์ตบราที่เปรียบเสมือน 'สูทแห่งความมั่นใจ' สำหรับผู้หญิงที่ไม่หยุดนิ่ง\nจากห้องประชุมที่เต็มไปด้วยแรงกดดัน สู่เสื่อโยคะที่มอบความสงบ... เราเข้าใจดีว่าผู้หญิงระดับบริหารเช่นคุณ ต้องการเสื้อผ้าที่ไม่ใช่แค่ใส่สบาย แต่ต้อง \"เสริมส่งบุคลิก\" ในทุกบทบาทของชีวิต สปอร์ตบราตัวนี้จึงถูกรังสรรค์ขึ้นเพื่อเป็นเพื่อนคู่ใจที่ทำให้คุณเปลี่ยนโหมดจาก Working Woman สู่โลกแห่ง Yoga & Pilates ได้อย่างไร้รอยต่อ\n\nTHE SYMBOL OF EMPOWERMENT: \"RISE WITH CONFIDENCE\"\n\nหัวใจสำคัญของดีไซน์นี้อยู่ที่โลโก้บนหน้าอก ซึ่งไม่ใช่แค่เครื่องหมายทางการค้า แต่คือสัญลักษณ์แห่ง \"Rise with Confidence\" ที่จะคอยย้ำเตือนให้คุณก้าวข้ามทุกขีดจำกัดด้วยความมั่นใจ เป็นเครื่องหมายของความสำเร็จที่ติดตัวคุณไปในทุกท่วงท่า ไม่ว่าคุณจะกำลังพรีเซนต์งานสำคัญ หรือกำลังเข้าสู่ท่าโยคะที่ท้าทายที่สุด\n\nMASTERFUL SENSATION: สปอร์ตบรานี้มอบสัมผัสที่นุ่มนวลแต่ทรงพลัง\n\nSecond-Skin Comfort: เราเลือกใช้เนื้อผ้าคัดพิเศษที่มีความนุ่มนวลต่อผิวสัมผัสอย่างเหนือระดับ มอบความรู้สึกเบาสบายเหมือนเป็นผิวชั้นที่สอง ลดการเสียดสี ให้คุณจดจ่ออยู่กับลมหายใจและสมาธิได้อย่างเต็มที่\n\n4-Way Hyper-Stretch: ด้วยเทคโนโลยีการทอที่ยืดหยุ่นได้ครบทุกทิศทาง (All-Directional Stretch) ทำให้สปอร์ตบราตัวนี้เคลื่อนไหวไปพร้อมกับร่างกายของคุณ ไม่มีการรั้งหรือกดทับ พร้อมรองรับทุกสรีระอย่างเข้าใจ\n\nVERSATILITY FOR THE MODERN LEADER\n\nBecause your time is the most valuable: เพราะเวลาของคุณมีค่าที่สุด เราจึงออกแบบมาให้สวมใส่ทับด้วยเสื้อสูทหรือเบลเซอร์ตัวโปรดได้ทันทีหลังจบคลาส พร้อมไปลุยงานต่อหรือพักผ่อนได้โดยไม่ต้องเสียเวลาเปลี่ยนชุดหลายรอบ\n\nFlawless Support: ไม่ว่าจะเป็นการยืดเหยียดในคลาสโยคะ หรือการออกแรงในพิลาทิส คุณจะรู้สึกมั่นใจในความกระชับที่พอดี (Secure Fit) ที่ช่วยประคองสรีระให้ดูสง่างามและสมาร์ทอยู่เสมอ\n\nELEVATED LIFESTYLE\n\nนี่ไม่ใช่เพียงแค่เครื่องแต่งกายกีฬา แต่คือ \"The Suit of Activewear\" ที่สะท้อนถึงวิสัยทัศน์และการดูแลตัวเองอย่างยอดเยี่ยม ให้ทุกวินาทีที่คุณสวมใส่คือการประกาศก้องถึงความสำเร็จและความสมดุลในชีวิต",
    },
];

const ProductGrid = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const openDetail = (product) => {
        setSelectedProduct(product);
        setIsDetailOpen(true);
    };

    return (
        <section className='bg-white p-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:px-6 max-w-7xl mx-auto'>
                {productsData.map((product) => {
                    const isLimited = product.badge?.toLowerCase() === 'limited';
                    
                    if (isLimited) {
                        return (
                            <div
                                key={product.id}
                                onClick={() => openDetail(product)}
                                className='col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex flex-col md:flex-row bg-white border-2 border-[#AC593B] shadow-[0_0_35px_rgba(172,89,59,0.15)] group hover:shadow-[0_0_50px_rgba(172,89,59,0.25)] transition-all duration-500 cursor-pointer overflow-hidden'
                            >
                                <div className='md:w-1/2 lg:w-3/5 relative aspect-[4/3] md:aspect-auto overflow-hidden'>
                                    <div className='absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-100 group-hover:scale-105'
                                        style={{ backgroundImage: `url(${product.mainImage})` }}></div>
                                    <div className='absolute inset-0 bg-gradient-to-r from-black/20 to-transparent'></div>
                                    
                                    <div className='absolute top-6 left-6 px-4 py-2 bg-[#AC593B] text-white font-black text-xs tracking-[0.2em] shadow-xl flex items-center gap-2 ring-2 ring-black/5'>
                                        {product.badge.toUpperCase()}
                                    </div>
                                </div>
                                
                                <div className='md:w-1/2 lg:w-2/5 p-8 md:p-12 flex flex-col justify-center relative bg-[#FDFBF7]'>                                 
                                    <div className='space-y-6'>
                                        <div>
                                            <p className='text-[#AC593B] text-[10px] font-bold tracking-[0.3em] mb-2 uppercase'>
                                                {product.collection}
                                            </p>
                                            <h3 className='text-2xl md:text-3xl lg:text-4xl font-black text-black leading-tight group-hover:text-[#AC593B] transition-colors'>
                                                {product.name}
                                            </h3>
                                        </div>
                                        
                                        <div className='w-12 h-0.5 bg-[#AC593B]'></div>
                                        
                                        <p className='text-sm text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none'>
                                            {product.description}
                                        </p>
                                        
                                        <div className='flex flex-wrap items-center gap-6 pt-4'>
                                            <div className='flex flex-col'>
                                                <span className='text-xl md:text-2xl font-black text-black'>{product.price}</span>
                                            </div>
                                        </div>
                                        
                                        <div className='pt-6'>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); openDetail(product); }}
                                                className='flex w-full items-center justify-center gap-3 bg-black text-white px-8 py-4 text-xs font-bold tracking-widest hover:bg-[#AC593B] hover:text-white transition-all duration-300'
                                            >
                                                EXPLORE PRODUCT <Plus className='w-4 h-4' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={product.id}
                            onClick={() => openDetail(product)}
                            className='flex flex-col bg-white border border-gray-200 group hover:border-[#C4002E]/50 transition-all duration-300 cursor-pointer'
                        >
                            <div className='relative w-full aspect-[4/5] bg-gray-100 overflow-hidden'>
                                <div className='absolute inset-0 bg-cover bg-center transition-all duration-700 scale-100 group-hover:scale-110'
                                    style={{ backgroundImage: `url(${product.mainImage})` }}></div>

                                 {product.badge && (
                                    <div className={`absolute top-3 left-3 px-2 py-1 text-[9px] font-bold tracking-tighter shadow-sm flex items-center gap-1 ${
                                        product.badge.toLowerCase() === 'best seller' 
                                        ? 'bg-[#C4002E] text-white' 
                                        : 'bg-black text-white'
                                    }`}>
                                        {product.badge.toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className='flex-1 p-4 flex flex-col justify-between gap-3 border-l sm:border-l-0 sm:border-t border-gray-100'>
                                <div>
                                    <h3 className='text-xs md:text-sm font-bold leading-tight text-black group-hover:text-[#C4002E] transition-colors line-clamp-2'>
                                        {product.name}
                                    </h3>
                                    <p className='text-[10px] md:text-xs text-gray-500 mt-1'>{product.collection}</p>
                                </div>
                                <div className='flex items-center justify-between mt-1'>
                                    <span className='text-sm md:text-base font-bold text-black'>{product.price}</span>
                                    <button
                                        onClick={() => openDetail(product)}
                                        className='bg-[#AC593B] text-white h-8 w-8 flex items-center justify-center hover:bg-black transition-all'
                                    >
                                        <Plus className='w-4 h-4' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ProductDetail
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                product={selectedProduct}
            />
        </section>
    );
};

export default ProductGrid;
