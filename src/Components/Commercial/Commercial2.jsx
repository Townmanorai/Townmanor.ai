import React, { useEffect, useState } from 'react'
import './Commain.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Commercialdata from './CommercialJson.json';
import { useLocation, useParams } from 'react-router-dom';
import Map from '../SearchProperty/Map'
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
// Import Swiper styles
import { ImCross } from "react-icons/im";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';
import Modal from 'react-modal';
import axios from 'axios'; // Import Axios
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;





function Commercial2() {

  let subtitle;
  const [similarproperties, setsimilarproperties] = useState([]);
  const [showBanner, setShowBanner] = useState(false);
  const navigate = useNavigate();
  // Function to close the banner
  const handleCloseBanner = () => {
    setShowBanner(false);
  };
  useEffect(() => {
    // Show modal after 2 seconds
    const showTimeout = setTimeout(() => {
      setShowBanner(true);
    }, 2000);

    // Close modal after 7 seconds
    const closeTimeout = setTimeout(() => {
      setShowBanner(false);
    }, 7000);

    // Cleanup the timeouts on unmount or when state changes
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(closeTimeout);
    };
  }, []);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      height: '40vh',
      width: '30vw',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const customStyles2 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      height: '80vh',
      width: '55vw',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'gray',
    },
  };
  const customStyles3 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      height: '61vh',
      width: '55vw',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      marginTop: "16vh",
      borderRadius: '10px',
    },
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [floorplanopen, setfloorplanopen] = useState(false);
  const [visible, setVisible] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function openModal2() {
    setfloorplanopen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }
  function closeModal2() {
    setfloorplanopen(false);
  }
  function closeModal3() {
    setShowBanner(false);
  }
  const [data, setdata] = useState([]);
  const [imgpath, setimgpath] = useState([]);
  const [commercialdata, setcommercialdata] = useState([]);
  const { index } = useParams();
  const [state, setstate] = useState(
    [
      {
        lat: "28.5221024",
        lng: "77.2370138",

      }
    ]
  )
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch commercial data first
        const commercialResponse = await axios.get('https://townmanor.in/index.php/commericalinv');
        setcommercialdata(commercialResponse.data);

        // Fetch property data after commercial data is fetched
        const propertyResponse = await axios.get(`https://townmanor.in/index.php/commericalinv/getById/${index}`);
        const parsedData = {
          ...propertyResponse.data,
          category: JSON.parse(propertyResponse.data.category),
          amenities: JSON.parse(propertyResponse.data.amenities),
          metro: JSON.parse(propertyResponse.data.metro),
          healthcare: JSON.parse(propertyResponse.data.healthcare),
          education: JSON.parse(propertyResponse.data.education),
          mall: JSON.parse(propertyResponse.data.mall),
          highway: JSON.parse(propertyResponse.data.highway),
          image: propertyResponse.data.image.split(',').map(img => img.trim()),
        };

        setdata(parsedData);
        setstate([{ lat: parsedData.lat, lng: parsedData.lng }]);
        console.log(data);

        // Filter similar properties once the commercial data is available
        filterSimilarProperties(commercialResponse.data); // Pass commercial data here

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [index]);


  const imgdata = [
    {
      img: '/saya1.jpg'
    },
    {
      img: '/saya2.jpg'
    },
    {
      img: '/saya3.jpg'
    },
    {
      img: '/saya4.jpg'
    },
    {
      img: '/saya1.jpg'
    },
    {
      img: '/saya2.jpg'
    }
  ]
  const floordata = [
    {
      img: '/bhutanifloor1.jpg'
    },
    {
      img: '/bhutanifloor2.jpg'
    },
    {
      img: '/bhutanifloor3.jpg'
    },
    {
      img: '/bhutanifloor4.jpg'
    },
    {
      img: '/bhutanifloor5.jpg'
    },
    {
      img: '/bhutanifloor6.jpg'
    },
    {
      img: '/bhutani8.jpg'
    },

  ]
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };


  const filterSimilarProperties = (commercialData) => {
    const shuffledProperties = [...commercialData].sort(() => Math.random() - 0.5);
    const randomProperties = shuffledProperties.slice(0, 3);
    setsimilarproperties(randomProperties);
    console.log(similarproperties);
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

  const options = {
    animationEnabled: true,
    theme: "dark1", // "light1", "dark1", "dark2"
    title: {
      text: "Trip Expenses"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: [
        { y: 20, label: "Airfare" },
        { y: 24, label: "Food & Drinks" },
        { y: 20, label: "Accomodation" },
      ]
    }]
  }
  const handleKnowMore = (index) => {
    navigate(`/commercial2/${index}`);
    window.location.reload(); // Navigate to Commercial2 with the selected index
  };
  return (
    <>


      <div className='advimg'>

        {Array.isArray(data.image) && data.image.length > 0 ? (
          <Swiper
            modules={[Autoplay, EffectCards]}
            spaceBetween={50}
            slidesPerView={3}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {data.image.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item} id='advimg2' alt={`Commercial image ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div>No images available.</div> // Fallback content
        )}
      </div>
      {/* <div className='advimg3'>

        <Swiper
          modules={[Autoplay, EffectCards]}
          spaceBetween={50}
          slidesPerView={2}

          autoplay={{
            delay: 2500,
            disableOnInteraction: false, // Autoplay will not be disabled after user interactions
          }}
        >
         {data.image.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item} id='advimg2' alt={`Commercial image ${index + 1}`} />
              </SwiperSlide>
            ))}

        
        </Swiper> 
       </div>    */}

      <div className='main-banner'>
       <div>
        <h1>Butani Cyberthum</h1>
        <span>Sector 148</span>
        
       </div>
       <div>
        <h1>Investment</h1>
        <span>1.2Cr</span>
       </div>
       <div>
        <h1>Payment Plan</h1>
        <span>10:85:5</span>
        <p><a href=''>know More</a></p>
       </div>
       
      </div>
        <div className='left1'>
          <div className='headdbox'>
            <h1>{data.property_name}</h1>
            <h2 id='address'>
              &nbsp;&nbsp;
              <i class="la la-map-marker"></i>
              {data.address}</h2>
          </div>
          <div className='detailbox'>
            {/* <li><span>Invest amount </span>&#8377;{data.invest}</li>
            <li><span>Invest Return </span>&#8377;{data.lease_amount} per month</li> */}
            <li><span>Possession Status  </span>{data.possession_date}</li>
            <li><span> Developer/Builder </span>{data.builder}</li>
            <li> <span>Area: </span>{data.project_area_range}</li>
            <li><span>Construction :</span>{data.construction}</li>
            <li><span>Project Unit</span> {data.project_unit} </li>
            <li><span>Project having </span> :{data.category}</li>
            <li><span>RERA ID: </span> :{data.reraid}</li>
            <li><span>Payment Plan: </span>{data.payment_plan}</li>
          </div>

        
        {/* <div id='right2'>
          <h1>Investment Details</h1>
          <div className='lease-payment'>
            <li id='offerhead'>Investment Amount </li>
            <li>&#8377;{data.invest}</li>
          </div>
          <div className='lease-payment'>
            <li id='offerhead'>Investment Return</li>
            <li>&#8377;{data.lease_amount}</li>
          </div>
          <div className='lease-payment'>
            <li id='offerhead'>offer</li>
            <li>No offer rightnow</li>
          </div>
          <div className='lease-submit'>
            <button className='ls-submit'>Contact us</button>
          </div>
        </div> */}
      </div>



      {/* -----------------------------------------Highlight and youtube video--------------------------------- */}


      <div className='descriptionbox'>
        <div className='left1'>

          <h1 className='fronthead2'>Highlights of this Project</h1>
          {data.description && typeof data.description === 'string' && (
            <ul className='hlt-data'>
              {data.description.split('.').map((sentence, index) => {
                const trimmedSentence = sentence.trim();
                return (
                  trimmedSentence && (
                    <li key={index}>{index + 1}. {trimmedSentence}.</li>
                  )
                );
              })}
            </ul>
          )}
          <button className='combtn1' onClick={openModal}> Show interest</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            id='lead'
          >
            <div>
              <form id='leadform'>
                <button onClick={closeModal} className='imcross'><ImCross /></button>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control my-2 p-3"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control my-2 p-3"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary submit">Submit</button>
              </form>
            </div>
          </Modal>
        </div>

        <div className='right2'>
          <div className='r2-vid' >
            <iframe width="430" height="270"
              src={`https://www.youtube.com/embed/${data.video_id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            >
            </iframe>
          </div>
        </div>
      </div>


      {/* -------------------------------------------------Amenities and image--------------------------------- */}

      <div className='descriptionbox'>

        <div className='sf-box1-amenities'>
          <h2>Amenities</h2>
          {data.amenities && data.amenities.length > 0 ? (
            <ul>
              {data.amenities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No amenities available.</p>
          )}
        </div>

        <div className='right1'>
          <img src={data.adv_image}></img>
        </div>
      </div>

      {/* ---------------------------------------------distance and commute----------------------------------------- */}

      <div className='description-box'>
        <div className='sf-box1'>
          <div className='sf-box1-amenities commute'>
            <h2> Facilities & Commute Options</h2>
            <ul>
              {data.metro !== null && (
                <li> {data.metro}</li>
              )}
              {data.mall !== null && (
                <li>{data.mall}</li>
              )}
              {data.education !== null && (
                <li> {data.education}</li>
              )}
              {data.healthcare !== null && (
                <li> {data.healthcare}</li>
              )}
              {data.highway !== null && (
                <li> {data.highway}</li>
              )}
            </ul>
          </div>
        </div>
        <div className='sf-box2'>
        </div>
      </div>

      {/* -------------------------------------------------floorplan---------------------------------------------------- */}

      <div className='floor-comm'>

        <div className='fronth2'>
          <h1>Floorplans</h1>
        </div>

        <div className='advimgx floorplandesc'>
          <Swiper
            modules={[Autoplay, EffectCards]}
            spaceBetween={50}
            slidesPerView={3}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            style={{ display: floorplanopen ? 'none' : 'block' }}
          >
            {floordata.map((item, index) => (
              <SwiperSlide key={index}>
                <div id='floorbox'

                  onClick={() => {
                    setimgpath(item.img);
                    openModal2();
                    setVisible(true);
                  }}> <img src={item.img} id='advimg3' alt={`Commercial image ${index + 1}`} /></div>

              </SwiperSlide>
            ))}
          </Swiper>
          <Modal
            isOpen={floorplanopen}
            onRequestClose={closeModal2}
            style={customStyles2}
            contentLabel="Example Modal"
            id='lead2'
          >
            <div>
              <img src={imgpath} id='floorimg'></img>
            </div>
          </Modal>
        </div>

      </div>

      <div>

        <div className='advimgx floorplanmob'>
          <Swiper
            modules={[Autoplay, EffectCards]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            style={{ display: floorplanopen ? 'none' : 'block' }}
          >
            {floordata.map((item, index) => (
              <SwiperSlide key={index}>
                <div id='floorbox'

                  onClick={() => {
                    setimgpath(item.img);
                    openModal2();
                    setVisible(true);
                  }}> <img src={item.img} id='advimg3' alt={`Commercial image ${index + 1}`} /></div>

              </SwiperSlide>
            ))}
          </Swiper>
          <Modal
            isOpen={floorplanopen}
            onRequestClose={closeModal2}
            style={customStyles2}
            contentLabel="Example Modal"
            id='lead2'
          >
            <div>
              <img src={imgpath} id='floorimg'></img>
            </div>
          </Modal>
        </div>

      </div>
      <div className='chart'>
        <CanvasJSChart options={options}

        ></CanvasJSChart>

      </div>


      {/* ---------------------------------------mapbox contact--------------------------------------------- */}



      <div className="descriptionbox">
        <div className="left1">
          <div className='mapbox2' style={{ display: floorplanopen ? 'none' : 'block' }}>
            <Map results={state} />
          </div>
        </div>


        <div id='right2'>
          <h1>Contact Detail</h1>
          <li>Townmanor Infratect LLP</li>
          <li>Support@townmanor.in</li>
          <li>7042888903</li>
          <div className='lease-submit'>
            <button className='ls-submit'>Contact us</button>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------Bannner-------------------------------------------------------- */}

      <div>
        <Modal
          isOpen={showBanner}
          onRequestClose={closeModal3}
          style={customStyles3}
          contentLabel="Image Banner"
          id="lead2"
        >
          <div className="banner-modal-content">
            {/* Banner Image */}
            <img src="/bhutani.jpg" id="bannerimg" alt="Banner" />
            <h3>To know More contact 7822743221</h3>
            {/* Close button */}
            <button className="banner-cross" onClick={closeModal3}>
              <ImCross />
            </button>
          </div>
        </Modal>

      </div>


      {/* -----------------------------------------------------similar properties------------------------------------------- */}

      <div className='similar-prop'>
        <div className='sp-head'>
          <h2>Similar property</h2>
        </div>

        <div className='similar'>
          {similarproperties.map((item, index) => (
            <div key={index} className='simbox'>
              <li className='simimgbox'><img src={item.adv_image} id='simimg'></img></li>
              <li id='head'>{item.property_name}</li>
              <ul>
                <li><span>Location:</span>{item.address}</li>
                <li><span>Invest:</span>&#8377;{item.invest}</li>
                <li><span>Return:</span>{item.lease_amount} per month</li>
                <li><span>Possession :</span>{item.possession_date}</li>
                <li><span>Area Range :</span>{item.project_area_range}</li>
              </ul>
              <button className='sb-button ' onClick={() => handleKnowMore(item.id)} >Know More</button>
            </div>
          ))}
        </div>
      </div>





      <div className='similar2'>
        <Swiper
          modules={[Autoplay, EffectCards]}
          spaceBetween={50}
          slidesPerView={1}

          autoplay={{
            delay: 2500,
            disableOnInteraction: false, // Autoplay will not be disabled after user interactions
          }}
        >
          {similarproperties.map((item, index) => (
            <SwiperSlide>  <div key={index} className='simbox'>
              <ul>
                <li className='simimgbox'><img src={item.image} id='simimg'></img></li>
                <li id='head'>{item.Name}</li>
                <li><span>Location:</span>{item.address}</li>
                <li><span>Invest:</span>&#8377;{item.invest}</li>
                <li><span>Return:</span>{item.lease_amount} per month</li>
                <li><span>Possession :</span>{item.possession_date}</li>
                <li><span>Area Range :</span>{item.project_area_range}</li>
                <button className='btn  btn-outline-info mt-3 ' onClick={() => handleKnowMore(item.id)} >Know More</button>
              </ul>
            </div></SwiperSlide>

          ))}
          ...
        </Swiper>

      </div>
    </>
  )
}

export default Commercial2