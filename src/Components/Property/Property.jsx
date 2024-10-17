// // import React from 'react'
// // import Property_image_slider from './Property_image_slider'
// // import Navbar from '../NavFooter/Navbar'
// // import PropertyTopHeader from './PropertyTopHeader'
// // import Property_Desc from './Property_Desc'
// // import Property_Energy_saving from './Property_Energy_saving'
// // import Property_Documents from './Property_Documents'
// // import PropertyDetails from './PropertyDetails'
// // import PropertyAmenities from './PropertyAmenities'
// // import PropertyAmenitiesOutdoor from './PropertyAmenitiesOutdoor'
// // import PropertyDistanceDetails from './PropertyDistanceDetails'
// // import PropertyDynamicCategories from './Property_center_dynamic_categories'
// // import PropertyFloorPlan from './Property_FloorPlan'
// // import PropertyRates from './Property_rates_table'
// // import PropertyLocation from './Property_Map_Location'
// // import PropertyWalkScore from './Property_center_walkscore'
// // import PropertyReviewSection from './Property_ReviewSection'
// // import PropertyFacebookComments from './Property_Facebook_Comment'
// // import AdsWidget from './Ads_In_Property'
// // import FeaturedRightAgents from './Property_right_Featured_agent'
// // import ContactListingAgent from './Property_right_Form_contact'
// // import DownloadBrochure from './Property_Brochure'
// // import RightLatestListings from './Property_right_Listing'
// // import MortgageCalculator from './Property_EMI_Calculator'
// // import PropertyRightQRCode from './Property_right_QR_code'
// // import RightPrint from './Property_right_print'
// // import PropertyCompare from './Property_Compare'
// // import RightAds from './Property_right_ads'
// // import SimilarListings from './Property_Similar_Listing'
// // import Footer from '../NavFooter/Footer'

// // import PropertyJson from "./PropertyJson.json"

// // function Property() {
// //     return (
// //         <div>

// //             <section class="property-single-pg">
// //                 <div class="container-fluid px-5">
// //                     {/* <AdsWidget /> */}
// //                     <div class="property-single-page-content">
// //                         <div class="row prop-spacing-left-right">
// //                             <div class="col-md-12">
// //                                 <div class="prop-image-slider"><Property_image_slider />
// //                                 </div>
// //                                 <div class="prop-slider-content"><PropertyTopHeader /></div></div></div>
// //                         {/* Property Details */}

// //                         <div class="row">
// //                             <div class="col-lg-8 pl-0 pr-0">
// //                                 <div class="property-pg-left">
// //                                     <Property_Desc />
// //                                     {/* <Property_Energy_saving />   */}
// //                                     {/* <Property_Documents /> */}
// //                                     <PropertyDetails />
// //                                     <PropertyAmenities />
// //                                     {/* <PropertyAmenitiesOutdoor /> */}
// //                                     <PropertyDistanceDetails />
// //                                     {/* <PropertyDynamicCategories /> */}
// //                                     <PropertyFloorPlan />
// //                                     {/* <PropertyRates /> */}
// //                                     <PropertyLocation />
// //                                     <PropertyWalkScore />
// //                                     <PropertyReviewSection />
// //                                     {/* <PropertyFacebookComments /> */}
// //                                 </div>
// //                                 {/* property-pg-left end */}
// //                             </div>
// //                             <div class="col-lg-4 pr-0">
// //                                 <div class="sidebar layout2">
// //                                     <FeaturedRightAgents />
// //                                     <ContactListingAgent />
// //                                     <DownloadBrochure />
// //                                     {/* <RightLatestListings /> */}
// //                                     <MortgageCalculator />
// //                                     {/* <PropertyRightQRCode /> */}
// //                                     {/* <RightPrint /> */}
// //                                     {/* <PropertyCompare /> */}
// //                                     {/* <RightAds /> */}

// //                                 </div>
// //                             </div>
// //                             {/* sidebar end */}
// //                         </div>

// //                     </div>
// //                 </div>
// //             </section>

// //         <div class="container-fluid">
// //           <div class="row">
// //             <div class="col-md-12">
// //               <div class="similar-prop">
// //                 {/* <SimilarListings /> */}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //     </div>

// //     )
// // }

// // export default Property


//--------------------------------------------------------------------------------------------------------------------

// import React from 'react';
// import Property_image_slider from './Property_image_slider';
// import Navbar from '../NavFooter/Navbar';
// import PropertyTopHeader from './PropertyTopHeader';
// import Property_Desc from './Property_Desc';
// import Property_Energy_saving from './Property_Energy_saving';
// import Property_Documents from './Property_Documents';
// import PropertyDetails from './PropertyDetails';
// import PropertyAmenities from './PropertyAmenities';
// import PropertyAmenitiesOutdoor from './PropertyAmenitiesOutdoor';
// import PropertyDistanceDetails from './PropertyDistanceDetails';
// import PropertyDynamicCategories from './Property_center_dynamic_categories';
// import PropertyFloorPlan from './Property_FloorPlan';
// import PropertyRates from './Property_rates_table';
// import PropertyLocation from './Property_Map_Location';
// import PropertyWalkScore from './Property_center_walkscore';
// import PropertyReviewSection from './Property_ReviewSection';
// import PropertyFacebookComments from './Property_Facebook_Comment';
// import AdsWidget from './Ads_In_Property';
// import FeaturedRightAgents from './Property_right_Featured_agent';
// import ContactListingAgent from './Property_right_Form_contact';
// import DownloadBrochure from './Property_Brochure';
// import RightLatestListings from './Property_right_Listing';
// import MortgageCalculator from './Property_EMI_Calculator';
// import PropertyRightQRCode from './Property_right_QR_code';
// import RightPrint from './Property_right_print';
// import PropertyCompare from './Property_Compare';
// import RightAds from './Property_right_ads';
// import SimilarListings from './Property_Similar_Listing';
// import Footer from '../NavFooter/Footer';

// import PropertyJson from "./PropertyJson.json";

// function Property() {
//     return (
//         <div>
//             <section className="property-single-pg">
//                 <div className="container-fluid px-5">
//                     {/* <AdsWidget /> */}
//                     <div className="property-single-page-content">
//                         <div className="row prop-spacing-left-right">
//                             <div className="col-md-12">
//                                 <div className="prop-image-slider">
//                                 <Property_image_slider images={PropertyJson.images} />
//                                 </div>
//                                 <div className="prop-slider-content">
//                                 <PropertyTopHeader 
//                                     title={PropertyJson.title} 
//                                     address={PropertyJson.address} 
//                                     pricerange={PropertyJson.pricerange}
//                                     price={PropertyJson.price}
//                                     area_detail={PropertyJson.area_detail}
//                                     purpose={PropertyJson.purpose}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         {/* Property Details */}
//                         <div className="row">
//                             <div className="col-lg-8 pl-0 pr-0">
//                                 <div className="property-pg-left">
//                                 <Property_Desc 
//                                         description={PropertyJson.description} 
//                                     />
//                                     {/* <Property_Energy_saving /> */}
//                                     {/* <Property_Documents /> */}
//                                     <PropertyDetails 
//                                         details={{
//                                             configuration: PropertyJson.configuration,
//                                             area_detail: PropertyJson.area_detail,
//                                             bathrooms: PropertyJson.bathrooms,
//                                             balconies: PropertyJson.balconies,
//                                             furnish_type: PropertyJson.furnish_type,
//                                             rera_id: PropertyJson.rera_id,
//                                             floor_no: PropertyJson.floor_no,
//                                             total_floor: PropertyJson.total_floor,
//                                             price: PropertyJson.price,
//                                             property_facing: PropertyJson.property_facing,
//                                             maintenance_charge: PropertyJson.maintenance_charge,
//                                             token_amount: PropertyJson.token_amount,
//                                             pricerange: PropertyJson.pricerange,
//                                             currency: PropertyJson.currency
//                                         }} 
//                                     />
//                                     <PropertyAmenities 
//                                         amenities={PropertyJson.amenities} 
//                                     />
//                                     {/* <PropertyAmenitiesOutdoor /> */}
//                                     <PropertyDistanceDetails 
//                                         distances={{
//                                             metro: PropertyJson.metro,
//                                             school: PropertyJson.school,
//                                             hospital: PropertyJson.hospital,
//                                             mall: PropertyJson.mall,
//                                             restaurant: PropertyJson.restaurant,
//                                             bus: PropertyJson.bus,
//                                             cinema: PropertyJson.cinema
//                                         }} 
//                                     />
//                                     {/* <PropertyDynamicCategories /> */}
//                                     <PropertyFloorPlan />
//                                     {/* <PropertyRates /> */}
//                                     <PropertyLocation 
//                                         lat={PropertyJson.lat}
//                                         lng={PropertyJson.lng} 
//                                     />
//                                     <PropertyWalkScore />
//                                     <PropertyReviewSection 
//                                         reviews={PropertyJson.reviews.all} 
//                                     />
//                                     {/* <PropertyFacebookComments /> */}
//                                 </div>
//                                 {/* property-pg-left end */}
//                             </div>
//                             <div className="col-lg-4 pr-0">
//                                 <div className="sidebar layout2">
//                                     <FeaturedRightAgents />
//                                     <ContactListingAgent />
//                                     <DownloadBrochure />
//                                     {/* <RightLatestListings /> */}
//                                     <MortgageCalculator />
//                                     {/* <PropertyRightQRCode /> */}
//                                     {/* <RightPrint /> */}
//                                     {/* <PropertyCompare /> */}
//                                     {/* <RightAds /> */}
//                                 </div>
//                             </div>
//                             {/* sidebar end */}
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className="similar-prop">
//                             {/* <SimilarListings /> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Property;

//------------------------------------------------------------------------------------------------------------------


// import React from 'react';
// import { useParams } from 'react-router-dom';
// import Property_image_slider from './Property_image_slider';
// import Navbar from '../NavFooter/Navbar';
// import PropertyTopHeader from './PropertyTopHeader';
// import Property_Desc from './Property_Desc';
// import PropertyDetails from './PropertyDetails';
// import PropertyAmenities from './PropertyAmenities';
// import PropertyDistanceDetails from './PropertyDistanceDetails';
// import PropertyFloorPlan from './Property_FloorPlan';
// import PropertyLocation from './Property_Map_Location';
// import PropertyReviewSection from './Property_ReviewSection';
// import FeaturedRightAgents from './Property_right_Featured_agent';
// import ContactListingAgent from './Property_right_Form_contact';
// import DownloadBrochure from './Property_Brochure';
// import MortgageCalculator from './Property_EMI_Calculator';
// import PropertyJson from "./PropertyJson.json";
// import AgentOnSpotLight from './AgentOnSpotLight';
// import SellProperties_By_Project from './SellProperties_By_Project';
// import RentProperties_By_Project from './RentProperties_By_Project';

// function Property() {
//   const { id } = useParams();  // Get the property ID from the URL
//   const property = PropertyJson.find(p => p.id === parseInt(id));  // Find the property by ID

//   if (!property) {
//     return <div>Property not found</div>;  // Handle case when property is not found
//   }

//   return (
//     <div>
//       <section className="property-single-pg">
//         <div className="container-fluid px-5">
//           <div className="property-single-page-content">
//             <div className="row prop-spacing-left-right">
//               <div className="col-md-12">
//                 <div className="prop-image-slider">
//                   <Property_image_slider images={property.images} />
//                 </div>
//                 <div className="prop-slider-content">
//                   <PropertyTopHeader 
//                     title={property.title} 
//                     address={property.address} 
//                     pricerange={property.pricerange}
//                     price={property.price}
//                     area_detail={property.area_detail}
//                     purpose={property.purpose}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* Property Details */}
//             <div className="row">
//               <div className="col-lg-8 pl-0 pr-0">
//                 <div className="property-pg-left">
//                   <Property_Desc description={property.description} />
//                   <PropertyDetails 
//                     details={{
//                       configuration: property.configuration,
//                       area_detail: property.area_detail,
//                       bathrooms: property.bathrooms,
//                       balconies: property.balconies,
//                       furnish_type: property.furnish_type,
//                       rera_id: property.rera_id,
//                       floor_no: property.floor_no,
//                       total_floor: property.total_floor,
//                       price: property.price,
//                       property_facing: property.property_facing,
//                       maintenance_charge: property.maintenance_charge,
//                       token_amount: property.token_amount,
//                       pricerange: property.pricerange,
//                       currency: property.currency
//                     }} 
//                   />
//                   <PropertyAmenities amenities={property.amenities} />
//                   <SellProperties_By_Project project_name={property.title}/>
//                   <RentProperties_By_Project project_name={property.title}/>
//                   <PropertyDistanceDetails 
//                     distances={{
//                       metro: property.metro,
//                       school: property.school,
//                       hospital: property.hospital,
//                       mall: property.mall,
//                       restaurant: property.restaurant,
//                       bus: property.bus,
//                       cinema: property.cinema
//                     }} 
//                   />
//                   <PropertyFloorPlan />
//                   <PropertyLocation lat={property.lat} lng={property.lng} />
//                   <PropertyReviewSection reviews={property.reviews.all} />
//                 </div>
//               </div>
//               <div className="col-lg-4 pr-0">
//                 <div className="sidebar layout2">
//                   <AgentOnSpotLight agentIds={property.AgentsOnSpotlightId} />
//                   <FeaturedRightAgents agentIds={property.FeaturedAgentsId}/>
//                   <ContactListingAgent />
//                   <DownloadBrochure />
//                   <MortgageCalculator />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Property;


//------------------------------------------------------------------------------------------------------------------




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Property_image_slider from './Property_image_slider';
// import Navbar from '../NavFooter/Navbar';
// import PropertyTopHeader from './PropertyTopHeader';
// import Property_Desc from './Property_Desc';
// import PropertyDetails from './PropertyDetails';
// import PropertyAmenities from './PropertyAmenities';
// import PropertyDistanceDetails from './PropertyDistanceDetails';
// import PropertyFloorPlan from './Property_FloorPlan';
// import PropertyLocation from './Property_Map_Location';
// import PropertyReviewSection from './Property_ReviewSection';
// import FeaturedRightAgents from './Property_right_Featured_agent';
// import ContactListingAgent from './Property_right_Form_contact';
// import DownloadBrochure from './Property_Brochure';
// import MortgageCalculator from './Property_EMI_Calculator';
// import AgentOnSpotLight from './AgentOnSpotLight';
// import SellProperties_By_Project from './SellProperties_By_Project';
// import RentProperties_By_Project from './RentProperties_By_Project';

// function Property() {
//   const { id } = useParams();  // Get the property ID from the URL
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch property details from API when component mounts
//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const response = await fetch(`http://localhost:3030/property/${id}`);
//         if (!response.ok) {
//           throw new Error('Property not found');
//         }
//         const data = await response.json();
//         setProperty(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperty();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!property) {
//     return <div>Property not found</div>;
//   }

//   // Convert the image repository string into an array of image URLs
//   const images = property.image_repository.split(',').map((img) => ({
//     url: img.trim(),
//     alt: `Property Image`,
//   }));

//   return (
//     <div>
//       <section className="property-single-pg">
//         <div className="container-fluid px-5">
//           <div className="property-single-page-content">
//             <div className="row prop-spacing-left-right">
//               <div className="col-md-12">
//                 <div className="prop-image-slider">
//                   <Property_image_slider images={images} />
//                 </div>
//                 <div className="prop-slider-content">
//                   <PropertyTopHeader 
//                     title={property.property_name} 
//                     address={property.address} 
//                     pricerange={property.pricerange}
//                     price={property.price}
//                     area_detail={property.area_detail}
//                     purpose={property.purpose}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* Property Details */}
//             <div className="row">
//               <div className="col-lg-8 pl-0 pr-0">
//                 <div className="property-pg-left">
//                   <Property_Desc description={property.description} />
//                   <PropertyDetails 
//                     details={{
//                       configuration: property.configuration,
//                       area_detail: property.area_detail,
//                       bathrooms: property.bathroom,  
//                       balconies: property.balcony,  
//                       furnish_type: property.furnish_type,
//                       rera_id: property.rera_id,
//                       floor_no: property.floor_no,
//                       total_floor: property.total_floor,
//                       price: property.price,
//                       property_facing: property.property_facing,
//                       maintenance_charge: property.maintenance_charge,
//                       token_amount: property.token_amount,
//                       pricerange: property.pricerange,
//                       currency: property.money_type 
//                     }} 
//                   />
//                   <PropertyAmenities amenities={JSON.parse(property.amenities)} />
//                   <SellProperties_By_Project project_name={property.property_name}/>
//                   <RentProperties_By_Project project_name={property.property_name}/>
//                   <PropertyDistanceDetails 
//                     distances={{
//                       metro: property.metro,
//                       school: property.school,
//                       hospital: property.hospital,
//                       mall: property.mall,
//                       restaurant: property.restaurant,
//                       bus: property.bus,
//                       cinema: property.cinema
//                     }} 
//                   />
//                   <PropertyFloorPlan />
//                   <PropertyLocation lat={property.lat} lng={property.lng} />
//                   <PropertyReviewSection reviews={[]} />
//                 </div>
//               </div>
//               <div className="col-lg-4 pr-0">
//                 <div className="sidebar layout2">
//                 <AgentOnSpotLight 
//   agentIds={property.AgentsOnSpotlightId ? JSON.parse(property.AgentsOnSpotlightId) : []} 
//   title={property.property_name} 
//   titleid={property.id} 
// />
// <FeaturedRightAgents 
//   agentIds={property.FeaturedAgentsId ? JSON.parse(property.FeaturedAgentsId) : []} 
//   title={property.property_name} 
//   titleid={property.id} 
// />
//                   <ContactListingAgent agentusername={property.username}/>
//                   <DownloadBrochure />
//                   <MortgageCalculator />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Property;


//----------------------------------------------------------------------------------------------------------


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Property_image_slider from './Property_image_slider';
import Navbar from '../NavFooter/Navbar';
import PropertyTopHeader from './PropertyTopHeader';
import Property_Desc from './Property_Desc';
import PropertyDetails from './PropertyDetails';
import PropertyAmenities from './PropertyAmenities';
import PropertyDistanceDetails from './PropertyDistanceDetails';
import PropertyFloorPlan from './Property_FloorPlan';
import PropertyLocation from './Property_Map_Location';
import PropertyReviewSection from './Property_ReviewSection';
import FeaturedRightAgents from './Property_right_Featured_agent';
import ContactListingAgent from './Property_right_Form_contact';
import DownloadBrochure from './Property_Brochure';
import MortgageCalculator from './Property_EMI_Calculator';
import AgentOnSpotLight from './AgentOnSpotLight';
import SellProperties_By_Project from './SellProperties_By_Project';
import RentProperties_By_Project from './RentProperties_By_Project';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Corrected import for jwtDecode

function Property() {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // For storing user data

  // Fetch property details from API when component mounts
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:3030/property/${id}`);
        if (!response.ok) {
          throw new Error('Property not found');
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Function to decode JWT and fetch user data
    const fetchUser = async () => {
      const token = Cookies.get('jwttoken'); // Retrieve the token from cookies
      if (token) {
        try {
          // Decode the token
          const decodedToken = jwtDecode(token);
          const response = await fetch(`http://localhost:3030/user/${decodedToken.username}`, {
            credentials: 'include', // Include cookies to access JWT
          });
          const userData = await response.json();
          setUser(userData); // Set user data
        } catch (err) {
          console.error('Failed to fetch user data', err);
        }
      } else {
        console.log('No token found in cookies');
      }
    };

    fetchProperty();
    fetchUser();
  }, [id]);

  // Use a separate useEffect to handle saving the lead
  useEffect(() => {
    const handleSaveLead = async () => {
      if (!user || !user.username) {
        console.error('User is not logged in');
        return;
      }

      const leadData = {
        username: user.username,
        property_id: id,
        name: user.name,
        phone: user.phone,
      };

      try {
        const response = await fetch('http://localhost:3030/property_lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadData),
        });

        const result = await response.json();
        if (response.ok) {
          console.log('Lead saved successfully');
        } else {
          console.error(result.message || 'Failed to save lead');
        }
      } catch (err) {
        console.error('Error saving lead:', err);
      }
    };

    if (user) {
      handleSaveLead();
    }
  }, [user, id]); // Only run when user or id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  // Convert the image repository string into an array of image URLs
  const images = property.image_repository.split(',').map((img) => ({
    url: img.trim(),
    alt: `Property Image`,
  }));

  return (
    <div>
      <section className="property-single-pg">
        <div className="container-fluid px-5">
          <div className="property-single-page-content">
            <div className="row prop-spacing-left-right">
              <div className="col-md-12">
                <div className="prop-image-slider">
                  <Property_image_slider images={images} />
                </div>
                <div className="prop-slider-content">
                  <PropertyTopHeader 
                    title={property.property_name} 
                    address={property.address} 
                    pricerange={property.pricerange}
                    price={property.price}
                    area_detail={property.area_detail}
                    purpose={property.purpose}
                  />
                </div>
              </div>
            </div>
            {/* Property Details */}
            <div className="row">
              <div className="col-lg-8 pl-0 pr-0">
                <div className="property-pg-left">
                  <Property_Desc description={property.description} />
                  <PropertyDetails 
                    details={{
                      configuration: property.configuration,
                      area_detail: property.area_detail,
                      bathrooms: property.bathroom,  
                      balconies: property.balcony,  
                      furnish_type: property.furnish_type,
                      rera_id: property.rera_id,
                      floor_no: property.floor_no,
                      total_floor: property.total_floor,
                      price: property.price,
                      property_facing: property.property_facing,
                      maintenance_charge: property.maintenance_charge,
                      token_amount: property.token_amount,
                      pricerange: property.pricerange,
                      currency: property.money_type 
                    }} 
                  />
                  <PropertyAmenities amenities={JSON.parse(property.amenities)} />
                  <SellProperties_By_Project project_name={property.property_name} />
                  <RentProperties_By_Project project_name={property.property_name} />
                  <PropertyDistanceDetails 
                    distances={{
                      metro: property.metro,
                      school: property.school,
                      hospital: property.hospital,
                      mall: property.mall,
                      restaurant: property.restaurant,
                      bus: property.bus,
                      cinema: property.cinema
                    }} 
                  />
                  <PropertyFloorPlan />
                  <PropertyLocation lat={property.lat} lng={property.lng} />
                  <PropertyReviewSection reviews={[]} />
                </div>
              </div>
              <div className="col-lg-4 pr-0">
                <div className="sidebar layout2">
                  <AgentOnSpotLight 
                    agentIds={property.AgentsOnSpotlightId ? JSON.parse(property.AgentsOnSpotlightId) : []} 
                    title={property.property_name} 
                    titleid={property.id} 
                  />
                  <FeaturedRightAgents 
                    agentIds={property.FeaturedAgentsId ? JSON.parse(property.FeaturedAgentsId) : []} 
                    title={property.property_name} 
                    titleid={property.id} 
                  />
                  <ContactListingAgent agentusername={property.username} />
                  <DownloadBrochure />
                  <MortgageCalculator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Property;
