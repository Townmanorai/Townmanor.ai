
import React from "react";
import "./PopularListing.css"
import "../common.css";
import "../commonsecond.css";
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { FaHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
const PopularListing = () => {
  // Assuming you have an array of properties that you map over
  const properties = [
    {
      id: 14,
      title: "Godrej Tropical Isle",
      price: "₹ 1.74Cr-6.74Cr",
      address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
      images: [
        "./851x678godrej_tropical_isle1.jpg",
        "./851x678godrej_tropical_isle3.jpg",
        "./851x678godrej_tropical_isle2.jpg"
      ],
      bhk: "2,3,4",
      area: "831-1714 sq.ft",
      years: 11
    },
    {
      id: 15, // Use unique IDs for each property
      title: "Bhutani Cyberthum",
      price: "₹ 2.5Cr-5.5Cr",
      address: "Another address in Noida",
      images: [
        "./851x678bhutani_cyberthum101.jpg",
        "./851x678bhutani_cyberthum103.jpg",
        "./851x678bhutani_cyberthum104.jpg"
      ],
      bhk: "3,4,5",
      area: "1000-2000 sq.ft",
      years: 5
    },
    {
      id: 16,
      title: "Bhutani Alphathum",
      price: "₹ 1.74Cr-6.74Cr",
      address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
      images: [
        "./851x67alphathum1.jpg",
        "./851x678alphathum3.jpg",
        "./851x678alphathum4.jpg"
      ],
      bhk: "2,3,4",
      area: "831-1714 sq.ft",
      years: 11
    },
    {
      id: 17,
      title: "Godrej Golf Links ",
      price: "₹ 1.74Cr-6.74Cr",
      address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
      images: [
        "./851x678godrej_golf_links_1.jpg",
        "./851x678godrej_golf_links_2.jpg",
        "./851x678godrej_golf_links_9.jpg"
      ],
      bhk: "2,3,4",
      area: "831-1714 sq.ft",
      years: 11
    },
    {
      id: 18,
      title: "Godrej Palm Retreat",
      price: "₹ 1.74Cr-6.74Cr",
      address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
      images: [
        "./851x678palm_retreat_gallery_w1200xh600_px_01.jpg",
        "./851x678palm_retreat_gallery_w1200xh600_px_08.jpg",
        "./851x678palm_retreat_gallery_w1200xh600_px_09.jpg"
      ],
      bhk: "2,3,4",
      area: "831-1714 sq.ft",
      years: 11
    },
    {
      id: 19,
      title: "Godrej Woods",
      price: "₹ 1.74Cr-6.74Cr",
      address: "Plot No. GH, 01 A, near, Noida-Greater Noida Expy, Sector 146, Noida",
      images: [
        "./851x678godrej_woods_1.jpg",
        "./851x678godrej_woods_2.jpg",
        "./851x678godrej_woods_7.jpg"
      ],
      bhk: "2,3,4",
      area: "831-1714 sq.ft",
      years: 11
    }
    // Add more properties as needed
  ];

  return (
    <section className="popular-listing hp2 section-padding widget_edit_enabled mt-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-12">
            <div className="section-heading">
              <span>Discover</span>
              <h3>
                Newly launched <b>properties</b>
              </h3>
            </div>
          </div>
        </div>

        <div className="row scrollable-cards">
          {properties.map((property) => (
            <div className="col-lg-4 col-md-6" key={property.id}>
              <div className="card listing">
                <a
                  href={`https://townmanor.ai/property/${property.id}/en/${property.title.replace(" ", "_")}`}
                  title={property.title}
                >
                  <div className="img-block">
                    <span className="verifiedBadge">Verified</span>
                    <div className="overlay"></div>

                    {/* Bootstrap 5 Carousel starts */}
                    <div
                      id={`listing_carousel_${property.id}`} // Unique ID for each carousel
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-indicators">
                        {property.images.map((_, index) => (
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
                        {property.images.map((image, index) => (
                          <div
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                            key={index}
                          >
                            <img
                              src={image}
                              className="d-block w-100 img-fluid"
                              alt={property.title}
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
                        {/* <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span> */}
                        <i>
                        <MdKeyboardArrowLeft style={{
                          color:'white'
                        }}  />
                        </i>
                        {/* <span className="visually-hidden">Previous</span> */}
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#listing_carousel_${property.id}`}
                        data-bs-slide="next"
                      >
                        {/* <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span> */}
                        {/* <span className="visually-hidden">Next</span> */}
                        <i><MdKeyboardArrowRight style={{
                          color:'white',
                          height:'40px !important'
                        }} /></i>
                      </button>
                    </div>
                    {/* Bootstrap 5 Carousel ends */}
                  </div>
                </a>

                <div className="card-body">
                  <a
                    href={`https://townmanor.in/property/${property.id}/en/${property.title.replace(" ", "_")}`}
                    title={property.title}
                  >
                    <h3>{property.title}</h3>
                    <div className="rate-info">
                      <h5>{property.price}</h5>
                    </div>
                    <p>
                      <i><IoLocationOutline style={{
                        height:'18px',
                        color:'red'
                      }} /></i> {property.address}
                    </p>
                  </a>
                  <ul>
                    <li>Configuration (BHK) {property.bhk}</li>
                    <li>Carpet Area {property.area}</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <span className="favorites-actions pull-left">
                    <a href="#" data-id={property.id} className="add-to-favorites">
                      {/* <i className="la la-heart-o"></i> */}
                      <i><FaHeart style={{
                        height:'18px',
                        
                      }}
                      id="hearticon" /></i>
                    </a>
                  </span>
                  <a
                    href="#"
                    title={property.years}
                    className="pull-right"
                  >
                    <i className="la la-calendar-check-o"></i> {property.years} years
                  </a>
                </div>
              </div>
            </div>
          ))}

          <div className="col-lg-12">
    <div className="load-more-posts">
      <a href="https://townmanor.in/en/145" title="" className="btn2">
        Load More
      </a>
    </div>
  </div>
        </div>
        <div className="load-more-posts-mobile">
  <a href="https://townmanor.in/en/145" title="" className="btn2">
    Load More
  </a>
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
