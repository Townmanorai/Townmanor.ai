import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Carousel from 'react-bootstrap/Carousel';
import { FaLocationDot } from "react-icons/fa6"; // Importing Carousel from react-bootstrap
import { FaHeart } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { MdPeople } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import "../../common.css";
import "../../commonsecond.css";
import "./ResultsItem1.css";

const ResultsItem1 = ({item}) => {

    const slideshowImages = item.image_repository ? 
    JSON.parse(item.image_repository.replace(/&quot;/g, '"')).map(img => `https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${img}`) : [];
    console.log(item)
  return (
    <>
      <div className='search-card-body'>

        <div className="col-md-6 cm6">
          
          <div className='card search-page'>
            <Link to={`/home/${item.id}`} title={item.option_10}>
              <div className={`img-block ${item.option_1 ? 'video-block' : ''}`}>
                <span className="verifiedBadge">Verified</span>
                <div className="overlay"></div>
                {item.is_featured && <div className="budget"><i className="fa fa-star"></i></div>}
                {item.option_38 && item.option_38 !== 'empty' && (
                  <span className={`listing_badge badge-${item.option_38.toLowerCase().replace(' ', '_')}`}>
                    <span className="lab">{item.option_38}</span>
                  </span>
                )}
                {item.option_1 ? (
                  <div dangerouslySetInnerHTML={{ __html: generateIframeMultimedia(item.option_1) }} />
                ) : slideshowImages.length > 1 ? (
                  <Carousel id={`listing_carousel_${item.id}`} className="carousel-listing" indicators={false}>
                    {slideshowImages.slice(0, 3).map((img, index) => (
                      <Carousel.Item key={index}>
                        <img src={img} alt={`Image ${index + 1} for ${item.option_10 || item.property_name}`} className="d-block w-100 img-fluid" />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <img src={slideshowImages[0]} alt={item.option_10 || item.property_name} className="img-fluid" />
                )}
                {slideshowImages.length > 1 && (
                  <>
                    <span className="carousel-control-prev" href={`#listing_carousel_${item.id}`} role="button" data-slide="prev">
                      {/* <i className="fa fa-angle-left"></i> */}
                      <FaAngleLeft/>
                    </span>
                    <span className="carousel-control-next" href={`#listing_carousel_${item.id}`} role="button" data-slide="next">
                      <FaAngleRight/>
                    </span>
                  </>
                )}
              </div>
            </Link>
          </div>
          <div>
            <div className="card-footer" style={{padding:'5px 10px'}}>
            {/* <a href="#" title={swInDateFormat(item.property_date)} className="pull-right">
                  <div>
                    <CiCalendarDate id='calendericon' />
                    {humanTimeDiff(new Date(item.property_date))}
                  </div>
                </a> */}

                <span>
                <MdPeople id='peopleicon' />
                <span className='agent-owner'>   {item.Listed_By}</span>
                </span>

                <span className="favorites-actions pull-left">
                  <a href="#" data-id={item.id} className="add-to-favorites" style={{ display: item.is_favorite ? 'none' : '' }}>
                    <FaHeart  id='hearticon' />
                  </a>
                  <a href="#" data-id={item.id} className="remove-from-favorites" style={{ display: !item.is_favorite ? 'none' : '' }}>
                    
                  </a>
                  <i className="fa fa-spinner fa-spin fa-custom-ajax-indicator"></i>
                </span>
                
      
                
              </div>
          </div>
        </div>

        <div style={{width:'100%',paddingLeft:'20px'}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div style={{width:'250px'}}>
            <h3 style={{ margin: '0px', color: 'black', fontSize: '18px', fontWeight: '500' }}>{item.option_10 || item.property_name}</h3>
            <p style={{ fontWeight: '500' }}>{item.address}</p>
            </div>
            <div>
            <h5 className='blackalpenliebe'>
                &#8377; {item.option_37 || item.price} {item.pricerange}
              </h5>

            
            </div>
          </div>

          <div className='card-info'>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <h3 style={{marginTop:'0px',fontWeight:'500',color:'black'}}>Details</h3>
              <div className='rate-info' style={{width:'auto',alignItems:'baseline',marginLeft:'10px'}}>
              {item.purpose && (
                  <span className={`rate-info purpose-${item.purpose.toLowerCase().replace(/ /g, '_')}`}>
                    {item.purpose}
                  </span>
                )}
              </div>
            </div>
            <div class="ci-ul">
              <div class="ci-li"><li>Configuration: {item.configuration || 'Not Available'}</li></div>
              <div class="ci-li">{item.area_detail && <li>{item.area_type || 'Area'}: {item.area_detail} sq.ft</li>}</div>
              <div class="ci-li"><li>Status: {item.construction_status || 'Not Available'}</li></div>
              <div class="ci-li"><li>Rera Id: {item.rera_id || 'Not Available'}</li></div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}


const swInDateFormat = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  const generateIframeMultimedia = (option) => {
    return `<iframe src="${option}" frameborder="0"></iframe>`;
  };
  
  const showPrice = (price) => {
    return `₹${price}`;
  };
  
  const humanTimeDiff = (date) => {
    const now = new Date();
    const diffInMs = now - date;
  
    // If the date is in the future, return a custom message
    if (diffInMs < 0) {
      return "in the future";
    }
  
    const diffInSec = Math.floor(diffInMs / 1000); // Difference in seconds
    const diffInMin = Math.floor(diffInSec / 60); // Difference in minutes
    const diffInHours = Math.floor(diffInMin / 60); // Difference in hours
    const diffInDays = Math.floor(diffInHours / 24); // Difference in days
    const diffInWeeks = Math.floor(diffInDays / 7); // Difference in weeks
    const diffInMonths = Math.floor(diffInDays / 30); // Approximate difference in months
    const diffInYears = Math.floor(diffInDays / 365); // Difference in years
    
    // Return a human-friendly string based on the difference
    if (diffInSec < 60) {
      return `${diffInSec} seconds ago`;
    } else if (diffInMin < 60) {
      return `${diffInMin} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} weeks ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    } else {
      return `${diffInYears} years ago`;
    }
  };

export default ResultsItem1
