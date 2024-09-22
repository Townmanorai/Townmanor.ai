import React from "react";
import Slider from "react-slick";

import "./LocationGrid.css"
import "../common.css";
import "../commonsecond.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // Slick's styles

const LocationsGrid = () => {
  // Simulating the treefields data from an API call
  const treefields = [
    {
      title: "noida",
      url: "/location/dubai",
      childs: [
        {
          title: "noida",
          count: 15,
          url: "/location/dubai",
          thumbnail_url: "./dfb6b5128e.jpg",
        },
      ],
    },
    {
        title: "Faridabad",
        url: "/location/dubai",
        childs: [
          {
            title: "Faridabad",
            count: 15,
            url: "/location/dubai",
            thumbnail_url: "./faridabad.png",
          },
        ],
      },
      {
        title: "Gurugram",
        url: "/location/dubai",
        childs: [
          {
            title: "Gurugram",
            count: 15,
            url: "/location/dubai",
            thumbnail_url: "./delhi.jpg",
          },
        ],
      },
      {
        title: "New Delhi",
        url: "/location/dubai",
        childs: [
          {
            title: "New Delhi",
            count: 15,
            url: "/location/dubai",
            thumbnail_url: "./delhi.jpg",
          },
        ],
      },
    {
      title: "Dubai",
      url: "/location/newyork",
      childs: [
        {
          title: "Dubai",
          count: 10,
          url: "/location/manhattan",
          thumbnail_url: "./delhi.jpg",
        },
      ],
    },
    {
      title: "Doha",
      url: "/location/london",
      childs: [
        {
          title: "Doha",
          count: 8,
          url: "/location/london",
          thumbnail_url: "./delhi.jpg",
        },
      ],
    },
  ];

  const defaultImages = [
    "assets/images/cities/1.webp",
    "assets/images/cities/2.webp",
    "assets/images/cities/3.webp",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,  // Disable centering of slides
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  if (treefields.length === 0) {
    return (
      <div className="container">
        <p className="alert alert-info">
          Any location is missing, please check the Location list.
        </p>
      </div>
    );
  }

  return (
    <section className="popular-cities hp_s1 section-padding widget_edit_enabled">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section-heading mb-0 pb-0">
              <span>Popular Cities</span>
              <h3>Find Perfect Place</h3>
            </div>
          </div>
        </div>
        <Slider {...settings} className="popularCitiesSliderAJ mt-5">
          {treefields.map((item, key) =>
            item.childs.map((childsData, index) =>
              childsData.count > 0 ? (
                <div className="product-wrap" key={index}>
                  <a href={childsData.title === "Dubai" ? "/treefield/en/88589/dubai" : childsData.url}>
                    <div className="card popular_locations">
                      <div className="overlay"></div>
                      <img
                        src={childsData.thumbnail_url || defaultImages[key]}
                        alt={childsData.title}
                        className="img-fluid"
                      />
                      <div className="card-body">
                        <h4>{childsData.title}</h4>
                        <p>
                          {childsData.count === 1
                            ? `${childsData.count} Listing`
                            : `${childsData.count} Listings`}
                        </p>
                        <i className="fa fa-angle-up"></i>
                      </div>
                    </div>
                  </a>
                </div>
              ) : null
            )
          )}
        </Slider>
      </div>
    </section>
  );
};

export default LocationsGrid;