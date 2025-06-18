import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaBolt, FaShieldAlt, FaWifi, FaChevronRight, FaStar, FaUsers, FaCalendarAlt, FaUtensils, FaMusic, FaBuilding, FaRulerCombined, FaHome } from 'react-icons/fa';
import { IoBed } from 'react-icons/io5';
import { MdApartment } from 'react-icons/md';
import './colivingNoidaStyles.css';

const features = [
  {
    icon: <FaLock className="colivingNoida__iconFeature" />,
    title: 'Unmatched Privacy',
    desc: 'Own personal space with all the privacy you need. Secure premises ensure peace of mind when you need it.'
  },
  {
    icon: <FaBolt className="colivingNoida__iconFeature" />,
    title: 'Instant Move-in',
    desc: 'Seamless check-in. Bring your bags and move into fully furnished spaces instantly.'
  },
  {
    icon: <FaShieldAlt className="colivingNoida__iconFeature" />,
    title: 'Lowest Security Deposit',
    desc: 'We offer the most economical security deposit in town. Pay only a fraction and move in.'
  },
  {
    icon: <FaWifi className="colivingNoida__iconFeature" />,
    title: 'Best in Network',
    desc: 'Connect with like-minded individuals. Enjoy curated events to boost your social circle.'
  }
];

const ColivingNoida = () => {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState([]);
  const [visibleSpaces, setVisibleSpaces] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priceSort: 'default',
    type: 'all',
    availability: 'all'
  });

  // Fetch coliving properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://townmanor.ai/api/coliving');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const properties = await response.json();
        
        // Fetch room data for each property
        const propertiesWithRooms = await Promise.all(
          properties.map(async (property) => {
            try {
              const roomResponse = await fetch(`https://townmanor.ai/api/coliving-rooms/${property.id}`);
              if (!roomResponse.ok) {
                throw new Error(`Failed to fetch rooms for property ${property.id}`);
              }
              const roomData = await roomResponse.json();
              
              // Parse image string to array and get first image
              let imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'; // default image
              try {
                if (property.image) {
                  const imageArray = JSON.parse(property.image);
                  if (Array.isArray(imageArray) && imageArray.length > 0) {
                    imageUrl = imageArray[0];
                  }
                }
              } catch (e) {
                console.error('Error parsing image array:', e);
              }
              
              return {
                id: property.id,
                title: property.property_name,
                type: property.configuration,
                area: property.area,
                floor: `${property.floor}th Floor`,
                price: roomData.data?.price?.toString() || '0',
                availability: roomData.data?.occupied ? 'Occupied' : 'Available',
                img: imageUrl,
                description: property.description,
                amenities: property.amenities,
                nearby_location: property.nearby_location,
                roomDetails: roomData.data
              };
            } catch (error) {
              console.error(`Error fetching rooms for property ${property.id}:`, error);
              return {
                ...property,
                price: '0',
                availability: 'Unknown',
                img: property.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
              };
            }
          })
        );

        setSpaces(propertiesWithRooms);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter and sort spaces
  useEffect(() => {
    if (loading) return;

    let filteredSpaces = [...spaces];

    // Apply type filter
    if (filters.type !== 'all') {
      filteredSpaces = filteredSpaces.filter(space => space.type === filters.type);
    }

    // Apply availability filter
    if (filters.availability !== 'all') {
      filteredSpaces = filteredSpaces.filter(space => {
        if (filters.availability === 'Available') {
          return space.availability.toLowerCase().includes('available');
        } else {
          return space.availability === 'Occupied';
        }
      });
    }

    // Apply price sorting
    if (filters.priceSort === 'low-to-high') {
      filteredSpaces.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (filters.priceSort === 'high-to-low') {
      filteredSpaces.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    }

    setSpaces(filteredSpaces);
    setVisibleSpaces(6); // Reset to show first 6 items when filters change
  }, [filters, loading]);

  const handleLoadMore = () => {
    setVisibleSpaces(prev => Math.min(prev + 6, spaces.length));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/colivingsecond/${propertyId}`);
  };

  if (loading) {
    return <div className="colivingNoida__container">Loading properties...</div>;
  }

  if (error) {
    return <div className="colivingNoida__container">Error: {error}</div>;
  }

  return (
    <div className="colivingNoida__container">
      {/* Header Section */}
      <header className="colivingNoida__headerMain">
        {/* <nav className="colivingNoida__navBar">
          <span className="colivingNoida__logo">Logo</span>
          <div className="colivingNoida__navButtons">
            <button className="colivingNoida__navBtn colivingNoida__navBtn--login">Log In</button>
            <button className="colivingNoida__navBtn colivingNoida__navBtn--signup">Sign Up</button>
          </div>
        </nav> */}
        <div className="colivingNoida__heroSection">
          <div className="colivingNoida__heroTextWrap">
            <span className="colivingNoida__heroLabel">Noida</span>
            <h1 className="colivingNoida__heroTitle">Studio  & Suites </h1>
            <div className="colivingNoida__heroDesc">Discover affordable, fully-furnished coliving spaces with premium amenities and a vibrant community.</div>
            <div className="colivingNoida__heroBtns">
              <button className="colivingNoida__heroBtn colivingNoida__heroBtn--primary">Explore Spaces</button>
              <button className="colivingNoida__heroBtn colivingNoida__heroBtn--secondary">Schedule Visit</button>
            </div>
          </div>
          <div className="colivingNoida__heroImages">
            <img src="/coliving.png" alt="Coliving" className="colivingNoida__heroImg" />
           
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="colivingNoida__featuresSection">
        {features.map((f, idx) => (
          <div className="colivingNoida__featureCard" key={idx}>
            {f.icon}
            <div className="colivingNoida__featureTitle">{f.title}</div>
            <div className="colivingNoida__featureDesc">{f.desc}</div>
          </div>
        ))}
      </section>

      {/* Top Spaces Section */}
      <section className="colivingNoida__spacesSection">
        <div className="colivingNoida__spacesHeader">
          <span className="colivingNoida__spacesLabel">Top Spaces in Noida</span>
          <div className="colivingNoida__spacesFilters">
            <select 
              className="colivingNoida__spacesSelect"
              value={filters.priceSort}
              onChange={(e) => handleFilterChange('priceSort', e.target.value)}
            >
              <option value="default">Sort by Price</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
            <select 
              className="colivingNoida__spacesSelect"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
            </select>
            <select 
              className="colivingNoida__spacesSelect"
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
            >
              <option value="all">All Availability</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>
        </div>
        <div className="colivingNoida__spacesGrid">
          {spaces.slice(0, visibleSpaces).map((space, idx) => (
            <div 
              className="colivingNoida__spaceCard" 
              key={space.id || idx}
              onClick={() => handlePropertyClick(space.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="colivingNoida__spaceImageContainer">
                <img src={space.img} alt={space.title} className="colivingNoida__spaceImg" />
              </div>
              <div className="colivingNoida__spaceInfo">
                <h3 className="colivingNoida__spaceTitle">{space.title}</h3>
                
                <div className="colivingNoida__spaceDetailsRow">
                  <MdApartment className="colivingNoida__iconMeta" />
                  <span>{space.type}</span>
                  <FaRulerCombined className="colivingNoida__iconMeta" style={{marginLeft: '16px'}} />
                  <span>{space.area}</span>
                  <IoBed className="colivingNoida__iconMeta" style={{marginLeft: '16px'}} />
                  <span>{space.floor}</span>
                </div>

                <div className="colivingNoida__spacePriceSection">
                  <span className="colivingNoida__roomsFrom">Rooms from</span>
                  <div className="colivingNoida__priceRow">
                    <span className="colivingNoida__spacePrice">₹{space.price}/mo</span>
                    <span className={`colivingNoida__availability ${space.availability.toLowerCase().includes('available') ? 'available' : 'occupied'}`}>
                      {space.availability}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {visibleSpaces < spaces.length && (
          <button className="colivingNoida__loadMoreBtn" onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </section>

      {/* Community Section */}
      {/* <section className="colivingNoida__communitySection">
        <div className="colivingNoida__communityHeader">Coliving with CoFynd</div>
        <div className="colivingNoida__communityDesc">Experience a new way of living with all the comforts and none of the hassles. Join our vibrant community today.</div>
        <div className="colivingNoida__communityGrid">
          <div className="colivingNoida__communityCard">
            <FaUtensils className="colivingNoida__iconCommunity" />
            <div className="colivingNoida__communityTitle">Healthy and Tasty food</div>
            <div className="colivingNoida__communityText">Our in-house chefs prepare rotational and delicious meals with options for various dietary preferences.</div>
          </div>
          <div className="colivingNoida__communityCard">
            <FaMusic className="colivingNoida__iconCommunity" />
            <div className="colivingNoida__communityTitle">Entertainment zone</div>
            <div className="colivingNoida__communityText">Dedicated entertainment spaces with board games, foosball, table tennis, and movie screenings await for your leisure time.</div>
          </div>
          <div className="colivingNoida__communityCard colivingNoida__communityCard--large">
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="Community" className="colivingNoida__communityImg" />
            <div className="colivingNoida__communityCardOverlay">
              <div className="colivingNoida__communityTitle">Community Events</div>
              <div className="colivingNoida__communityText">We regularly conduct events, workshops, and networking sessions to foster a vibrant community atmosphere.</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="colivingNoida__ctaSection">
        <div className="colivingNoida__ctaTitle">Ready to Find Your Perfect Coliving Space?</div>
        <div className="colivingNoida__ctaDesc">Join thousands of happy residents living in our coliving spaces across Noida. Book a tour today!</div>
        <div className="colivingNoida__ctaBtns">
          <button className="colivingNoida__ctaBtn colivingNoida__ctaBtn--primary">Book a Tour</button>
          <button className="colivingNoida__ctaBtn colivingNoida__ctaBtn--secondary">Contact Us</button>
        </div>
      </section>
    </div>
  );
};

export default ColivingNoida;
