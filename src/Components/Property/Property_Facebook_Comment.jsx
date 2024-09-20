import React from 'react';
import "../common.css";  // Ensure these CSS files are included
import "../commonsecond.css";

// Dummy JSON data
const data = {
  settingsFacebookComments: '<iframe src="http://example.com/comments" width="500" height="400" frameborder="0"></iframe>',
  pageCurrentUrl: 'https://example.com/current-page'
};

const PropertyFacebookComments = () => {
  // Replace the placeholder URL with the current page URL
  const facebookCommentsContent = data.settingsFacebookComments.replace(
    'http://example.com/comments',
    data.pageCurrentUrl
  );

  return (
    data.settingsFacebookComments ? (
      <div className="details-info details-info-transparent">
        <h3>Facebook comments</h3>
        <div dangerouslySetInnerHTML={{ __html: facebookCommentsContent }} />
      </div>
    ) : null
  );
};

export default PropertyFacebookComments;
