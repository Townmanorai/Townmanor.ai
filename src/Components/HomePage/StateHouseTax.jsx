import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "./StateHouseTax.css"; // Import your custom CSS

const StateHouseTax = () => {
    const dummyStatesData = [
        { image_url: './Seal_of_Uttar_Pradesh.png', state_name: 'Uttar Pradesh'},
        { image_url: './Seal_of_the_National_Capital_Territory_of_Delhi.png', state_name: 'Delhi'},
        { image_url: './Madhya_Pradesh_Flag.png', state_name: 'Madhya Pradesh'},
        { image_url: './Haryana_Flag(INDIA).png', state_name: 'Haryana'},
        { image_url: './Seal_of_Punjab.png', state_name: 'Punjab' },
        { image_url: './Seal_of_Uttarakhand.png', state_name: 'Uttarakhand' },
        { image_url: './Himachal_Pradesh_seal.png', state_name: 'Himachal Pradesh' },
        { image_url: './Emblem_of_Chandigarh.png', state_name: 'Chandigarh' },
        { image_url: './Seal_of_Ladakh.png', state_name: 'Ladakh' },
        { image_url: './Government_of_Jammu_and_Kashmir.png', state_name: 'Jammu & Kashmir'},
        { image_url: './Seal_of_Uttarakhand.png', state_name: 'Bihar' },
        { image_url: './Himachal_Pradesh_seal.png', state_name: 'Jharkhand'},
        { image_url: './Emblem_of_Chandigarh.png', state_name: 'Rajasthan' },
        { image_url: './Seal_of_Uttarakhand.png', state_name: 'Odisha' },
        { image_url: './Seal_of_Maharashtra.png', state_name: 'Maharashtra' },
        { image_url: './Government_Of_Gujarat_Seal.png', state_name: 'Gujarat'},   
      ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of cards visible per row
    slidesToScroll: 1,
    rows: 2, // Creates 2 rows
    slidesPerRow: 1, // Only show 1 slide per row, which will be duplicated in multiple rows
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          rows: 2, // Retain two rows on medium screens
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // For smaller screens show only 1 card per row
          rows: 2,
          slidesPerRow: 1,
        },
      },
    ],
  };  

  return (

    
    <section className="state-house-tax-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="state-house-tax-heading">
              <span>Popular States</span>
              <h3>Pay Your House Tax </h3>
            </div>
          </div>
        </div>

        <Slider {...settings}>
          {dummyStatesData.map((item, index) => (
           <div key={index} className="state-house-tax-card">
           <Link to={`/state/${item.state_name}`}>
               <div className="card-body">
                   <div className="state-image">
                       <img src={item.image_url} alt={item.state_name} />
                   </div>
                   <div className="state-details">
                       <h4>{item.state_name}</h4>
                   </div>
               </div>
           </Link>
       </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default StateHouseTax;