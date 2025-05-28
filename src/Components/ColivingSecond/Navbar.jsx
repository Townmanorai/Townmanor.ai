import React from 'react';
import './Navbar.css';
import { FaHome, FaRulerCombined, FaParking, FaBuilding } from 'react-icons/fa';

const Navbar = () => {
    return (
        <>
            <nav className='townmanor_coliving_navbar'>
                <h1>Hustle Bustle, Kadubisanahalli</h1>
                <button className='townmanor_coliving_contact_btn'>Contact Agent</button>
            </nav>
            <div className='townmanor_coliving_property_details'>
                <div className='townmanor_coliving_info_element'>
                    <FaHome className='townmanor_coliving_icon' />
                    <span>2BHK Apartment</span>
                </div>
                <div className='townmanor_coliving_info_element'>
                    <FaRulerCombined className='townmanor_coliving_icon' />
                    <span>1200 sq.ft</span>
                </div>
                <div className='townmanor_coliving_info_element'>
                    <FaParking className='townmanor_coliving_icon' />
                    <span>1 Parking Space</span>
                </div>
                <div className='townmanor_coliving_info_element'>
                    <FaBuilding className='townmanor_coliving_icon' />
                    <span>4th Floor</span>
                </div>
            </div>
        </>
    );
}

export default Navbar;