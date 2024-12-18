import React, { useEffect, useState } from 'react'
import "./Commercial3.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';
import Modal from 'react-modal'
import { ImCross } from "react-icons/im";
import { MdFastfood } from "react-icons/md";
import { ImOffice } from "react-icons/im";
import { BsShop } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import Map from '../SearchProperty/Map'
import { useNavigate, useParams } from 'react-router-dom';

function Commercial3() {
  const [comdata, setcomdata] = useState([]);
  const [price, setprice] = useState([]);
  const [modalimages, setmodalimages] = useState('office_image');
  const [modalwork, setmodalwork] = useState();
  const [mainImage, setMainImage] = useState('');
  const [Amenities, setAmenties] = useState([]);
  const [similarproperties2, setsimilarproperties2] = useState([]);
  const navigate = useNavigate();
  const [state, setstate] = useState(
    [
      {
        lat: "28.5221024",
        lng: "77.2370138",

      }
    ]
  )
  const [filteredPrice, setFilteredPrice] = useState([]);
  const { index } = useParams();

  useEffect(() => {
    // Fetching commercial details from the provided API
    const fetchData = async () => {
      try {
        const response = await fetch(`http://www.townmanor.ai/api/api/commercial/commercial-details/${index}`);
        const response2 = await fetch(`http://www.townmanor.ai/api/api/commercial/commercial-units/com_prop_id/${index}`);
        const response3 = await fetch(`http://www.townmanor.ai/api/api/commercial/commercial-details/city/Noida`);
        const data = await response.json();
        const data2 = await response2.json();
        // Assuming the API returns JSON data
        const data3 = await response3.json();
        setsimilarproperties2(data3);
        setcomdata(data);
        setprice(data2);  // Store the response data in state
      } catch (error) {
        console.error('Error fetching commercial data:', error);
      }
    };

    fetchData();  // Call the fetchData function when the component mounts
  }, [index]);



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [isModalOpen5, setIsModalOpen5] = useState(false);
  const [expore, setexplore] = useState('foodcourt');
  const [floorplanopen, setfloorplanopen] = useState(false);
  const [imgpath, setimgpath] = useState([]);
  const [visible, setVisible] = useState(false);
  const [contact, setcontact] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(); // State to store selected category
  const [filteredFoodCourt, setFilteredFoodCourt] = useState();
  const [selectedFoodCourt, setSelectedFoodCourt] = useState([]);


  // Handle category selection and filter foodcourt data
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    // Filter foodcourt data based on category
    const filteredData = price.filter(item => item.category === category);
    setSelectedFoodCourt(filteredData);
    console.log(filteredData);// Update filteredFoodCourt state
  };
  const trimPossessionDate = (dateString) => {
    // Ensure dateString is valid before slicing
    if (dateString && typeof dateString === 'string' && dateString.length > 14) {
      return dateString.slice(0, -14); // Remove the last 14 characters
    }
    return dateString; // Return the original value if it's invalid
  };
  console.log(selectedCategory)
  // Log filteredFoodCourt whenever it changes
  // useEffect(() => {
  //   if (filteredFoodCourt.length > 0) {
  //     console.log("Filtered FoodCourt Data:", filteredFoodCourt);
  //   }
  // }, [filteredFoodCourt]); 
  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModal4 = () => {
    setIsModalOpen4(true);
  };
  const openModal5 = () => {
    setIsModalOpen5(true);
  };
  const openContact = () => {
    setcontact(true);
  };
  function openModal3() {
    setfloorplanopen(true);
  }

  const customStyles = {
    content: {
      top: '45%',
      left: '25%',
      right: 'auto',
      bottom: 'auto',
      height: '32vh',
      width: '40vw',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal2 = (index) => {
    setFilteredFoodCourt(price[index]);
    setIsModalOpen2(true);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const closeModal3 = () => {
    setfloorplanopen(false);
  };
  const closeModal4 = () => {
    setIsModalOpen4(false);
  };

  const closeContact = () => {
    setcontact(false);
  };




  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(prevState => !prevState);
  };
  const truncateLength = 150; // Set this to 15-20 characters as needed

  // Function to handle truncated and full text
  const description = comdata && comdata.description ? comdata.description : '';
  const truncatedText = description.slice(0, truncateLength) + '...';
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
      background: 'white',
      border_radius: '7px',
    },
  };
  const handleKnowMore = (index) => {
    // Navigate to Commercial2 with the selected index
    navigate(`/commercial3/${index}`);
    window.location.reload();
  };


  const imageArray = (() => {
    // Check if modalwork is a string and parse if necessary
    if (typeof modalwork === 'string' && modalwork.trim() !== '') {
      try {
        // If modalwork looks like a JSON array, try parsing it
        const parsedArray = JSON.parse(modalwork);
        // Ensure it's an array, otherwise default to empty array
        return Array.isArray(parsedArray) ? parsedArray : [];
      } catch (error) {
        console.error("Error parsing modalwork:", error);
        return [];
      }
    }
    // If modalwork is not a string, return an empty array
    return [];
  })();
  function cleanString(str) {
    // This regular expression will remove any non-alphanumeric characters (like &quot;) at the start and end
    return str.replace(/^[^\w]+|[^\w]+$/g, '');
  };
  let floorplanArray = [];

  try {
    // Check if floorplan exists and is a valid JSON string
    floorplanArray = comdata.floorplan ? JSON.parse(comdata.floorplan) : [];
  } catch (e) {
    console.error("Error parsing floorplan:", e);
    floorplanArray = []; // Default to an empty array if parsing fails
  }

  return (
    <>
      <div style={{
        display: 'inline-block'
      }}>
        <div id='photos'>
          <div className='main-photo' onClick={openModal4}>
            {comdata.main_image && comdata.main_image.length > 0 ? (
              // Safely parse the JSON string inside try-catch
              (() => {
                try {
                  const parsedImages = JSON.parse(comdata.main_image);
                  return parsedImages.length > 0 ? (
                    <img src={'/' + parsedImages[1]} alt="Main Photo" />
                  ) : (
                    <p>No image available</p> // Fallback message if no image is available
                  );
                } catch (error) {
                  console.error('Error parsing main_image JSON:', error);
                  return <p>Invalid image data</p>; // Fallback in case JSON is invalid
                }
              })()
            ) : (
              <p>No image available</p> // Fallback message if no image is available
            )}
          </div>
          <div className='secondaryPhoto deskview'>

            <div id='sideimagebox' className='officespace' onClick={() => {
              openModal();
              setmodalimages('office_image');
              setmodalwork(`${comdata.office_image}`);
            }}>
              <span>Office Space</span></div>
            <div id='sideimagebox' className='retailspace' onClick={() => {
              openModal();
              setmodalimages('retail_shop');
              setmodalwork(`${comdata.retail_shop}`);
            }}>
              <span>Retail Space/Shop</span></div>
            <div id='sideimagebox' className='restuarant' onClick={() => {
              openModal();
              setmodalimages('restaurant');
              setmodalwork(`${comdata.restaurant}`);
            }}>
              <span>Restuarant</span></div>
            <div id='sideimagebox' onClick={() => {
              openModal();
              setmodalimages('other');
              setmodalwork(`${comdata.other}`);
            }}>
              <span>other</span></div>
          </div>
          <div className='secondaryPhoto mobileview'>

            <div id='sideimagebox' className='officespace' onClick={() => {
              openModal();
              setmodalimages('office_image');
              setmodalwork(`${comdata.office_image}`);
            }}>
              <span>Office Space</span>
            </div>


            <div id='sideimagebox' className='retailspace' onClick={() => {
              openModal();
              setmodalimages('retail_shop');
              setmodalwork(`${comdata.retail_shop}`);
            }}>
              <span>Retail Space/Shop</span>
              </div>


            <div id='sideimagebox' className='restuarant' onClick={() => {
              openModal();
              setmodalimages('restaurant');
              setmodalwork(`${comdata.restaurant}`);
            }}>
              <span>Restuarant</span>
              </div>


            <div id='sideimagebox' onClick={() => {
              openModal();
              setmodalimages('other');
              setmodalwork(`${comdata.other}`);
            }}>
              <span>other</span>
              
            </div>

          </div>

        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        id='mainphotobanner'
      >

        {(imageArray.length == 0) ? (
          <h1>No data available</h1>
        ) : (
          <Swiper
            modules={[Autoplay, EffectCards]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false, // Autoplay will not be disabled after user interactions
            }}
          >
            {imageArray.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={'/' + cleanString(item)} id="mainphotoimg" alt={`Commercial image ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Modal>

      <Modal
        isOpen={isModalOpen4}
        onRequestClose={closeModal4}
        // style={customStyles}
        id='mainphotobanner'
      >

        <Swiper
          modules={[Autoplay, EffectCards]}
          spaceBetween={50}
          slidesPerView={1}

          autoplay={{
            delay: 2500,
            disableOnInteraction: false, // Autoplay will not be disabled after user interactions
          }}
        >
          {comdata.main_image && Array.isArray(JSON.parse(comdata.main_image)) && JSON.parse(comdata.main_image).length > 0 ? (
            JSON.parse(comdata.main_image).map((item, index) => (
              <SwiperSlide key={index}>
                <img src={'/' + item} id='mainphotoimg' alt={`Commercial image ${index + 1}`} />
              </SwiperSlide>
            ))
          ) : (
            <h1>No data available</h1> // Fallback message when no valid data is available
          )}


        </Swiper>
      </Modal>

      <div className='main-banner'>
        <div id='projectheading'>
          <h1>{comdata.project_name}</h1>
          <span>{comdata.address}</span>

        </div>
        <div id='investment'>
          <h1>Investment : </h1>
          <span id='inv'>{comdata.invest}</span>
        </div>
        <div id='investment'>
          <h1>Investment Return : </h1>
          <span id='inv'>{comdata.return_policy}</span>
        </div>
        <div id='investment'>
          <h1>Area Details : </h1>
          <span>{comdata.project_area_range}</span>
        </div>
        <div id='investment'>
          <h1>Project Having : </h1>
          <span> {comdata.category ? JSON.parse(comdata.category).join(', ') : 'No categories available'} </span>
        </div>
        {/* <div id='paymentplan'>
          <h1>Payment Plan</h1>
          <span>10:85:5</span>
          <p><a href=''>know More</a></p>
        </div> */}
        <div id='investment'>
          <h1>Available Unit : </h1>
          <span>{comdata.project_unit}</span>
        </div>
      </div>
      <div className='descriptionbox'>
        <div className='left1'>
          <h1>Overview</h1>
          <div className='detailbox'>
            {/* <h1>{comdata.modalimages}</h1>
              <h1>{modalimages}</h1>
              <h1>{modalwork}</h1> */}
            <li><span>Possession Status  </span><div>{trimPossessionDate(comdata.possession_date)}</div></li>
            <li><span> Developer/Builder </span><div>{comdata.builder}</div></li>
            <li> <span>Area: </span><div>{comdata.project_area_range}</div></li>
            <li><span>Construction :</span><div>{comdata.construction_status}</div></li>
            <li><span>Project Unit</span> <div>{comdata.project_unit}</div></li>
            <li><span>Project having </span><div>{comdata.category ? JSON.parse(comdata.category).join(', ') : 'No categories available'}</div></li>
            <li><span>RERA ID: </span><div>{comdata.rera_id}</div></li>

          </div>
          <button className='combtn1' onClick={openContact}> Show interest</button>
          <Modal
            isOpen={contact}
            onRequestClose={closeContact}
            style={customStyles}
            id='mainphotobanner'
          >
            <div id='contactclose'> <SlClose onClick={closeContact} /></div>
            <form style={{
              margin: '2vh 0px',
            }}>

              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter your name" style={{
                  height: '5vh',
                }} />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input type="tel" class="form-control" id="phone" placeholder="Enter your phone number" style={{
                  height: '5vh',
                }} />
              </div>
              <button type="submit" class="btn btn-primary ">Submit</button>
            </form>
          </Modal>
        </div>
        <div id='right2'>
          <div className='lease-submit'>
            <h1>Contact Detail</h1>
            <button className='ls-submit' onClick={openContact}>Contact us</button>
          </div>

          <li>Townmanor Infratect LLP</li>
          <li>Support@townmanor.in</li>
          <li>7042888903</li>

        </div>
      </div>
      <div className='descriptionbox'>
        <div className='left1'>
          <h1 className='fronthead2'>Highlights </h1>
          <ul className='hlt-data'>
            <li>
              {isReadMore ? description : truncatedText}
            </li>
          </ul>

          <button id='read_more' onClick={toggleReadMore}>
            {isReadMore ? 'Show Less' : 'Show More'}
          </button>
        </div>
        <div id='right2' className='commvideo'>

          <iframe width="430" height="270"
            src={`https://www.youtube.com/embed/${comdata.video_id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
          </iframe>
        </div>
      </div>
      <div className='new'>
        <h1>Explore By Category</h1>
        <div className='category'>
          {comdata.category && Array.isArray(JSON.parse(comdata.category)) ? (
            JSON.parse(comdata.category).map((item, index) => {
              return (
                <span key={index} onClick={() => handleCategoryClick(item)} className='categorybox'>
                  {item.icon}
                  {/* <br /> */}
                  {item}
                </span>
              );
            })
          ) : (
            <p>No categories available</p> // Optional fallback message
          )}
        </div>
        {(
          <div className='food-court'>
            <ul>
              {/* Check if selectedFoodCourt is not null and is an array */}
              {Array.isArray(selectedFoodCourt) && selectedFoodCourt.length > 0 ? (
                selectedFoodCourt.map((item, index) => (
                  <li className='fc-li' key={index} onClick={() => openModal2(index)}>
                    <span id='foodcourtname'>{item.name}</span>
                    <span id='foodcourtprice'>Invest: {item.price}</span>
                    <span id='foodcourt' className='deskview'>Available unit: {item.available_unit}</span>
                    <span id='foodcourt' className='deskview'>Total unit: {item.total_unit}</span>
                    <span><button type="button" className="btn btn-outline-primary knowmore">Know More</button></span>
                  </li>
                ))
              ) : (
                // Optionally display a message if selectedFoodCourt is empty or not an array
                <li>No Data available</li>
              )}
            </ul>

          </div>
        )}
        {/* {expore === 'Shop' && (
          <div className='food-court'>
            {foodcourt.map((item, index) => {
              return <li className='fc-li' key={index}> <span id='foodcourtname'>{item.name}</span><span id='foodcourtprice'>Invest : {item.price}</span><span><button type="button" class="btn btn-outline-primary">Know More</button></span></li>;
            })}
          </div>
        )}
        {expore === 'officeSpace' && (
          <div className='food-court'>
            {officeSpace.map((item, index) => {
              return <li className='fc-li' key={index}> <span id='foodcourtname'>{item.name}</span><span id='foodcourtprice'>Invest : {item.price}</span><span><button type="button" class="btn btn-outline-primary knowmore">Know More</button></span></li>;
            })}
          </div>
        )} */}
        <Modal
          isOpen={isModalOpen2}
          onRequestClose={closeModal2}
          id='briefplan'
        >
          {/* Check if filteredFoodCourt is available */}
          {filteredFoodCourt ? (
            <div>
              <div id='buildingclose'>
                <h1 id='buildingname'>{filteredFoodCourt.name}</h1>
                <span><SlClose onClick={closeModal2} /></span>
              </div>
              <h1 style={{ fontSize: '18px' }}>Available Unit: {filteredFoodCourt.available_unit}</h1>
              <br />
              <h1 style={{ fontSize: '18px' }}>Total Unit: {filteredFoodCourt.total_unit}</h1>
              <h2 className='payment-plan-title'>Price plan</h2>

              <table className="pricing-table">
                <tr>
                  <td className="pricing-item">Investment</td>
                  <td className="pricing-value">{filteredFoodCourt.price}</td>
                </tr>
                <tr>
                  <td className="pricing-item">Other charges</td>
                </tr>
                {/* Parse and check if othercharge exists and is not empty */}
                {filteredFoodCourt.othercharge ?
                  JSON.parse(filteredFoodCourt.othercharge).map((charge, index) => (
                    <tr key={index}>
                      <td className="pricing-item">{charge[0]}</td>
                      <td className="pricing-value">{charge[1]}</td>
                    </tr>
                  )) : null
                }
              </table>

              <h2 className="payment-plan-title">Payment Plan</h2>
              <table className="payment-plan-table">
                <thead>
                  <tr>
                    <th className="payment-plan-header">Stage</th>
                    <th className="payment-plan-header">Payable</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Parse and check if paymentplan exists and is not empty */}
                  {filteredFoodCourt.paymentplan ?
                    JSON.parse(filteredFoodCourt.paymentplan).map((plan, index) => (
                      <tr key={index}>
                        <td className="payment-stage">{plan[0]}</td>
                        <td className="payment-value">{plan[1]}</td>
                      </tr>
                    )) : null
                  }
                </tbody>
              </table>

              <h2 className='payment-plan-title'>Floor Plan</h2>
              <div id='buildingfpbox'>
                <img src={filteredFoodCourt.floorplan} id='buildingfloorplan' alt="Floor Plan" />
              </div>
            </div>
          ) : (
            // Optionally handle the case when filteredFoodCourt is null
            <div>Loading or No data available</div>
          )}
        </Modal>




      </div>
      <div className='descriptionbox'>
        <div className='left1 amenities'>

          <h1 className='fronthead2'>Amenities</h1>
          <div className='sf-box1-amenities'>
            <ul>
              {comdata.amenities && Array.isArray(JSON.parse(comdata.amenities)) ? (
                JSON.parse(comdata.amenities).map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <li>No amenities available</li> // You can customize this message as needed
              )}
            </ul>

          </div>
        </div>
        <div id='right2' className='distancebox'>

          <div className='sf-box1-amenities comute'>
            <h2> Facilities & Commute Options</h2>
            <ul>
              {comdata.distance && Array.isArray(JSON.parse(comdata.distance)) ? (
                JSON.parse(comdata.distance).map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.distance}
                  </li>
                ))
              ) : (
                <li>No commute options available</li> // Optional fallback message
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className='floor-comm' >

        <div className='fronth2'>
          <h1>Floorplans</h1>
        </div>
        <div className='advimgx ' style={{
          display: floorplanopen ? 'none' : 'block'
        }}>

          <Swiper
            modules={[Autoplay, EffectCards]}
            spaceBetween={50}
            slidesPerView={3}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            // style={{ display: floorplanopen ? 'block' : 'block' }}
            className='deskview'
          >
            {floorplanArray.length > 0 ? (
              floorplanArray.map((item, index) => (
                <SwiperSlide key={index}>
                  <div id="floorbox" onClick={() => {
                    setimgpath('/' + item);
                    openModal3();
                    setVisible(true);
                  }}>
                    <img src={'/' + item} id="advimg3" alt={`Commercial image ${index + 1}`} />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>No floor plans available.</p> // Fallback message when no valid floorplans are available
            )}
          </Swiper>

          <Swiper
            modules={[Autoplay, EffectCards]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            style={{ display: floorplanopen ? 'none' : 'block' }}
            className='mobileview'
          >
            {floorplanArray.length > 0 ? (
              floorplanArray.map((item, index) => (
                <SwiperSlide key={index}>
                  <div id="floorbox" onClick={() => {
                    setimgpath('/' + item);
                    openModal3();
                    setVisible(true);
                  }}>
                    <img src={'/' + item} id="advimg3" alt={`Commercial image ${index + 1}`} />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>No floor plans available.</p> // Fallback message when no valid floorplans are available
            )}
          </Swiper>
          <Modal
            isOpen={floorplanopen}
            onRequestClose={closeModal3}
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
      <div className='descriptionbox'>
        <div className='left1'>
          <div className='mapbox2' style={{ display: floorplanopen ? 'none' : 'block' }}>
            <Map results={state} />
          </div>
        </div>
        <div id='right2'>
          <img src={'/' + comdata.image_banner} id='advertisement'></img>
        </div>
      </div>
      <div className='similar-prop'>
        <div className='sp-head'>
          <h2>Similar property</h2>
        </div>

        <div className='similar deskview'>
          {Array.isArray(similarproperties2) && similarproperties2.length > 0 ? (
            similarproperties2.map((item, index) => (
              <div key={index} className='simbox'>
                <li className='simimgbox'><img src={'/' + item.face_image} id='simimg' alt="property"></img></li>
                <li id='head'>{item.property_name}</li>
                <ul>
                  <li><span>Location:</span>{item.address}</li>
                  <li><span>Invest:</span>&#8377;{item.invest}</li>
                  <li><span>Return:</span>{item.return_policy} </li>
                  <li><span>Possession :</span>{trimPossessionDate(item.possession_date)}</li>
                  <li><span>Area Range :</span>{item.project_area_range}</li>
                </ul>
                <button className='sb-button ' onClick={() => handleKnowMore(item.id)} >Know More</button>
              </div>
            ))
          ) : (
            <div>No similar properties found.</div>
          )}
        </div>
        <div className='similar mobileview'>
          <Swiper
            modules={[Autoplay, EffectCards]}
            spaceBetween={50}
            slidesPerView={1}

            autoplay={{
              delay: 2500,
              disableOnInteraction: false, // Autoplay will not be disabled after user interactions
            }}
          >
            {similarproperties2.map((item, index) => (
              <SwiperSlide>
                <div key={index} className='simbox'>
                  <li className='simimgbox'><img src={'/' + item.face_image} id='simimg'></img></li>
                  <li id='head'>{item.property_name}</li>
                  <ul>
                    <li><span>Location:</span>{item.address}</li>
                    <li><span>Invest:</span>&#8377;{item.invest}</li>
                    <li><span>Return:</span>{item.return_policy}</li>
                    <li><span>Possession :</span>{trimPossessionDate(item.possession_date)}</li>
                    <li><span>Area Range :</span>{item.project_area_range}</li>
                  </ul>
                  <button className='sb-button ' onClick={() => handleKnowMore(item.id)} >Know More</button>
                </div>
              </SwiperSlide>

            ))}
            ...
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default Commercial3