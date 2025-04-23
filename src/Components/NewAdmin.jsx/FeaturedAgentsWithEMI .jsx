import React from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "./FeaturedAgentsWithEMI.css";

const FeaturedAgentsWithEMI = () => {
    // Static agents data
    const agents = [
        {
            name: 'Townmanor',
            group: 'TownManor Infratech LLP ',
            rating: '4.5',
            reviews: '10',
            location: 'Noida , Up',
            image: '/infratech2.png',
            verified: true
        },
        {
            name: 'Your Name Here',
            group: 'Become a Top Agent',
            rating: null,
            reviews: null,
            location: 'Your city',
            image: '/dummyagent.jpg',
            verified: false
        },
        {
            name: 'Your Name Here',
            group: 'Join as Top Agent',
            rating: null,
            reviews: null,
            location: 'Your City',
            image: '/dummyagent.jpg',
            verified: false
        },
        {
            name: 'Your Name Here',
            group: 'Join as Top Agent',
            rating: null,
            reviews: null,
            location: 'Your City',
            image: '/dummyagent.jpg',
            verified: false
        }
    ];

    return (
        <div className="agentEmiUnique__wrapper">
            <div className="agentEmiUnique__agentSection">
                <h3 className="agentEmiUnique__title">Featured Agent</h3>
                <p className="agentEmiUnique__subtitle">Get in touch with the Top Agents</p>
                
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    navigation={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        }
                    }}
                    className="agentEmiUnique__swiper"
                >
                    {agents.map((agent, index) => (
                        <SwiperSlide key={index}>
                            <div className={`agentEmiUnique__card ${!agent.verified ? 'agentEmiUnique__card--dummy' : ''}`}>
                                <img src={agent.image} alt={agent.name} className="agentEmiUnique__avatar" />
                                <h4 className="agentEmiUnique__name">{agent.name}</h4>
                                <div className="agentEmiUnique__group">{agent.group}</div>
                                {agent.verified ? (
                                    <>
                                        <div className="agentEmiUnique__rating">
                                            <FaStar color="#f4c150" /> {agent.rating} - {agent.reviews} reviews
                                        </div>
                                        {/* <div className="agentEmiUnique__verified">✅ Verified Contact</div> */}
                                        <div className="agentEmiUnique__buttons">
                                            <button>+91 7042888903</button>
                                            <a href='https://wa.me/+917042888903'><button>Contact Now</button></a>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="agentEmiUnique__joinText">Join us and feature your profile here!</div>
                                        <div className="agentEmiUnique__buttons">
                                            <button>Join Now</button>
                                        </div>
                                    </>
                                )}
                                <div className="agentEmiUnique__location">
                                    <FaMapMarkerAlt /> {agent.location}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="agentEmiUnique__formBox">
                <h4 className="agentEmiUnique__formTitle">Get Best Deal</h4>
                <p className="agentEmiUnique__formSubtitle">Contact us for Smart World Gems</p>

                <div className="agentEmiUnique__dealForm">
                    <div className="agentEmiUnique__formRow">
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email address" />
                    </div>

                    <div className="agentEmiUnique__phoneRow">
                        <select className="agentEmiUnique__countryCode">
                            <option value="+91">+91</option>
                            <option value="+1">+1</option>
                        </select>
                        <input type="tel" placeholder="Phone number" />
                    </div>

                    <button className="agentEmiUnique__sendBtn">Send</button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedAgentsWithEMI;
