import React, { useEffect, useState } from 'react'
import OwnerBanner from './OwnerBanner'
import OwnerAbout from './OwnerAbout'
import UniqueAmenitiesComponent from './UniqueAmenitiesComponent'
import ServiceCardSection from './ServiceCardSection'
import PropertySuggestionSection from './PropertySuggestionSection'
import CommentsComponent from './CommentsComponent'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { MdSchool, MdDirectionsSubway } from "react-icons/md";
import { FaHospital, FaBuilding, FaBus, FaUtensils, FaFilm } from "react-icons/fa";
import { Helmet } from 'react-helmet'

function OwnerPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/owner-property/${id}`);
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
  
  // Parse amenities from string to array
  const amenities = JSON.parse(property.amenities || '[]');
  
  // Create SEO title
  const seoTitle = `${property.configuration} Flat in ${property.property_name} | ${property.area_detail} sq.ft, ${property.city}`;
  
  // Create SEO description
  const seoDescription = `${property.description} Price: ₹${priceText}. Located in ${property.address}, ${property.city}. Key amenities: ${amenities.slice(0, 5).join(', ')}. RERA ID: ${property.rera_id}.`;

  // Create keywords
  const keywords = [
    `${bhkNumber}bhk flat in ${property.city}`,
    `${bhkNumber} bhk flat in ${property.property_name}`,
    `${bhkNumber}bhk flat ${property.area_detail}sq.ft at ${property.property_name}`,
    `${bhkNumber}bhk flat at ${priceText}`,
    `${property.property_name} ${property.city}`,
    `${bhkNumber} BHK apartment ${property.city}`,
    `${property.purpose} flat in ${property.city}`,
    `${property.residential} in ${property.city}`,
    `property near ${property.address}`,
    `${property.configuration} ${property.residential} ${property.city}`,
    `${property.property_name} ${property.address}`,
  ].join(', ');

  // Get first image URL
  const images = JSON.parse(property.image_repository || '[]');
  const firstImage = images[0] ? `https://www.townmanor.ai/uploads/${images[0]}` : '';

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
      <OwnerBanner property={property} />
      <OwnerAbout property={property} />
      <UniqueAmenitiesComponent property={property} />
      <ServiceCardSection property={property} />
      <PropertySuggestionSection property={property} />
      <CommentsComponent 
        propertyName={property.property_name} 
        propertyId={property.id} 
      />
    </>
  )
}

export default OwnerPage