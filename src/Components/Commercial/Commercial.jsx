import React, { useEffect, useState } from 'react';
// import './Commercial2.css'
import './Commain.css'
import Map from '../SearchProperty/Map'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Commercialdata from './CommercialJson.json';
import lease from './Lease.json';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import axios from 'axios'; // Import Axios
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';
import { FaCalendarAlt } from "react-icons/fa";
import { PiMapPinAreaLight } from "react-icons/pi";
function Commercial() {

  const [commercialdata, setcommercialdata] = useState([]);
  const [compareshow, setcompareshow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [city, setCity] = useState('Noida');
  const [leasedata, setleasedata] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`City: ${city}, Search Query: ${searchQuery}`);
    // Here you can add logic to search based on city and searchQuery
  };
  useEffect(() => {
    const fetchCommercialData = async () => {
      try {
        const response = await axios.get('https://www.townmanor.ai/api/api/commercial/commercial-details');
        // Parse the category string to an array
        setcommercialdata(response.data);
        console.log(commercialdata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   
    fetchCommercialData();
   
  }, []);
  const filterDataByCity = () => {
    return commercialdata.filter(item => item.city === city);
  };
  const navigate = useNavigate();
  const [category, setcategroy] = useState('shop');
  const [visibleCount, setVisibleCount] = useState(3);
  const [compareData, setCompareData] = useState([]);
  const [leasetype, setleasetype] = useState('');

  const [state, setstate] = useState(
    [
      {
        lat: "28.5221024",
        lng: "77.2370138",

      }
    ]
  )
  // const filteredleasedata = lease.filter(item =>
  //   item.leasetype === leasetype
  // );
  const imgdata = [
    {
      img: '/commercial1.jpg'
    },
    {
      img: '/commercial2.jpeg'
    },
    {
      img: '/commercial3.jpg'
    },
    {
      img: '/commercial1.jpg'
    },
    {
      img: '/commercial2.jpeg'
    },
    {
      img: '/commercial3.jpg'
    }
  ]
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  const handleKnowMore = (index) => {
    navigate(`/commercial3/${index}`); // Navigate to Commercial2 with the selected index
  };
  const settings2 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const settings3 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 3); // Load 3 more entries
  };
 
  const formatCurrency = (amount) => {
    const crore = Math.floor(amount / 10000000);
    const lakh = Math.floor((amount % 10000000) / 100000);
    const formatted = [];

    if (crore > 0) {
      formatted.push(`${crore} Crore`);
    }
    if (lakh > 0) {
      formatted.push(`${lakh} Lakh`);
    }

    return formatted.join(' ');
  }
  const filteredData = commercialdata
  .filter(item => item.city === city)  // Filter by city
  .filter(item => JSON.parse(item.category).includes(category));
  // console.log(filteredData);
  const trimPossessionDate = (dateString) => {
    return dateString.slice(0, -14); // Removes the last 15 characters
  };
  const handleCompare = (index) => {
    const selectedItem = filteredData[index];
  
    // Check if the selected property already exists in the compareData array
    const isDuplicate = compareData.some(item => item.id === selectedItem.id);  // Assuming 'id' is unique
  
    if (isDuplicate) {
      console.log('This property is already in the compare list!');
    } else {
      // If it's not a duplicate, add it to compareData
      setCompareData((prevCompareData) => [...prevCompareData, selectedItem]);
      console.log('Property added to compare list:', selectedItem);
    }
  };
  
  
  const filteredDatax = commercialdata.filter(item =>
    item.category && item.category.includes(category) && item.property_name // Ensure valid property name
  );
  const handleDelete = (index) => {
    setCompareData(prevCompareData =>
      prevCompareData.filter((_, idx) => idx !== index)
    );
  };

  return (
    < >
      <div className='containerbox'>


        <div className='combanner'>
          <img src='/blue.png' id='ban-img'></img>

        </div>
        <div className='combanner combannerupdate'>
      <form onSubmit={handleFormSubmit}>
        <select value={city} onChange={handleCityChange}>
          <option value="Noida">Noida</option>
          <option value="Delhi">Delhi</option>
          <option value="Gurgaon">Gurugram</option>
          <option value="Faridabad">Faridabad</option>
          <option value="Ghaziabad">Ghaziabad</option>
        </select>
        <input 
          placeholder='Search project and locality'
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button type="submit" className='combtn2'>Search</button>
      </form>
    </div>
        <div className='fronthead'>
          <h1>Available <b>Property</b></h1>
        </div>
        <div className='mapbox'>
          <Map results={filteredData} />
        </div>
        <div className='fronthead'>
          <h1>Different <b>goal</b> Different <b>Option</b></h1>
        </div>
        <div className='investmentplan'>
          <div className='combuttonbox'>
            <button className={`combtn3 ${category === 'shop' ? 'activecom' : ''}`} onClick={() => {
              setcategroy('shop');
            }}>Shop/Retail space</button>
            <button className={`combtn3 ${category === 'officespace' ? 'activecom' : ''}`} onClick={() => setcategroy('officespace')
            }>Office Space</button>
            <button className={`combtn3 ${category === 'foodcourt' ? 'activecom' : ''}`} onClick={() => {
              setcategroy('foodcourt');
            }}>Restuarant</button>
            <button className={`combtn3 ${category === 'other' ? 'activecom' : ''}`} onClick={() => {
              setcategroy('other');
            }}>Other</button>
          </div>
          <div className='investmentoptionbox'>
            {filteredData.length > 0 ? (
              filteredData.slice(0, visibleCount).map((item, index) => (
                <div className='investmentoption' key={index}>
                  <p id='investhead'>{item.project_name || "Unnamed Property"}</p>
                  <div className='invdata'>
                    <p id='add'>{item.address || "No Address Available"}</p>
                    <button className='invbtn' onClick={() => {
                      handleCompare(index)
                    }}>Compare</button>
                    <button className='invbtn invbtn2' onClick={() => {
                      handleKnowMore(item.id)
                    }}>Know More</button>
                  </div>
                  <div className='combuttonbox2'>
                    <button className='combtn4'>Invest: {item.invest}</button>
                    <button className='combtn4'>Return : {item.return_policy}</button>
                    <button className='combtn4'>Possession Date: {trimPossessionDate(item.possession_date)}</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No properties available for this category.</p>
            )}


            <div id='loadmore'>
              <button className='combtn3' onClick={loadMore}>Load More</button>
            </div>

          </div>
          <div className='investmentoptionbox2'>
            <Slider {...settings2}>
              {filteredData.map((item, index) => (
                <div className='investmentoption' key={index}>
                  <p id='investhead'>{item.property_name}</p>
                  <p id='add'>{item.address}</p>
                  <div className='invdata'>
                  
                    <button className='invbtn' onClick={() => {
                      handleCompare(index)
                    }}>Compare</button>
                    <button className='invbtn invbtn2' onClick={() => {
                      handleKnowMore(item.id)
                    }}>Know More</button>
                  </div>
                  <div className='combuttonbox2'>
                    <button className='combtn4'>Invest: {item.invest}</button>
                    <button className='combtn4'>Get Guaranteed lease {item.lease_amount}</button>
                    <button className='combtn4'>Possession Date: {trimPossessionDate(item.possession_date)}</button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        { compareData.length > 1 && (
          <>
            <div className='fronthead leaseban'>
              <h1>Compare & <b>Choose</b></h1>
            </div>
            <div className='comparebox'>
              <div className='dataheading'><li className='odd'>Investment Amount</li>
                <li>Location</li>
                <li className='odd'>Investment Return</li>
                <li >Construction Status:</li>
                <li className='odd'>Possesion Date/Property Age</li>
                <li>Area Detail</li>
                <li className='odd'>PreApproved Bank</li>

              </div>



              {compareData.map((item, index) => (
                <div key={index} className='databox'>
                  <ul>
                    <li id='datahead'>{item.project_name}</li>
                    <li id='imagebox'><img src={'/'+item.face_image} id='compareimg' /></li>
                    <li className='odd'> &#8377;{item.invest}</li>
                    <li>{item.address}</li>
                    <li className='odd'> &#8377;{item.return_policy} </li>
                    <li >{item.construction_status}</li>
                    <li className='odd'>{trimPossessionDate(item.possession_date)}</li>
                    <li>{item.project_area_range}</li>
                    <li className='odd'>{item.bank}</li>
                    <button className='btn  btn-outline-success mt-3' onClick={() => handleKnowMore(item.id)}>Read more</button>
                    <button className='btn btn-outline-dark mx-2 mt-3' onClick={() => handleDelete(index)}>Remove</button>
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}

        { compareData.length > 1 && (
          <>
            <div className='comparebox2'>
              <Swiper

                spaceBetween={50}
                slidesPerView={2}
              >




                {compareData.map((item, index) => (
                  <SwiperSlide>
                    <div key={index} className='databox'>
                      <ul>
                      <li id='datahead'>{item.project_name}</li>
                    <li id='imagebox'><img src={'/'+item.face_image} id='compareimg' /></li>
                    <li className='odd'> &#8377;{item.invest}</li>
                    <li>{item.address}</li>
                    <li className='odd'> &#8377;{item.return_policy} </li>
                    <li >{item.construction_status}</li>
                    <li className='odd'>{trimPossessionDate(item.possession_date)}</li>
                    <li>{item.project_area_range}</li>
                    <li className='odd'>{item.bank}</li>
                    <button className='btn  btn-outline-success mt-3' onClick={() => handleKnowMore(item.id)}>Read more</button>
                    <button className='btn btn-outline-dark mx-2 mt-3' onClick={() => handleDelete(index)}>Remove</button>
                      </ul>
                    </div>
                  </SwiperSlide>

                ))}
              </Swiper>
            </div>
          </>
        )}
        <div className='fronthead leaseban '>
          <h1>Find <b>Perfect</b> Lease <b>Property</b></h1>
        </div>
        <div className='lease'>
          <div className='lease-category' onClick={() => {
            setleasetype('office_space');
            setVisible(!visible);
          }}>
          <h1>OfficeSpace</h1>
          <div>
            <img src="/office-space.jpg" alt="" id='leaseimg' />
          </div>
          </div >
          <div className='lease-category' onClick={() => {
            setleasetype('shop');
            setVisible(!visible);
          }}>
           <h1>Shop/Retail Space</h1>
           <div>
            <img src="/Shop.jpg" alt="" id='leaseimg' />
          </div>
          </div>
          <div className='lease-category' onClick={() => {
            setleasetype('shop');
            setVisible(!visible);
          }}>
          <h1>Showroom</h1>
          <div>
            <img src="/showroom.jpg" alt="" id='leaseimg' />
          </div>
          </div>
        </div>
        <div className='fronthead' style={{ display: visible ? 'block' : 'none' }}>
          <h1 id='comingsoon'>Coming <b>Soon</b></h1>
        </div>
        <div className='bigswipe'>
          <Swiper
            modules={[Autoplay, EffectCards]}
            spaceBetween={20}
            slidesPerView={4}

            autoplay={{
              delay: 3000,
              disableOnInteraction: false, // Autoplay will not be disabled after user interactions
            }}
          >
            {commercialdata.map((item, index) => (

              <SwiperSlide>
                <div className='advbox2'><img src={'/'+item.image_banner} id='advertisment' alt={`Commercial image ${index + 1}`} /></div>
              </SwiperSlide>
            ))}

            ...
          </Swiper>
        </div>
        <div className='smallswipe'>
          <Swiper
            modules={[Autoplay, EffectCards]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false, // Autoplay will not be disabled after user interactions
            }}
          >
            {commercialdata.map((item, index) => (

              <SwiperSlide>
                <div className='advbox2'><img src={'/'+item.image_banner} id='advertisment' alt={`Commercial image ${index + 1}`} /></div></SwiperSlide>
            ))}

            ...
          </Swiper>
        </div>

        {/* <div className='advimg'>
          <Slider {...settings}>
            {imgdata.map((item, index) => (
              <div className='advbox2' key={index}>
                <img src={item.img} id='advimg' alt={`Commercial image ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div> */}

        {/* Video and contactbox  */}


        <div className='comimf'>
          <div className='videobox'>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/8H6TXy27XGM`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted;"
            >

            </iframe>
          </div>
          <div className='contactbox'>
            <h3>Share your Detail & we will guide you in investment journey</h3>
            <form id='contactform'>
              <input type='text' placeholder='Name'>

              </input>
              <input type='phone' placeholder='Phone Number'>

              </input>
              <button type="button" class="prisubmit" style={{
                background:'white !important'
              }}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Commercial