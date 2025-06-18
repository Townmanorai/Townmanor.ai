import React, { useEffect, useState } from 'react'
import ColivingBanner from './ColivingBanner'
import ColivingPricing from './ColivingPricing'
import ColivingUtilities from './ColivingUtilities'
import ColivingFlentPromise from './ColivingFlentPromise'
import ColivingSimilarListing from './ColivingSimilarListing'
import ColivingSecondFooter from './ColivingSecondFooter'
import { useParams } from 'react-router-dom'

function ColivingMain() {
  const { index } = useParams();
  const [coliving, setcoliving] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchColiving = async () => {
      try {
        const response = await fetch(`https://townmanor.ai/api/coliving/${index}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Parse image field if present and is a string
        if (data.image && typeof data.image === 'string') {
          try {
            data.image = JSON.parse(data.image);
          } catch (e) {
            // If parsing fails, set it as a single image array
            data.image = [data.image];
          }
        } else if (!data.image) {
          // If no image field, set a default image
          data.image = ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"];
        }
        setcoliving(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchColiving();
    // Only run on mount or when index changes
  }, [index]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!coliving) return <div>No data found.</div>;

  return (
    <>
      <ColivingBanner coliving={coliving} />
      <ColivingPricing coliving={coliving} />
      <ColivingUtilities coliving={coliving} />
      <ColivingFlentPromise coliving={coliving} />
      <ColivingSimilarListing coliving={coliving} />
      <ColivingSecondFooter />
    </>
  )
}

export default ColivingMain