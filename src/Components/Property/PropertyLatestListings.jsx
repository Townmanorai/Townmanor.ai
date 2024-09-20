import React from 'react';



// Dummy JSON data for top listings
const topListings = [
  {
    id: 1,
    url: '/listing/1',
    title: 'Luxury Apartment in New York',
    thumbnailUrl: 'assets/img/listings/thumb1.jpg',
    priceOption37: '$350,000',
    priceOption36: '$1,200/month',
    address: 'Downtown, New York',
  },
  {
    id: 2,
    url: '/listing/2',
    title: 'Cozy Family Home in California',
    thumbnailUrl: 'assets/img/listings/thumb2.jpg',
    priceOption37: '$450,000',
    priceOption36: '',
    address: 'Suburbs, California',
  },
  {
    id: 3,
    url: '/listing/3',
    title: 'Modern Condo in Chicago',
    thumbnailUrl: 'assets/img/listings/thumb3.jpg',
    priceOption37: '$250,000',
    priceOption36: '$900/month',
    address: 'City Center, Chicago',
  },
];

const LatestListings = () => {
  return (
    <div className="widget widget-posts widget_edit_enabled">
      <h3 className="widget-title">Popular Listings</h3>
      <ul>
        {topListings.map((item) => (
          <li key={item.id}>
            <div className="wd-posts">
              <div className="ps-img">
                <a href={item.url} title={item.title}>
                  <img src={item.thumbnailUrl} alt={item.title} />
                </a>
              </div>
              <div className="ps-info">
                <h3>
                  <a href={item.url} title={item.title}>
                    {item.title}
                  </a>
                </h3>
                <strong>
                  {item.priceOption37 && item.priceOption37}
                  {item.priceOption37 && item.priceOption36 && ' / '}
                  {item.priceOption36 && item.priceOption36}
                </strong>
                <span>
                  <i className="la la-map-marker"></i> {item.address}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestListings;
