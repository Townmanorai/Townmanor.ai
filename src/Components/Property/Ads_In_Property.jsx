import React from 'react';
import '../common.css'; 
import '../commonsecond.css'; 


// Dummy JSON data
const dummyData = {
  showPlaceholdersEnabled: true, // Set to false if you want to use ads
  hasAds728x90px: true,
  randomAds728x90pxLink: 'https://example.com',
  randomAds728x90pxImage: 'path/to/your/image.jpg',
  settingsAdsense728_90: '<script async src="https://example.com/ads.js"></script>', // Example adsense code
};

const AdsWidget = () => {
  const { showPlaceholdersEnabled, hasAds728x90px, randomAds728x90pxLink, randomAds728x90pxImage, settingsAdsense728_90 } = dummyData;

  return (
    <div className="widget">
      <div className="container text-center">
        {showPlaceholdersEnabled ? (
          <img 
            src={window.navigator.userAgent.includes('Safari') ? 'assets/img/728x900.jpg' : 'assets/img/728x900.webp'} 
            alt='ads' 
          />
        ) : (
          <>
            {hasAds728x90px ? (
              <a href={randomAds728x90pxLink} target="_blank" rel="noopener noreferrer">
                <img src={randomAds728x90pxImage} alt='ads' />
              </a>
            ) : (
              settingsAdsense728_90 ? (
                <div dangerouslySetInnerHTML={{ __html: settingsAdsense728_90 }} />
              ) : null
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdsWidget;
