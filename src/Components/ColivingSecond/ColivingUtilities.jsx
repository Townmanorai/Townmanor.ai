import React from 'react'

import { TbGasStation } from 'react-icons/tb'
import { HiOutlineLockClosed } from 'react-icons/hi2'
import { FaTruckMoving } from 'react-icons/fa'

import './ColivingUtilitiesUnique.css'
import { FiWifi } from "react-icons/fi";
import { TbPlug } from "react-icons/tb";

import { GiForkKnifeSpoon, GiWaterDrop } from "react-icons/gi";
import { FaTshirt } from "react-icons/fa";
const utilities = [
  {
    icon: <FiWifi className="colivingUtilitiesUniqueIcon" />,
    label: 'WiFi',
    sub: 'Included'
  },
  {
    icon: <HiOutlineLockClosed className="colivingUtilitiesUniqueIcon" />,
    label: 'Code Lock',
    sub: 'Included'
  },
  {
    icon: <GiForkKnifeSpoon className="colivingUtilitiesUniqueIcon" />,
    label: 'DIY Kitchen',
    sub: 'Included'
  },
  {
    icon: <TbPlug className="colivingUtilitiesUniqueIcon" />,
    label: 'Electric Built-in Hob',
    sub: 'Included'
  },
  {
    icon: <GiWaterDrop className="colivingUtilitiesUniqueIcon" />,
    label: 'Built-in RO',
    sub: 'Included'
  },
  {
    icon: <FaTshirt className="colivingUtilitiesUniqueIcon" />,
    label: 'Washing Machine',
    sub: 'Included'
  }
];


const ColivingUtilities = () => {
  return (
    <div id='colivingutility'>
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
  </div>
  )
}

export default ColivingUtilities