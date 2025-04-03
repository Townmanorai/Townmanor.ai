
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
import TopRentedProperties from '../HomePage/TopRentedProperties';
import ExclusiveOwnerProperties from '../HomePage/ExclusiveOwnerProperties';

function Property() {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // For storing user data

  // Dummy image URL for fallback
  const dummyImage = 'https://via.placeholder.com/600x400?text=No+Image+Available';

  // Fetch property details from API when component mounts
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://www.townmanor.ai/api/property/${id}`);
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
      console.log("token",token);
      if (token) {
        try {
          // Decode the token
          const decodedToken = jwtDecode(token);
          const response = await fetch(`https://www.townmanor.ai/api/user/${decodedToken.username}`, {
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
        const response = await fetch('https://www.townmanor.ai/api/property_lead', {
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

  // // Convert the image repository string into an array of image URLs
  // const images = property.image_repository.split(',').map((img) => ({
  //   url: img.trim(),
  //   alt: `Property Image`,
  // }));
  
  // Parse image repository or fallback to dummy image
  const getImages = () => {
    // Check if image_repository is null or empty
    if (!property?.image_repository || property.image_repository === "null") {
      return [{ url: dummyImage, alt: 'No images available' }];
    }
  
    try {
      // Split the comma-separated list into an array of URLs
      const images = property.image_repository.split(',').map((img) => ({
        url: img.trim(), // Remove any extra spaces
        alt: 'Property Image',
      }));
      return images.length > 0 ? images : [{ url: dummyImage, alt: 'No images available' }];
    } catch (error) {
      console.error('Error processing image repository:', error);
      return [{ url: dummyImage, alt: 'Error loading images' }];
    }
  };
  const fixCurrencySymbol = (price) => {
    // Replace incorrect encoding for the Indian Rupee symbol (â‚¹) with the correct symbol (₹)
    return price.replace('â‚¹', '₹');
  };

  let images = getImages();

  return (
    <div>
      <section className="property-single-pg" style={{
        marginTop:'4rem !important'
      }}>
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
                    id={property.id}
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
                  <PropertyFloorPlan floorplan={property.floorplan} />
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
