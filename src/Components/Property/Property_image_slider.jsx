// import React from 'react'

// // Dummy JSON data (simulating $slideshow_property_images)
// const slideshowPropertyImages = [
//     {
//       url: "770x483sobha_310_riverside_crescent1.webp",
//       alt: "Image 1",
//       title: "Title 1",
//     },
//     {
//       url: "770x483sobha_310_riverside_crescent3.webp",
//       alt: "Image 2",
//       title: "Title 2",
//     },
//     {
//       url: "770x483sobha_310_riverside_crescent5.webp",
//       alt: "Image 3",
//       title: "Title 3",
//     },
//     {
//       url: "770x483sobha_310_riverside_crescent6.webp",
//       alt: "Image 4",
//       title: "Title 4",
//     },
//   ];  

// function Property_image_slider() {
    
//   return (
//     <>
//     {slideshowPropertyImages.length > 0 && (
//         <div className="property-imgs">
//           <div className="row">
//             <div className="col-lg-6">
//               <div className="property-main-img">
//                 {slideshowPropertyImages.map((file, index) => (
//                   <div className="property-img" key={index}>
//                     <img
//                       data-fullsrc={file.url}
//                       src={`./${file.url}`}
//                       alt={file.alt}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="col-lg-6">
//               {slideshowPropertyImages.length > 1 && (
//                 <div className="property-thumb-imgs p-0 border-0">
//                   <div className="row thumb-carous">
//                     {slideshowPropertyImages
//                       .reduce((acc, curr, index) => {
//                         if (index % 2 === 0) {
//                           acc.push([curr]);
//                         } else {
//                           acc[acc.length - 1].push(curr);
//                         }
//                         return acc;
//                       }, [])
//                       .map((chunk, chunkIndex) => (
//                         <div
//                           className="col-lg-6 col-md-6 col-sm-12 col-12 thumb-img pr-0"
//                           key={chunkIndex}
//                         >
//                           <div className="row mRTYUVFG">
//                             {chunk.map((file, imgIndex) => (
//                               <div className="col-12 pb-4" key={imgIndex}>
//                                 <div className="property-img">
//                                   <img
//                                     data-fullsrc={file.url}
//                                     src={`./${file.url}`}                                    
//                                     alt={file.alt}
//                                     title={file.title}
//                                   />
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default Property_image_slider


import React from 'react';

function Property_image_slider({ images }) {
  return (
    <>
      {images.length > 0 && (
        <div className="property-imgs">
          <div className="row">
            <div className="col-lg-6">
              <div className="property-main-img">
                {images.map((file, index) => (
                  <div className="property-img" key={index}>
                    <img
                      data-fullsrc={file.url}
                      src={`/${file.url}`}
                      alt={file.alt}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              {images.length > 1 && (
                <div className="property-thumb-imgs p-0 border-0">
                  <div className="row thumb-carous">
                    {images
                      .reduce((acc, curr, index) => {
                        if (index % 2 === 0) {
                          acc.push([curr]);
                        } else {
                          acc[acc.length - 1].push(curr);
                        }
                        return acc;
                      }, [])
                      .map((chunk, chunkIndex) => (
                        <div
                          className="col-lg-6 col-md-6 col-sm-12 col-12 thumb-img pr-0"
                          key={chunkIndex}
                        >
                          <div className="row mRTYUVFG">
                            {chunk.map((file, imgIndex) => (
                              <div className="col-12 pb-4" key={imgIndex}>
                                <div className="property-img">
                                  <img
                                    data-fullsrc={file.url}
                                    src={`/${file.url}`}
                                    alt={file.alt}
                                    title={file.title}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Property_image_slider;
