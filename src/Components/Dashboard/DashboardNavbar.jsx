import React, { useState } from 'react';
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

  // console.log("ProfileData User" , profileData);

  const renderContent = () => {
    switch (activeTab) {
      case 'properties':
        return <MyProperties propertyData={propertyData} packageData={packageData}/>;
      case 'subscription':
        return <MySubscription  subscriptionData={subscriptionData} />;
      case 'research':
        return <ResearchContent />;
      case 'favorites':
        return <FavoritesContent />;
      case 'inquiries':
        return <InquiriesContent />;
      case 'profile':
        return <ProfileContent profileData={profileData}/>;
      case 'lead':
        return <Propertylead propertyData={propertyData}/>;
      case 'bank':
        return <div className="content-box"><p>Bank Payment Details go here.</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="container m-padding">
      <div className="widget-header header-styles py-5">
        <div className="col-xl-12 col-12 d-block">
          <div className="header-address">
            <a href="#" onClick={() => setActiveTab('properties')}>
              <i className="fa fa-list"></i> <span>My properties</span>
            </a>
            <a href="#" onClick={() => setActiveTab('subscription')}>
              <i className="fa fa-list"></i> <span>My Subscription</span>
            </a>
            <a href="#" onClick={() => setActiveTab('research')}>
              <i className="fa fa-filter"></i> <span>My research</span>
            </a>
            <a href="#" onClick={() => setActiveTab('favorites')}>
              <i className="fa fa-star"></i> <span>My favorites</span>
            </a>
            <a href="#" onClick={() => setActiveTab('inquiries')}>
              <i className="fa fa-envelope"></i> <span>My inquiries</span>
            </a>
            <a href="#" onClick={() => setActiveTab('profile')}>
              <i className="fa fa-user"></i> <span>My profile</span>
            </a>
            <a href="#" onClick={() => setActiveTab('lead')}>
              <i className="fa fa-user"></i> <span>My proprty lead</span>
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
