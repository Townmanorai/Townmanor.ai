import React from 'react';
import './AdvertisementVideo.css';

const AdvertisementVideo = () => {
  const videoSources = [
    `/AdsVideo1.mp4`,
    `${process.env.PUBLIC_URL}/AdsVideo2.mp4`,
    `${process.env.PUBLIC_URL}/AdsVideo3.mp4`
  ];

  return (
    <div className="ad-video-section">
      {videoSources.map((videoSrc, index) => (
        <div className="video-ad-container" key={index}>
          <video className="responsive-ad-video" controls autoPlay muted loop>
            <source src={`${process.env.PUBLIC_URL}/AdsVideo.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default AdvertisementVideo;
