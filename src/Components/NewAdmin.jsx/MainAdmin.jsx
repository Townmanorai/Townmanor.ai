import React, { useEffect, useState } from 'react'
import AdminBanner from './AdminBanner'
import SmartWorldAbout from './SmartWorldAbout'
import FeaturedAgentsWithEMI from './FeaturedAgentsWithEMI '
import UniqueAmenitiesComponent from '../ownerpage/UniqueAmenitiesComponent'
import axios from 'axios'
import AdminAmenties from './AdminAmenties'
import PropertiesToggleView from './PropertiesToggleView'
import ServiceCardSection from '../ownerpage/ServiceCardSection'
import PropertySuggestionSection from '../ownerpage/PropertySuggestionSection'
import CommentsComponent from '../ownerpage/CommentsComponent'
import { useParams } from 'react-router-dom'
import AdminSuggestion from './AdminSuggestion'

function MainAdmin() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/property/${id}`);
        setProperty(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
   <>
   <AdminBanner property={property}/>
   <SmartWorldAbout property={property}/>
   <FeaturedAgentsWithEMI property={property}/>
   <AdminAmenties property={property}/>
   <PropertiesToggleView propertyName = {property.property_name}/>
   <ServiceCardSection property/>
   <AdminSuggestion city={property.city}/>
   {/* <PropertySuggestionSection property={property}/> */}
  
   <CommentsComponent property={property}/>
   </>
  )
}

export default MainAdmin