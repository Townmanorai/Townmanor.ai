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
              <div className="similar-listing-details-unique">
                <span className="similar-listing-icon-unique" title="Bedrooms">
                  {/* Bed/BHK icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M3 17V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10"/><path d="M7 17V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8"/></svg>
                </span>
                {item.details.split('·')[0].trim()}
                <span className="similar-listing-icon-unique" title="Area" style={{marginLeft: '16px'}}>
                  {/* Area icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
                </span>
                {item.details.split('·')[1] ? item.details.split('·')[1].trim() : ''}
              </div>
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