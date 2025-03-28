import React, { useEffect, useState } from "react";
import "./PopularListing.css"
import "../common.css";
import "../commonsecond.css";
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { FaHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
const PopularListing = () => {
 

  const propertyUrls = [
    "https://www.townmanor.ai/api/property/2298",
    "https://www.townmanor.ai/api/property/2291",
    "https://www.townmanor.ai/api/property/1973",
    "https://www.townmanor.ai/api/property/1756",
    "https://www.townmanor.ai/api/property/1548",
    "https://www.townmanor.ai/api/property/1940",
    "https://www.townmanor.ai/api/property/1200",
    "https://www.townmanor.ai/api/property/1136"
  ];
  const [data, setdata] = useState([]);

  // Function to format price correctly
  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    // Replace the encoded Rupee symbol with the actual Rupee symbol
    return price.replace('â‚¹', '₹').trim();
  };

  const fetchProperties = async () => {
    try {
      const propertyData = await Promise.all(
        propertyUrls.map(url => axios.get(url).then(res => res.data))
      );
      // Process the image repository strings into arrays and limit to 2 images
      const processedData = propertyData.map(property => {
        const allImages = property.image_repository ? property.image_repository.split(',').map(url => url.trim()) : [];
        return {
          ...property,
          images_array: allImages.slice(0, 2) // Only take first 2 images
        };
      });
      setdata(processedData);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  // Use useEffect to fetch properties when the component mounts
  useEffect(() => {
    fetchProperties();
  }, []);
  // Assuming you have an array of properties that you map over
  // const properties = [
  //   {
  //     id: 14,
  //     title: "Godrej Tropical Isle",
  //     price: "₹ 1.74Cr-6.74Cr",
  //     address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
  //     images: [
  //       "./851x678godrej_tropical_isle1.jpg",
  //       "./851x678godrej_tropical_isle3.jpg",
  //       "./851x678godrej_tropical_isle2.jpg"
  //     ],
  //     bhk: "2,3,4",
  //     area: "831-1714 sq.ft",
  //     years: 11
  //   },
  //   {
  //     id: 15, // Use unique IDs for each property
  //     title: "Bhutani Cyberthum",
  //     price: "₹ 2.5Cr-5.5Cr",
  //     address: "140, Sector 137 Rd, Blossom County, Sector 137, Noida",
  //     images: [
  //       "./851x678bhutani_cyberthum101.jpg",
  //       "./851x678bhutani_cyberthum103.jpg",
  //       "./851x678bhutani_cyberthum104.jpg"
  //     ],
  //     bhk: "3,4,5",
  //     area: "1000-2000 sq.ft",
  //     years: 5
  //   },
  //   {
  //     id: 16,
  //     title: "Bhutani Alphathum",
  //     price: "₹ 1.74Cr-6.74Cr",
  //     address: "Blossom County, Sector 90, Noida",
  //     images: [
  //       "./851x67alphathum1.jpg",
  //       "./851x678alphathum3.jpg",
  //       "./851x678alphathum4.jpg"
  //     ],
  //     bhk: "2,3,4",
  //     area: "831-1714 sq.ft",
  //     years: 11
  //   },
  //   {
  //     id: 17,
  //     title: "Godrej Golf Links ",
  //     price: "₹ 1.74Cr-6.74Cr",
  //     address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
  //     images: [
  //       "./851x678godrej_golf_links_1.jpg",
  //       "./851x678godrej_golf_links_2.jpg",
  //       "./851x678godrej_golf_links_9.jpg"
  //     ],
  //     bhk: "2,3,4",
  //     area: "831-1714 sq.ft",
  //     years: 11
  //   },
  //   {
  //     id: 18,
  //     title: "Godrej Palm Retreat",
  //     price: "₹ 1.74Cr-6.74Cr",
  //     address: "Sector 27 , Greater Noida, Noida",
  //     images: [
  //       "./851x678palm_retreat_gallery_w1200xh600_px_01.jpg",
  //       "./851x678palm_retreat_gallery_w1200xh600_px_08.jpg",
  //       "./851x678palm_retreat_gallery_w1200xh600_px_09.jpg"
  //     ],
  //     bhk: "2,3,4",
  //     area: "831-1714 sq.ft",
  //     years: 11
  //   },
  //   {
  //     id: 19,
  //     title: "Godrej Woods",
  //     price: "₹ 1.74Cr-6.74Cr",
  //     address: "Block A, Sector 43, Noida",
  //     images: [
  //       "./851x678godrej_woods_1.jpg",
  //       "./851x678godrej_woods_2.jpg",
  //       "./851x678godrej_woods_7.jpg"
  //     ],
  //     bhk: "2,3,4",
  //     area: "831-1714 sq.ft",
  //     years: 11
  //   },
  //   {
  //     id: 1059,
  //     title: "Danube Sportz",
  //     price: "AED 0.5 M Onwards *",
  //     address: "Dubai Sports City, Dubai",
  //     images: [
  //       "https://townmanor.in/files/strict_cache/1300x800danube_sportz_4.webp",
  //       "https://townmanor.in/files/strict_cache/770x483danube_sportz_1.webp",
  //       "https://townmanor.in/files/strict_cache/770x483danube_sportz_3.webp"
  //     ],
  //     bhk: "1,2,3",
  //     area: "389 - 1212 sq.ft",
  //     years: 1
  //   },
  //   {
  //     id: 1063,
  //     title: "Sobha 310 Riverside Crescent",
  //     price: "AED 1.49 M Onwards *",
  //     address: "Mohammed Bin Rashid City, Dubai",
  //     images: [
  //       "https://townmanor.in/files/strict_cache/1300x800sobha_310_riverside_crescent1.webp",
  //       "https://townmanor.in/files/strict_cache/770x483sobha_310_riverside_crescent5.webp",
  //       "https://townmanor.in/files/strict_cache/770x483sobha_310_riverside_crescent6.webp"
  //     ],
  //     bhk: "1, 1.5, 2.5",
  //     area: "609 to 1,467 sq.ft",
  //     years: 1
  //   }
    
  // ];
  
  return (
    <section className="popular-listing hp2 section-padding widget_edit_enabled mt-4 nps bps" style={{paddingBottom:"20px"}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-12">
            <div className="section-heading" style={{marginBottom:'30px'}}>
              <span>Discover</span>
              <h3>
                Newly launched <b>properties</b>
              </h3>
            </div>
          </div>
        </div>

        <div className="row scrollable-cards" style={{}}>
          {data && data.map((property) => (
            <div className="col-lg-4 col-md-6" key={property.id}>
              <div className="card listing">
                <a
                  href={`https://townmanor.ai/property/${property.id}`}
                  title={property.property_name || ''}
                >
                  <div className="img-block">
                    <span className="verifiedBadge">Verified</span>
                    <div className="overlay"></div>

                   
                    <div
                      id={`listing_carousel_${property.id}`} 
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-indicators">
                        {property.images_array && property.images_array.map((_, index) => (
                          <button
                            type="button"
                            data-bs-target={`#listing_carousel_${property.id}`}
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : ""}
                            aria-label={`Slide ${index + 1}`}
                            key={index}
                          ></button>
                        ))}
                      </div>
                      <div className="carousel-inner">
                        {property.images_array && property.images_array.map((image, index) => (
                          <div
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                            key={index}
                          >
                            <img
                              src={image}
                              className="d-block w-100 img-fluid"
                              alt={property.property_name || 'Property Image'}
                              
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://townmanor.ai/fallback-image.jpg';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#listing_carousel_${property.id}`}
                        data-bs-slide="prev"
                      >
                     
                        <i>
                        <MdKeyboardArrowLeft style={{
                          color:'white'
                        }}  />
                        </i>
                    
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#listing_carousel_${property.id}`}
                        data-bs-slide="next"
                      >
                     
                        <i><MdKeyboardArrowRight style={{
                          color:'white',
                          height:'40px !important'
                        }} /></i>
                      </button>
                    </div>
               
                  </div>
                </a>

                <div className="card-body">
                  <a
                    // href={`https://townmanor.in/property/${property.id}/en/${property.title.replace(" ", "_")}`}
                    title={property.property_name || ''}
                  >
                    <div className="cb-title">
                      <h3>{property.property_name || 'Property'}</h3>
                      <a href="#" data-id={property.id} className="add-to-favorites" style={{marginTop:'5px'}}>
                        <i><FaHeart style={{
                          height: '18px',
                     
                        }}
                          id="hearticon" /></i>
                      </a>
                    </div>
                    <div className="rate-info">
                      <h5>{formatPrice(property.price)}</h5>
                    </div>
                    <p>
                      <i><IoLocationOutline style={{
                        height:'18px',
                        color:'red'
                      }} /></i> {property.address || 'Location Available on Request'}
                    </p>
                  </a>
                  <ul>
                    <li>Configuration (BHK): {property.configuration || 'N/A'}</li>
                    <li>Carpet Area: {property.area_range || 'N/A'}</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <span className="favorites-actions pull-left">
                    
                  </span>
                  <a
                    href="#"
                    title=""
                    className="pull-right"
                  >
                    <i className="la la-calendar-check-o"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}

          <div className="col-lg-12">
    <div className="load-more-posts l-load">
      <a href="https://townmanor.in/en/145" title="" className="btn2">
        Load More
      </a>
    </div>
  </div>
        </div>
        <div className="load-more-posts-mobile">
          <div className="load-more-posts-mobile-inner">
  <a href="https://townmanor.in/en/145" title="" className="btn2">
    Load More
  </a>
  </div>
</div> 

      </div>
    </section>
  );
};

export default PopularListing;







// import React from "react";
// import "../common.css";
// import "../commonsecond.css";

// const PopularListing = () => {
//   // Assuming you have an array of properties that you map over
  // const properties = [
  //   {
  //     id: 22,
  //     title: "Godrej Tropical Isle",
  //     price: "₹ 1.74Cr-6.74Cr",
  //     address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
  //     images: [
  //       "./851x678godrej_tropical_isle1.jpg",
  //       "./851x678godrej_tropical_isle3.jpg",
  //       "./851x678godrej_tropical_isle2.jpg"
  //     ],
  //     bhk: "2,3,4",
  //     area: "831-1714 sq.ft",
  //     years: 11
  //   },
  //   {
  //     id: 23, // Use unique IDs for each property
  //     title: "Bhutani Cyberthum",
  //     price: "₹ 2.5Cr-5.5Cr",
  //     address: "Another address in Noida",
  //     images: [
  //       "./851x678bhutani_cyberthum101.jpg",
  //       "./851x678bhutani_cyberthum103.jpg",
  //       "./851x678bhutani_cyberthum104.jpg"
  //     ],
  //     bhk: "3,4,5",
  //     area: "1000-2000 sq.ft",
  //     years: 5
  //   },
  //   {
  //     id: 24,
  //     title: "Bhutani Alphathum",
  //     price: "₹ 1.74Cr-6.74Cr",
  //     address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
  //     images: [
  //       "./851x67alphathum1.jpg",
  //       "./851x678alphathum3.jpg",
  //       "./851x678alphathum4.jpg"
  //     ],
  //     bhk: "2,3,4",
  //     area: "831-1714 sq.ft",
  //     years: 11
  //   },
  //   {
  //     id: 25,
  //     title: "Godrej Golf Links ",
  //     price: "₹ 1.74Cr-6.74Cr",
  //     address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
  //     images: [
  //       "./851x678godrej_golf_links_1.jpg",
  //       "./851x678godrej_golf_links_2.jpg",
  //       "./851x678godrej_golf_links_9.jpg"
  //     ],
  //     bhk: "2,3,4",
  //     area: "831-1714 sq.ft",
  //     years: 11
  //   },
  //   {
  //     id: 26,
  //     title: "Godrej Palm Retreat",
  //     price: "₹ 1.74Cr-6.74Cr",
  //     address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
  //     images: [
  //       "./851x678palm_retreat_gallery_w1200xh600_px_01.jpg",
  //       "./851x678palm_retreat_gallery_w1200xh600_px_08.jpg",
  //       "./851x678palm_retreat_gallery_w1200xh600_px_09.jpg"
  //     ],
  //     bhk: "2,3,4",
  //     area: "831-1714 sq.ft",
  //     years: 11
  //   },
  //   {
  //     id: 27,
  //     title: "Godrej Woods",
  //     price: "₹ 1.74Cr-6.74Cr",
  //     address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
  //     images: [
  //       "./851x678godrej_woods_1.jpg",
  //       "./851x678godrej_woods_2.jpg",
  //       "./851x678godrej_woods_7.jpg"
  //     ],
  //     bhk: "2,3,4",
  //     area: "831-1714 sq.ft",
  //     years: 11
  //   }
//     // Add more properties as needed
//   ];

//   return (
//     <section className="popular-listing hp2 section-padding widget_edit_enabled mt-4">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-xl-12">
//             <div className="section-heading">
//               <span>Discover</span>
//               <h3>
//                 Newly launched <b>properties</b>
//               </h3>
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           {properties.map((property) => (
//             <div className="col-lg-4 col-md-6" key={property.id}>
//               <div className="card">
//                 <a
//                   href={`https://townmanor.in/property/${property.id}/en/${property.title.replace(" ", "_")}`}
//                   title={property.title}
//                 >
//                   <div className="img-block">
//                     <span className="verifiedBadge">Verified</span>
//                     <div className="overlay"></div>

//                     {/* Bootstrap 5 Carousel starts */}
//                     <div
//                       id={`listing_carousel_${property.id}`} // Unique ID for each carousel
//                       className="carousel slide"
//                       data-bs-ride="carousel"
//                     >
//                       <div className="carousel-indicators">
//                         {property.images.map((_, index) => (
//                           <button
//                             type="button"
//                             data-bs-target={`#listing_carousel_${property.id}`}
//                             data-bs-slide-to={index}
//                             className={index === 0 ? "active" : ""}
//                             aria-current={index === 0 ? "true" : ""}
//                             aria-label={`Slide ${index + 1}`}
//                             key={index}
//                           ></button>
//                         ))}
//                       </div>
//                       <div className="carousel-inner">
//                         {property.images.map((image, index) => (
//                           <div
//                             className={`carousel-item ${index === 0 ? "active" : ""}`}
//                             key={index}
//                           >
//                             <img
//                               src={image}
//                               className="d-block w-100 img-fluid"
//                               alt={property.title}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                       <button
//                         className="carousel-control-prev"
//                         type="button"
//                         data-bs-target={`#listing_carousel_${property.id}`}
//                         data-bs-slide="prev"
//                       >
//                         {/* <span
//                           className="carousel-control-prev-icon"
//                           aria-hidden="true"
//                         ></span> */}
//                         <i className="fa fa-angle-left"></i>
//                         {/* <span className="visually-hidden">Previous</span> */}
//                       </button>
//                       <button
//                         className="carousel-control-next"
//                         type="button"
//                         data-bs-target={`#listing_carousel_${property.id}`}
//                         data-bs-slide="next"
//                       >
//                         {/* <span
//                           className="carousel-control-next-icon"
//                           aria-hidden="true"
//                         ></span> */}
//                         {/* <span className="visually-hidden">Next</span> */}
//                         <i className="fa fa-angle-right"></i>
//                       </button>
//                     </div>
//                     {/* Bootstrap 5 Carousel ends */}
//                   </div>
//                 </a>

//                 <div className="card-body">
//                   <a
//                     href={`https://townmanor.in/property/${property.id}/en/${property.title.replace(" ", "_")}`}
//                     title={property.title}
//                   >
//                     <h3>{property.title}</h3>
//                     <div className="rate-info">
//                       <h5>{property.price}</h5>
//                     </div>
//                     <p>
//                       <i className="la la-map-marker"></i> {property.address}
//                     </p>
//                   </a>
//                   <ul>
//                     <li>Configuration (BHK) {property.bhk}</li>
//                     <li>Carpet Area {property.area}</li>
//                   </ul>
//                 </div>
//                 <div className="card-footer">
//                   <span className="favorites-actions pull-left">
//                     <a href="#" data-id={property.id} className="add-to-favorites">
//                       <i className="la la-heart-o"></i>
//                     </a>
//                   </span>
//                   <a
//                     href="#"
//                     title={property.years}
//                     className="pull-right"
//                   >
//                     <i className="la la-calendar-check-o"></i> {property.years} years
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="col-lg-12">
//             <div className="load-more-posts">
//               <a href="https://townmanor.in/en/145" title="" className="btn2">
//                 Load More
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PopularListing;


// import React from "react";
// import "../common.css";
// import "../commonsecond.css";

// const PopularListing = () => {
//   // Array of properties
//   const properties = [
//       {
//         id: 22,
//         title: "Godrej Tropical Isle",
//         price: "₹ 1.74Cr-6.74Cr",
//         address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
//         images: [
//           "./851x678godrej_tropical_isle1.jpg",
//           "./851x678godrej_tropical_isle3.jpg",
//           "./851x678godrej_tropical_isle2.jpg"
//         ],
//         bhk: "2,3,4",
//         area: "831-1714 sq.ft",
//         years: 11
//       },
//       {
//         id: 23, // Use unique IDs for each property
//         title: "Bhutani Cyberthum",
//         price: "₹ 2.5Cr-5.5Cr",
//         address: "Another address in Noida",
//         images: [
//           "./851x678bhutani_cyberthum101.jpg",
//           "./851x678bhutani_cyberthum103.jpg",
//           "./851x678bhutani_cyberthum104.jpg"
//         ],
//         bhk: "3,4,5",
//         area: "1000-2000 sq.ft",
//         years: 5
//       },
//       {
//         id: 24,
//         title: "Bhutani Alphathum",
//         price: "₹ 1.74Cr-6.74Cr",
//         address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
//         images: [
//           "./851x67alphathum1.jpg",
//           "./851x678alphathum3.jpg",
//           "./851x678alphathum4.jpg"
//         ],
//         bhk: "2,3,4",
//         area: "831-1714 sq.ft",
//         years: 11
//       },
//       {
//         id: 25,
//         title: "Godrej Golf Links ",
//         price: "₹ 1.74Cr-6.74Cr",
//         address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
//         images: [
//           "./851x678godrej_golf_links_1.jpg",
//           "./851x678godrej_golf_links_2.jpg",
//           "./851x678godrej_golf_links_9.jpg"
//         ],
//         bhk: "2,3,4",
//         area: "831-1714 sq.ft",
//         years: 11
//       },
//       {
//         id: 26,
//         title: "Godrej Palm Retreat",
//         price: "₹ 1.74Cr-6.74Cr",
//         address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
//         images: [
//           "./851x678palm_retreat_gallery_w1200xh600_px_01.jpg",
//           "./851x678palm_retreat_gallery_w1200xh600_px_08.jpg",
//           "./851x678palm_retreat_gallery_w1200xh600_px_09.jpg"
//         ],
//         bhk: "2,3,4",
//         area: "831-1714 sq.ft",
//         years: 11
//       },
//       {
//         id: 27,
//         title: "Godrej Woods",
//         price: "₹ 1.74Cr-6.74Cr",
//         address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
//         images: [
//           "./851x678godrej_woods_1.jpg",
//           "./851x678godrej_woods_2.jpg",
//           "./851x678godrej_woods_7.jpg"
//         ],
//         bhk: "2,3,4",
//         area: "831-1714 sq.ft",
//         years: 11
//       },
//     // ... other properties
//   ];

//   return (
//     <section className="popular-listing hp2 section-padding widget_edit_enabled mt-4">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-xl-12">
//             <div className="section-heading">
//               <span>Discover</span>
//               <h3>
//                 Newly launched <b>properties</b>
//               </h3>
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           {properties.map((property) => (
//             <div className="col-lg-4 col-md-6" key={property.id}>
//               <div className="card">
//                 {/* Entire card is now clickable */}
//                 <a
//                   href={`http://localhost:5173/property/${property.id}`}
//                   title={property.title}
//                 >
//                   <div className="img-block">
//                     <span className="verifiedBadge">Verified</span>
//                     <div className="overlay"></div>

//                     <div
//                       id={`listing_carousel_${property.id}`}
//                       className="carousel slide"
//                       data-bs-ride="carousel"
//                     >
//                       <div className="carousel-indicators">
//                         {property.images.map((_, index) => (
//                           <button
//                             type="button"
//                             data-bs-target={`#listing_carousel_${property.id}`}
//                             data-bs-slide-to={index}
//                             className={index === 0 ? "active" : ""}
//                             aria-current={index === 0 ? "true" : ""}
//                             aria-label={`Slide ${index + 1}`}
//                             key={index}
//                           ></button>
//                         ))}
//                       </div>
//                       <div className="carousel-inner">
//                         {property.images.map((image, index) => (
//                           <div
//                             className={`carousel-item ${index === 0 ? "active" : ""}`}
//                             key={index}
//                           >
//                             <img
//                               src={image}
//                               className="d-block w-100 img-fluid"
//                               alt={property.title}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                       <button
//                         className="carousel-control-prev"
//                         type="button"
//                         data-bs-target={`#listing_carousel_${property.id}`}
//                         data-bs-slide="prev"
//                       >
//                         <i className="fa fa-angle-left"></i>
//                       </button>
//                       <button
//                         className="carousel-control-next"
//                         type="button"
//                         data-bs-target={`#listing_carousel_${property.id}`}
//                         data-bs-slide="next"
//                       >
//                         <i className="fa fa-angle-right"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </a>

//                 <div className="card-body">
//                   <h3>
//                     <a
//                       href={`http://localhost:5173/property/${property.id}`}
//                       title={property.title}
//                     >
//                       {property.title}
//                     </a>
//                   </h3>
//                   <div className="rate-info">
//                     <h5>{property.price}</h5>
//                   </div>
//                   <p>
//                     <i className="la la-map-marker"></i> {property.address}
//                   </p>
//                   <ul>
//                     <li>Configuration (BHK): {property.bhk}</li>
//                     <li>Carpet Area: {property.area}</li>
//                   </ul>
//                 </div>
//                 <div className="card-footer">
//                   <span className="favorites-actions pull-left">
//                     <a href="#" data-id={property.id} className="add-to-favorites">
//                       <i className="la la-heart-o"></i>
//                     </a>
//                   </span>
//                   <a
//                     href="#"
//                     title={property.years}
//                     className="pull-right"
//                   >
//                     <i className="la la-calendar-check-o"></i> {property.years} years
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="col-lg-12">
//             <div className="load-more-posts">
//               <a href="https://townmanor.in/en/145" title="" className="btn2">
//                 Load More
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PopularListing;
