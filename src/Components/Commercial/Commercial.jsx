import React, { useEffect, useState } from 'react';
// import './Commercial2.css'
import './Commain.css'
import Map from '../SearchProperty/Map'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import { FaLongArrowAltRight } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import { MdCompareArrows } from "react-icons/md";
import { CiLocationOn } from 'react-icons/ci';
import { FaCodeCompare, FaLink } from 'react-icons/fa6';
import { BsDatabaseFillUp } from 'react-icons/bs';
import { VscGraphLine } from 'react-icons/vsc';
import { IoCalendarOutline } from 'react-icons/io5';
import { BiArea } from 'react-icons/bi';
import { FaBuilding, FaStore, FaChartLine, FaMapMarkerAlt } from "react-icons/fa";
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
        
        // setCity('Noida');
        
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
    infinite: true,
    speed: 2000,
    autoplay: true,         
    autoplaySpeed: 2000,    
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
    // Ensure dateString is valid before slicing
    if (dateString && typeof dateString === 'string' && dateString.length > 14) {
      return dateString.slice(0, -14); // Remove the last 14 characters
    }
    return dateString; // Return the original value if it's invalid
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
       <Helmet>
  <title>Commercial Investment platform</title>
  <meta name="description" content="This is the platform which provides accurate data for commercial investment" />
  <meta name="keywords" content="Commercial Investment, Protech platform, Commercial property in Noida, Commercial property in Gurugram" />
  {commercialdata.map((property, index) => {
    const propertyKeywords = `${property.project_name}, ${property.address}`;
    return (
      <meta key={index} name="keywords" content={propertyKeywords} />
    );
  })}
</Helmet>

      <div className='containerbox'>
     

        {/* <div className='combanner'>
          <img src='https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/blue.png' id='ban-img'></img>

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
        </div> */}
        <div style={{
          height:'70px'
        }} 
        className='diff'></div>
        {/* <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          // margin:'10px 40px'
        }}
        
        id='commainbanner'>
          <div className='newbannerleft'>
            <h2>Start <b>your</b> Commercial <b>Investment</b></h2>
            <h3>Commercial <b>investment</b> is the <b>key</b> to unlocking <b>lasting wealth.</b></h3>
            <div className='bannersearchbox'>
            <select value={city} onChange={handleCityChange} id='bannerselect'>
              <option value="Noida">Noida</option>
              <option value="Delhi">Delhi</option>
              <option value="Gurgaon">Gurugram</option>
              <option value="Faridabad">Faridabad</option>
              <option value="Ghaziabad">Ghaziabad</option>
            </select>
            <input
              placeholder='Search project'
              value={searchQuery}
              onChange={handleSearchQueryChange}
              id='bannerinput'
            />
             <button type="button" class="btn btn-dark commercialbtn" style={{
              height:'40px',
              width:'150px',
              background:'linear-gradient(to right, #ff4447, #8a2e2e)'
             }}>Search</button>
            </div>
          </div>
          <div className='newbannerright'>
            <img src='/citymain6.jpg' id='combannerimg'></img>
          </div>
        </div> */}
          <div className="promo_banner_wrapper">
      {/* Left Section */}
      <div className="promo_left_panel">
        <h1 className="promo_main_heading">
          Unlock Growth with <br />
          Smart Commercial Investments
        </h1>
        <p className="promo_subtext">
          Start your journey to financial freedom with trusted, high-yield commercial projects.
        </p>

        <div className="promo_search_bar">
          <select 
            className="promo_dropdown"
            value={city} 
            onChange={handleCityChange}
          >
            <option value="Noida">Noida</option>
            <option value="Delhi">Delhi</option>
            <option value="Gurgaon">Gurugram</option>
            <option value="Faridabad">Faridabad</option>
            <option value="Ghaziabad">Ghaziabad</option>
          </select>
          <input
            className="promo_input_field"
            type="text"
            placeholder="Search for commercial project"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <button 
            className="promo_search_button"
            onClick={handleFormSubmit}
          >Search</button>
        </div>

        <div className="promo_features_row">
          <div className="promo_feature_box">
            <FaBuilding />
            <span>Premium Offices</span>
          </div>
          <div className="promo_feature_box">
            <FaStore />
            <span>Retail Spaces</span>
          </div>
          <div className="promo_feature_box">
            <FaChartLine />
            <span>High ROI</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="promo_right_panel">
        <img
          src="/citymain6.jpg"
          alt="Vertex Business Tower"
          className="promo_building_image"
        />
        <div className="promo_building_card">
          <h2 className="promo_card_heading">Bhutani City Centre Sector 32</h2>
          <p className="promo_card_location">
            <FaMapMarkerAlt /> Sector 32, Noida
          </p>
          <ul className="promo_card_features">
            <li>✅ Premium Grade A Office Space</li>
            <li>✅ lease guarantee upto May 2028</li>
            <li>✅ 31,000 per sq.ft onwards</li>
          </ul>
          <button className="promo_card_button" onClick={()=>{
            navigate('/commercial3/8')
          }}>View Details</button>
        </div>
      </div>
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
        {/* <div id='newcommerciallisting'>
          <div className='newcommercialleft'>
            <img src='/apexmain.jpg' id='commerciallistingimg'></img>
            <div id='listingbutton'>
              <button className='btn btn-success' style={{
                background:'green'
              }}>
                Compare
              </button>
              <button className='btn btn-secondary'>
                Know More
              </button>
            </div>
          </div>
          <div className='newcommercialright'>
            <div className='listingdataheading'>
              <div id='listingmainhead'>
                <span>Grandthum by 108</span>
                <p>Noida Extension,Noida</p>
              </div>
              <span>Rating 4.5</span>
            </div>
            <div id='listingdatabox'>
              <h1>Details</h1>
              <div className='listingpoint'>
              <li>Invest : 47 lakhs onwards</li>
              <li>Invest : 47 lakhs onwards</li>
              <li>Invest : 47 lakhs onwards</li>
              <li>Invest : 47 lakhs onwards</li>
              </div>
            </div>
          </div>
        </div> */}
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
                // <div className='investmentoption' key={index}>
                //   <p id='investhead'>{item.project_name || "Unnamed Property"}</p>
                //   <div className='invdata'>
                //     <p id='add'>{item.address || "No Address Available"}</p>
                //     <button className='invbtn' onClick={() => {
                //       handleCompare(index)
                //     }}>Compare</button>
                //     <button className='invbtn invbtn2' onClick={() => {
                //       handleKnowMore(item.id)
                //     }}>Know More</button>
                //   </div>
                //   <div className='combuttonbox2'>
                //     <button className='combtn4'>Invest: {item.invest}</button>
                //     <button className='combtn4'>Return : {item.return_policy}</button>
                //     <button className='combtn4'>Possession Date: {trimPossessionDate(item.possession_date)}</button>
                //   </div>
                // </div>
                <div id='newcommerciallisting' key={index}>
          <div className='newcommercialleft'>
            <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + item.face_image}  id='commerciallistingimg'></img>
            <div id='listingbutton'>
              {/* <button className='btn btn-success' style={{
                background:'black'
              }}
              onClick={()=>{handleCompare(item.id)}}
              >
                Compare
              </button> */}
              <button class="custom-button" 
                onClick={()=>{handleCompare(item.id)}}
              style={{
                background:'white'
              }}>
    <div class="custom-icon"  >
        <div class="inner-circle"><MdCompareArrows  style={{
          color:'white'
        }}
        
        /></div>
    </div>
    <span class="button-text">Compare</span>
</button>
              <button className='btn btn-secondary' onClick={()=>{handleKnowMore(item.id)}} style={{
                border:'none',
                borderRadius:'12px',
                height:'35px'
              }}>
                Know More
                
              </button>
            </div>
          </div>
          <div className='newcommercialright'>
            <div className='listingdataheading'>
              <div id='listingmainhead'>
                <span>{item.project_name}</span>
                <p>{item.address}</p>
              </div>
              {/* <span>
                {item.builder}
              </span> */}
            </div>
            <div id='listingdatabox'>
              <h1>Details</h1>
              <div className='listingpoint'>
              <li><FaLongArrowAltRight style={{
                color:'green',
                margin:'2.5px 4px',
                width:'15px',
                height:'18px'
              }} />Invest : {item.invest}</li>
              <li><FaLongArrowAltRight style={{
                color:'green',
                margin:'2.5px 4px',
                width:'15px',
                height:'18px'
              }}/>Return : {item.return_policy}</li>
              <li><FaLongArrowAltRight style={{
                color:'green',
                margin:'2.5px 4px',
                width:'15px',
                height:'18px'
              }}/>Possession Date: {trimPossessionDate(item.possession_date)}</li>
              <li><FaLongArrowAltRight style={{
                color:'green',
                margin:'2.5px 4px',
                width:'15px',
                height:'18px'
              }}/>Area : {item.project_area_range}</li>
              </div>
            </div>
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
              <div className="grandthum-container" key={index}>
              <header className="grandthum-header">
                <h1 className="grandthum-title">{item.project_name}</h1>
                <p className="grandthum-location">
                  <CiLocationOn className='com_detail_icon' color='black'/>{item.address}
                </p>
              </header>
        
              <div className="grandthum-carousel">
                <img 
                  src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + item.face_image}
                  alt={item.face_image} 
                  className="grandthum-image" 
                />
              </div>
        
              <div className="grandthum-buttons">
                <button className="grandthum-compare-button" onClick={()=>{handleCompare(item.id)}}>
                  <FaCodeCompare className='com_detail_icon' color='black'/>
                  <span>Compare</span>
                </button>
                <button className="grandthum-know-button" onClick={()=>{handleKnowMore(item.id)}}  style={{
                  background:'black'
                }}>
                  <FaLink color='black' className='com_detail_icon'/>
                  <span>Know More</span>
                </button>
              </div>
        
              <div className="grandthum-details">
                <h2 className="grandthum-details-title">Property Details</h2>
                <div className="grandthum-info">
                  <div className="grandthum-info-item">
                  <BsDatabaseFillUp color='black' className='com_detail_icon'/>
                    <span>Investment</span>
                    <strong>{item.invest}</strong>
                  </div>
                  <div className="grandthum-info-item">
                  <VscGraphLine color='black' className='com_detail_icon' />
                    <span>Return</span>
                    <strong>{item.return_policy}</strong>
                  </div>
                  <div className="grandthum-info-item">
                  <IoCalendarOutline color='black' className='com_detail_icon' />
                    <span>Possession Date</span>
                    <strong>{trimPossessionDate(item.possession_date)}</strong>
                  </div>
                  <div className="grandthum-info-item">
                  < BiArea  color='black' className='com_detail_icon'/>
                    <span>Area</span>
                    <strong>{item.project_area_range}</strong>
                  </div>
                </div>
              </div>
            </div>
              ))}
            </Slider>
          </div>
        </div>
        {compareData.length > 1 && (
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
                

              </div>



              {compareData.map((item, index) => (
                <div key={index} className='databox'>
                  <ul>
                    <li id='datahead'>{item.project_name}</li>
                    <li id='imagebox'><img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + item.face_image} id='compareimg' /></li>
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

        {compareData.length > 1 && (
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
                        <li id='imagebox'><img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + item.face_image} id='compareimg' /></li>
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
        {/* 
        <div className='lease'>
          <div className='lease-category' onClick={() => {
            setleasetype('office_space');
            setVisible(!visible);
          }}>
            <h1>OfficeSpace</h1>
            <div>
              <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/office-space.jpg" alt="" id='leaseimg' />
            </div>
          </div >
          <div className='lease-category' onClick={() => {
            setleasetype('shop');
            setVisible(!visible);
          }}>
            <h1>Shop/Retail Space</h1>
            <div>
              <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/Shop.jpg" alt="" id='leaseimg' />
            </div>
          </div>
          <div className='lease-category' onClick={() => {
            setleasetype('shop');
            setVisible(!visible);
          }}>
            <h1>Showroom</h1>
            <div>
              <img src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/showroom.jpg" alt="" id='leaseimg' />
            </div>
          </div>
        </div>
        <div className='fronthead' style={{ display: visible ? 'block' : 'none' }}>
          <h1 id='comingsoon'>Coming <b>Soon</b></h1>
        </div> */}
        <div className='fronthead leaseban '>
          <h1>Find <b>Perfect</b> Lease <b>Property</b></h1>
        </div>
            <div className="container my-5">
            <div className="row row-cols-1 row-cols-md-3 g-4" style={{
              paddingLeft:'28px'
            }}>
                <div className="col">
                    <div className="card" style={{
                      height:"95%"
                    }}>
                        <div className="ratio ratio-16x9">
                            <img
                                src='https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/cityshop.jpg'
                                alt="Shop"
                                className="img-fluid"
                                style={{
                                  height:'210px',
                                  borderRadius:'11px'
                                }}
                            />
                        </div>
                        <div className="card-body text-center"
                        style={{
                          fontSize:'18px'
                          
                        }}
                        >
                            <h5 className="card-title">Shop</h5>
                            <p className="card-text">Discover our retail spaces designed for modern businesses</p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card" style={{
                      height:"95%",

                    }}>
                        <div className="ratio ratio-16x9">
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/cityoffice1.jpg"
                                alt="Office Space"
                                className="img-fluid"
                                style={{
                                  height:'210px',
                                  borderRadius:'11px'
                                }}
                            />
                        </div>
                        <div className="card-body text-center"
                         style={{
                          fontSize:'18px'
                        }}>
                            <h5 className="card-title">Office Space</h5>
                            <p className="card-text">Professional workspaces tailored to your needs</p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card" style={{
                      height:"95%"
                    }}>
                        <div className="ratio ratio-16x9">
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/cityother.png"
                                alt="Coworking Space"
                                className="img-fluid"
                                style={{
                                  height:'210px',
                                  borderRadius:'11px'
                                }}
                            />
                        </div>
                        <div className="card-body text-center"
                         style={{
                          fontSize:'18px'
                        }}>
                            <h5 className="card-title">Coworking Space</h5>
                            <p className="card-text">Flexible shared spaces for modern professionals</p>
                        </div>
                    </div>
                </div>
            </div>
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
                <div className='advbox2'><img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + item.image_banner} id='advertisment' alt={`Commercial image ${index + 1}`} /></div>
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
                <div className='advbox2'><img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/' + item.image_banner} id='advertisment' alt={`Commercial image ${index + 1}`} /></div></SwiperSlide>
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
              src={`https://www.youtube.com/embed/Q_IPAUO5uxQ`}
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
                background: 'white !important'
              }}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Commercial