
import React from 'react';
import "../common.css";  // Ensure you have these styles in your CSS files
import "../commonsecond.css";

const optionsName65 = 'Floor Plan'; // Dummy option name

const PropertyFloorPlan = () => {
  return (
    <div className="floorplan">
      <h3>{optionsName65}</h3>
      <p>Coming Soon</p>
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
