import React from 'react';
import './AdvertisementVideo.css';

const AdvertisementVideo = () => {
  const videoSources = [
    'https://s3.ap-south-1.amazonaws.com/townamnor.ai/video/WhatsApp+Video+2024-10-23+at+11.18.49+AM.mp4',
    'https://s3.ap-south-1.amazonaws.com/townamnor.ai/video/WhatsApp+Video+2024-10-23+at+11.22.03+AM.mp4',
    'https://s3.ap-south-1.amazonaws.com/townamnor.ai/video/Explore+Bhutani+Group+s+Innovative+Projects+1.mp4',
    'https://s3.ap-south-1.amazonaws.com/townamnor.ai/video/Commercial+Real+Estate+in+India+1.mp4',
  ];

  return (
    <div className='container'>
      <div className="ad-video-section">
        {videoSources.map((videoSrc, index) => (
          <div className="video-ad-container" key={index}>
            <video className="responsive-ad-video" controls autoPlay muted loop>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementVideo;
