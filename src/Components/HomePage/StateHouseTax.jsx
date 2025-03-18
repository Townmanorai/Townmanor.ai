import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "./StateHouseTax.css"; // Import your custom CSS

const StateHouseTax = () => {
    const dummyStatesData = [
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742285849593-Seal_of_Uttar_Pradesh.png', state_name: 'Uttar Pradesh'},
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742285849589-Seal_of_the_National_Capital_Territory_of_Delhi.png', state_name: 'Delhi'},
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742286347730-Madhya_Pradesh_Flag.png', state_name: 'Madhya Pradesh'},
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742286347724-Haryana_Flag%28INDIA%29.png', state_name: 'Haryana'},
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742285849585-Seal_of_Punjab.png', state_name: 'Punjab' },
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742285849596-Seal_of_Uttarakhand.png', state_name: 'Uttarakhand' },
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742286546042-Himachal_Pradesh_seal.png', state_name: 'Himachal Pradesh' },
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742286347722-Emblem_of_Chandigarh.png', state_name: 'Chandigarh' },
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742285849551-Seal_of_Ladakh.png', state_name: 'Ladakh' },
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742285849531-Government_of_Jammu_and_Kashmir.png', state_name: 'Jammu & Kashmir'},
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742285849535-Seal_of_Bihar.png', state_name: 'Bihar' },
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742286347727-Jharkhand_Rajakiya_Chihna.png', state_name: 'Jharkhand'},
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742286347722-Emblem_of_Chandigarh.png', state_name: 'Rajasthan' },
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742285849596-Seal_of_Uttarakhand.png', state_name: 'Odisha' },
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742285849559-Seal_of_Maharashtra.png', state_name: 'Maharashtra' },
        { image_url: 'https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/1742285849527-Government_Of_Gujarat_Seal.png', state_name: 'Gujarat'},   
      ];
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Number of cards visible per row
    slidesToScroll: 1,
    rows: 2, // Creates 2 rows
    slidesPerRow: 1, 
    autoplay:true,
    autoplaySpeed: 1000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          rows: 2, 
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, 
          rows: 2,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3, 
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
              {/* <span>Popular States</span> */}
              <h3>Explore properties & other services state wise </h3>
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
                       <span>{item.state_name}</span>
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
