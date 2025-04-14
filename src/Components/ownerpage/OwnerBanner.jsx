import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import './OwnerBanner.css'
function OwnerBanner() {
    const dummyImages = [
        "/Bikaner.jpg",
        "/Indore.jpg",
        "/Kadapa.jpg",
        "/Rohini.png",
        "/Durgapur.jpg",
        "/Indore.jpg",
        "/Kadapa.jpg",
        "/Rohini.png",
        "/Durgapur.jpg"
    ];
    const [modal,setmodal] = useState(false);
    const openmodal = ()=>{
      setmodal(true);
    }
    const closemodal = ()=>{
        setmodal(false);
      }
    return (
        <>
            <div className="ui-body__container">
                <div className="ui-property__header">
                    <div>
                        <p className="ui-property__breadcrumbs">
                            Property in Gurgaon / Property in Sector37C / 4 BHK Flat for Sale in Imperia The Esfera
                        </p>
                        <h1 className="ui-property__title">
                            4 BHK Flat for Sale in Imperia The Esfera
                        </h1>
                        <p className="ui-property__subtitle">Sector37C, Gurgaon</p>
                        <p className="ui-property__building">Building: Imperia The Esfera</p>

                        <div className="ui-property__badges">
                            <span className="ui-property__badge ui-property__badge--green">RERA</span>
                            <span className="ui-property__badge ui-property__badge--blue">0% Brokerage</span>
                        </div>
                    </div>
                    <div className="ui-price-box">
                        <h2 className="ui-price-box__price">₹ 2.10 Cr</h2>
                        <p className="ui-price-box__rate">₹ 8077 / Sq.ft</p>
                        <div className="ui-agent__card">
                            <FaUser className="ui-agent__icon" />
                            <div className="ui-agent__info">
                                <p className="ui-agent__name">Suresh Kumar</p>
                                <p className="ui-agent__label">Agent</p>
                            </div>
                        </div>
                        <button className="ui-contact__btn">Connect Now</button>
                    </div>
                </div>

                <div className="ui-property__main">
                    <div className="ui-property__image-section">
                        <img
                            src={dummyImages[0]}
                            alt="Property"
                            className="ui-property__main-image"
                        />
                        <div className="ui-property__thumbnail-list">
                            {dummyImages.slice(1, 4).map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="ui-property_secondaryimage"
                                />
                            ))}

                            {dummyImages.length > 4 && (
                                <div className="ui-property_secondaryimage ui-thumbnail__overlay">
                                    <img
                                        src={dummyImages[4]}
                                        alt="More thumbnails"
                                        className="ui-property_secondaryimage"
                                    />
                                    <div className="ui-thumbnail__overlay-text">
                                        +{dummyImages.length - 4}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="ui-property__info-card">


                        <div className="ui-config__details">
                            <ul className="ui-config__list">
                                <li><strong>Configuration:</strong> 4 BHK Flat</li>
                                <li><strong>Area:</strong> 2600 Sq.ft</li>
                                <li><strong>Possession:</strong> Ready To Move</li>
                                <li><strong>Property Age:</strong> February 2025</li>
                                <li><strong>Bedroom:</strong> 4</li>
                                <li><strong>Bathroom:</strong> 4</li>
                                <li><strong>Balcony:</strong> 4</li>
                                <li><strong>Floor Number:</strong> 10 of 34</li>
                                <li><strong>Furnishing:</strong> Semi-Furnished</li>
                                <li><strong>RERA Id:</strong> UPRERAPRJ7353</li>
                                <li><strong>Ownership:</strong> Leasehold</li>
                            </ul>
                        </div>
                        <div className="ui-error-report__box">
                            <p>Is there any error or missing information?</p>
                            <button className="ui-error-report__btn">Report Error / Add Missing Information</button>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default OwnerBanner