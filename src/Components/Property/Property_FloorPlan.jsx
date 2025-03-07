import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "../common.css";  // Ensure you have these styles in your CSS files
import "../commonsecond.css";

const PropertyFloorPlan = ({ floorplan }) => {
  // Check if floorplan is available, and parse the floorplan string into an array
  const floorplanImages = floorplan ? floorplan.split(',').map(image => image.trim()) : [];

  return (
    <div className="floorplan">
      <h3>Floor Plan</h3>

      {floorplanImages.length > 0 ? (
        <div id="floorPlanCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {/* Iterate over each image and create a carousel item */}
            {floorplanImages.map((image, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <img
                  src={`https://townmanor.in/files/${image}`}
                  alt={`Property Floor Plan ${index + 1}`}
                  className="d-block w-75 floorplan-image"
                  style={{
                    height:'500px',
                    
                  }}
                />
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <a className="carousel-control-prev" href="#floorPlanCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#floorPlanCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      ) : (
        <p>Coming Soon</p>
      )}
    </div>
  );
};

export default PropertyFloorPlan;





// import React from 'react';
// import "../common.css";  // Ensure you have these styles in your CSS files
// import "../commonsecond.css";

// // Dummy JSON data for file repository
// const fileRep = [
//   {
//     filename: '/sobha_310_riverside_crescent52.jpg',
//     isThumbnail: true,
//   },
//   {
//     filename: '/sobha_310_riverside_crescent53.jpg',
//     isThumbnail: false,
//   },
//   {
//     filename: 'sample-file.pdf',
//     isThumbnail: false,
//   },
// ];

// const optionsName65 = 'Floor Plan'; // Dummy option name

// const PropertyFloorPlan = () => {
//   const isDemo = true; // Change this based on your environment

//   if (isDemo) {
//     return (
//       <div className="floorplan">
//         <h3>Floorplan</h3>
//         <img src="/sobha_310_riverside_crescent52.jpg" alt="Floorplan" />
//       </div>
//     );
//   }

//   if (fileRep.length === 0) {
//     return null;
//   }

//   return (
//     <div className="floorplan">
//       <h3>{optionsName65}</h3>
//       {fileRep.length > 0 && (
//         <>
//           <img
//             src={`base_url('files/${fileRep[0].filename}')`} // Adjust this if necessary
//             alt="Floorplan"
//           />
//           {fileRep.length > 1 && (
//             <div className="images-gallery widget-gallery widget widget-preloadigallery">
//               <div className="row">
//                 {fileRep.map((file, index) => {
//                   const fileExtension = file.filename.split('.').pop();
//                   const isImage = file.isThumbnail;
//                   const fileSrc = `base_url('files/${file.filename}')`;
//                   const thumbnailSrc = `base_url('files/thumbnail/${file.filename}')`;
//                   const iconSrc = `assets/img/icons/filetype/${fileExtension}.png`;

//                   return (
//                     <div className="col-sm-6 col-md-3" key={index}>
//                       <div className={`card card-gallery ${isImage ? '' : 'type-file'}`}>
//                         <a
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           href={fileSrc}
//                           title={file.filename}
//                           download={fileSrc}
//                           className="preview show-icon direct-download"
//                         >
//                           <img
//                             src={isImage ? thumbnailSrc : iconSrc}
//                             alt={file.filename}
//                             className=""
//                           />
//                         </a>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default PropertyFloorPlan;
