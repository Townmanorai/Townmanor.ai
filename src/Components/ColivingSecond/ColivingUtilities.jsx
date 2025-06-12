import React from 'react'
import { FiWifi } from 'react-icons/fi'
import { TbGasStation } from 'react-icons/tb'
import { HiOutlineLockClosed } from 'react-icons/hi2'
import { FaTruckMoving } from 'react-icons/fa'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import './ColivingUtilitiesUnique.css'

const utilities = [
  {
    icon: <FiWifi className="colivingUtilitiesUniqueIcon" />, label: 'WiFi', sub: 'Included'
  },
  {
    icon: <TbGasStation className="colivingUtilitiesUniqueIcon" />, label: 'Gas', sub: 'Pay per use'
  },
  {
    icon: <HiOutlineLockClosed className="colivingUtilitiesUniqueIcon" />, label: 'Code Lock', sub: 'Included'
  },
  {
    icon: <FaTruckMoving className="colivingUtilitiesUniqueIcon" />, label: 'Move-in Service', sub: '₹1,500'
  },
  {
    icon: <GiForkKnifeSpoon className="colivingUtilitiesUniqueIcon" />, label: 'DIY Kitchen', sub: 'Included'
  }
]

const ColivingUtilities = () => {
  return (
    <div className="colivingUtilitiesUniqueBox">
      <div className="colivingUtilitiesUniqueTitle">Utilities & Add-Ons</div>
      <div className="colivingUtilitiesUniqueGrid">
        {utilities.map((item, idx) => (
          <div className="colivingUtilitiesUniqueItem" key={idx}>
            {item.icon}
            <div className="colivingUtilitiesUniqueLabel">{item.label}</div>
            <div className="colivingUtilitiesUniqueSub">{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColivingUtilities