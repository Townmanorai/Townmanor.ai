import React, { useState, useEffect } from 'react';
import { 
  MdList, 
  MdSubscriptions, 
  MdFilterList, 
  MdStar, 
  MdEmail, 
  MdPerson,
  MdLeaderboard
} from 'react-icons/md';
import MyProperties from './MyProperties';
import MySubscription from './MySubscription';
import ResearchContent from './ResearchContent';
import FavoritesContent from './FavoritesContent';
import InquiriesContent from './InquiriesContent';
import ProfileContent from './ProfileContent';
import "../../common.css";
import "../../commonsecond.css";
import Propertylead from './Propertylead';

// Dummy JSON data

// const packageData = [
//   {
//     id: 2,
//     name: "Starter",
//     price: "200.00 INR",
//     daysLimit: "30, 2024-09-21 12:20:46",
//     listingsLimit: 1,
//     featuredLimit: 1
//   }
// ];

// const subscriptionData = [
//   {
//     invoiceNo: '2_PAC_83_200.00_4',
//     date: '2024-08-22 15:50:08',
//     description: 'New Property',
//     packageValid: '30 Days, 2024-09-21 15:50:08',
//     amount: '200.00 / INR',
//     gst: 18,
//     gstAmount: 36,
//     totalAmount: '236.00'
//   }
// ];

// const profileData = {
//   name_surname: 'Ravindra',
//   username: 'ravindra',
//   gstNo: '',
//   password: '',
//   password_confirm: '',
//   address: '',
//   description: '',
//   phone: '',
//   mail: 'rnjha2001@gmail.com',
// };


const DashboardNavbar = ({propertyData ,packageData,subscriptionData,profileData}) => {
  const [activeTab, setActiveTab] = useState('properties'); 

  // Debug logs for props
  useEffect(() => {
    console.log('DashboardNavbar Props:', {
      propertyData,
      packageData,
      subscriptionData,
      profileData
    });
  }, [propertyData, packageData, subscriptionData, profileData]);

  const handleTabChange = (tab) => {
    console.log('Tab changed to:', tab);
    setActiveTab(tab);
  };

  const renderContent = () => {
    console.log('Rendering content for tab:', activeTab);
    switch (activeTab) {
      case 'properties':
        console.log('Rendering MyProperties with data:', { propertyData, packageData });
        return <MyProperties propertyData={propertyData} packageData={packageData}/>;
      case 'subscription':
        console.log('Rendering MySubscription with data:', subscriptionData);
        return <MySubscription subscriptionData={subscriptionData} />;
      case 'research':
        console.log('Rendering ResearchContent');
        return <ResearchContent />;
      case 'favorites':
        console.log('Rendering FavoritesContent');
        return <FavoritesContent />;
      case 'inquiries':
        console.log('Rendering InquiriesContent');
        return <InquiriesContent />;
      case 'profile':
        console.log('Rendering ProfileContent with data:', profileData);
        return <ProfileContent profileData={profileData}/>;
      case 'lead':
        console.log('Rendering Propertylead with data:', propertyData);
        return <Propertylead propertyData={propertyData}/>;
      case 'bank':
        console.log('Rendering Bank Payment Details');
        return <div className="content-box"><p>Bank Payment Details go here.</p></div>;
      default:
        console.log('No content to render for tab:', activeTab);
        return null;
    }
  };

  return (
    <div className="container m-padding">
      <div className="widget-header header-styles py-5">
        <div className="col-xl-12 col-12 d-block">
          <div className="header-address">
            <a href="#" onClick={() => handleTabChange('properties')}>
              <MdList size={20} /> <span>My properties</span>
            </a>
            <a href="#" onClick={() => handleTabChange('subscription')}>
              <MdSubscriptions size={20} /> <span>My Subscription</span>
            </a>
            <a href="#" onClick={() => handleTabChange('research')}>
              <MdFilterList size={20} /> <span>My research</span>
            </a>
            <a href="#" onClick={() => handleTabChange('favorites')}>
              <MdStar size={20} /> <span>My favorites</span>
            </a>
            <a href="#" onClick={() => handleTabChange('inquiries')}>
              <MdEmail size={20} /> <span>My inquiries</span>
            </a>
            <a href="#" onClick={() => handleTabChange('profile')}>
              <MdPerson size={20} /> <span>My profile</span>
            </a>
            <a href="#" onClick={() => handleTabChange('lead')}>
              <MdLeaderboard size={20} /> <span>My proprty lead</span>
            </a>
            {/* <a href="#" onClick={() => setActiveTab('bank')}>
              <i className="fa fa-bank"></i> <span>Bank payment details</span>
            </a> */}
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default DashboardNavbar;
