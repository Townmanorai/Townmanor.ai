import React from 'react';
import "../common.css";  // Ensure you have these styles in your CSS files
import "../commonsecond.css";


// Dummy JSON data to simulate property ID and language code
const dummyData = {
  property_id: 123,
  lang_code: 'en',
};

const DownloadBrochure = () => {
  const pdfDownloadUrl = `/api/pdf_export/${dummyData.property_id}/${dummyData.lang_code}`;

  return (
    <div className="widget widget-posts text-left">
      <h3 className="widget-title">Download Brochure</h3>
      <a className="text-center block" href={pdfDownloadUrl}>
        <img src="assets/img/icons/filetype/pdf.png" alt="Pdf Export" />
      </a>
      <a href={pdfDownloadUrl} download="" className="download-brochure">
        Download
      </a>
    </div>
  );
};

export default DownloadBrochure;
