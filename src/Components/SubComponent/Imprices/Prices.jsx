
import React, { useState } from "react";
import "./Prices.css";
import { IoLocationSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
function Prices({ property }) {
  // Convert image_repository string into an array if it's a string
  
  let imageRepositoryArray = property.image_repository;
  if (typeof imageRepositoryArray === 'string') {
    imageRepositoryArray = imageRepositoryArray.split(',').map(image => image.trim());
  }
  const [mainimage,setmainimage]=useState(imageRepositoryArray[1]);
  const cleanImageUrl = (url) => {
    if (typeof url !== 'string') {
      return '';  // Return an empty string if URL is not a valid string
    }
    return url
      .replace(/^[^a-zA-Z0-9]+/, '')  // Remove non-alphanumeric characters from the start
      .replace(/[^a-zA-Z0-9]+$/, '');  // Remove non-alphanumeric characters from the end
  };
  return (
    <div >
      <div className="im-price" >
        <div className="subprice1">
          <p className="price-detail">{property.configuration} Builder Floor For {property.purpose}</p>
          <div className="price-tag">
            <p className="">
              <span className="price-price">₹ {property.price} {property.pricerange} </span>
            </p>
          </div>
        </div>
        <div className="subprice2">
          <p className="price-add"><i ><IoLocationSharp /></i>{property.address}</p>

          <div class="fav1">
            <button className="fav1-fav">
              <i >
              <FaHeart style={{
                    width: '14px',
                    height:'26px',
                    marginRight: '4px',
                    position:'relative',
                    top:'-1px'
              }} />
              </i>
              Add to favorites
            </button>
          </div>
        </div>
      </div>

      {/* image  */}
      <div className="imgcontainer">
        {/* Main image */}
        <div className="mainimage">
          <img src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/' + cleanImageUrl(mainimage)} alt="Main building view" />
        </div>

        {/* Side images */}

        <div className="sideimgcontainer">
          <div className="sideimages">
            {imageRepositoryArray && imageRepositoryArray.map((image, index) => (
              <img key={index} src={'https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/' +cleanImageUrl(image)} alt={`Property view ${index + 1}`} onClick={()=>{
                setmainimage(image) 
              }} style={{
                cursor:'pointer'
              }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Prices;
