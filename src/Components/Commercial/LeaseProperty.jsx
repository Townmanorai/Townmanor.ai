import React, { useEffect, useState } from 'react';
import lease from './Lease.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';
// import './Lease.css'
import Map from '../SearchProperty/Map';
function LeaseProperty() {
    const [leasedata, setleasedata] = useState([]);
    const [property, setproperty] = useState(null); // Initialize as null

    useEffect(() => {
        setleasedata(lease);
    }, []);

    useEffect(() => {
        console.log('Lease data:', lease);
        if (lease.length > 0) {
            setproperty(lease[0]); // Set property to the first item of lease
        }
    }, [leasedata]);

    console.log('Property:', property);
    const [state, setstate] = useState(
        [
            {
                lat: "28.5221024",
                lng: "77.2370138",

            }
        ]
    )
    const imgdata = [
        {
            img: '/saya1.jpg'
        },
        {
            img: '/leaseprop2.jpg'
        },
        {
            img: '/leaseprop3.jpg'
        },
        {
            img: '/leaseprop1.jpg'
        },
        {
            img: '/leaseprop2.jpg'
        },
        {
            img: '/leaseprop3.jpg'
        }
    ]
    return (
        <>
            <div className='leasebanner'>
                <Swiper
                    modules={[Autoplay, EffectCards]}
                    spaceBetween={50}
                    slidesPerView={3}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    {
                        imgdata.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div id='leaseimgbox'>
                                    <img src={item.img} id='leaseimg' alt={`Lease image ${index + 1}`} />
                                </div>

                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className='leasehighlight'>
                <div id='left'>
                    <p id='left-add'>Office Space For lease </p>
                    <p> Sector 146 , Noida , up</p>
                </div>
                <div id='right'>
                    <li>Notice Period : 2year</li>
                    <li>35k Rent per month </li>
                    <li>1300 sq.ft</li>
                    <li>Property Age:1year</li>
                </div>
            </div>
            <div className='lease-detail'>
                <div id='left2'>

                    <li><span>Built-up-Area</span>1350 sq.ft</li>
                    <li><span>Floor </span>4 of 16</li>
                    <li><span>Flooring </span>Granite marvel</li>
                    <li><span>Facing </span>north east</li>
                    <li><span>Notice period </span>3month</li>
                    <li><span>lock in period </span>7month</li>
                    <li><span>Property Layout </span> 1cabin , 1meeting room , 12seats</li>
                    <li><span>Security </span> fire Extinguisher , sprinkler</li>
                    {/* <li><span>Montly Rent </span>35,000</li>
                  <li><span>Security Amount </span>70,000</li> */}
                </div>
                <div id='right2'>
                    <h1>Price Details</h1>
                    <div className='lease-payment'>
                        <li>Montly Rent </li>
                        <li>&#8377;35,000 per month</li>
                    </div>
                    <div className='lease-payment'>
                        <li>Security Amount</li>
                        <li>&#8377;70,000 one time</li>
                    </div>
                    <div className='lease-payment'>
                        <li>Maintenance Charge</li>
                        <li>&#8377;1,000 per month</li>
                    </div>
                </div>
            </div>
            <div className='lease-desc'>
                <h1>About Property</h1>
                <p>This ready-to-use commercial office space is available for rent in a commercial complex. The property is located in Assotech Business Cresterra, Service Road, Sector 135, Bajidpur, Noida, India. The office space is north-facing and has a total area of 532 square feet, with a carpet area of the same size. The flooring is done with granite tiles, giving it a modern and professional look. The property is freehold and is between 1 to 3 years old. The office is on the 4th floor of a 16-floor building and comes with 1 cabin and 1 meeting room. The approximate rent for this office is ₹35,000. It will be available from August 22, 2024. The notice period for vacating the premises is 2 months. This office space is perfect for businesses looking for a ready-to-move-in setup in a prime commercial location.</p>
            </div>
            <div className='lease-second'>
                <div id='leasemap'>
                    <Map results={state}></Map>
                </div>
                <div id='leasecontact'>
                    <h1> contact detail</h1>
                    <li>Rahul Aggarwal</li>
                    <li>9910345678</li>
                </div>
            </div>
        </>
    );
}

export default LeaseProperty;
