import React from 'react';

const PropertyRightQRCode = () => {
  // Dummy JSON data for QR code URL (this would be dynamically generated in a real-world app)
  const qrCodeUrl = 'https://example.com/path-to-generated-qrcode.png';

  return (
    <div className="widget widget-qrcode">
      <h3 className="widget-title">Scan QR Code</h3>
      <div className="qrcode">
        <img src={qrCodeUrl} alt="Property QR Code" />
      </div>
    </div>
  );
};

export default PropertyRightQRCode;
