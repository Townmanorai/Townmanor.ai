// import { useState } from 'react'
// import './App.css'
// import AdminPropertyPage from './Components/AdminPropertyUI/AdminPropertyPage'
// import SearchProperty from './Components/SearchProperty/SearchProperty'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import SearchPropertyPage from './Components/SearchProperty/SearchPropertyPage'
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import AuthContainer from './Components/Auth/AuthContainer';
// import PricingPlans from './Components/PropertyPlans/PricingPlans';
// import SubscriptionPricingPlan from './Components/PropertyPlans/WithoutMapSubscritionPlan';
// import Dashboard from './Components/Dashboard/Dashboard';

// function App() {


//   return (
//     <>
//       {/* <AdminPropertyPage /> */}
//       <SearchPropertyPage />
//       {/* <AuthContainer /> */}
//       {/* <PricingPlans /> */}
//       {/* <SubscriptionPricingPlan /> */}
//       {/* <Dashboard /> */}
//     </>
//   )
// }

// export default App

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary modules from react-router-dom
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// import AdminPropertyPage from './Components/AdminPropertyUI/AdminPropertyPage';
// import SearchProperty from './Components/SearchProperty/SearchProperty';
// import SearchPropertyPage from './Components/SearchProperty/SearchPropertyPage';
// import AuthContainer from './Components/Auth/AuthContainer';
// import SubscriptionPricingPlan from './Components/PropertyPlans/WithoutMapSubscritionPlan';
// import Dashboard from './Components/Dashboard/Dashboard';

// // Import the new payment-related components
// import PaymentForm from './Components/PayU/PaymentForm';
// import Success from './Components/PayU/Success';
// import Failure from './Components/PayU/Failure';
// import Property from './Components/Property/Property';
// import FeaturedAgentForm from './Components/Form/FeaturedAgentForm';
// import Home from './Components/HomePage/Home';
// import Navbar from './Components/NavFooter/Navbar';
// import PricingPlans from './Components/PropertyPlans/PricingPlans';

// function App() {
//   return (
//     <Router> {/* Wrap the app in Router */}
//     <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} /> {/* Set the default route */}
//         <Route path="/admin-property" element={<AdminPropertyPage />} />
//         <Route path="/search-property" element={<SearchPropertyPage />} />
//         <Route path="/auth" element={<AuthContainer />} />
//         <Route path="/pricing-plans" element={<PricingPlans />} />
//         <Route path="/subscription-plans" element={<SubscriptionPricingPlan />} />
//         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//         <Route path="/dashboard/:username" element={<Dashboard />} />
//         <Route path="/property/:id" element={<Property />} />
//         <Route path="/featured-agent-form" element={<FeaturedAgentForm />} />

//         {/* New routes for the PayU payment integration */}
//         <Route path="/SubPlan" element={<PricingPlans />} /> {/* Payment form route */}
//         <Route path="/payment" element={<PaymentForm />} /> {/* Payment form route */}
//         <Route path="/success" element={<Success />} /> {/* Success page */}
//         <Route path="/failure" element={<Failure />} /> {/* Failure page */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


//--------------------------------------------------------------------------------------------------------------------------------------

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import AdminPropertyPage from './Components/AdminPropertyUI/AdminPropertyPage';
import SearchProperty from './Components/SearchProperty/SearchProperty';
import SearchPropertyPage from './Components/SearchProperty/SearchPropertyPage';
import AuthContainer from './Components/Auth/AuthContainer';
import SubscriptionPricingPlan from './Components/PropertyPlans/WithoutMapSubscritionPlan';
import Dashboard from './Components/Dashboard/Dashboard';
import PaymentForm from './Components/PayU/PaymentForm';
import Success from './Components/PayU/Success';
import Failure from './Components/PayU/Failure';
import Property from './Components/Property/Property';
import FeaturedAgentForm from './Components/Form/FeaturedAgentForm';
import Home from './Components/HomePage/Home';
import Navbar from './Components/NavFooter/Navbar';
import PricingPlans from './Components/PropertyPlans/PricingPlans';
import HomeLoan from './Components/HomeLoan/HomeLoan';
import CreditScore from './Components/Credit-Score/CreditScore';
import Insurance from './Components/Insurance/Insurance';
import PropertyListedUserList from './Components/HomePage/PropertyListedUserList';

function App() {
  const [currentUser, setCurrentUser] = useState(null); // State to hold the current user

  const handleUserLogin = (user) => {
    setCurrentUser(user); // Set the current user when logging in
    console.log(currentUser);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-property" element={<AdminPropertyPage />} />
        <Route path="/search-property" element={<SearchPropertyPage />} />
        <Route path="/auth" element={<AuthContainer onUserLogin={handleUserLogin} />} />
        <Route path="/pricing-plans" element={<PricingPlans />} />
        <Route path="/subscription-plans" element={<SubscriptionPricingPlan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:username/property/:id" element={<Property />} />
        <Route path="/property/:id" element={<Property />} />
        {/* Conditional routes based on whether a username exists */}
        {/* {currentUser ? (
          <Route path="/:username/property/:id" element={<Property />} />
        ) : (
          <Route path="/property/:id" element={<Property />} />
        )} */}
        <Route path="/featured-agent-form" element={<FeaturedAgentForm />} />
        <Route path="/SubPlan" element={<PricingPlans />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />

        <Route path="/home-loan" element={<HomeLoan />} />
        <Route path="/credit-score" element={<CreditScore />} />
        <Route path="/insurance" element={<Insurance  />} />

        <Route path="/property-details/:property_name" element={<PropertyListedUserList />} />

          {/* Dynamic Route for State */}
          {/* <Route path="/state/:stateName" element={<StateDetails />} /> */}

          {/* You can also add dynamic routes for specific city or option pages */}
          {/* <Route path="/properties-for-sale-rent/:stateName" element={<PropertiesForSaleRent />} />
          <Route path="/pay-house-tax-online/:stateName" element={<PayHouseTaxOnline />} />
          <Route path="/land-record-verification/:stateName" element={<LandRecordVerification />} />
          <Route path="/rera/:stateName" element={<RERA />} />
          <Route path="/stateName/:stateName/city/:cityName" element={<CityWise />} />  Example for city route */}
      </Routes>
    </Router>
  );
}

export default App;
