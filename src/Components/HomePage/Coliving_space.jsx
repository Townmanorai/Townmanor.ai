import React, { useState, useEffect } from 'react';
import Slider from 'react-slick'; // Import the slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Coliving_space.css';  // Assuming the modal styles will be defined in this file
import { FaHouse } from "react-icons/fa6";
import { MdBedroomChild } from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaArrowsSplitUpAndLeft } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

function Coliving_space() {
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0, // Ensures the first slide is shown properly
    autoplay: true, // Enables auto-scroll
    autoplaySpeed: 2000, // Sets the interval time for auto-scrolling in milliseconds (2 seconds here)
  };

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for form inputs (name and email)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Handle modal open
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
  };

  
  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name, 'Email:', email);
    closeModal(); // Close the modal after form submission
  };
  
  const content= "Experience a new way of living with our premium co-living spaces, designed for comfort and convenience in prime locations near major hubs. Enjoy fully furnished rooms with modern interiors, high-speed WiFi, and regular housekeeping services. Connect with like-minded individuals through vibrant community events and networking opportunities. Live, work, and unwind with access to yoga and studio spaces—all under one roof."

  const [ShowContent, SetShowContent] = useState(false);
  const [trimmedContent, setTrimmedContent] = useState('');
  
  // Function to handle trimming based on screen size
  const updateTrimmedContent = () => {
    const screenWidth = window.innerWidth;
    let newTrimmedContent;

    if (screenWidth < 720) {
      newTrimmedContent = content.length > 80 ? content.substring(0, 80) + '...' : content;
    } else {
      newTrimmedContent = content.length > 180 ? content.substring(0, 180) + '...' : content;
    }

    setTrimmedContent(newTrimmedContent);
  };

  useEffect(() => {
    updateTrimmedContent();
    window.addEventListener('resize', updateTrimmedContent);
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', updateTrimmedContent);
  }, []);

  return (
    <>
      <div className=''>
        <div className='container'>
          <div className='coliving'>
            <div className='co-left'>
              <h1> We Are Coming Soon !</h1>
              {/* <div>
                <p>
                  {ShowContent ? trimmedContent : content} 
                </p>
                <div className='Co-toggle' onClick={() => SetShowContent(!ShowContent)}>{ShowContent ? "Read More": "Read Less"}</div>
              </div> */}
              <div>
                <p>
                  {ShowContent ? content : trimmedContent}
                </p>
                <div className='Co-toggle' onClick={() => SetShowContent(!ShowContent)}>
                  {ShowContent ? "Read Less" : "Read More"} {/* Toggle between Read More and Read Less */}
                </div>
              </div>

              <div className='co-box'>
                <div className='co-box-div'>
                  <div className="cd-img">
                    <FaHouse style={{ width: '25px', color: 'ff0000' }} />
                  </div>
                  <div style={{fontSize:'13px', marginTop: '10px', color: 'red', fontWeight: '500' }}>
                    Shared Space
                  </div>
                </div>
                <div className='co-box-div'>
                  <div className="cd-img">
                    <MdBedroomChild style={{ width: '25px', color: 'ff0000' }} />
                  </div>
                  <div style={{fontSize:'13px', marginTop: '10px', color: 'red', fontWeight: '500' }}>
                    Furnished Rooms
                  </div>
                </div>

                <div className='co-box-div'>
                  <div className="cd-img">
                    <FaPeopleRoof style={{ width: '25px', color: 'ff0000' }} />
                  </div>
                  <div style={{fontSize:'13px', marginTop: '10px', color: 'red', fontWeight: '500',textAlign:'center' }}>
                    Vibrant Community
                  </div>
                </div>

                <div className='co-box-div'>
                  <div className="cd-img">
                    <FaArrowsSplitUpAndLeft style={{ width: '25px', color: 'ff0000' }} />
                  </div>
                  <div style={{fontSize:'13px', marginTop: '10px', color: 'red', fontWeight: '500' }}>
                    Flexibility
                  </div>
                </div>
              </div>
              
            </div>
            <div className='co-right'>
              <Slider {...settings} className="slider-container">
                <div className="slide-item">
                  <img src="https://t3.ftcdn.net/jpg/04/93/61/16/240_F_493611634_x9YOUceromllu0DSFdz9I369uEuZLGs4.jpg" alt="Co-living Image 2" className="slider-image" />
                </div>
                <div className="slide-item">
                  <img src="https://t3.ftcdn.net/jpg/07/07/66/56/240_F_707665604_BfeWGzxdXJVnLIVpK6EymudY9KgXkmBe.jpg" alt="Co-living Image 3" className="slider-image" />
                </div>
                <div className="slide-item">
                  <img src="https://t4.ftcdn.net/jpg/04/23/99/73/240_F_423997357_wOfT46bbeEg99XV2dRphEzLvEdlP9mSw.jpg" alt="Co-living Image 1" className="slider-image" />
                </div>
                <div className="slide-item">
                  <img src="https://t3.ftcdn.net/jpg/03/91/49/42/240_F_391494226_eqmnXVliHHI1e1guSyr6SNEjzau6b3C6.jpg" />
                </div>
              </Slider>
            </div>
          </div>
            <div style={{ margin: '0px', fontSize: '16px', color: 'ff0000',textAlign:'center',display:'flex',flexDirection:'column' }}>
                {/* <span style={{fontSize:'12px'}}>If you want to know more </span> */}
                <button style={{width:'fit-content',textAlign:'center',marginLeft:'auto',marginRight:'auto',border:"none",borderRadius:'10px'}} onClick={openModal} className="co-sign-up">Show Intrest!</button>
              </div>
        </div>
      </div>

      {/* Modal for sign up */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <h2>Sign up</h2>
              <button style={{border:'none',height:'fit-content',backgroundColor:'white'}} onClick={closeModal}> < RxCross2/></button>
              
            </div>
            <form className='coliving-model' onSubmit={handleFormSubmit}>
              <div className="modal-form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="modal-input"
                />
              </div>
              <div className="modal-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="modal-input"
                />
              </div>
              <button type="submit" className="submitbutton_">Submit</button>
              {/* <button type="button" onClick={closeModal} className="close-button">Close</button> */}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Coliving_space;
