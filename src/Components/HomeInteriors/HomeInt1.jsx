import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./HomeInt.css";
import { IoHeartOutline } from "react-icons/io5";

// Make sure to import Swiper styles
import 'swiper/css';


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
        <div className='What-we-Offer'>
            <div className='container'>
                <div>
                    <h1 className='Wo-heading'>What we Offer</h1>
                </div>
                <div className='wo-box'>
                    <Swiper
                        spaceBetween={5}
                        slidesPerView={3}
                        onSlideChange={() => console.log('Slide changed')} onSwiper={(swiper) => console.log(swiper)}>
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='wb-contain'>
                                    <div className='hr-icon'>
                                        <IoHeartOutline style={{ color: 'red' }} />
                                    </div>
                                    <div className='wb-img'>
                                        <img src={item.image} alt={`Image ${index}`} />
                                    </div>
                                    <p className='wb-para'>{item.description}</p>
                                    <div className='action-links'>
                                        <span className='more-details'>More Details&gt;&gt;</span>
                                        <button className='get-quote-btn'>Get Quote</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default HomeInt1;