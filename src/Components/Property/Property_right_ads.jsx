import React from 'react';

const RightAds = () => {
  // Dummy data to simulate dynamic behavior
  const showPlaceholdersEnabled = true; // Replace with actual config setting
//   const isSafari = false; // Simulating the browser check (false for non-Safari)
  const hasAds = true; // Simulating availability of ads
  const randomAdLink = "https://example.com/ad"; // Replace with actual ad link
  const randomAdImage = "assets/img/random-ad-image.png"; // Replace with actual ad image
  const settingsAdsense160_600 = '<div>Your Adsense Code Here</div>'; // Replace with actual Adsense settings

  return (
    <div className="widget widget-right-ads">
      {showPlaceholdersEnabled ? (
        <img src="/851x678godrej_woods_7.jpg" alt="ads" />
      ) : hasAds ? (
        <a href={randomAdLink} target="_blank" rel="noopener noreferrer" className="widget_edit_enabled">
          <img src={randomAdImage} alt="Advertisement" />
        </a>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: settingsAdsense160_600 }} />
      )}
    </div>
  );
};

export default RightAds;
