import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import ReactGA from 'react-ga4';
import { clarity } from 'react-microsoft-clarity';
import { AuthProvider } from './contexts/AuthContext.jsx';

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
import RentAgreementForm from './Components/Rent-Agreements/RentAgreementForm';
import PropertyListings from './Components/AdminPropertyUI/PropertyListings';
import LandVerification from './Components/LandVerification/LandVerification';
import LandMainPage from './Components/LandVerification/LandMainPage';
import LandRecords from './Components/LandVerification/LandRecords';
import ScrollToTop from './ScrollToTop';
import ExploreStates from './Components/Statewise/ExploreStates';
import StateDistricts from './Components/Statewise/StateDistricts';
import ReraVerificationForm from './Components/ReraVerification/ReraVerificationForm';
import Andromeda from './Components/Andromeda/Andromeda';
import PropertyListingForm from './Components/Form/PropertyListingForm';
import NewSearchListingPage from './Components/listingform/NewSearchListingPage';
import CRM from './pages/CRM';
import MainProperty from './Components/admindashboard/property/MainProperty';
import PropertyTable from './Components/admindashboard/property/PropertyTable';
import PropertyControl from './Components/admindashboard/property/PropertyControl';
import PropertyEditForm from './Components/admindashboard/property/PropertyEditForm';
import LoginAdmin from './Components/admindashboard/LoginAdmin';
import OwnerPage from './Components/ownerpage/OwnerPage';
import MainAdmin from './Components/NewAdmin.jsx/MainAdmin.jsx';
import RentalListings from './pages/RentalServices/RentalListings';
import ESignForm from './Components/ESign/ESignForm';
import DashboardComponent from './Components/userdashboard/DashboardComponent.jsx';
import PropertyDetails from './pages/RentalServices/PropertyDetails';
import UserProfileModernCard from './Components/userdashboard/UserProfileModernCard.jsx';
import UserLeadsManagement from './Components/userdashboard/UserLeadsManagement.jsx';
import UserPropertiesCardGrid from './Components/userdashboard/UserPropertiesCardGrid.jsx';
import BecomeFeaturedAgent from './Components/userdashboard/BecomeFeaturedAgent.jsx';
import BoosterPaymentResponse from './Components/userdashboard/BoosterPaymentResponse.jsx';
import ColivingNoida from './Components/coliving/ColivingNoida.jsx';
import RentAgreementContractDetail from './Components/RentAgreeement/RentAgreementContractDetail.jsx';
import Rent from './Components/RentAgreeement/Rent.jsx';
import PaymentVerification from './Components/RentAgreeement/PaymentVerification.jsx';

import Agreementgenerate from './Components/RentAgreeement/Agreementgenerate.jsx';
import Esign2 from './Components/ESign/Esign2.jsx';
import ESignSelectType from './Components/ESign/ESignSelectType.jsx';
import Esign3 from './Components/ESign/Esign3.jsx';
import AdminRent from './Components/admindashboard/Rentagreement/AdminRent.jsx';



// Scroll restoration component
const ScrollRestoration = () => {
  const location = useLocation();
  
  useLayoutEffect(() => {
    // Force scroll to top
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [location.pathname]);

  return null;
};

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
      <AuthProvider>
        <ScrollToTop />
        <ScrollRestoration />
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin-property" element={<AdminPropertyPage />} />
              <Route path="/oldsearch" element={<SearchPropertyPage />} />
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
              <Route path="/booster-payment-response" element={<BoosterPaymentResponse />} />

              <Route path="/home-loan" element={<HomeLoan />} />
              <Route path="/credit-score" element={<CreditScore />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/rentagreements" element={<RentMainPage />} />
              <Route path="/landverification" element={<LandMainPage />} />
              <Route path="/landverification/verify" element={<LandVerification />} />
              <Route path="/landrecord" element={<LandRecords />} />
              <Route path="/rent-agreement" element={<RentAgreementForm/>} />
              <Route path="/explorestate" element={<ExploreStates/>} />
              <Route path="/state/:stateName" element={<StateDistricts />} />
              <Route path="/ut/:stateName" element={<StateDistricts />} />
              <Route path="/reraverification" element={<ReraVerificationForm/>} />
              <Route path="/esign" element={<ESignForm />} />

              <Route path="/property-details/:property_name" element={<PropertyListedUserList />} />
              {/* sunny route */}
              <Route path="/form" element={<Phone />} />
              <Route path="/newform" element={<PropertyListingForm />} />
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
              <Route path="/states/:stateName" element={<StateDetails />} />
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
              {/* <Route path='/homelane' element={<HomeInterior/>} /> */}
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
              <Route path="/stateName/:stateName/city/:cityName" element={<CityWise />} />  
              <Route path='/proptech' element={<PropTechNews/>}/>
              <Route path='/singleblog/:id' element={<ArticleComponent/>}/>
              <Route path='/adminproperty/:id' element={<PropertyListings/>}/>
              <Route path='/andromeda' element={<Andromeda/>}/>
              {/* Route for residential properties */}
              <Route path='/search-property/:city/:configuration/:purpose/:buytype/:price' element={<NewSearchListingPage/>}/>
              {/* Route for plot/land and commercial properties */}
              <Route path='/search-property/:city/:purpose/:buytype/:price' element={<NewSearchListingPage/>}/>
              <Route path='/search-property' element={<NewSearchListingPage/>}/>
              <Route path="/crm" element={<CRM />} />
              <Route path='/adminpropertyacess' element={<MainProperty/>}/>
              <Route path='/adminpropertycontrol' element={<MainProperty/>}/>
              <Route path='/ownerProperty' element={<PropertyTable/>}/>
              <Route path='/adminproperty' element={<PropertyControl/>}/>
              <Route path='/editform/:index' element={<PropertyEditForm/>}/>
              <Route path='/adminlogin' element={<LoginAdmin/>}/>
              <Route path='/newownerpage/:id' element={<OwnerPage/>}/>
              <Route path='/newadminpage/:id' element={<MainAdmin/>}/>
              <Route path="/rental-listings" element={<RentalListings />} />
              <Route path='/userdashboard/:propertyId?' element={<DashboardComponent/>}/>
              <Route path="/rental-property/:id" element={<PropertyDetails />} />
              <Route path='/userdashboard-profile' element={<UserProfileModernCard/>}/>
              <Route path='/userdashboard-lead' element={<UserLeadsManagement/>}/>
              <Route path='/userdashboard-property' element={<UserPropertiesCardGrid/>}/>
              <Route path='/userdashboard-agent' element={<BecomeFeaturedAgent/>}/>
              <Route path='/newcoliving' element={<ColivingNoida/>}/>
              <Route path='/newRentAgreement' element={<Rent/>}/>
             
              <Route path='/newRentAgreement/payment/:userid?' element={<PaymentVerification/>}/>
              {/* <Route path='/newRentAgreement/landlord/:userid?' element={<PaymentVerification/>}/>
              <Route path='/newRentAgreement/tenant/:userid?' element={<PaymentVerification/>}/> */}
              <Route path='/rentvalue' element={<Agreementgenerate/>}/>
               <Route path='/esign2' element={<Esign2/>}/>
               <Route path='/esignoverview' element={<ESignSelectType/>}/>
               <Route path='/esign3/:userid?' element={<Esign3/>}/>
                <Route path='/RentController' element={<AdminRent/>}/>
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
