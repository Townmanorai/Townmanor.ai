import React from 'react';

const AdminPropertyPage = () => {
  // Dummy JSON data
  const listings = [
    {
      id: 1336,
      title: "Park Palace",
      location: "Sector 54, Golf Course Road",
      price: "₹1,35,000 monthly",
      imageUrls: [
        "https://townmanor.in/files/strict_cache/851x678whatsapp_image_2024_06_20_at_51748_pm_2.webp",
        "https://townmanor.in/files/strict_cache/851x678whatsapp_image_2024_06_20_at_51749_pm_1.webp",
        "https://townmanor.in/files/strict_cache/851x678whatsapp_image_2024_06_20_at_51748_pm_1.webp"
      ],
      features: ["4 Bathrooms", "3 Bedrooms", "Carpet Area 1519 sq.ft"],
      daysAgo: 1
    },
    {
      id: 1269,
      title: "Max Estate360",
      location: "Sector 36A, Gurugram",
      price: "₹5 Cr onwards",
      imageUrls: [
        "https://townmanor.in/files/strict_cache/851x678max3%20%281%29.jpg",
        "https://townmanor.in/files/strict_cache/851x678max5%20%281%29.jpg",
        "https://townmanor.in/files/strict_cache/851x678max4%20%281%29.jpg"
      ],
      features: ["Configuration (BHK) 3,3.5,4", "Carpet Area 1404-1899 sq.ft"],
      daysAgo: 18
    },
    {
      id: 29,
      title: "Godrej Woods",
      location: "Sector 43, Noida",
      price: "₹2.5 Cr onwards",
      imageUrls: [
        "https://townmanor.in/files/strict_cache/851x678godrej_woods_1.jpg",
        "https://townmanor.in/files/strict_cache/851x678godrej_woods_2.jpg",
        "https://townmanor.in/files/strict_cache/851x678godrej_woods_3.jpg"
      ],
      features: ["3 Bedrooms", "2 Bathrooms", "Carpet Area 1200 sq.ft"],
      daysAgo: 25
    }
  ];

  return (
    <>
    <div></div>
    <div className="list-products">
      <div className="row">
        {listings.map((listing) => (
          <div className="col-md-6" key={listing.id}>
            <div className="card">
              <a href={`https://townmanor.in/property/${listing.id}/en/${listing.title.toLowerCase().replace(/\s+/g, '_')}`} title={listing.title}>
                <div className="img-block">
                  <span className="verifiedBadge">Verified</span>
                  <div className="overlay"></div>
                  <div className="budget"><i className="fa fa-star"></i></div>

                  <div id={`listing_carousel_${listing.id}`} className="carousel slide carousel-listing" data-ride="carousel" data-interval="false">
                    <ol className="carousel-indicators">
                      {listing.imageUrls.map((_, index) => (
                        <li key={index} data-target={`#listing_carousel_${listing.id}`} data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                      ))}
                    </ol>
                    <div className="carousel-inner">
                      {listing.imageUrls.map((url, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <img src={url} alt={listing.title} className="d-block w-100 img-fluid" />
                        </div>
                      ))}
                    </div>
                    <span className="carousel-control-prev disable_scroll" href={`#listing_carousel_${listing.id}`} role="button" data-slide="prev">
                      <i className="fa fa-angle-left"></i>
                    </span>
                    <span className="carousel-control-next disable_scroll" href={`#listing_carousel_${listing.id}`} role="button" data-slide="next">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </div>
                </div>
              </a>
              <div className="card-body">
                <a href={`https://townmanor.in/property/${listing.id}/en/${listing.title.toLowerCase().replace(/\s+/g, '_')}`} title={listing.title}>
                  <h3>{listing.title}</h3>
                  <div className="rate-info">
                    <h5>{listing.price}</h5>
                    <span className="purpose-rent_properties">Rent Properties</span>
                  </div>
                  <p><i className="la la-map-marker"></i>{listing.location}</p>
                </a>
                <ul>
                  {listing.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <span className="favorites-actions pull-left">
                  <a href="#" className="add-to-favorites"><i className="la la-heart-o"></i></a>
                </span>
                <a href="#" className="pull-right"><i className="la la-calendar-check-o"></i> {listing.daysAgo} days ago</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AdminPropertyPage;
