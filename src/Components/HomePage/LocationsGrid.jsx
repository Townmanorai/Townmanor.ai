import React from "react";
import Slider from "react-slick";

import "./LocationGrid.css"
import "../common.css";
import "../commonsecond.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // Slick's styles
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CityGrid from "./CityGrid";
const LocationsGrid = () => {
  // Simulating the treefields data from an API call
  const treefields = [
    {
      title: "noida",
      url: "https://townmanor.in/treefield/en/88577/noida",
      childs: [
        {
          title: "noida",
          count: 15,
          url: "https://townmanor.in/treefield/en/88577/noida",
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
            url: "https://townmanor.in/treefield/en/88586/faridabad",
            thumbnail_url: "./faridabad.png",
          },
        ],
      },
      {
        title: "Gurugram",
        url: "/location/dubai",
        childs: [
          {
            title: "Gurgaon",
            count: 15,
            url: "https://townmanor.in/treefield/en/88580/gurgaon",
            thumbnail_url: "./gurgoan.jpeg",
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
            url: "https://townmanor.in/treefield/en/88585/delhi",
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
          url: "https://townmanor.in/treefield/en/88589/dubai",
          thumbnail_url: "./dubai.jpg",
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
          url: "https://townmanor.in/treefield/en/88590/doha",
          thumbnail_url: "./doha.jpeg",
        },
      ],
    },
    {
      title: "Ghaziabad",
      url: "/location/london",
      childs: [
        {
          title: "Ghaziabad",
          count: 8,
          url: "https://townmanor.in/treefield/en/88579/ghaziabad",
          thumbnail_url: "./ghaziabad.jpeg",
        },
      ],
    },
    {
      title: "Goa",
      url: "/location/london",
      childs: [
        {
          title: "Goa",
          count: 8,
          url: "https://townmanor.in/treefield/en/88616/goa",
          thumbnail_url: "./goa.jpg",
        },
      ],
    },
    {
      title: "Bengaluru",
      url: "/location/london",
      childs: [
        {
          title: "Bengaluru",
          count: 8,
          url: "https://townmanor.in/treefield/en/88615/bengaluru",
          thumbnail_url: "./bangulore.jpg",
        },
      ],
    },
    {
      title: "Ahmedabad",
      url: "/location/london",
      childs: [
        {
          title: "Ahmedabad",
          count: 8,
          url: "https://townmanor.in/treefield/en/88613/ahmedabad",
          thumbnail_url: "./Ahmedabad.jpg",
        },
      ],
    },
    {
      title: "Jaipur",
      url: "/location/london",
      childs: [
        {
          title: "Jaipur",
          count: 8,
          url: "https://townmanor.in/treefield/en/88614/jaipur",
          thumbnail_url: "./Jaipur.jpg",
        },
      ],
    },
    {
      title: "Lucknow",
      url: "/location/london",
      childs: [
        {
          title: "Lucknow",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/lucknow",
          thumbnail_url: "./lucknow.jpg",
        },
      ],
    },
    {
      title: "Chennai",
      url: "/location/london",
      childs: [
        {
          title: "Chennai",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/chennai",
          thumbnail_url: "./Chennai.jpg",
        },
      ],
    },
    {
      title: "Chandigarh",
      url: "/location/london",
      childs: [
        {
          title: "Chandigarh",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/chandigarh",
          thumbnail_url: "./chandighad2.jpg",
        },
      ],
    },
    {
      title: "Mumbai",
      url: "/location/london",
      childs: [
        {
          title: "Mumbai",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/mumbai",
          thumbnail_url: "./mummbai.jpg",
        },
      ],
    },
    {
      title: "Kolkata",
      url: "/location/london",
      childs: [
        {
          title: "Kolkata",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/kolkata",
          thumbnail_url: "./kalkata.jpg",
        },
      ],
    },
    {
      title: "Dehradun",
      url: "/location/london",
      childs: [
        {
          title: "Dehradun",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/dehradun",
          thumbnail_url: "./dehradun.jpg",
        },
      ],
    },
    {
      title: "Hyderabad",
      url: "/location/london",
      childs: [
        {
          title: "Hyderabad",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/hyderabad",
          thumbnail_url: "./Hyderabad.jpg",
        },
      ],
    },
    {
      title: "Bhopal",
      url: "/location/london",
      childs: [
        {
          title: "Bhopal",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/bhopal",
          thumbnail_url: "./Bhopal.jpg",
        },
      ],
    },
    {
      title: "Nagpur",
      url: "/location/london",
      childs: [
        {
          title: "Nagpur",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/Nagpur",
          thumbnail_url: "./Nagpur.jpg",
        },
      ],
    },
    {
      title: "Varanasi",
      url: "/location/london",
      childs: [
        {
          title: "Varanasi",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/varanasi",
          thumbnail_url: "./varanasi.jpg",
        },
      ],
    },
    {
      title: "Patna",
      url: "/location/london",
      childs: [
        {
          title: "Patna",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/patna",
          thumbnail_url: "./Patna.jpg",
        },
      ],
    },
    {
      title: "Sonipat",
      url: "/location/london",
      childs: [
        {
          title: "Sonipat",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/sonipat",
          thumbnail_url: "./Patna.jpg",
        },
      ],
    },
    {
      title: "Indore",
      url: "/location/london",
      childs: [
        {
          title: "Indore",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/indore",
          thumbnail_url: "./Indore.jpg",
        },
      ],
    },
    {
      title: "Tiravanathpuram",
      url: "/location/london",
      childs: [
        {
          title: "Tiravanathpuram",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/tiravanathpuram",
          thumbnail_url: "./thiruvananthapuram.jpg",
        },
      ],
    },
    {
      title: "Guwahati",
      url: "/location/london",
      childs: [
        {
          title: "Guwahati",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/guwahati",
          thumbnail_url: "./guwahati.jpg",
        },
      ],
    },
    {
      title: "Pune",
      url: "/location/london",
      childs: [
        {
          title: "Pune",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/pune",
          thumbnail_url: "./Pune.jpg",
        },
      ],
    },
    {
      title: "Navi Mumbai",
      url: "/location/london",
      childs: [
        {
          title: "Navi Mumbai",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/mumbai",
          thumbnail_url: "./navi mumbai.jpg",
        },
      ],
    },
  
    {
      title: "VijayWada",
      url: "/location/london",
      childs: [
        {
          title: "VijayWada",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/vijaywada",
          thumbnail_url: "./Vijayawada.jpg",
        },
      ],
    },
    {
      title: "Agra",
      url: "/location/london",
      childs: [
        {
          title: "Agra",
          count: 8,
          url: "https://townmanor.in/treefield/en/88612/agra",
          thumbnail_url: "./agra.jpg",
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
    <section className="popular-cities hp_s1 section-padding widget_edit_enabled pch">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section-heading mb-0 pb-0">
              {/* <span>Popular Cities</span> */}
              <h3>Explore <b>properties</b> cities <b>wise</b></h3>
            </div>
          </div>
        </div>
        {/* <Slider {...settings} className="popularCitiesSliderAJ mt-5">
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
                        <i ><MdOutlineKeyboardArrowRight style={{color:'#e5181c'}} /></i>
                      </div>
                    </div>
                  </a>
                </div>
              ) : null
            )
          )}
        </Slider> */}
        <CityGrid/>
      </div>
    </section>
  );
};

export default LocationsGrid;