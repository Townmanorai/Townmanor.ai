import React from 'react';

// Dummy data for the component
const dummyData = {
  similarEstates: [
    {
      url: "https://example.com/property1",
      thumbnailUrl: "assets/img/property1.jpg",
      option10: "Beautiful House",
      address: "123 Example Street",
      option36: 250000,
      option37: 300000,
      option4: "Sale",
      isFavorite: false,
      date: "2024-08-01"
    },
    {
      url: "https://example.com/property2",
      thumbnailUrl: "assets/img/property2.jpg",
      option10: "Luxury Apartment",
      address: "456 Another Ave",
      option36: 400000,
      option37: 500000,
      option4: "Rent",
      isFavorite: true,
      date: "2024-07-15"
    }
    // Add more properties as needed
  ]
};

// Function to calculate human-readable time difference
const humanTimeDiff = (from) => {
  const to = Date.now() / 1000;
  const minuteInSeconds = 60;
  const hourInSeconds = 60 * minuteInSeconds;
  const dayInSeconds = 24 * hourInSeconds;
  const weekInSeconds = 7 * dayInSeconds;
  const monthInSeconds = 30 * dayInSeconds;
  const yearInSeconds = 365 * dayInSeconds;
  const diff = Math.abs(to - from);

  let since = '';
  if (diff < hourInSeconds) {
    const mins = Math.max(1, Math.round(diff / minuteInSeconds));
    since = `${mins} min${mins > 1 ? 's' : ''}`;
  } else if (diff < dayInSeconds && diff >= hourInSeconds) {
    const hours = Math.max(1, Math.round(diff / hourInSeconds));
    since = `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (diff < monthInSeconds && diff >= dayInSeconds) {
    const days = Math.max(1, Math.round(diff / dayInSeconds));
    since = `${days} day${days > 1 ? 's' : ''}`;
  } else if (diff < yearInSeconds && diff >= monthInSeconds) {
    const months = Math.max(1, Math.round(diff / monthInSeconds));
    since = `${months} month${months > 1 ? 's' : ''}`;
  } else if (diff >= yearInSeconds) {
    const years = Math.max(1, Math.round(diff / yearInSeconds));
    since = `${years} year${years > 1 ? 's' : ''}`;
  }

  return since;
};

const SimilarListings = () => {
  return (
    <div className="similar-listings-posts">
      <h3>Similar properties</h3>
      <div className="list-products">
        {dummyData.similarEstates.map((item, index) => (
          <div key={index} className="card">
            <a href={item.url} title={item.option10}>
              <div className="img-block">
                <div className="overlay"></div>
                <img src={item.thumbnailUrl} alt={item.option10} className="img-fluid" />
              </div>
            </a>
            <div className="card_bod_full">
              <div className="card-body">
                <a href={item.url} title={item.option10}>
                  <h3>{item.option10}</h3>
                  <p><i className="la la-map-marker"></i>{item.address}</p>
                </a>
                <div className="rate-info">
                  {(item.option36 || item.option37) && (
                    <h5>
                      {item.option37 && ` ${item.option37.toLocaleString()}`} 
                      {item.option37 && item.option36 ? ' / ' : ''} 
                      {item.option36 && item.option36.toLocaleString()}
                    </h5>
                  )}
                  {item.option4 && (
                    <span className={`purpose-${item.option4.toLowerCase().replace(' ', '_')}`}>
                      {item.option4}
                    </span>
                  )}
                </div>
              </div>
              <div className="card-footer">
                <div className="crd-links">
                  <span className="favorites-actions pull-left">
                    {!item.isFavorite && (
                      <a href="#" data-id={index} className="add-to-favorites">
                        <i className="la la-heart-o"></i>
                      </a>
                    )}
                    {item.isFavorite && (
                      <a href="#" data-id={index} className="remove-from-favorites">
                        <i className="la la-heart-o"></i>
                      </a>
                    )}
                    <i className="fa fa-spinner fa-spin fa-custom-ajax-indicator"></i>
                  </span>
                </div>
                <a href={item.url} title={item.option10} className="btn-default">View Details</a>
              </div>
            </div>
            <a href={item.url} title={item.option10} className="ext-link"></a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarListings;
