import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CategoriesPresentation.css"
import "../common.css";
import "../commonsecond.css";

const CategoriesPresentation = () => {
  const treefields = [
    {
      url: "/category/1",
      title: "Godrej riverine",
      thumbnail_url: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1745908302433-Golf-View-Luxury-popup.jpg",
    },
    {
      url: "/category/2",
      title: "Modern Apartments",
      thumbnail_url: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742283470662-TMb2.webp",
    },
    {
      url: "/category/3",
      title: "Cozy Cottages",
      thumbnail_url: "https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742283470675-TMb3.webp",
    },
  ];

  const defaultImages = [
    "./TMb1.webp",
    "./TMb2.webp",
    "./TMb2.webp",
  ];
  const handleNavigate = (url) => {
    window.location.href = url;  // Will navigate directly to the given URL
};
  return (
    <section className="intro section-padding section-categories-presentation widget_edit_enabled" >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 p-0">
            <div className="intro-content bg-black">
              <div className="AddOff_c" style={{margin: "auto"}}>
                {/* <span className="title-sub-top">Address of</span> */}
                {/* <h3>Limitless Luxury at Townmanor</h3> */}

                <div class="project-spotlight-container">
 					   <h2 class="project-spotlight project-spotlight-projects">PROJECTS</h2>
    					<h2 class="project-spotlight project-spotlight-on">ON</h2>
   						 <h2 class="project-spotlight project-spotlight-spotlight">SPOTLIGHT</h2>
					</div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 p-0">
            <div className="intro-img">
              {/* React Bootstrap Carousel */}
              <Carousel className="HomeInT_Slider_page">
                <Carousel.Item onClick={()=>{
                  handleNavigate('https://www.godrejproperties.com/noida/residential/godrej-riverine');
                }}
                style={{
                  cursor:'pointer'
                }}
                >
                  <img
                    className="d-block w-100 img-fluid fluidx"
                    src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1745908302433-Golf-View-Luxury-popup.jpg"
                    alt="View for rent"
                  />
                </Carousel.Item>
                <Carousel.Item
                onClick={()=>{
                  handleNavigate('https://www.sobhagroup.co/');
                }}
                style={{
                  cursor:'pointer'
                }}
                >
                  <img
                    className="d-block w-100 img-fluid fluidx"
                    src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1745908302431-banner1.jpg"
                    alt="View for rent"
                  />
                </Carousel.Item>
                <Carousel.Item
                 onClick={()=>{
                  handleNavigate('https://www.bhutanigroup.com/citycenter32/');
                }}
                style={{
                  cursor:'pointer'
                }}
                >
                  <img
                    className="d-block w-100 img-fluid fluidx"
                    src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1745908302427-20241112134035_bhutani-cc-32-images-11.jpg"
                    alt="View for rent"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>

        <div className="intro-thumb-row">
          {treefields.length > 0 ? (
            treefields.map((item, index) => (
              <a
                href={item.url}
                className="intro-thumb"
                title={item.title}
                key={index}
              >
                <img
                  src={item.thumbnail_url || defaultImages[index]}
                  alt={item.title}
                />
                <h6>{item.title}</h6>
              </a>
            ))
          ) : (
            <p className="alert alert-info">
              Any categories are missing, please check Categories list.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoriesPresentation;
