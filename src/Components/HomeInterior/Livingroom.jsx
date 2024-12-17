import React, { useState } from 'react';
import "./HomeLane.css"
function Livingroom() {
    const [activeIndex, setActiveIndex] = useState(null);
    const services = [
        { link: "/homelane/kitchen", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/modular-kitchen.png", title: "Modular Kitchen" },
        { link: "homelane/warddrobe", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/wardrobes.png", title: "Wardrobes" },
        { link: "homelane/masterbedroom", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/master-bedroom.png", title: "Master Bedroom" },
        { link: "/homelane/tv", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/tv-unit.png", title: "TV Unit" },
        { link: "/homelane/livingroom", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/living-room.png", title: "Living Room" },
        { link: "/homelane/falseceiling", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/false-ceiling.png", title: "False Ceiling" },
        { link: "/homelane/bathroom", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/bathroom.png", title: "Bathroom" },
        { link: "/homelane/kids", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/kids-room.png", title: "Kids Room" },
        { link: "/homelane/fullhouseinterior", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/full-house-interiors.png", title: "Full House Interiors" },
        { link: "/homelane/commercialinterior", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/commercial-interiors.png", title: "Commercial Interiors" },
        { link: "/homelane/officeinterior", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/office-interior.png", title: "Office Interior" },
        { link: "/homelane/bedroom", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/bedroom.png", title: "Bedroom" },
        { link: "/homelane/furniture", imgSrc: "https://townmanor.in/templates/selio/assets/selfImages/homeInteriorCategory/Furniture_logo.png", title: "Furniture" },
    ];
    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const productData = [
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724136209.jpg',
            title: 'Grey Matters Contemporary Living Room Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724136594.jpg',
            title: 'Contemporary Asian Inspired Living Room With Modern Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724136678.jpg',
            title: 'Brilliantly White Living Room Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724137183.jpg',
            title: 'Urban Sunshine Living Room Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724137792.jpg',
            title: 'Chic And Cozy: A Contemporary Living Room With Stylish Accents',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724137913.jpg',
            title: 'Chic Contrast Open-Plan Living Room Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724138015.jpg',
            title: 'Mediterranean Escape Living Room Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724138161.jpg',
            title: 'It\'s All About Grey Matter Living Room',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724138948.jpg',
            title: 'Curvaceously Yours Living Room Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724660643.png',
            title: 'Wood And Bricks Contemporary Living Room Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724660689.png',
            title: 'Moody Browns Contemporary Studio Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724660726.png',
            title: 'Confetti And Sunshine Unisex Kids’ Room Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724660767.png',
            title: 'Neutral Wonder Modern Living Room Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724660848.png',
            title: 'Contemporary And Bright Living Room Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724660915.png',
            title: 'Perfect Flaws Rustic Living Room Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724661099.png',
            title: 'Fabulously White Contemporary Studio Design',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724661120.png',
            title: 'It\'s All About Grey Matter Living Room',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724661152.png',
            title: 'The Grand Millennial Style Living Room',
        },
        {
            imageSrc: 'https://townmanor.in/files/customImage/Gallery_1724661199.png',
            title: 'A Tinge Of Earth Living Room',
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
            question: "Can I visit a HomeLane showroom to see your products and designs in person?",
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
    return (
        <>
            <div className='maincontainer'>
                <div className="header-address d-none">
                    {services.map((service, index) => (
                        <a href={service.link} key={index}>
                            <img
                                src={service.imgSrc}
                                alt={service.title}
                                height="100px"
                                width="100px"
                            />
                            <span>
                                <h3>{service.title}</h3>
                            </span>
                        </a>
                    ))}
                </div>

                <div class="DesignCategory_widgetHeading">
            <h2>Living Room</h2>
                <p></p>
            <p>A living room is a central space in a home designed for relaxation, socializing, and entertainment. It often features comfortable seating like sofas and chairs, a coffee table, and entertainment options such as a TV or audio system. The living room is typically the main gathering area for family and guests, and its decor is usually styled to reflect the household's taste, creating a welcoming and cozy atmosphere. It may also include additional elements like bookshelves, artwork, and lighting fixtures to enhance the ambiance.</p>
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
                               <button class="BFC_bTN" data-toggle="modal" data-target="#exampleModal">Book Free
                                   Consultation</button>
                           </div>
                       </div>
                   </div>
                    ))}
                </div>
                <div className="faq-section padd_bottom_85" id="faqs1" style={{
                    background:'transparent'
                }}>
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
                                            {/* Format the answer with <br /> */}
                                            {formatAnswer(faq.answer)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default Livingroom;
