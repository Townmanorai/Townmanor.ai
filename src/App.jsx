// // src/App.js

// import React from 'react';
// // import SignUpForm from './SignUpForm';
// // import AgentList from './Agent/AgentList';
// import Home from './Components/HomePage/Home';
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// // import Property from './Property/Property';
// // import AuthContainer from './Auth/AuthContainer';
// // import Dashboard from './Dashboard/Dashboard';
// // import HomeLoan from './HomeLoan/HomeLoan';
// // import CreditScore from './Credit-Score/CreditScore';
// // import Insurance from './Insurance/Insurance';
// // import Navbar from './NavFooter/Navbar';
// // import Footer from './NavFooter/Footer';


// function App() {
//   return (
//     <div className="App">
//       {/* <Navbar /> */}
//       <Home />
//       {/* <SignUpForm /> */}
//       {/* <AgentList /> */}
//       {/* <Property /> */}
//       {/* <AuthContainer /> */}
//       {/* <Dashboard /> */}
//       {/* <HomeLoan /> */}
//       {/* <CreditScore /> */}
//       {/* <Insurance /> */}
//       {/* <Footer /> */}
//     </div>
//   );
// }

// export default App;


// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './SignUpForm';
// import AgentList from './Components/Agent/AgentList';
import Home from './Components/HomePage/Home';
import Property from './Components/Property/Property';
// import AuthContainer from './Components/Auth/AuthContainer';
import Dashboard from './Components/Dashboard/Dashboard';
import HomeLoan from './Components/HomeLoan/HomeLoan';
import CreditScore from './Components/Credit-Score/CreditScore';
import Insurance from './Components/Insurance/Insurance';
import Navbar from './Components/NavFooter/Navbar';
import Footer from './Components/NavFooter/Footer';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import PricingPlans from './Components/PropertyPlans/PricingPlans';
import StateDetails from './Components/Statewise/StateDetails';
import PropertiesForSaleRent from './Components/Statewise/PropertiesForSaleRent';
import PayHouseTaxOnline from './Components/Statewise/PayHouseTaxOnline';
import LandRecordVerification from './Components/Statewise/LandRecordVerification';
import RERA from './Components/Statewise/RERA';
import CityWise from './Components/Statewise/CityWise';
// import SearchPropertyPage from './Components/SearchProperty/SearchPropertyPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          {/* <Route path="/agents" element={<AgentList />} /> */}
          <Route path="/property" element={<Property />} />
          {/* <Route path="/auth" element={<AuthContainer />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home-loan" element={<HomeLoan />} />
          <Route path="/credit-score" element={<CreditScore />} />
          <Route path="/insurance" element={<Insurance />} />
          {/* <Route path="/pricingplans" element={<PricingPlans />} /> */}
          {/* <Route path="/searchpropertypage" element={<SearchPropertyPage />} /> */}


          {/* Dynamic Route for State */}
          <Route path="/state/:stateName" element={<StateDetails />} />

          {/* You can also add dynamic routes for specific city or option pages */}
          <Route path="/properties-for-sale-rent/:stateName" element={<PropertiesForSaleRent />} />
          <Route path="/pay-house-tax-online/:stateName" element={<PayHouseTaxOnline />} />
          <Route path="/land-record-verification/:stateName" element={<LandRecordVerification />} />
          <Route path="/rera/:stateName" element={<RERA />} />
          <Route path="/stateName/:stateName/city/:cityName" element={<CityWise />} />  {/* Example for city route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
