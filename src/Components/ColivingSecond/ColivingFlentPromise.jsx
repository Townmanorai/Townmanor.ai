import React from 'react'
import './flentpromise-unique.css'

const flentPromiseData = [
  {
    icon: '/building.png',
    label: 'Low Deposit',
    alt: 'Low Deposit',
  },
  {
    icon: '/brokerage.png',
    label: 'Zero Brokerage',
    alt: 'Zero Brokerage',
  },
  {
    icon: '/customer-service.png',
    label: 'Quick Resolution',
    alt: 'Quick Resolution',
  },
  {
    icon: '/engineer.png',
    label: 'Maintenance Support',
    alt: 'Maintenance Support',
  },
]

const ColivingFlentPromise = () => {
  return (
    <div className="flentpromise-unique-bg">
      <div className="flentpromise-unique-title">The Flent Promise</div>
      <div className="flentpromise-unique-list">
        {flentPromiseData.map((item, idx) => (
          <div className="flentpromise-unique-item" key={idx}>
            <span className="flentpromise-unique-iconwrap">
              <img src={item.icon} alt={item.alt} style={{width: 24, height: 24}} />
            </span>
            <span className="flentpromise-unique-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColivingFlentPromise