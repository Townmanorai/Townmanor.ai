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
import { Helmet } from 'react-helmet'

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

  // Extract BHK number from configuration
  const bhkNumber = property.configuration?.replace('BHK', '').trim();
  
  // Format price with crore/lakh
  const priceText = property.pricerange === 'Crore' 
    ? `${property.price} Cr` 
    : `${property.price} Lakhs`;
  
  // Safely parse amenities from string to array
  let amenities = [];
  try {
    amenities = JSON.parse(property.amenities || '[]');
  } catch (e) {
    console.warn('Failed to parse amenities:', e);
  }
  
  // Create SEO title
  const seoTitle = `${property.configuration} Flat in ${property.property_name} | ${property.area_detail} , ${property.city}`;
  
  // Create SEO description
  const seoDescription = `${property.description} Price: ₹${priceText}. Located in ${property.address}, ${property.city}. Key amenities: ${amenities.slice(0, 5).join(', ')}. RERA ID: ${property.rera_id}.`;

  // Create keywords
  const keywords = [
    `${bhkNumber}bhk flat in ${property.city}`,
    `${bhkNumber} bhk flat in ${property.property_name}`,
    `${bhkNumber}bhk flat ${property.area_detail} at ${property.property_name}`,
    `${bhkNumber}bhk flat at ${priceText}`,
    `${property.property_name} ${property.city}`,
    `${bhkNumber} BHK apartment ${property.city}`,
    `${property.purpose} flat in ${property.city}`,
    `${property.residential} in ${property.city}`,
    `property near ${property.address}`,
    `${property.configuration} ${property.residential} ${property.city}`,
    `${property.property_name} ${property.address}`,
  ].join(', ');

  // Safely get first image URL from property
  let firstImage = '';
  try {
    const imageRepository = property.image_repository;
    if (typeof imageRepository === 'string') {
      const images = JSON.parse(imageRepository);
      firstImage = images[0] ? `https://www.townmanor.ai/uploads/${images[0]}` : '';
    } else if (Array.isArray(imageRepository)) {
      firstImage = imageRepository[0] ? `https://www.townmanor.ai/uploads/${imageRepository[0]}` : '';
    }
  } catch (e) {
    console.warn('Failed to parse image repository:', e);
    // If the image_repository is a direct URL
    firstImage = property.image_repository || '';
  }

  return (
   <>
   <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={firstImage} />
      <meta property="og:url" content={`https://www.townmanor.ai/property/${property.id}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={firstImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content={property.username} />
      <meta name="geo.region" content={`IN-${property.city}`} />
      <meta name="geo.placename" content={property.city} />
      <meta name="geo.position" content={`${property.lat};${property.lng}`} />
      <meta name="ICBM" content={`${property.lat}, ${property.lng}`} />
      
      {/* Property Specific Meta Tags */}
      <meta name="price" content={`${property.price} ${property.pricerange}`} />
      <meta name="currency" content={property.money_type} />
      <meta name="rera-id" content={property.rera_id} />
      <meta name="property-type" content={`${property.category} ${property.residential}`} />
      <meta name="area" content={`${property.area_detail} sq.ft`} />
      <meta name="location" content={`${property.address}, ${property.city}, ${property.pincode}`} />
      
      <link rel="canonical" href={`https://www.townmanor.ai/property/${property.id}`} />
    </Helmet>
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