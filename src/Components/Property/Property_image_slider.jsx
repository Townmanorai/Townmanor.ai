


import React from 'react';
import Slider from 'react-slick';
import "./Property_image_slider.css"

function Property_image_slider({ images }) {

  // Slick settings for the thumbnail slider
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Number of thumbnails visible at once
    slidesToScroll: 1,
    rows: 2, // Creates 2 rows
    slidesPerRow: 1, 
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // For smaller screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // For even smaller screens
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // For mobile screens
        },
      },
    ],
  };

  return (
    <>
      {images.length > 0 && (
        <div className="property-imgs" style={{
          marginTop:'5rem'
        }}>
          <div className="row">
            <div className="col-lg-6">
              <div className="property-main-img">
                {images.map((file, index) => (
                  <div className="property-img" key={index}>
                    <img
                      data-fullsrc={file.url}
                      src={file.url}
                      alt={file.alt}
                      style={{
                        maxHeight:'500px'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              {images.length > 1 && (
                <div className="property-thumb-imgs p-0 border-0">
                  {/* <div className="row thumb-carous">
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
                                    src={file.url}
                                    alt={file.alt}
                                    title={file.title}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div> */}
                  <Slider {...settings}>
                    {images.map((file, index) => (
                      <div key={index} className="thumb-img pr-0">
                        <div className="property-img side-img">
                          <img
                            data-fullsrc={file.url}
                            src={file.url}
                            alt={file.alt}
                            title={file.title}
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
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
