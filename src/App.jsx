
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import ReactGA from 'react-ga4';
import { clarity } from 'react-microsoft-clarity';

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
import Phone from './Components/Form/Phone';
import PhoneSearch from './Components/SearchBar/PhoneSearch';
import MainSearch from './Components/SearchBar/MainSearch';
import HomeLane from './Components/HomeInterior/HomeLane';
// import Commercial3 from './Components/Commercial/Commercial3';
import ModularKitchen from './Components/HomeInterior/ModularKitchen';
import WardDrobes from './Components/HomeInterior/WardDrobes';
import Masterbedroom from './Components/HomeInterior/Masterbedroom';
import Tv from './Components/HomeInterior/Tv';
import Livingroom from './Components/HomeInterior/Livingroom';
import FalseCeling from './Components/HomeInterior/FalseCeling';
import Bathroom from './Components/HomeInterior/Bathroom';
import Kids from './Components/HomeInterior/Kids';
import FullHouseinterior from './Components/HomeInterior/FullHouseInterior';
import CommercialInterior from './Components/HomeInterior/CommercialInterior';
import Officeinterior from './Components/HomeInterior/OfficeInterior';
import Bedroom from './Components/HomeInterior/Bedroom';
import Furniture from './Components/HomeInterior/Furniture';
import Footer from './Components/NavFooter/Footer';
import StateDetails from './Components/Statewise/StateDetails';
import ForgotPassword from './Components/Auth/ForgotPassword';
import Signup from './Components/Auth/SignUpForm';
import Commercial3 from './Components/Commercial/Commercial3';
import Commercial from './Components/Commercial/Commercial';
import HomeShift from './Components/HomeShift/HomeShift';
import Article from './Components/Article/Article';
import LeaseProperty from './Components/Commercial/LeaseProperty';
import Propertx from './Components/OwnerAgent/Property';
import Commercialform2 from './Components/Commercial/Commercialform2';
import UserListPropertyPage from './Components/SubComponent/UserListPropertyPage';
import Transaction from './Components/PayU/Transaction';
import Success2 from './Components/PayU/Success2';
import Failure2 from './Components/PayU/Failure2';
import HomeInterior from './Components/HomeInteriors/HomeInterior';
import CityWise from './Components/Statewise/CityWise';
import Services from './Components/HomePage/Services';
// import HomeShift from './HomeShift/HomeShift';

import AgentList from './Components/AgentList/AgentList';
import AgentForm from './Components/AgentForm/AgentForm';
import Profile from './Components/AgentProfile/Profile';
import EditForm from './Components/AgentForm/EditForm';
import SignUpForm from './Components/AgentForm/SignUpForm';
// import Livspace from './Components/HomeInterior/Livspace';
import Coliving_space from './Components/HomePage/Coliving_space';
import RentMainPage from './Components/Rent-Agreements/RentMainPage';
import PropTechNews from './Components/BlogModule/PropTechNews';
import ArticleComponent from './Components/BlogModule/ArticleComponent';
import PropertyListings from './Components/AdminPropertyUI/PropertyListings';


function App() {
  const [currentUser, setCurrentUser] = useState(null); // State to hold the current user

  const handleUserLogin = (user) => {
    setCurrentUser(user); // Set the current user when logging in
    // console.log(currentUser);
  };

  const TRACKING_ID = 'G-8BXTW1K1HT'; // YOUR_OWN_TRACKING_ID
  const CLARITY_PROJECT_ID  = 'q9k1rf7eqb'; // YOUR_OWN_TRACKING_ID
  useEffect(() => {
    // Initialize GA
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    
    // Initialize Clarity (typically only in production)
    if (process.env.NODE_ENV === 'production') {
      clarity.init(CLARITY_PROJECT_ID);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-property" element={<AdminPropertyPage />} />
        <Route path="/search-property" element={<SearchPropertyPage />} />
        <Route path="/auth" element={<AuthContainer onUserLogin={handleUserLogin} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot Password Route */}
        <Route path="/sign-up" element={<Signup />} /> {/* Sign Up Route */}
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
        <Route path="/services" element={<Services />} />
        <Route path="/failure" element={<Failure />} />

        <Route path="/home-loan" element={<HomeLoan />} />
        <Route path="/credit-score" element={<CreditScore />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/rentagreements" element={<RentMainPage />} />

        <Route path="/property-details/:property_name" element={<PropertyListedUserList />} />
        {/* sunny route */}
        <Route path="/form" element={<Phone />} />
        <Route path="/search/:name" element={<PhoneSearch />} />
        <Route path="/Searchbar" element={<MainSearch />} />
        <Route path='/homelane' element={<HomeLane />} />
        <Route path='/homelane/kitchen' element={<ModularKitchen />} />
        <Route path='/homelane/warddrobe' element={<WardDrobes />} />
        <Route path='/homelane/masterbedroom' element={<Masterbedroom />} />
        <Route path='/homelane/tv' element={<Tv />} />
        <Route path='/homelane/livingroom' element={<Livingroom />} />
        <Route path='/homelane/falseceiling' element={<FalseCeling />} />
        <Route path='/homelane/bathroom' element={<Bathroom />} />
        <Route path='/homelane/kids' element={<Kids />} />
        <Route path='/homelane/fullhouseinterior' element={<FullHouseinterior />} />
        <Route path='/homelane/commercialinterior' element={<CommercialInterior />} />
        <Route path='/homelane/officeinterior' element={<Officeinterior />} />
        <Route path='/homelane/bedroom' element={<Bedroom />} />
        <Route path='/homelane/furniture' element={<Furniture />} />

        {/* Dynamic Route for State */}
        <Route path="/state/:stateName" element={<StateDetails />} />
        <Route path="/commercial3/:index" element={<Commercial3 />} />
        <Route path='/homeShift' element={<HomeShift />}></Route>
        <Route path="/commercial" element={<Commercial />} />
        <Route path='/article/:id' element={<Article />}></Route>
        <Route path="/commercialform" element={<LeaseProperty />} />
        <Route path="/home/:id" element={<UserListPropertyPage />} />
        <Route path="/propertyOA" element={<Propertx />} />
        <Route path="/commercialform2" element={<Commercialform2 />} />
        <Route path='/Success2' element={<Success2/>} />
        <Route path='/Failure2' element={<Failure2/>} />
        <Route path='/Transaction' element={<Transaction/>} />
        <Route path='/HomeInt' element={<HomeInterior/>} />
        <Route path="/agents" element={<AgentForm />} />
        <Route path="/agentlist" element={<AgentList />} />
        <Route path="/agent/:id" element={<Profile />} />
        <Route path="/agents/edit" element={<EditForm />} />
        <Route path="/agents/form" element={<SignUpForm />} />
        {/* <Route path="/Livspace" element={<Livspace/>}/> */}
        <Route path="Coliving" element={<Coliving_space/>}/>
        {/* You can also add dynamic routes for specific city or option pages */}
        {/* <Route path="/properties-for-sale-rent/:stateName" element={<PropertiesForSaleRent />} /> */}
          {/* <Route path="/pay-house-tax-online/:stateName" element={<PayHouseTaxOnline />} /> */}
          {/* <Route path="/land-record-verification/:stateName" element={<LandRecordVerification />} /> */}
          {/* <Route path="/rera/:stateName" element={<RERA />} /> */}
          <Route path="/stateName/:stateName/city/:cityName" element={<CityWise />} />  Example for city route
          <Route path='/proptech' element={<PropTechNews/>}/>
          <Route path='/singleblog/:id' element={<ArticleComponent/>}/>
          <Route path='/adminproperty' element={<PropertyListings/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
