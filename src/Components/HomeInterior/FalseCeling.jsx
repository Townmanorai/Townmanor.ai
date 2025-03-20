import React, { useState } from 'react';
import "./HomeLane.css"
import { Link} from 'react-router-dom';
import FaqComponent from '../HomePage/FaqComponent';
import BookingModal from './BookingModal';
import axios from 'axios';
function FalseCeling() {
    const [activeIndex, setActiveIndex] = useState(null);
    const services = [
        { link: "http://townmanor.ai/homelane/kitchen", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/modular-kitchen.png", title: "Modular Kitchen" },
        { link: "http://townmanor.ai/homelane/warddrobe", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/wardrobes.png", title: "Wardrobes" },
        { link: "http://townmanor.ai/homelane/masterbedroom", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/master-bedroom.png", title: "Master Bedroom" },
        { link: "http://townmanor.ai/homelane/tv", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/tv-unit.png", title: "TV Unit" },
        { link: "http://townmanor.ai/homelane/livingroom", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/living-room.png", title: "Living Room" },
        { link: "http://townmanor.ai/homelane/falseceiling", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/false-ceiling.png", title: "False Ceiling" },
        { link: "http://townmanor.ai/homelane/bathroom", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/bathroom.png", title: "Bathroom" },
        { link: "http://townmanor.ai/homelane/kids", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/kids-room.png", title: "Kids Room" },
        { link: "http://townmanor.ai/homelane/fullhouseinterior", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/full-house-interiors.png", title: "Full House Interiors" },
        { link: "http://townmanor.ai/homelane/commercialinterior", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/commercial-interiors.png", title: "Commercial Interiors" },
        { link: "http://townmanor.ai/homelane/officeinterior", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/office-interior.png", title: "Office Interior" },
        { link: "http://townmanor.ai/homelane/bedroom", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/bedroom.png", title: "Bedroom" },
        { link: "http://townmanor.ai/homelane/furniture", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/Furniture_logo.png", title: "Furniture" },
    ];
    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const productData = [
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1723632485.jpeg',
            title: 'Bright And Bohemian',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1723632522.jpeg',
            title: 'Officially Fabulous',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1723632550.jpeg',
            title: 'Moody Browns Contemporary Studio Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1723632575.jpeg',
            title: 'Almond Magic Straight',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1723632599.jpeg',
            title: 'Single Layered Modern False Ceiling Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1723632732.jpeg',
            title: 'Art Deco-styled',
        }
    ];
    
    const faqs = [
        {
            question: "How can I get started with HomeLane?",
            answer:
                `To get started with HomeLane, all you need to do is to fill up the form on our Home Page. Give us your name, email and mobile number and tell us where you’re from.`,
        },
        {
            question: "What is the timeline for completing a project with HomeLane?",
            answer:
                `HomeLane typically completes a standard home interior project in 45 days.
                \n A 45+ 10 day delivery guarantee applies if your project includes items like wallpaper, wooden flooring, painting and cleaning services.
                \n Complex projects which include loose furniture, wall art, home automation, textured paint and non-standard civil or electrical work will take longer, and the schedule will be fixed based on the scope of work that is called for.`,
        },
        {
            question: "How does the HomeLane interior design process work?",
            answer:
                `HomeLane offers a hassle-free design process with two consultation options: online or in-person at any of our Experience Centres. Here's how it works!
                \nStep 1: Consultation \n Option 1: Online Consultation 
                \n You’ll fill out a form, and get assigned a designer who will virtually interact with you at the agreed upon date and time. They will take down your requirements, understand your floor plan, and get details on your taste preferences and your budget.\n Depending on your requirements, they might show you various design possibilities over the call, or could also call you back for a second virtual meeting. You’ll be shown 3D design options along with the corresponding budget, and can move around the cabinets, and change the finishes and materials till you arrive at a HomeLane interior design that you absolutely love.
                \nOption 2: In-Person Consultation at Experience Centres \n 
                You’ll meet your HomeLane interior designer at the agreed upon time and place. The meeting will go the same way as the virtual meeting, with the added advantage of getting to explore kitchen units, wardrobes, and other elements. You will be able to see, touch and feel the various materials and finishes and can experience how the hardware works. You can choose from a wide range of styles, materials, and finishes to match your taste and budget.Here, too, you will be shown 3D views and detailed cost breakdowns, and can make changes till you arrive at a design and costing that works well for you.
                \nStep 2: Agreement
                \nYou’ll sit down with a HomeLane Sales Manager, review the terms and conditions, get completion timelines and material specifications, and finalise the deal. You will be asked to pay an advance once you are completely satisfied with every single detail. You will sign a final agreement with all the details – design, specifications, timeline, and payment schedule.
                \nStep 3: Execution 
                \nThe HomeLane interior design team will visit your site and take detailed measurements before commencing the actual construction.
                \nThe project will commence, and modular cabinets and furniture will be cut, sized and finished at the factory. You will be contacted for stage-wise payments (if agreed upon) at the appropriate time. The team will manage the project with quality checks at every step.Once the work at the factory is completed, the interior design service team will complete the installation at your home. 
                \n Step 4: Move In! Once the HomeLane interior project is complete (typically 45 days after finalising the design),you can make the final payment and move into your dream home!`,
        },
        {
            question: "Can I visit a HomeLane showroom to see your products ",
            answer:
                `Yes, absolutely! Our Experience Centres are exactly what you'd expect from a showroom – a place to see and interact with our products and designs in person.We actually call them Experience Center because they offer more than a just static Display . Come vist one to: 
                \n See and feel materials: Our Experience Centres have displays that allow you to get up close and personal with HomeLane kitchen designs, wardrobes, and other design elements. 
                \nExplore design possibilities: Meet with a HomeLane interior designer who can showcase a variety of styles and help you brainstorm ideas for your own space`,
        },
        {
            question: "What are the end-to-end services offered by HomeLane?",
            answer:
                `From the start of your home interior journey till you move in, HomeLane is with you every step of the way! We provide free consultations, budget planning, execution, and quality checks.
                \n Consultation and Design: We provide both free online consultations and in-person consultations at our Experience Centres. Talented HomeLane interior designers will work with you to understand your vision and preferences, using SpaceCraft software to create real-time 3D designs that help you to visualise exactly what you will get. 
                \n Budgeting and Material Choices: HomeLane helps you stay on track financially with cost estimates provided throughout the design process. We also display a wide variety of materials and finishes at our Experience Centres to suit your taste and budget. You’ll be able to see, touch and feel our model mockup kitchens, bathrooms, bedrooms and more, and can interact with each space to see how everything works. 
                \n Execution and Quality Checks: Once you've finalised the design and the budget, our team manages the entire project execution. This includes procurement of materials, installation by experienced professionals, and rigorous quality checks at every step to ensure everything meets our standards.
                \n With HomeLane, you’ll get the home décor services you’ve always dreamed about—on time and within your budget!`,
        },
        {
            question: "Are your designs customisable?",
            answer:
                `While we do have hundreds of stylish designs in our catalogue, you need not opt for any of them! HomeLane services and designs are completely customisable to suit your style and needs.We’ll get into the nitty gritty of your lifestyle, your tastes and your budget, and will custom design a home interior that is just perfect for you and your family!`,
        },
    ];
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
     const [isModalOpen, setIsModalOpen] = useState(false);
             
          const openModal = () => {
             setIsModalOpen(true);
           };
         
           // Close the modal
           const closeModal = () => {
             setIsModalOpen(false);
           };
    return (
        <>
           <BookingModal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  onSubmit={async (formData) => {
    try {
      const response = await axios.post(
        'https://www.townmanor.ai/api/api/home-interior',
        formData
      );
      alert("Request Sent Successfully");
    } catch (error) {
      alert(error.message);
    }
  }}
 />
            <div className='maincontainer'>
                <div className="header-address d-none">
                                {services.map((service, index) => (
                                                               <Link to={service.link} key={index}>
                                                                   <img
                                                                       src={service.imgSrc}
                                                                       alt={service.title}
                                                                       height="100px"
                                                                       width="100px"
                                                                   />
                                                                   <span>
                                                                       <h3>{service.title}</h3>
                                                                   </span>
                                                               </Link>
                                                               
                                                           ))}
                </div>

                <div class="DesignCategory_widgetHeading">
            <h2>False Ceiling</h2>
                <p></p>
            <p>A false ceiling, also known as a drop ceiling or suspended ceiling, is a secondary ceiling that hangs below the main structural ceiling. It is typically made from materials like gypsum board, plasterboard, or metal tiles, and is supported by a metal framework. False ceilings serve several purposes: they can conceal wiring, ductwork, and piping, improve acoustics by reducing noise levels, and enhance the room's aesthetics by allowing for integrated lighting fixtures like recessed lights or LED strips. Additionally, they can help with insulation, contributing to better temperature control within a space. False ceilings are commonly used in both residential and commercial interiors to create a polished, modern look while hiding structural elements.</p>
        </div>

                <div class="DesignCategory_WidgetGrid">
                    {productData.map((service, index) => (
                       <div class="ProductTile_Col" key={index}>
                       <div>
                           <figure>
                               <img src={service.imageSrc}/>
                           </figure>
                           <div class="ProductTile_tileDesc">
                               <h3 class="ProductTile_tileTxt">{service.title}</h3>
                               <button class="BFC_bTN" data-toggle="modal" data-target="#exampleModal" onClick={()=>{
                                openModal();
                               }}>Book Free
                                   Consultation</button>
                           </div>
                       </div>
                   </div>
                    ))}
                </div>
          <FaqComponent faqs={faqs}/>
        </div>
        </>
    );
}

export default FalseCeling;
