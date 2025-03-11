import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Carousel from 'react-bootstrap/Carousel';
import { FaLocationDot } from "react-icons/fa6"; // Importing Carousel from react-bootstrap
import { FaHeart } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { MdPeople } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { MdOutlineHomeWork } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMdSquare } from "react-icons/io";
import { FaBath } from "react-icons/fa";
import { MdBalcony } from "react-icons/md";
import { MdOutlineChair } from "react-icons/md";
import { FaCompass } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";
import { MdGridView } from "react-icons/md";
import "../../common.css";
import "../../commonsecond.css";
import "./ResultsItem1.css";

const ResultsItem1 = ({item}) => {

    const slideshowImages = item.image_repository ? 
    JSON.parse(item.image_repository.replace(/&quot;/g, '"')).map(img => `https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${img}`) : [];
    
  return (
    <>
      <div className='search-card-body'>
        <div className="col-md-6 cm6">
          <div className='card search-page'>
            <Link to={`/home/${item.id}`} title={item.option_10 || item.property_name}>
              <div className={`img-block ${item.option_1 ? 'video-block' : ''}`}>
                <span className="verifiedBadge"><MdVerified style={{marginRight: '3px'}} /> Verified</span>
                <div className="overlay"></div>
                {item.is_featured && <div className="budget"><i className="fa fa-star"></i></div>}
                {item.purpose && (
                  <span className={`listing_badge badge-${item.purpose.toLowerCase().replace(' ', '_')}`}>
                    <span className="lab">{item.purpose === 'sale' ? 'For Sale' : item.purpose}</span>
                  </span>
                )}
                {item.option_1 ? (
                  <div dangerouslySetInnerHTML={{ __html: generateIframeMultimedia(item.option_1) }} />
                ) : slideshowImages.length > 1 ? (
                  <Carousel 
                    id={`listing_carousel_${item.id}`} 
                    className="carousel-listing" 
                    indicators={true}
                    prevIcon={<FaAngleLeft />}
                    nextIcon={<FaAngleRight />}
                  >
                    {slideshowImages.slice(0, 3).map((img, index) => (
                      <Carousel.Item key={index}>
                        <img src={img} alt={`Image ${index + 1} for ${item.option_10 || item.property_name}`} className="d-block w-100 img-fluid" />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <img src={slideshowImages[0] || 'https://via.placeholder.com/320x220?text=Property+Image'} alt={item.option_10 || item.property_name} className="img-fluid" />
                )}
              </div>
            </Link>
          </div>
          
          <div className="card-footer">
            <span>
              <MdPeople id='peopleicon' />
              <span className='agent-owner'>{item.Listed_By || 'Owner'}</span>
            </span>

            <span className="favorites-actions">
              <a href="#" data-id={item.id} className="add-to-favorites" style={{ display: item.is_favorite ? 'none' : '' }}>
                <FaHeart id='hearticon' />
              </a>
            </span>
          </div>
        </div>

        <div className="property-details-section">
          <div className="property-header">
            <div>
              <h3 className="property-title">{item.option_10 || item.property_name}</h3>
              <p className="property-address">
                <FaLocationDot /> {item.address || 'Location not available'}
              </p>
              
              <div className="property-meta">
                {item.bathroom && (
                  <span className="meta-item">
                    <FaBath /> {item.bathroom} {item.bathroom > 1 ? 'Baths' : 'Bath'}
                  </span>
                )}
                {item.balcony && (
                  <span className="meta-item">
                    <MdBalcony /> {item.balcony} {item.balcony > 1 ? 'Balconies' : 'Balcony'}
                  </span>
                )}
                {item.furnish_type && (
                  <span className="meta-item">
                    <MdOutlineChair /> {item.furnish_type}
                  </span>
                )}
                {item.property_facing && (
                  <span className="meta-item">
                    <FaCompass /> {item.property_facing}
                  </span>
                )}
                {item.floor_no && (
                  <span className="meta-item">
                    <MdGridView /> Floor: {item.floor_no}/{item.total_floor || '?'}
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3 className="property-price">
                <LuIndianRupee /> {item.option_37 || item.price || '??'} {item.pricerange}
              </h3>
              {item.purpose && (
                <span className={`purpose-${item.purpose.toLowerCase().replace(/ /g, '_')}`}>
                  {item.purpose === 'sale' ? 'For Sale' : item.purpose}
                </span>
              )}
            </div>
          </div>

          <div className='card-info'>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width: '100%'}}>
              <h3 className="details-title">Property Details</h3>
              {item.construction_status && (
                <span className="purpose-for_sale">
                  {item.construction_status}
                </span>
              )}
            </div>
            
            <div className="ci-ul">
              {item.configuration && (
                <div className="ci-li">
                  <li><BiBuildingHouse /> {item.configuration}</li>
                </div>
              )}
              {item.area_detail && (
                <div className="ci-li">
                  <li><IoMdSquare /> {item.area_detail} sq.ft</li>
                </div>
              )}
              {item.category && (
                <div className="ci-li">
                  <li><MdOutlineHomeWork /> {item.category}</li>
                </div>
              )}
              {item.rera_id && (
                <div className="ci-li">
                  <li><IoDocumentTextOutline /> Rera: {item.rera_id}</li>
                </div>
              )}
              {item.token_amount && (
                <div className="ci-li">
                  <li><LuIndianRupee /> Token: {item.token_amount}</li>
                </div>
              )}
              {item.residential && item.residential !== 'apartment' && (
                <div className="ci-li">
                  <li><MdOutlineHomeWork /> {item.residential}</li>
                </div>
              )}
            </div>
            
            {item.property_date && (
              <div style={{marginTop: '8px', fontSize: '12px', color: '#777'}}>
                <CiCalendarDate id='calendericon' />
                Listed {humanTimeDiff(new Date(item.property_date))}
              </div>
            )}
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

