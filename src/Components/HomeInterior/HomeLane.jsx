import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { ImCross } from "react-icons/im";

function HomeLane() {

  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(1); // Track the active slide
  const totalSlides = 4; // Number of slides
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Function to change the active slide
  const handleNext = () => {
    setActiveIndex2((prevIndex) => (prevIndex % totalSlides) + 1);
  };

  const handlePrev = () => {
    setActiveIndex2((prevIndex) =>
      prevIndex === 1 ? totalSlides : prevIndex - 1
    );
  };
  const customStyles = {
    content: {
      top: '60%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      height: '70vh',
      width: '30vw',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const handleIndicatorClick = (index) => {
    setActiveIndex2(index);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(handleNext, 5000); // Change every 5 seconds
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const faqs = [
    {
      question: "How can I get started with HomeLane?",
      answer:
        "To get started with HomeLane, all you need to do is to fill up the form on our Home Page. Give us your name, email and mobile number and tell us where you’re from.",
    },
    {
      question: "What is the timeline for completing a project with HomeLane?",
      answer:
        "HomeLane typically completes a standard home interior project in 45 days. \n A 45+ 10 day delivery guarantee applies if your project includes items like wallpaper, wooden flooring, painting and cleaning services.Complex projects which include loose furniture, wall art, home automation, textured paint and non-standard civil or electrical work will take longer, and the schedule will be fixed based on the scope of work that is called for.",
    },
    {
      question: "How does the HomeLane interior design process work?",
      answer:
        "HomeLane offers a hassle-free design process with two consultation options: online or in-person at any of our Experience Centres.",
    },
    {
      question: "Can I visit a HomeLane showroom to see your products and designs in person?",
      answer:
        "Yes, absolutely! Our Experience Centres are exactly what you'd expect from a showroom – a place to see and interact with our products and designs in person.",
    },
    {
      question: "What are the end-to-end services offered by HomeLane?",
      answer:
        "From the start of your home interior journey till you move in, HomeLane is with you every step of the way! We provide free consultations, budget planning, execution, and quality checks.",
    },
    {
      question: "Are your designs customisable?",
      answer:
        "While we do have hundreds of stylish designs in our catalogue, you need not opt for any of them! HomeLane services and designs are completely customisable to suit your style and needs.",
    },
  ];
  return (
    <>
      {/* <div id="carouselExampleIndicators" class="carousel slide HomeInT_Slider_page" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class=""></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2" class=""></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3" class=""></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item">
            <img class="d-block w-100 bg-slider" src="https://townmanor.in/templates/selio/assets/selfImages/Interior_backNew.jpg" alt="First slide" />
            <div class="carousel-caption d-md-block">
              <h5>Your only choice for <br></br><span>hassle-free interiors</span></h5>
              <p>Experience unmatched quality & timely delivery with Livspace</p>
              <button type="submit" class="btn-calc" data-toggle="modal" data-target="#exampleModal">Book 3D Design Session <span>Free</span> </button>
            </div>
          </div>
          <div class="carousel-item active">
            <img class="d-block w-100 bg-slider" src="https://townmanor.in/templates/selio/assets/selfImages/Interior_back.jpg" alt="Second slide" />
            <div class="carousel-caption d-md-block">
              <h5>Your only choice for <br></br> <span>hassle-free interiors</span></h5>
              <p>Experience unmatched quality & timely delivery with Livspace</p>
              <button type="submit" class="btn-calc" data-toggle="modal" data-target="#exampleModal">Book 3D Design Session <span>Free</span> </button>
            </div>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100 bg-slider" src="https://townmanor.in/templates/selio/assets/selfImages/Interior_back2.jpg" alt="Second slide" />
            <div class="carousel-caption d-md-block">
              <h5>Your only choice for <br></br> <span>hassle-free interiors</span></h5>
              <p>Experience unmatched quality & timely delivery with Livspace</p>
              <button type="submit" class="btn-calc" data-toggle="modal" data-target="#exampleModal">Book 3D Design Session <span>Free</span> </button>
            </div>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100 bg-slider" src="https://townmanor.in/templates/selio/assets/selfImages/Interior_back3.jpg" alt="Second slide" />
            <div class="carousel-caption d-md-block">
              <h5>Your only choice for <br></br> <span>hassle-free interiors</span></h5>
              <p>Experience unmatched quality & timely delivery with Livspace</p>
              <button type="submit" class="btn-calc" data-toggle="modal" data-target="#exampleModal">Book 3D Design Session <span>Free</span> </button>
            </div>
          </div>
        </div>
      </div> */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide HomeInT_Slider_page"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          {[...Array(totalSlides)].map((_, index) => (
            <li
              key={index}
              data-target="#carouselExampleIndicators"
              data-slide-to={index}
              className={activeIndex2 === index + 1 ? 'active' : ''}
              onClick={() => handleIndicatorClick(index + 1)}
            ></li>
          ))}
        </ol>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="3D Design Booking Form"
          ariaHideApp={false}
          style={customStyles}
        >
          <div class="modal-body pt-0 pb-4">
            <div id="Lead_Form" class="LeadPopup_popUpBox LeadPopup_active">
              <form action="https://townmanor.in/customform/homeInteriorsNew" method="post" accept-charset="utf-8" class="LeadPopup_popUpWindow pt-4 px-3" autocomplete="nope">
                <input type="hidden" name="popupForm" value="1" />
                <div class="LeadPopup_headingBox pt-0">
                  <h2>Meet a designer</h2><span onclick={()=>{
                    closeModal();
                  }} style={{
                    cursor:"pointer"
                  }}><ImCross onclick={()=>{
                    closeModal();
                  }} /></span>
                </div>
                <div class="LeadPopup_contentBox">
                  <div class="LeadPopup_form">
                    <div class="form_item">
                      <input type="text" name="name" class="formInput" autocomplete="nope" required="" />
                      <label for="name" class="font12 fontMedium formLabel">Name *</label>
                    </div>
                    <div class="form_item">
                      <input type="text" name="email" class="formInput" autocomplete="nope" required="" />
                      <label for="email" class="font12 fontMedium formLabel">Email *</label>
                    </div>
                    <div class="form_item contBox">
                      <span class="text303542 font12 contCode fontMedium">+91</span>
                      <input type="text" name="mobile" class="formInput" autocomplete="nope" pattern="[0-9]+{10,15}" minlength="10" maxlength="15" required="" />
                      <label for="mobile" class="font12 fontMedium formLabel">Mobile No *</label>
                    </div>
                    <div class="form_item">
                      <div class="city-container">
                        <select class="formInput undefined" name="city" required="">
                          <option value="">Choose City *</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Bangalore">Bangalore</option>
                          <option value="Gurgaon">Gurgaon</option>
                          <option value="Noida">Noida</option>
                          <option value="Faridabad">Faridabad</option>
                          <option value="Delhi">Delhi</option>
                          <option value="GreaterNoida">Greater Noida</option>
                          <option value="Ghaziabad">Ghaziabad</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Pune">Pune</option>
                        </select>
                      </div>
                    </div>
                    <div class="form_item">
                      <div class="SelectRange_Calc">
                        <div class="selectBox">
                          <select class="formInput undefined" name="occupationType" required="">
                            <option value="" disabled="">I'm Interested in Interiors For *</option>
                            <option value="New Home For Self-Use">New Home For Self-Use</option>
                            <option value="New Home For Renting Out">New Home For Renting Out
                            </option>
                            <option value="Home Renovation">Home Renovation</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="LeadPopup_rangecalc">
                      <button type="submit" class="btn-calc">Book 3D Design Session <span>Free</span> </button>
                    </div>
                    <div class="mt-4">
                      <p>By submitting this form, you agree to our <a href="https://townmanor.in/en/181/privacy_policy"> privacy policy</a> and <a href="https://townmanor.in/en/195/terms_and_condition"> terms of use</a> , granting us permission to use your personal information as specified in the privacy policy.</p>
                    </div>
                  </div>
                </div>
              </form>				</div>
          </div>
        </Modal>
        <div className="carousel-inner">
          <div className={`carousel-item ${activeIndex2 === 1 ? 'active' : ''}`}>
            <img
              className="d-block w-100 bg-slider"
              src="https://townmanor.in/templates/selio/assets/selfImages/Interior_backNew.jpg"
              alt="First slide"
            />
            <div className="carousel-caption d-md-block">
              <h5>
                Your only choice for <br />
                <span>hassle-free interiors</span>
              </h5>
              <p>Experience unmatched quality & timely delivery with Livspace</p>
              <button type="button" className="btn-calc" onClick={openModal}>
                Book 3D Design Session <span>Free</span>
              </button>
            </div>
          </div>

          <div className={`carousel-item ${activeIndex2 === 2 ? 'active' : ''}`}>
            <img
              className="d-block w-100 bg-slider"
              src="https://townmanor.in/templates/selio/assets/selfImages/Interior_back.jpg"
              alt="Second slide"
            />
            <div className="carousel-caption d-md-block">
              <h5>
                Your only choice for <br />
                <span>hassle-free interiors</span>
              </h5>
              <p>Experience unmatched quality & timely delivery with Livspace</p>
              <button type="button" className="btn-calc" onClick={openModal}>
                Book 3D Design Session <span>Free</span>
              </button>
            </div>
          </div>

          <div className={`carousel-item ${activeIndex2 === 3 ? 'active' : ''}`}>
            <img
              className="d-block w-100 bg-slider"
              src="https://townmanor.in/templates/selio/assets/selfImages/Interior_back2.jpg"
              alt="Third slide"
            />
            <div className="carousel-caption d-md-block">
              <h5>
                Your only choice for <br />
                <span>hassle-free interiors</span>
              </h5>
              <p>Experience unmatched quality & timely delivery with Livspace</p>
              <button type="button" className="btn-calc" onClick={openModal}>
                Book 3D Design Session <span>Free</span>
              </button>
            </div>
          </div>

          <div className={`carousel-item ${activeIndex2 === 4 ? 'active' : ''}`}>
            <img
              className="d-block w-100 bg-slider"
              src="https://townmanor.in/templates/selio/assets/selfImages/Interior_back3.jpg"
              alt="Fourth slide"
            />
            <div className="carousel-caption d-md-block">
              <h5>
                Your only choice for <br />
                <span>hassle-free interiors</span>
              </h5>
              <p>Experience unmatched quality & timely delivery with Livspace</p>
              <button type="button" className="btn-calc" onClick={openModal}>
                Book 3D Design Session <span>Free</span>
              </button>
            </div>
          </div>
        </div>

        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
          onClick={handlePrev}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
          onClick={handleNext}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <div id="interior-tabs-container">


        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-8">
              <div class="interior-heading-box mb-4">
                <h5>Interior Design Services Under One Roof</h5>
                <p>From ideation to execution, we offer functional design solutions for your home.</p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <ul>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/kitchen" />
                <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/modular-kitchen.png" />

                <h3>Modular Kitchen</h3>

              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/warddrobe" />
                <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/wardrobes.png" />

                <h3>Wardrobes</h3>

              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/masterbedroom" />
                <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/master-bedroom.png" />

                <h3>Master Bedroom</h3>

              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/tv">
                  <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/tv-unit.png" />

                  <h3>TV Unit</h3>
                </a>
              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/livingroom">
                  <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/living-room.png" />

                  <h3>Living Room</h3>
                </a>
              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/falseceiling">
                  <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/false-ceiling.png" />

                  <h3>False Ceiling</h3>
                </a>
              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/bathroom">
                  <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/bathroom.png" />

                  <h3>Bathroom</h3>
                </a>
              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/kids">
                  <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/kids-room.png" />

                  <h3>Kids Room</h3>
                </a>
              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/fullhouseinterior">
                  <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/full-house-interiors.png" />

                  <h3>Full House Interiors</h3>
                </a>
              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/commercialinterior">
                  <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/commercial-interiors.png" />

                  <h3>Commercial Interiors</h3>
                </a>
              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/officeinterior">
                  <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/office-interior.png" />

                  <h3>Office Interior</h3>
                </a>
              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/bedroom">
                  <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/bedroom.png" />

                  <h3>Bedroom</h3>
                </a>
              </li>
              <li class="tab tab_services">
                <a href="http://localhost:5173/homelane/furniture">

                  <img src="https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/Furniture_logo.png" />
                  <h3>Furniture</h3>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="ref_contact_banner">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-6">
              <div class="ref_contact_content">
                <h2>We are NRI-friendly too.</h2>
                <p>Pull strings from anywhere in the world. Set up your dream home from across the seven seas.</p>
                {/* <button class="ref_contact_btn" data-toggle="modal" data-target="#exampleModal">BOOK FREE DESIGN SESSION</button> */}
                <button type="button" className="btn-calc" onClick={openModal}>
                  Book 3D Design Session <span>Free</span>
                </button>
              </div>
            </div>
            <div class="col-md-6">
              <div class="ref_contact_img">
                <img width="450" src="https://townmanor.in/templates/selio/assets/selfImages/Interior_girl_talk.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="faq-section padd_bottom_85" id="faqs1">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="faq-title text-center pb-5">
            <h3>Frequently Asked Questions</h3>
          </div>
        </div>
  
        <div class="col-md-10 offset-md-1">
          <div class="faq" id="accordion">
            <div class="card">
              <div class="card-header" id="faqHeading-1">
                <div class="mb-0">
                  <h5 class="faq-title collapsed" data-aria-controls="faqCollapse-1" data-aria-expanded="true" data-target="#faqCollapse-1" data-toggle="collapse" aria-expanded="false">
                    <span class="badge">1</span> How can I get started with HomeLane?
                  </h5>
                </div>
              </div>
  
              <div aria-labelledby="faqHeading-1" class="collapse" data-parent="#accordion" id="faqCollapse-1" >
                <div class="card-body">
                  <p>
                    To get started with HomeLane, all you need to do is to fill up the form on our Home Page. Give us your name, email and mobile number and tell us where you’re from.
                  </p>
                </div>
              </div>
            </div>
  
            <div class="card">
              <div class="card-header" id="faqHeading-2">
                <div class="mb-0">
                  <h5 class="faq-title collapsed" data-aria-controls="faqCollapse-2" data-aria-expanded="false" data-target="#faqCollapse-2" data-toggle="collapse" aria-expanded="false">
                    <span class="badge">2</span> What is the timeline for completing a project with HomeLane?
                  </h5>
                </div>
              </div>
  
              <div aria-labelledby="faqHeading-2" class="collapse" data-parent="#accordion" id="faqCollapse-2" >
                <div class="card-body">
                    <p>HomeLane typically completes a standard home interior project in 45 days.</p>
                    <p>A 45+ 10 day delivery guarantee applies if your project includes items like wallpaper, wooden flooring, painting and cleaning services.</p>
                    <p>Complex projects which include loose furniture, wall art, home automation, textured paint and non-standard civil or electrical work will take longer, and the schedule will be fixed based on the scope of work that is called for.</p>
                </div>
              </div>
            </div>
  
            <div class="card">
              <div class="card-header" id="faqHeading-3">
                <div class="mb-0">
                  <h5 class="faq-title collapsed" data-aria-controls="faqCollapse-3" data-aria-expanded="false" data-target="#faqCollapse-3" data-toggle="collapse" aria-expanded="false">
                    <span class="badge">3</span> How does the HomeLane interior design process work?
                  </h5>
                </div>
              </div>
  
              <div aria-labelledby="faqHeading-3" class="collapse" data-parent="#accordion" id="faqCollapse-3" >
                <div class="card-body">
                    <p>HomeLane offers a hassle-free design process with two consultation options: online or in-person at any of our Experience Centres. Here's how it works!</p><p>
                    <span>Step 1: Consultation</span></p>
					<p><span>Option 1: Online Consultation</span></p>
					<p>You’ll fill out a form, and get assigned a designer who will virtually interact with you at the agreed upon date and time. They will take down your requirements, understand your floor plan, and get details on your taste preferences and your budget.</p><p>
                    Depending on your requirements, they might show you various design possibilities over the call, or could also call you back for a second virtual meeting. You’ll be shown 3D design options along with the corresponding budget, and can move around the cabinets, and change the finishes and materials till you arrive at a HomeLane interior design that you absolutely love.</p><p>
                    </p>
					<p><span>Option 2: In-Person Consultation at Experience Centres</span>
                    </p>
					<p>You’ll meet your HomeLane interior designer at the agreed upon time and place. The meeting will go the same way as the virtual meeting, with the added advantage of getting to explore kitchen units, wardrobes, and other elements. You will be able to see, touch and feel the various materials and finishes and can experience how the hardware works. You can choose from a wide range of styles, materials, and finishes to match your taste and budget.</p><p>
                    </p>
					<p>Here, too, you will be shown 3D views and detailed cost breakdowns, and can make changes till you arrive at a design and costing that works well for you.
                    </p> 
					<p><span>Step 2: Agreement</span></p>
					<p>You’ll sit down with a HomeLane Sales Manager, review the terms and conditions, get completion timelines and material specifications, and finalise the deal. You will be asked to pay an advance once you are completely satisfied with every single detail. You will sign a final agreement with all the details – design, specifications, timeline, and payment schedule.
                    </p>
					<p><span>Step 3: Execution</span>
                    </p>
					<p>The HomeLane interior design team will visit your site and take detailed measurements before commencing the actual construction. </p><p>
                    The project will commence, and modular cabinets and furniture will be cut, sized and finished at the factory. You will be contacted for stage-wise payments (if agreed upon) at the appropriate time. The team will manage the project with quality checks at every step.
                    </p>
					<p>Once the work at the factory is completed, the interior design service team will complete the installation at your home.
                    <span>Step 4: Move In!</span>
                    Once the HomeLane interior project is complete (typically 45 days after finalising the design),you can make the final payment and move into your dream home!</p>
                </div>
              </div>
            </div>
  
            <div class="card">
              <div class="card-header" id="faqHeading-4">
                <div class="mb-0">
                  <h5 class="faq-title collapsed" data-aria-controls="faqCollapse-4" data-aria-expanded="false" data-target="#faqCollapse-4" data-toggle="collapse" aria-expanded="false">
                    <span class="badge">4</span> Can I visit a HomeLane showroom to see your products and designs in person?
                  </h5>
                </div>
              </div>
  
              <div aria-labelledby="faqHeading-4" class="collapse" data-parent="#accordion" id="faqCollapse-4" >
                <div class="card-body">
                    <p>Yes, absolutely! Our Experience Centres are exactly what you'd expect from a showroom – a place to see and interact with our products and designs in person. We actually call them Experience Centres because they offer more than just a static display. Come visit one to:
                    </p><ul><li>See and feel materials: Our Experience Centres have displays that allow you to get up close and personal with HomeLane kitchen designs, wardrobes, and other design elements.
                    </li><li>Explore design possibilities: Meet with a HomeLane interior designer who can showcase a variety of styles and help you brainstorm ideas for your own space.</li></ul>
                </div>
              </div>
            </div>
  
            <div class="card">
              <div class="card-header" id="faqHeading-5">
                <div class="mb-0">
                  <h5 class="faq-title collapsed" data-aria-controls="faqCollapse-5" data-aria-expanded="false" data-target="#faqCollapse-5" data-toggle="collapse" aria-expanded="false">
                    <span class="badge">5</span> What are the end-to end-services offered by HomeLane?
                  </h5>
                </div>
              </div>
  
              <div aria-labelledby="faqHeading-5" class="collapse" data-parent="#accordion" id="faqCollapse-5" >
                <div class="card-body">
                    <p>From the start of your home interior journey till you move in, HomeLane is with you every step of the way! Here’s what you can expect:
                    </p><ul><li>Consultation and Design: We provide both free online consultations and in-person consultations at our Experience Centres. Talented HomeLane interior designers will work with you to understand your vision and preferences, using SpaceCraft software to create real-time 3D designs that help you to visualise exactly what you will get.
                    </li><li>Budgeting and Material Choices: HomeLane helps you stay on track financially with cost estimates provided throughout the design process. We also display a wide variety of materials and finishes at our Experience Centres to suit your taste and budget. You’ll be able to see, touch and feel our model mockup kitchens, bathrooms, bedrooms and more, and can interact with each space to see how everything works.
                    </li><li>Execution and Quality Checks: Once you've finalised the design and the budget, our team manages the entire project execution. This includes procurement of materials, installation by experienced professionals, and rigorous quality checks at every step to ensure everything meets our standards.
                    </li></ul><p>With HomeLane, you’ll get the home décor services you’ve always dreamed about—on time and within your budget!</p>
                </div>
              </div>
            </div>
  
            <div class="card">
              <div class="card-header" id="faqHeading-6">
                <div class="mb-0">
                  <h5 class="faq-title collapsed" data-aria-controls="faqCollapse-6" data-aria-expanded="false" data-target="#faqCollapse-6" data-toggle="collapse" aria-expanded="false">
                    <span class="badge">6</span> Are your designs customisable?
                  </h5>
                </div>
              </div>
  
              <div aria-labelledby="faqHeading-6" class="collapse" data-parent="#accordion" id="faqCollapse-6" >
                <div class="card-body">
                  <p>
                    While we do have hundreds of stylish designs in our catalogue, you need not opt for any of them! HomeLane services and designs are completely customisable to suit your sense of style and your needs. We’ll get into the nitty gritty of your lifestyle, your tastes and your budget, and will custom design a home interior that is just perfect for you and your family!
                  </p>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </div> */}
      <div className="faq-section padd_bottom_85" id="faqs1">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="faq-title text-center pb-5">
                <h3>Frequently Asked Questions</h3>
              </div>
            </div>

            <div className="col-md-10 offset-md-1">
              <div className="faq">
                {faqs.map((faq, index) => (
                  <div className="card" key={index}>
                    <div className="card-header" id={`faqHeading-${index}`}>
                      <div className="mb-0">
                        <h5
                          className="faq-title"
                          onClick={() => toggleAnswer(index)}
                        >
                          <span className="badge">{index + 1}</span>{" "}
                          {faq.question}
                        </h5>
                      </div>
                    </div>

                    <div
                      className={`collapse ${activeIndex === index ? "show" : ""}`}
                      id={`faqCollapse-${index}`}
                    >
                      <div className="card-body">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer_features_banner">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-3 col-md-6">
              <div class="footer_features_content">
                {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="72px" height="72px" viewBox="0 0 72 72" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="D1" transform="translate(-1063.000000, -749.000000)"><g id="Group-18-Copy-3" transform="translate(0.000000, 648.000000)"><g id="temp" transform="translate(211.000000, 101.000000)"><g id="Group-11"><g id="Group-10"><g id="Group-14-Copy-2" transform="translate(832.000000, 0.000000)"><g id="Group-9"><g id="Rectangle-4" transform="translate(20.000000, 0.000000)"><rect id="Rectangle" x="0" y="0" width="72" height="72"></rect><g id="RTB-04-copy-01" transform="translate(11.000000, 12.000000)"><path d="M15.177,43.154 C14.546,43.154 13.937,43.012 13.364,42.732 L2.777,37.56 C2.058,37.21 1.527,36.567 1.316,35.793 L1.311,35.778 C1.289,35.716 1.273,35.652 1.265,35.587 L1.232,35.336 C1.228,35.306 1.226,35.274 1.225,35.244 L1.219,35.084 C1.219,35.065 1.219,35.046 1.219,35.026 L1.225,34.865 C1.226,34.835 1.228,34.806 1.232,34.775 L1.266,34.519 C1.274,34.454 1.29,34.391 1.311,34.33 L1.316,34.316 C1.364,34.139 1.423,33.977 1.498,33.825 C1.768,33.275 2.222,32.823 2.775,32.552 L2.853,32.514 L5.551,31.196 C6,30.977 6.542,31.162 6.762,31.612 C6.981,32.062 6.795,32.603 6.346,32.823 L3.567,34.18 C3.375,34.274 3.219,34.429 3.124,34.622 C3.1,34.672 3.079,34.731 3.061,34.801 C3.058,34.816 3.054,34.832 3.049,34.847 L3.033,34.968 L3.03,35.055 L3.033,35.14 L3.05,35.267 C3.053,35.278 3.057,35.29 3.06,35.302 C3.131,35.582 3.312,35.807 3.571,35.932 L14.16,41.105 C14.805,41.421 15.545,41.421 16.194,41.104 L26.683,35.981 C26.692,35.977 26.702,35.971 26.713,35.966 L26.783,35.932 C26.98,35.836 27.136,35.683 27.23,35.488 C27.233,35.483 27.235,35.479 27.237,35.475 C27.258,35.43 27.276,35.373 27.295,35.302 C27.298,35.29 27.301,35.278 27.305,35.268 L27.324,35.056 L27.32,34.971 L27.305,34.843 C27.301,34.832 27.298,34.82 27.295,34.809 C27.224,34.528 27.042,34.304 26.783,34.178 C26.769,34.172 26.757,34.165 26.744,34.158 L23.493,32.374 C23.054,32.134 22.894,31.583 23.134,31.145 C23.375,30.707 23.925,30.546 24.364,30.786 L27.599,32.56 C28.308,32.915 28.83,33.553 29.038,34.318 L29.045,34.337 C29.066,34.397 29.081,34.46 29.089,34.523 L29.122,34.782 C29.125,34.808 29.127,34.834 29.129,34.859 L29.135,35.019 C29.13575,35.044 29.13575,35.067 29.135,35.092 L29.129,35.253 C29.127,35.279 29.125,35.306 29.122,35.332 L29.09,35.587 C29.081,35.653 29.065,35.719 29.042,35.782 L29.037,35.798 C28.988,35.977 28.93,36.136 28.859,36.281 C28.854,36.293 28.848,36.305 28.842,36.316 C28.565,36.861 28.128,37.291 27.575,37.56 L27.533,37.581 C27.523,37.586 27.515,37.591 27.505,37.595 L16.989,42.732 C16.415,43.012 15.805,43.154 15.177,43.154" id="Fill-1" fill="#5D5E5B"></path><path d="M14.805,36.406 C14.174,36.406 13.564,36.265 12.992,35.984 L2.405,30.811 C1.441,30.342 0.842,29.383 0.842,28.308 C0.842,27.232 1.441,26.272 2.406,25.803 L6.588,23.759 C7.037,23.54 7.579,23.726 7.799,24.175 C8.019,24.624 7.832,25.167 7.383,25.387 L3.2,27.431 C2.862,27.595 2.653,27.931 2.653,28.308 C2.653,28.689 2.857,29.018 3.199,29.185 L13.788,34.357 C14.433,34.673 15.175,34.674 15.823,34.357 L26.41,29.185 C26.753,29.017 26.958,28.689 26.958,28.308 C26.958,27.932 26.748,27.595 26.411,27.431 L22.227,25.387 C21.778,25.167 21.592,24.624 21.811,24.175 C22.031,23.726 22.573,23.54 23.022,23.759 L27.205,25.803 C28.169,26.273 28.769,27.233 28.769,28.308 C28.769,29.381 28.17,30.341 27.205,30.811 L16.617,35.984 C16.043,36.265 15.434,36.406 14.805,36.406" id="Fill-2" fill="#D2262E"></path><path d="M15.156,13.943 C15.163,13.943 15.17,13.943 15.178,13.943 C15.53,13.943 15.872,14.023 16.195,14.181 L26.783,19.354 C27.042,19.48 27.224,19.704 27.295,19.985 C27.298,19.997 27.301,20.008 27.305,20.019 L27.32,20.146 L27.324,20.232 L27.305,20.443 C27.301,20.455 27.298,20.466 27.295,20.478 C27.276,20.549 27.258,20.606 27.237,20.651 C27.235,20.655 27.233,20.66 27.23,20.664 C27.136,20.858 26.98,21.012 26.783,21.108 L26.713,21.142 C26.703,21.146 26.693,21.151 26.684,21.157 L16.194,26.281 C15.545,26.598 14.804,26.597 14.16,26.281 L3.571,21.108 C3.312,20.982 3.131,20.758 3.06,20.478 C3.057,20.466 3.053,20.455 3.05,20.443 L3.033,20.315 L3.03,20.231 L3.033,20.144 L3.049,20.023 C3.054,20.008 3.058,19.992 3.061,19.977 C3.079,19.908 3.1,19.848 3.124,19.798 C3.219,19.604 3.375,19.451 3.568,19.355 L12.599,14.944 L15.156,13.943 Z M49.121,22.667 L49.121,6.373 C49.121,5.873 48.716,5.468 48.216,5.468 L46.994,5.468 C36.271,5.468 31.787,1.202 31.754,1.169 L30.879,0.273 C30.709,0.099 30.477,0.001 30.231,0 C29.989,0 29.757,0.097 29.587,0.269 L28.713,1.155 C28.669,1.198 24.185,5.468 13.456,5.468 L12.234,5.468 C11.734,5.468 11.329,5.873 11.329,6.373 L11.329,13.549 L2.853,17.69 L2.775,17.728 C2.222,17.999 1.769,18.451 1.498,19.001 C1.423,19.153 1.363,19.314 1.312,19.505 C1.29,19.566 1.274,19.63 1.266,19.694 L1.232,19.952 C1.228,19.981 1.226,20.011 1.225,20.041 L1.219,20.202 C1.219,20.222 1.219,20.241 1.219,20.26 L1.225,20.42 C1.226,20.451 1.228,20.481 1.232,20.512 L1.265,20.763 C1.273,20.828 1.289,20.892 1.316,20.969 C1.527,21.743 2.058,22.386 2.777,22.736 L13.364,27.908 C13.937,28.187 14.546,28.33 15.177,28.33 C15.805,28.33 16.415,28.188 16.989,27.908 L27.505,22.771 C27.514,22.767 27.522,22.762 27.531,22.758 L27.575,22.736 C28.128,22.467 28.565,22.037 28.842,21.492 C28.848,21.481 28.854,21.469 28.859,21.457 C28.93,21.312 28.988,21.153 29.042,20.958 C29.065,20.895 29.081,20.83 29.09,20.763 L29.122,20.508 C29.125,20.481 29.127,20.455 29.129,20.428 L29.135,20.267 C29.136,20.244 29.136,20.22 29.135,20.196 L29.129,20.036 C29.127,20.01 29.125,19.983 29.122,19.957 L29.089,19.699 C29.081,19.636 29.066,19.573 29.038,19.495 C28.828,18.721 28.298,18.078 27.577,17.727 L16.99,12.554 C16.423,12.276 15.819,12.135 15.194,12.132 C14.96,12.127 14.728,12.165 14.508,12.252 L13.14,12.788 L13.14,7.278 L13.456,7.278 C25.078,7.278 29.947,2.481 29.995,2.433 L30.228,2.198 L30.46,2.437 C30.508,2.485 35.358,7.278 46.994,7.278 C46.994,7.278 47.311,7.278 47.311,7.279 C47.311,11.594 47.311,15.91 47.311,20.226 C47.311,22.486 47.448,24.621 46.842,26.806 C46.273,28.851 45.325,30.78 44.193,32.568 C40.756,38.001 35.659,42.292 30.405,45.888 L30.231,46.007 L30.054,45.893 C26.846,43.818 24.017,41.578 21.646,39.234 C21.291,38.883 20.718,38.886 20.366,39.241 C20.015,39.598 20.018,40.17 20.373,40.522 C22.832,42.953 25.758,45.271 29.07,47.413 L29.753,47.854 C29.903,47.951 30.074,48 30.245,48 C30.424,48 30.603,47.947 30.756,47.842 L31.428,47.383 C39.114,42.122 44.414,36.582 47.18,30.914 C49.299,26.572 49.213,23.572 49.121,22.667 L49.121,22.667 Z" id="Fill-3" fill="#5D5E5B"></path></g></g></g></g></g></g></g></g></g></g></svg> */}
                <h2>Flat 10 year warranty</h2>
                <p>Choose interiors designed with superior quality material, leaving no room for defects.</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="footer_features_content">
                {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="72px" height="72px" viewBox="0 0 72 72" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="D1" transform="translate(-491.000000, -5156.000000)"><g id="Group-70" transform="translate(0.000000, 5031.000000)"><g id="Group-76"><g id="Group-17"><g id="Group-67" transform="translate(383.000000, 125.000000)"><g id="Rectangle-4" transform="translate(108.000000, 0.000000)"><rect id="Rectangle" x="0" y="0" width="72" height="72"></rect><g id="RTB-01-copy-01" transform="translate(12.000000, 12.000000)"><path d="M5.13,2.118 C3.469,2.118 2.118,3.469 2.118,5.13 L2.118,42.869 C2.118,44.53 3.469,45.882 5.13,45.882 L42.869,45.882 C44.53,45.882 45.882,44.53 45.882,42.869 L45.882,5.13 C45.882,3.469 44.53,2.118 42.869,2.118 L5.13,2.118 Z M42.869,47.643 L5.13,47.643 C2.498,47.643 0.357,45.501 0.357,42.869 L0.357,5.13 C0.357,2.499 2.498,0.358 5.13,0.358 L42.869,0.358 C45.501,0.358 47.643,2.499 47.643,5.13 L47.643,42.869 C47.643,45.501 45.501,47.643 42.869,47.643 L42.869,47.643 Z" id="Fill-1" fill="#5D5E5B"></path><path d="M46.524,14.89 L1.578,14.89 C1.092,14.89 0.698,14.496 0.698,14.009 C0.698,13.523 1.092,13.129 1.578,13.129 L46.524,13.129 C47.01,13.129 47.404,13.523 47.404,14.009 C47.404,14.496 47.01,14.89 46.524,14.89" id="Fill-2" fill="#5D5E5B"></path><path d="M19.062,7.623 C19.062,8.898 18.029,9.932 16.754,9.932 C15.48,9.932 14.447,8.898 14.447,7.623 C14.447,6.349 15.48,5.316 16.754,5.316 C18.029,5.316 19.062,6.349 19.062,7.623" id="Fill-3" fill="#D2262E"></path><path d="M33.553,7.623 C33.553,8.898 32.52,9.932 31.245,9.932 C29.971,9.932 28.937,8.898 28.937,7.623 C28.937,6.349 29.971,5.316 31.245,5.316 C32.52,5.316 33.553,6.349 33.553,7.623" id="Fill-4" fill="#D2262E"></path><path d="M19.754,24.114 C19.754,23.869 19.763,23.603 19.78,23.319 C19.798,23.035 19.824,22.741 19.859,22.439 L15.803,28.118 L19.754,28.118 L19.754,24.114 Z M22.599,28.118 L24.179,28.118 L24.179,29.951 C24.179,30.113 24.125,30.253 24.016,30.373 C23.907,30.492 23.751,30.552 23.547,30.552 L22.599,30.552 L22.599,34.081 L19.754,34.081 L19.754,30.552 L13.58,30.552 C13.376,30.552 13.192,30.488 13.027,30.362 C12.862,30.235 12.758,30.078 12.716,29.888 L12.379,28.276 L19.48,18.73 L22.599,18.73 L22.599,28.118 L22.599,28.118 Z" id="Fill-5" fill="#D2262E"></path><path d="M35.052,20.079 C35.052,20.304 35.017,20.508 34.946,20.69 C34.876,20.873 34.766,21.033 34.615,21.169 C34.464,21.307 34.266,21.412 34.02,21.486 C33.773,21.56 33.479,21.596 33.135,21.596 L29.468,21.596 L29.036,24.135 C29.324,24.086 29.602,24.049 29.868,24.025 C30.135,24 30.395,23.988 30.648,23.988 C31.456,23.988 32.169,24.111 32.787,24.356 C33.405,24.603 33.925,24.938 34.346,25.363 C34.768,25.788 35.085,26.286 35.3,26.859 C35.514,27.432 35.621,28.044 35.621,28.697 C35.621,29.519 35.476,30.269 35.184,30.947 C34.893,31.625 34.486,32.21 33.967,32.701 C33.447,33.192 32.827,33.574 32.107,33.845 C31.388,34.114 30.599,34.25 29.742,34.25 C29.243,34.25 28.768,34.197 28.314,34.092 C27.861,33.986 27.436,33.845 27.039,33.665 C26.643,33.486 26.275,33.279 25.938,33.044 C25.602,32.809 25.296,32.558 25.021,32.29 L26.033,30.941 C26.139,30.801 26.262,30.694 26.402,30.62 C26.542,30.547 26.693,30.51 26.855,30.51 C27.065,30.51 27.264,30.567 27.45,30.684 C27.637,30.8 27.84,30.926 28.062,31.062 C28.283,31.2 28.541,31.324 28.836,31.436 C29.131,31.549 29.496,31.605 29.932,31.605 C30.367,31.605 30.739,31.533 31.049,31.39 C31.357,31.245 31.608,31.049 31.802,30.8 C31.995,30.55 32.136,30.259 32.224,29.925 C32.31,29.592 32.354,29.234 32.354,28.855 C32.354,28.111 32.145,27.544 31.723,27.154 C31.302,26.764 30.704,26.569 29.932,26.569 C29.243,26.569 28.568,26.699 27.909,26.959 L25.886,26.411 L27.192,18.73 L35.052,18.73 L35.052,20.079" id="Fill-6" fill="#D2262E"></path><path d="M18.478,39.129 C18.478,38.865 18.444,38.627 18.376,38.415 C18.308,38.203 18.209,38.022 18.081,37.875 C17.953,37.727 17.796,37.614 17.61,37.534 C17.425,37.455 17.214,37.415 16.977,37.415 L16.15,37.415 L16.15,40.847 L16.977,40.847 C17.214,40.847 17.425,40.807 17.61,40.727 C17.796,40.648 17.953,40.534 18.081,40.387 C18.209,40.239 18.308,40.059 18.376,39.847 C18.444,39.635 18.478,39.395 18.478,39.129 Z M19.746,39.129 C19.746,39.515 19.679,39.87 19.546,40.196 C19.413,40.522 19.226,40.804 18.984,41.042 C18.742,41.28 18.451,41.466 18.11,41.599 C17.77,41.731 17.392,41.798 16.977,41.798 L14.905,41.798 L14.905,36.464 L16.977,36.464 C17.392,36.464 17.77,36.53 18.11,36.665 C18.451,36.799 18.742,36.984 18.984,37.222 C19.226,37.458 19.413,37.739 19.546,38.065 C19.679,38.392 19.746,38.746 19.746,39.129 L19.746,39.129 Z" id="Fill-7" fill="#D2262E"></path><path d="M21.657,39.759 L23.114,39.759 L22.623,38.298 C22.591,38.205 22.554,38.096 22.512,37.97 C22.469,37.845 22.427,37.708 22.385,37.561 C22.346,37.711 22.306,37.849 22.264,37.976 C22.223,38.102 22.184,38.213 22.147,38.305 L21.657,39.759 Z M25.084,41.798 L24.124,41.798 C24.017,41.798 23.929,41.773 23.859,41.724 C23.79,41.673 23.741,41.609 23.714,41.531 L23.399,40.601 L21.371,40.601 L21.056,41.531 C21.032,41.6 20.984,41.661 20.913,41.716 C20.842,41.77 20.756,41.798 20.653,41.798 L19.687,41.798 L21.752,36.464 L23.019,36.464 L25.084,41.798 L25.084,41.798 Z" id="Fill-8" fill="#D2262E"></path><path d="M27.442,39.769 L27.442,41.798 L26.204,41.798 L26.204,39.769 L24.271,36.464 L25.362,36.464 C25.47,36.464 25.555,36.488 25.618,36.538 C25.682,36.589 25.733,36.652 25.772,36.73 L26.526,38.283 C26.587,38.408 26.644,38.522 26.695,38.627 C26.746,38.732 26.791,38.836 26.83,38.938 C26.867,38.834 26.911,38.728 26.962,38.624 C27.014,38.519 27.068,38.405 27.127,38.283 L27.874,36.73 C27.889,36.699 27.908,36.667 27.935,36.636 C27.96,36.603 27.989,36.575 28.022,36.55 C28.056,36.523 28.093,36.503 28.136,36.487 C28.179,36.472 28.226,36.464 28.276,36.464 L29.375,36.464 L27.442,39.769" id="Fill-9" fill="#D2262E"></path><path d="M32.715,37.547 C32.678,37.605 32.64,37.649 32.599,37.679 C32.559,37.708 32.507,37.723 32.443,37.723 C32.388,37.723 32.327,37.705 32.263,37.67 C32.197,37.635 32.124,37.595 32.043,37.551 C31.961,37.507 31.867,37.468 31.763,37.432 C31.657,37.396 31.538,37.379 31.403,37.379 C31.172,37.379 30.999,37.429 30.886,37.527 C30.772,37.626 30.716,37.76 30.716,37.928 C30.716,38.035 30.749,38.125 30.818,38.195 C30.886,38.267 30.976,38.327 31.087,38.379 C31.198,38.43 31.325,38.477 31.468,38.519 C31.61,38.562 31.757,38.609 31.905,38.662 C32.054,38.715 32.2,38.776 32.343,38.847 C32.485,38.918 32.612,39.008 32.724,39.118 C32.835,39.227 32.925,39.361 32.992,39.519 C33.061,39.677 33.096,39.866 33.096,40.088 C33.096,40.335 33.053,40.565 32.967,40.78 C32.882,40.995 32.758,41.183 32.596,41.343 C32.434,41.502 32.232,41.628 31.995,41.72 C31.757,41.811 31.486,41.856 31.184,41.856 C31.018,41.856 30.849,41.84 30.677,41.806 C30.505,41.771 30.338,41.724 30.177,41.661 C30.016,41.599 29.864,41.525 29.723,41.439 C29.581,41.354 29.458,41.259 29.354,41.154 L29.72,40.575 C29.746,40.531 29.784,40.496 29.833,40.469 C29.882,40.442 29.935,40.429 29.99,40.429 C30.063,40.429 30.138,40.452 30.212,40.498 C30.286,40.545 30.37,40.596 30.465,40.652 C30.559,40.708 30.666,40.76 30.788,40.806 C30.91,40.852 31.055,40.876 31.221,40.876 C31.445,40.876 31.62,40.826 31.744,40.727 C31.869,40.629 31.931,40.472 31.931,40.257 C31.931,40.132 31.896,40.031 31.828,39.953 C31.76,39.875 31.67,39.81 31.56,39.759 C31.448,39.708 31.322,39.662 31.181,39.623 C31.039,39.584 30.894,39.541 30.744,39.493 C30.596,39.445 30.45,39.387 30.309,39.317 C30.167,39.248 30.041,39.156 29.93,39.043 C29.818,38.93 29.729,38.788 29.661,38.618 C29.593,38.448 29.559,38.239 29.559,37.99 C29.559,37.79 29.599,37.595 29.679,37.404 C29.76,37.214 29.878,37.044 30.034,36.895 C30.19,36.747 30.382,36.628 30.609,36.538 C30.836,36.449 31.096,36.405 31.389,36.405 C31.553,36.405 31.712,36.418 31.867,36.443 C32.021,36.469 32.169,36.507 32.308,36.557 C32.447,36.606 32.577,36.667 32.698,36.736 C32.818,36.806 32.927,36.885 33.022,36.973 L32.715,37.547" id="Fill-10" fill="#D2262E"></path></g></g></g></g></g></g></g></g></svg> */}
                <h2>45-day delivery</h2>
                <p>Get beautiful interiors for your new home in just 45 days. That’s our delivery guarantee.</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="footer_features_content">
                {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="72px" height="72px" viewBox="0 0 72 72" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="D1" transform="translate(-803.000000, -5156.000000)"><g id="Group-70" transform="translate(0.000000, 5031.000000)"><g id="Group-76"><g id="Group-17"><g id="Group-72-Copy-2" transform="translate(695.000000, 125.000000)"><g id="Rectangle-4" transform="translate(108.000000, 0.000000)"><rect id="Rectangle" x="0" y="0" width="72" height="72"></rect><g id="RTB-03-copy-01" transform="translate(12.000000, 12.000000)"><path d="M21.552,28.477 C21.515,28.477 21.477,28.476 21.44,28.473 C21.051,28.453 20.693,28.29 20.427,28.009 L15.656,22.938 C15.304,22.564 15.322,21.975 15.696,21.623 C16.07,21.27 16.66,21.288 17.012,21.663 L21.535,26.47 L31.721,16.883 C32.096,16.531 32.685,16.549 33.037,16.923 C33.39,17.297 33.371,17.887 32.997,18.239 L22.561,28.06 C22.553,28.067 22.545,28.075 22.537,28.082 C22.253,28.34 21.909,28.477 21.552,28.477" id="Fill-1" fill="#D2262E"></path><path d="M8.498,41.447 C7.328,40.728 6.554,39.492 6.197,37.772 C5.963,36.643 5.655,36.032 5.203,35.665 C4.135,37.227 1.772,40.685 0.436,42.675 C-0.026,43.363 0.349,43.677 1.129,43.603 C2.561,43.468 3.993,43.322 5.535,43.17 C6.013,44.539 6.465,45.886 6.96,47.217 C7.057,47.474 7.298,47.83 7.513,47.858 C7.73,47.887 8.076,47.614 8.232,47.39 C9.437,45.65 11.833,42.164 11.833,42.164 L11.776,42.095 C10.508,42.22 9.408,42.008 8.498,41.447" id="Fill-2" fill="#5E5E5B"></path><path d="M42.733,35.572 C42.15,35.855 41.863,36.34 41.768,37.459 C41.616,39.215 40.953,40.534 39.797,41.38 C38.84,42.078 37.645,42.372 36.24,42.272 C36.641,42.853 38.684,45.824 39.768,47.389 C39.924,47.614 40.27,47.887 40.487,47.858 C40.701,47.83 40.944,47.474 41.039,47.217 C41.535,45.886 41.987,44.539 42.465,43.17 C44.007,43.322 45.438,43.468 46.871,43.603 C47.65,43.677 48.025,43.363 47.563,42.675 C46.198,40.642 43.766,37.081 42.733,35.572" id="Fill-3" fill="#5E5E5B"></path><path d="M23.956,40.516 C24.547,40.516 25.132,40.732 25.758,41.166 C26.911,41.965 27.883,42.26 28.785,42.067 C29.646,41.887 30.378,41.266 31.024,40.167 C31.804,38.84 32.819,38.396 34.418,38.685 C35.625,38.901 36.592,38.752 37.293,38.24 C37.979,37.738 38.378,36.901 38.477,35.753 C38.636,33.905 39.396,32.982 41.1,32.568 C42.162,32.311 42.962,31.748 43.353,30.983 C43.727,30.25 43.706,29.349 43.293,28.444 C42.52,26.75 42.805,25.564 44.279,24.353 C45.102,23.677 45.554,22.839 45.5500263,21.997 C45.547,21.248 45.173,20.536 44.497,19.989 C42.801,18.615 42.427,17.177 43.285,15.327 C43.36,15.162 43.379,14.985 43.396,14.813 L43.397,14.796 C43.405,14.725 43.413,14.65 43.426,14.572 L43.432,14.542 L43.427,14.507 C43.22,12.911 42.286,11.899 40.727,11.579 C39.127,11.25 38.383,10.354 38.314,8.672 C38.255,7.204 37.633,6.449 37.122,6.074 C36.602,5.692 35.662,5.307 34.144,5.641 C32.652,5.966 31.72,5.56 30.924,4.239 C30.459,3.464 29.711,2.406 28.581,2.153 C27.467,1.901 26.345,2.505 25.598,2.982 C24.255,3.839 23.139,3.819 21.862,2.914 C20.804,2.163 19.823,1.874 18.945,2.056 C18.087,2.232 17.339,2.858 16.721,3.916 C15.924,5.282 14.919,5.746 13.361,5.466 C11.782,5.181 10.844,5.583 10.335,5.97 C9.853,6.338 9.264,7.073 9.202,8.485 C9.129,10.158 8.427,11.001 6.778,11.396 C5.317,11.746 4.673,12.457 4.39,12.992 C4.115,13.515 3.902,14.412 4.457,15.71 C5.138,17.301 4.868,18.456 3.555,19.57 C2.942,20.09 2.213,20.939 2.22191749,22.028 C2.225,22.599 2.444,23.456 3.465,24.299 C4.904,25.487 5.177,26.68 4.409,28.415 C4.01,29.314 4.021,30.274 4.44,31.049 C4.822,31.752 5.498,32.235 6.345,32.409 C8.415,32.837 9.066,34.05 9.444,35.868 C9.685,37.026 10.145,37.802 10.852,38.236 C11.545,38.662 12.478,38.746 13.626,38.487 C15.077,38.159 16,38.583 16.814,39.948 C17.262,40.698 17.989,41.726 19.128,41.979 C20.262,42.234 21.349,41.659 22.168,41.13 C22.799,40.721 23.38,40.516 23.956,40.516 Z M28.253,43.985 C27.112,43.985 25.949,43.563 24.698,42.696 C24.085,42.272 23.83,42.271 23.179,42.693 C22.141,43.363 20.55,44.207 18.722,43.797 C16.882,43.386 15.839,41.948 15.215,40.902 C14.776,40.165 14.634,40.168 14.037,40.303 C12.398,40.674 10.998,40.512 9.877,39.822 C8.709,39.103 7.972,37.935 7.621,36.247 C7.29,34.657 6.885,34.422 5.969,34.233 C4.575,33.946 3.451,33.13 2.804,31.935 C2.107,30.649 2.072,29.092 2.707,27.66 C3.136,26.692 3.068,26.386 2.279,25.734 C0.704,24.434 0.366,23.008 0.359892523,22.041 C0.35,20.61 1.038,19.265 2.35,18.151 C3.045,17.561 3.108,17.289 2.746,16.442 C1.902,14.47 2.279,13.005 2.744,12.123 C3.207,11.247 4.206,10.097 6.345,9.585 C7.175,9.386 7.306,9.232 7.342,8.404 C7.435,6.271 8.408,5.098 9.207,4.489 C10.014,3.875 11.446,3.229 13.69,3.634 C14.491,3.777 14.704,3.679 15.113,2.978 C16.008,1.444 17.171,0.52 18.569,0.232 C19.973,-0.058 21.443,0.334 22.94,1.396 C23.595,1.861 23.89,1.864 24.595,1.413 C25.624,0.757 27.198,-0.068 28.991,0.337 C30.815,0.746 31.879,2.212 32.52,3.279 C32.906,3.922 33.032,3.977 33.745,3.822 C35.941,3.339 37.394,3.963 38.224,4.573 C39.064,5.19 40.085,6.389 40.175,8.596 C40.211,9.477 40.395,9.61 41.101,9.755 C43.442,10.236 44.963,11.88 45.272,14.266 L45.295,14.437 C45.308,14.528 45.306,14.621 45.29,14.711 L45.262,14.882 C45.256,14.917 45.254,14.948 45.251,14.977 L45.249,14.999 C45.223,15.248 45.181,15.658 44.976,16.107 C44.439,17.263 44.691,17.749 45.669,18.541 C46.787,19.447 47.406,20.671 47.4120269,21.989 C47.417,23.402 46.725,24.752 45.462,25.792 C44.637,26.469 44.566,26.75 44.987,27.671 C45.641,29.103 45.648,30.58 45.01,31.83 C44.369,33.086 43.136,33.991 41.539,34.378 C40.675,34.588 40.428,34.803 40.331,35.913 C40.185,37.621 39.531,38.91 38.391,39.744 C37.264,40.566 35.815,40.827 34.089,40.518 C33.202,40.358 32.993,40.492 32.629,41.111 C31.702,42.686 30.57,43.596 29.17,43.89 C28.871,43.953 28.561,43.985 28.253,43.985 L28.253,43.985 Z" id="Fill-4" fill="#5D5E5B"></path></g></g></g></g></g></g></g></g></svg> */}

                <h2>600+ design experts</h2>
                <p>Explore design ideas and co-create your dream home with our experienced designers</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="footer_features_content last">

                {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="72px" height="72px" viewBox="0 0 72 72" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="D1" transform="translate(-1111.000000, -5156.000000)"><g id="Group-70" transform="translate(0.000000, 5031.000000)"><g id="Group-76"><g id="Group-17"><g id="Group-72-Copy-3" transform="translate(1007.000000, 125.000000)"><g id="Rectangle-4" transform="translate(104.000000, 0.000000)"><rect id="Rectangle" x="0" y="0" width="72" height="72"></rect><g id="Post-Installation-Service-icon-(1)" transform="translate(12.000000, 12.000000)" fill-rule="nonzero"><path d="M23.704,48.053 C17.614,48.053 12.643,46.24 8.082,42.362 C7.312,41.707 4.832,39.12 4.727,39.01 C4.393,38.662 4.405,38.109 4.754,37.775 C5.102,37.441 5.655,37.453 5.989,37.802 C6.688,38.532 8.631,40.536 9.214,41.032 C13.57,44.737 18.129,46.368 23.992,46.305 C29.961,46.246 35.503,43.96 39.596,39.867 C43.838,35.625 46.168,30.044 46.156,24.152 C46.15,21.109 45.462,17.998 44.166,15.156 C43.966,14.717 44.159,14.199 44.598,13.999 C45.037,13.799 45.555,13.993 45.755,14.431 C47.153,17.498 47.896,20.858 47.9030502,24.148 C47.916,30.508 45.405,36.529 40.832,41.102 C36.414,45.52 30.44,47.988 24.01,48.051 C23.907,48.053 23.805,48.053 23.704,48.053 Z" id="Path" fill="#646564"></path><path d="M3.041,34.382 C2.709,34.382 2.392,34.192 2.246,33.871 C0.848,30.804 0.105,27.444 0.0979497742,24.154 C0.085,17.794 2.596,11.773 7.169,7.2 C11.587,2.782 17.561,0.314 23.991,0.251 C30.222,0.192 35.281,1.998 39.917,5.94 C40.687,6.595 43.166,9.183 43.272,9.292 C43.606,9.64 43.594,10.193 43.245,10.527 C42.897,10.861 42.344,10.849 42.01,10.5 C41.311,9.77 39.368,7.766 38.785,7.27 C34.429,3.565 29.873,1.942 24.007,1.997 C18.038,2.056 12.496,4.342 8.403,8.435 C4.161,12.677 1.831,18.258 1.843,24.15 C1.849,27.193 2.537,30.304 3.833,33.146 C4.033,33.585 3.839,34.103 3.401,34.303 C3.286,34.356 3.162,34.382 3.041,34.382 Z" id="Path" fill="#646564"></path><path d="M42.642,10.77 L36.063,10.77 C35.581,10.77 35.19,10.379 35.19,9.897 C35.19,9.415 35.581,9.024 36.063,9.024 L41.769,9.024 L41.769,3.318 C41.769,2.836 42.16,2.445 42.642,2.445 C43.124,2.445 43.515,2.836 43.515,3.318 L43.515,9.897 C43.515,10.379 43.124,10.77 42.642,10.77 Z" id="Path" fill="#E61E27"></path><path d="M33.869,34.894 C33.646,34.894 33.422,34.809 33.252,34.638 L32.155,33.541 C31.814,33.2 31.814,32.647 32.155,32.306 C32.496,31.965 33.049,31.965 33.39,32.306 L34.487,33.403 C34.828,33.744 34.828,34.297 34.487,34.638 C34.316,34.809 34.093,34.894 33.869,34.894 Z" id="Path" fill="#646564"></path><path d="M33.36,39.417 C32.336,39.417 31.424,39.059 30.743,38.377 L18.379,26.014 C18.319,25.954 18.223,25.955 18.185,25.958 C15.524,26.167 12.921,25.209 11.043,23.33 C8.84,21.127 7.927,17.991 8.599,14.941 C8.752,14.245 9.276,13.687 9.965,13.486 C10.661,13.283 11.41,13.474 11.921,13.984 L15.768,17.831 C15.855,17.918 15.997,17.918 16.084,17.831 L18.41,15.505 C18.464,15.451 18.476,15.389 18.476,15.347 C18.476,15.305 18.465,15.243 18.411,15.189 L14.564,11.342 C14.053,10.831 13.863,10.082 14.066,9.386 C14.267,8.697 14.825,8.174 15.522,8.02 C18.572,7.348 21.708,8.261 23.911,10.464 C26.131,12.684 27.042,15.842 26.347,18.911 C26.339,18.948 26.318,19.074 26.395,19.151 L38.181,30.94 C39.859,32.618 39.542,35.466 37.444,37.564 C36.466,38.542 35.264,39.181 34.06,39.363 C33.822,39.4 33.588,39.417 33.36,39.417 Z M18.213,24.211 C18.745,24.211 19.248,24.414 19.614,24.78 L31.978,37.144 C32.409,37.575 33.056,37.75 33.799,37.638 C34.637,37.511 35.493,37.047 36.209,36.331 C37.58,34.96 37.904,33.135 36.946,32.176 L25.157,20.387 C24.678,19.908 24.485,19.213 24.641,18.526 C25.203,16.045 24.467,13.493 22.673,11.7 C20.894,9.921 18.36,9.183 15.895,9.726 C15.797,9.748 15.756,9.819 15.74,9.876 C15.725,9.926 15.713,10.024 15.797,10.107 L19.644,13.954 C20.016,14.326 20.221,14.821 20.221,15.347 C20.221,15.873 20.016,16.368 19.644,16.74 L17.318,19.066 C16.55,19.834 15.3,19.834 14.532,19.066 L10.685,15.219 L10.685,15.219 C10.601,15.135 10.504,15.147 10.454,15.162 C10.398,15.178 10.326,15.219 10.304,15.317 C9.761,17.782 10.498,20.316 12.277,22.095 C13.794,23.612 15.897,24.384 18.048,24.216 C18.103,24.213 18.158,24.211 18.213,24.211 Z" id="Shape" fill="#646564"></path><path d="M5.358,45.86 C4.876,45.86 4.485,45.469 4.485,44.987 L4.485,38.407 C4.485,37.925 4.876,37.534 5.358,37.534 L11.937,37.534 C12.419,37.534 12.81,37.925 12.81,38.407 C12.81,38.889 12.419,39.28 11.937,39.28 L6.231,39.28 L6.231,44.986 C6.231,45.469 5.84,45.86 5.358,45.86 Z" id="Path" fill="#E61E27"></path></g></g></g></g></g></g></g></g></svg> */}
                <h2>Post-installation service</h2>
                <p>Complete your design journey and get unwavering support from our dedicated care team.</p>
              </div>
            </div>
            <div class="col-12 mt-5 pt-2">
              <div class="text-center">
                <button type="button" className="btn-calc" onClick={openModal}>
                  Book 3D Design Session <span>Free</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="RegiSterCallToacTion">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="interior-CallTo">
                <div class="icon">
                  <img src="https://townmanor.in/templates/selio/assets/selfImages/interior_DC.png" />
                </div>
                <div class="CallTo_title">
                  <h4>Are you a interior designer?</h4>
                  <a href="https://townmanor.in/en/196/interior_register" class="RegisTer_NoW_BTN">Register Now <i class="la la-sign-in"></i></a>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="interior-CallTo">
                <div class="icon">
                  <img src="https://townmanor.in/templates/selio/assets/selfImages/interior_DC.png" />
                </div>
                <div class="CallTo_title">
                  <h4>Are you a interior Contractor?</h4>
                  <a href="https://townmanor.in/en/196/interior_register" class="RegisTer_NoW_BTN">Register Now <i class="la la-sign-in"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeLane