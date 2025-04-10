import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { IoHeartOutline } from 'react-icons/io5';
import 'swiper/css';
import 'swiper/css/navigation';
import './HomeInt.css';

function HomeInt1() {
    const data = [
        {
            image: './image.jpg',
            description: 'Sleek, efficient, and modern designs tailored to your needs.'
        },
        {
            image: './image1.jpg',
            description: 'Sleek, efficient, and modern designs tailored to your needs.'
        },
        {
            image: './image2.jpg',
            description: 'Sleek, efficient, and modern designs tailored to your needs.'
        },
        {
            image: './image.jpg',
            description: 'Sleek, efficient, and modern designs tailored to your needs.'
        },
        {
            image: './image1.jpg',
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
                        spaceBetween={20}
                        slidesPerView={3}
                        loop={true}
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            enabled: true
                        }}
                        autoplay={{ 
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                        breakpoints={{
                            // when window width is >= 320px
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10
                            },
                            // when window width is >= 576px
                            576: {
                                slidesPerView: 1,
                                spaceBetween: 15
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 15
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20
                            }
                        }}
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <motion.div 
                                    className='wb-contain'
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
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </Swiper>
                </div>
            </div>
        </motion.div>
    );
}

export default HomeInt1;