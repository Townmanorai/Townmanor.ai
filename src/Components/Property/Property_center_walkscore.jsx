import React, { useEffect } from 'react';
import "../common.css";  // Ensure you have these styles in your CSS files
import "../commonsecond.css";

// Dummy JSON data
const config = {
  walkscoreEnabled: true,
  estateDataAddress: "123 Main St, Anytown, USA",
  estateDataGPS: "40.7128,-74.0060"
};

const PropertyWalkScore = () => {
  useEffect(() => {
    if (config.walkscoreEnabled && config.estateDataAddress && config.estateDataGPS) {
      const GPS_DATA = config.estateDataGPS.split(',');

      let ws_lat = '';
      let ws_lon = '';
      if (GPS_DATA.length === 2) {
        ws_lat = GPS_DATA[0].trim();
        ws_lon = GPS_DATA[1].trim();
      }

      const urlProtocol = window.location.protocol === 'https:' ? 'https://' : 'http://';
      const wsWidth = '500';
      const wsHeight = '336';
      const wsLayout = 'horizontal';
      const wsCommute = 'true';
      const wsTransitScore = 'true';
      const wsMapModules = 'all';

      // Dynamically create script tag for WalkScore API
      const script = document.createElement('script');
      script.src = `${urlProtocol}www.walkscore.com/tile/show-walkscore-tile.php`;
      script.type = 'text/javascript';
      document.body.appendChild(script);

      // Cleanup script when component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    config.walkscoreEnabled && config.estateDataAddress && config.estateDataGPS ? (
      <div className="descp-text widget-listing-walkscore">
        <h3>Walkscore</h3>
        <div id="ws-walkscore-tile">
          <div id="ws-footer" style={{ position: 'absolute', top: '318px', left: '8px', width: '488px' }}>
            <form id="ws-form">
              <a id="ws-a" href="https://www.walkscore.com/" target="_blank" rel="noopener noreferrer">
                What's Your Walk Score?
              </a>
              <input
                type="text"
                id="ws-street"
                style={{ position: 'absolute', top: '0px', left: '170px', width: '286px' }}
              />
              <input
                type="submit"
                id="ws-go"
                value="Go"
                style={{ position: 'absolute', top: '0px', right: '0px' }}
              />
            </form>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default PropertyWalkScore;
