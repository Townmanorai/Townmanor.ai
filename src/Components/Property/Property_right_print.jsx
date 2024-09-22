import React from 'react';

const RightPrint = () => {
  // Dummy JSON data to replace the dynamic PHP data
  const dummyData = {
    estateDataPrintUrl: 'https://example.com/print-version',
    langPrintVersion: 'Print Version',
  };

  return (
    <div className="widget widget-posts widget-compare">
      <h3 className="widget-title">Print page</h3>
      <div className="clearfix text-left">
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn2" 
          href={dummyData.estateDataPrintUrl}
        >
          <i className="icon-print"></i>&nbsp;{dummyData.langPrintVersion}
        </a>
      </div>
    </div>
  );
};

export default RightPrint;
