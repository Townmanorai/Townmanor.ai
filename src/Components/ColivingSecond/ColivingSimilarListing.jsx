import React from 'react'
import './ColivingSimilarListing.unique.css'

const similarListingsData = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    title: 'Lakeside Residency, Indiranagar',
    details: '2BHK Apartment · 1500 sq.ft',
    price: '₹32,000/month',
    badge: 'Available',
    badgeType: 'now',
  },
  {
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80',
    title: 'Green Valley, Koramangala',
    details: '3BHK Apartment · 1700 sq.ft',
    price: '₹40,000/month',
    badge: 'Available',
    badgeType: 'now',
  },
  {
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
    title: 'Prestige Heights, Whitefield',
    details: '2BHK Apartment · 1400 sq.ft',
    price: '₹28,000/month',
    badge: 'Available July 15',
    badgeType: 'later',
  },
]

const ColivingSimilarListing = () => {
  return (
    <div className="similar-listing-unique">
      <div className="similar-listing-title-unique">Similar Listings</div>
      <div className="similar-listing-cards-unique">
        {similarListingsData.map((item, idx) => (
          <div className="similar-listing-card-unique" key={idx}>
            <img src={item.image} alt={item.title} className="similar-listing-img-unique" />
            <div className={`similar-listing-badge-unique${item.badgeType === 'later' ? ' similar-listing-badge-unique-later' : ''}`}>{item.badge}</div>
            <div className="similar-listing-card-content-unique">
              <div className="similar-listing-title2-unique">{item.title}</div>
              <div className="similar-listing-details-unique">{item.details}</div>
              <div className="similar-listing-price-unique">{item.price}</div>
            </div>
            <button className="similar-listing-heart-unique" aria-label="Save listing">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0l-.9.9-.9-.9a5.5 5.5 0 0 0-7.8 7.8l.9.9 7.8 7.8 7.8-7.8.9-.9a5.5 5.5 0 0 0 0-7.8z"></path></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColivingSimilarListing