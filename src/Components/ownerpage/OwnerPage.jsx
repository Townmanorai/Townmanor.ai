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

  return (
    <>
      <OwnerBanner property={property} />
      <OwnerAbout property={property} />
      <UniqueAmenitiesComponent property={property} />
      <ServiceCardSection property={property} />
      <PropertySuggestionSection property={property} />
      <CommentsComponent property={property} />
    </>
  )
}

export default OwnerPage