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
      title: "Luxury Villas",
      thumbnail_url: "./TMb1.webp",
    },
    {
      url: "/category/2",
      title: "Modern Apartments",
      thumbnail_url: "./TMb2.webp",
    },
    {
      url: "/category/3",
      title: "Cozy Cottages",
      thumbnail_url: "./TMb3.webp",
    },
  ];

  const defaultImages = [
    "./TMb1.webp",
    "./TMb2.webp",
    "./TMb2.webp",
  ];

  return (
    <section className="intro section-padding section-categories-presentation widget_edit_enabled">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 p-0">
            <div className="intro-content bg-black">
              <div className="AddOff_c">
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
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-fluid"
                    src="./TMb1.webp"
                    alt="View for rent"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-fluid"
                    src="./TMb2.webp"
                    alt="View for rent"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-fluid"
                    src="./TMb3.webp"
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
