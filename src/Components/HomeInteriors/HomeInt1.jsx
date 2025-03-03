import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { IoHeartOutline } from 'react-icons/io5';
import 'swiper/css';
import './HomeInt.css';

function HomeInt1() {
    const data = [
        {
            image: './pngimg.jpg',
            description: 'Sleek, efficient, and modern designs tailored to your needs.'
        },
        {
            image: './pngimg1.jpg',
            description: 'Sleek, efficient, and modern designs tailored to your needs.'
        },
        {
            image: './pngimg1.jpg',
            description: 'Sleek, efficient, and modern designs tailored to your needs.'
        },
        {
            image: './pngimg1.jpg',
            description: 'Sleek, efficient, and modern designs tailored to your needs.'
        },
        {
            image: './pngimg2.jpg',
            description: 'Sleek, efficient, and modern designs tailored to your needs.'
        }
    ];

    return (
        <motion.div 
            className='What-we-Offer' 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
        >
            <div className='container'>
                <motion.h1 
                    className='Wo-heading' 
                    initial={{ y: -20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 1 }}
                >
                    What we Offer
                </motion.h1>
                <div className='wo-box'>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{ delay: 3000 }}
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <motion.div 
                                    className='wb-contain'
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div 
                                        className='hr-icon' 
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <IoHeartOutline style={{ color: 'red' }} />
                                    </motion.div>
                                    <motion.div 
                                        className='wb-img' 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        transition={{ duration: 1.2 }}
                                    >
                                        <img src={item.image} alt={`Image ${index}`} />
                                    </motion.div>
                                    <p className='wb-para'>{item.description}</p>
                                    <div className='action-links'>
                                        <motion.span 
                                            className='more-details' 
                                            whileHover={{ scale: 1.1, color: '#ff6600' }}
                                        >
                                            More Details&gt;&gt;
                                        </motion.span>
                                        <motion.button 
                                            className='get-quote-btn' 
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Get Quote
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </motion.div>
    );
}

export default HomeInt1;