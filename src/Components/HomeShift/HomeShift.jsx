import React, { useState } from 'react'
import './HomeShift.css'
function HomeShift() {
    const [activeIndex, setActiveIndex] = useState(null);
    // const [floatbtn,setfloatbtn]
    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const formatAnswer = (answer) => {
        return answer.split('\n').map((item, index) => {
            return (
                <span key={index}>
                    {item}
                    {index !== answer.split('\n').length - 1 && <br />}
                </span>
            );
        });
    };
    const [isMinimized, setIsMinimized] = useState(false); // State to handle minimize/maximize




    const faqs = [
        {
            question: "What is Townmanor?",
            answer:
                `Townmanor is an aggregator platform that partners with trusted logistics providers like Porter and Blowhorn to offer seamless home shifting services. We make moving easier by connecting you with the best service providers in the industry.`,
        },
        {
            question: "What types of vehicles can I choose for my home shifting",
            answer:
                `Townmanor offers a wide variety of vehicles through Porter and Blowhorn, including two-wheelers, mini-trucks, larger trucks, and packers & movers for all your home shifting needs.`,
        },
        {
            question: "How does the pricing work?",
            answer:
                `Pricing is based on the vehicle type, distance, and any additional services like labor or packaging. You can find detailed pricing information for each vehicle option on our partners' websites.`,
        },
        {
            question: "Do I have to deal directly with Porter or Blowhorn",
            answer:
                `Yes,But Townmanor handles all the coordination with our partners, making your home shifting process simple and hassle-free.`,
        },
        {
            question: "Are there any hidden charges?",
            answer:
                `There are no hidden charges. All pricing is transparent, and any additional charges (such as parking fees or road tax) will be clearly communicated before booking.`,
        },
        {
            question: "How can I book my home shifting service?",
            answer:
                `You can easily book your service by filling out the form below, and our team will help you schedule a time with the appropriate logistics provider based on your needs.`,
        },
        {
            question: "Can I cancel or reschedule my booking?",
            answer:
                `YYes, cancellations and rescheduling are possible. Please refer to the terms and conditions for cancellation policies or contact our support team for assistance.`,
        },
    ];
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        pickup_location: '',
        drop_location: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the request payload (form data)
       
        console.log(formData)
        // Send the data to the server using fetch or axios
        // fetch('https://townmanor.in/customform/homeInteriorsNew', {
        //     method: 'POST',
        //     body: formPayload
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     // Handle the server response (optional)
        //     console.log('Form submitted successfully', data);
        // })
        // .catch((error) => {
        //     // Handle errors (optional)
        //     console.error('Error submitting form', error);
        // });
    };
    return (
        <>

            <div class="shiftbox homeshift" style={{
                    fontFamily: 'Poppins, Helvetica, Arial, Lucida, sans-serif !important'
            }}>
                <div class="partners-card home-shift-top-bar"
                    style={{
                        backgroundColor: '#ff000000',
                        height: '210px',
                        marginTop: '30px',
                        borderRadius: '10px',
                        padding: '20px',
                        color: 'white'
                    }}
                >
                    
                    <div class="partner-content">
                        <p class="ProductBanner_Heading">Effortless Relocation with Our <span class="bold-loan">home shifting service!</span></p>
                        {/* <p>We provide home shift services through trusted partners like Porter and Blowhorn. Below are the details of their services:</p>  */}
                        <div class="floating-form-footer" style={{
                            marginTop: '20px',
                        }} >
                            <span class="service-dot"></span>
                            <span class="service-text">Hassle-free goods</span>
                            <span class="service-dot"></span>
                            <span class="service-text">Doorstep Pickup &amp; Delivery</span>
                        </div>
                        <div class="home-shift-partner-logo">
                            <img src="https://dom-website-prod-cdn-web.porter.in/public/images/common/10-year-logo.svg" alt="Porter Logo" />
                            <img src="https://blowhorn.com/_nuxt/img/7c6c684.png" alt="Blowhorn Logo" />
                            <img src="https://www.agarwalpackers.com/packersandmovers/images/1logo-right.png" alt="agarwalpackers Logo" />
                            <img src="https://nmpnoidamovers.com/static/media/logo.a739d2c52dfa7c8d6a3d.webp" alt="nmpnoidamovers Logo" />
                        </div>
                    </div>
                    <img src="https://townmanor.in/templates/selio/assets/selfImages/home-shift-logo.jpg" class="home-shift-logo-img" alt="home-shift-logo" />
                </div>

                <div class="partner-card" style={{
                    backgroundColor: '#f8f8f8',
                    padding: '25px',
                    borderRadius: '10px',
                    marginTop: '30px',
                }}>
                    <h2 class="steps-heading">thinking of moving? follow these easy steps:</h2>
                    <div class="steps-container">
                        <div class="service-step">
                            <h3>1. Request a Quote</h3>
                            <p>Start by filling out the simple form with your details, including pickup and drop locations, and your preferred service. You can do this directly on the Townmanor platform.</p>
                        </div>
                        <div class="service-step">
                            <h3>2. Choose Your Service</h3>
                            <p>Based on your requirements, you can choose from a variety of vehicles including two-wheelers, mini-trucks, or larger trucks. Our platform helps you select the best service option based on your needs.</p>
                        </div>
                    </div>

                    <div class="steps-container">
                        <div class="service-step">
                            <h3>3. Confirm the Schedule</h3>
                            <p>Once you choose the vehicle and service, our team will confirm the schedule and provide a clear timeline for pickup and delivery.</p>
                        </div>
                        <div class="service-step">
                            <h3>4. Enjoy a Smooth Move</h3>
                            <p>Our partners will handle the rest, ensuring your belongings are safely transported to your new home. All you need to do is relax and enjoy the process!</p>
                        </div>
                    </div>
                </div>



                <div class="partners-card">
                    <img src="https://dom-website-prod-cdn-web.porter.in/public/images/common/10-year-logo.svg" alt="Porter Logo" />
                    <div class="partner-content">
                        <h2 class="partner-title">Porter</h2>
                        <p>Porter offers a range of logistics services including:</p>
                        <div class="services-container">
                            <a class="service-card" href="https://porter.in/bike-parcel-delivery-bangalore" target="_blank">
                                <img src="https://dom-website-prod-cdn-cms.porter.in/2_wheelers_274869b2af_7262e4dde4.webp" alt="Two Wheelers Icon" />
                                <div class="service-text">Two Wheelers</div>
                            </a>
                            <a class="service-card" href="https://porter.in/rent-mini-trucks-in-bangalore" target="_blank">
                                <img src="https://dom-website-prod-cdn-cms.porter.in/trucks_293a94a860_cc4b2d6d06.webp" alt="Trucks Icon" />
                                <div class="service-text">Trucks</div>
                            </a>
                            <a class="service-card" href="https://porter.in/packers-and-movers/bangalore" target="_blank">
                                <img src="https://dom-website-prod-cdn-cms.porter.in/Pn_M_56aa8e7af2_4b05aeef37.webp" alt="Packers &amp; Movers Icon" />
                                <div class="service-text">Packers &amp; Movers</div>
                            </a>
                            <a class="service-card" href="https://porter.in/courier/bangalore" target="_blank">
                                <img src="https://dom-website-prod-cdn-cms.porter.in/all_india_courier_service_3b0f4df07f.webp" alt="All India Parcel Icon" />
                                <div class="service-text">All India Parcel</div>
                            </a>
                        </div>
                        <a href="https://porter.in" target="_blank" class="btn-visit">Get an estimate</a>
                    </div>
                </div>


                <section id="porter-service" class="service-section">
                    <h2 class="service-heading">Porter Services</h2>
                    <div class="vehicle-fleet">
                        <div class="vehicle-card">
                            <img src="https://dom-website-prod-cdn-cms.porter.in/2_wheeler_5624a12e03.svg" alt="Two Wheeler" class="vehicle-image" />
                            <div class="vehicle-info">
                                <h3>2 Wheeler</h3>
                                <p>Capacity: <strong>20 kg</strong></p>
                                <p>Starting from: <strong>?60</strong></p>
                                <p class="fare-details">Base fare includes 1 km &amp; 25 minutes. Additional charges may apply for parking and road tax.</p>
                                <a href="#" class="know-more">Know more</a>
                            </div>
                        </div>

                        <div class="vehicle-card">
                            <img src="https://dom-website-prod-cdn-cms.porter.in/3_wheeler_update_68e76971bd.svg" alt="Three Wheeler" class="vehicle-image" />
                            <div class="vehicle-info">
                                <h3>3 Wheeler</h3>
                                <p>Capacity: <strong>500 kg</strong></p>
                                <p>Starting from: <strong>?250</strong></p>
                                <a href="#" class="know-more">Know more</a>
                            </div>
                        </div>

                        <div class="vehicle-card">
                            <img src="https://dom-website-prod-cdn-cms.porter.in/tata_ace_2deb9441fd.svg" alt="Tata Ace" class="vehicle-image" />
                            <div class="vehicle-info">
                                <h3>Tata Ace</h3>
                                <p>Capacity: <strong>750 kg</strong></p>
                                <p>Starting from: <strong>?350</strong></p>
                                <a href="#" class="know-more">Know more</a>
                            </div>
                        </div>

                        <div class="vehicle-card">
                            <img src="https://dom-website-prod-cdn-cms.porter.in/eeco_7da0997b6b.svg" alt="Eeco" class="vehicle-image" />
                            <div class="vehicle-info">
                                <h3>Eeco</h3>
                                <p>Capacity: <strong>500 kg</strong></p>
                                <p>Starting from: <strong>?300</strong></p>
                                <a href="#" class="know-more">Know more</a>
                            </div>
                        </div>

                        <div class="vehicle-card">
                            <img src="https://dom-website-prod-cdn-cms.porter.in/8ft_3f900fa091.svg" alt="Pickup 8ft" class="vehicle-image" />
                            <div class="vehicle-info">
                                <h3>Pickup 8ft</h3>
                                <p>Capacity: <strong>1250 kg</strong></p>
                                <p>Starting from: <strong>?550</strong></p>
                                <a href="#" class="know-more">Know more</a>
                            </div>
                        </div>

                        <div class="vehicle-card">
                            <img src="https://dom-website-prod-cdn-cms.porter.in/14ft_3cc472f6ff.svg" alt="Canter 14ft" class="vehicle-image" />
                            <div class="vehicle-info">
                                <h3>Canter 14ft</h3>
                                <p>Capacity: <strong>3500 kg</strong></p>
                                <p>Starting from: <strong>?1120</strong></p>
                                <a href="#" class="know-more">Know more</a>
                            </div>
                        </div>
                    </div>
                </section>


                <div class="partners-card">
                    <div class="partner-content">
                        <h2 class="partner-title">Blowhorn</h2>
                        <p>Blowhorn provides efficient logistics solutions with a wide variety of vehicle options for home shifts and more. <span>B to B Services</span></p>
                        <a href="https://blowhorn.com/" target="_blank" class="btn-visit">Visit Blowhorn</a>

                    </div>

                    <img src="https://blowhorn.com/_nuxt/img/7c6c684.png" alt="Blowhorn Logo" style={{
                        width: '150px'
                    }} />
                </div>

                <div class="faq-section">
                    <h2 class="service-heading">Frequently Asked Questions</h2>
                    {/* <div class="faq-question">What is Townmanor?</div>
        <div class="faq-answer">Townmanor is an aggregator platform that partners with trusted logistics providers like Porter and Blowhorn to offer seamless home shifting services. We make moving easier by connecting you with the best service providers in the industry.</div>

        <div class="faq-question">What types of vehicles can I choose for my home shifting?</div>
        <div class="faq-answer">Townmanor offers a wide variety of vehicles through Porter and Blowhorn, including two-wheelers, mini-trucks, larger trucks, and packers &amp; movers for all your home shifting needs.</div>

        <div class="faq-question">How does the pricing work?</div>
        <div class="faq-answer">Pricing is based on the vehicle type, distance, and any additional services like labor or packaging. You can find detailed pricing information for each vehicle option on our partners' websites.</div>

        <div class="faq-question">Do I have to deal directly with Porter or Blowhorn?</div>
        <div class="faq-answer">Yes,But Townmanor handles all the coordination with our partners, making your home shifting process simple and hassle-free. </div>

        <div class="faq-question">Are there any hidden charges?</div>
        <div class="faq-answer">There are no hidden charges. All pricing is transparent, and any additional charges (such as parking fees or road tax) will be clearly communicated before booking.</div>

        <div class="faq-question">How can I book my home shifting service?</div>
        <div class="faq-answer">You can easily book your service by filling out the form below, and our team will help you schedule a time with the appropriate logistics provider based on your needs.</div>

        <div class="faq-question">Can I cancel or reschedule my booking?</div>
        <div class="faq-answer">Yes, cancellations and rescheduling are possible. Please refer to the terms and conditions for cancellation policies or contact our support team for assistance.</div> */}
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
                                            {/* Format the answer with <br /> */}
                                            {formatAnswer(faq.answer)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>




                {/* Form Section */}
                <form onSubmit={handleSubmit} acceptCharset="utf-8" className="LeadPopup_popUpWindow pt-4 px-3" autoComplete="nope">
            <div id="floatingForm" className={`floating-form ${isMinimized ? 'hidden' : ''}`}>
                <button type="button" id="closeButton" className="close-btn" onClick={() => setIsMinimized(true)}>×</button>
                <div id="formContent">
                    <h3>Get Home Shift Services Now!</h3>
                    <div className="form_item">
                        <input
                            type="text"
                            name="name"
                            className="formInput"
                            autoComplete="nope"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="name" className="font12 fontMedium formLabel">Full Name *</label>
                    </div>

                    <div className="form_item">
                        <input
                            type="tel"
                            name="phone"
                            className="formInput"
                            autoComplete="nope"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="phone" className="font12 fontMedium formLabel">Phone Number *</label>
                    </div>

                    <div className="form_item">
                        <input
                            type="text"
                            name="pickup_location"
                            className="formInput"
                            autoComplete="nope"
                            value={formData.pickup_location}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="pickup-location" className="font12 fontMedium formLabel">Pickup Location *</label>
                    </div>

                    <div className="form_item">
                        <input
                            type="text"
                            name="drop_location"
                            className="formInput"
                            autoComplete="nope"
                            value={formData.drop_location}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="drop-location" className="font12 fontMedium formLabel">Drop Location *</label>
                    </div>

                    <div className="LeadPopup_rangecalc">
                        <button type="submit" className="btn-calc">Submit Form</button>
                    </div>

                    <div className="mt-4">
                        <p>By submitting this form, you agree to our <a href="https://townmanor.in/en/181/privacy_policy">privacy policy</a> and <a href="https://townmanor.in/en/195/terms_and_condition">terms of use</a>, granting us permission to use your personal information as specified in the privacy policy.</p>
                    </div>
                </div>
            </div>

            {/* Minimized form button */}
            {isMinimized && (
                <div id="minimizedForm" className="minimized-form" onClick={() => setIsMinimized(false)}>
                    <span>Click to maximize</span>
                </div>
            )}
        </form>
            </div >
        </>
    )
}

export default HomeShift