import React, { useState, useEffect } from 'react';
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

const initialSpaces = [
  {
    title: 'Abode, HSR Layout',
    type: '3 BHK',
    area: '2600 ft²',
    floor: '1st Floor',
    price: '43000',
    availability: 'Available',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Elevate, Koramangala',
    type: '3 BHK',
    area: '3500 ft²',
    floor: 'Ground Floor',
    price: '35000',
    availability: 'Available',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Maison One, BTM Lake',
    type: '1 BHK',
    area: '800 ft²',
    floor: '1st Floor',
    price: '50000',
    availability: 'Available',
    img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Aer, Whitefield',
    type: '3 BHK',
    area: '1800 ft²',
    floor: '8th Floor',
    price: '36000',
    availability: 'Available from May 10, 2025',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'East Heights, CV Raman Nagar',
    type: '2 BHK',
    area: '1800 ft²',
    floor: '5th Floor',
    price: '29000',
    availability: 'Available',
    img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Carnation, Green Glen Layout',
    type: '2 BHK',
    area: '1800 ft²',
    floor: '2nd Floor',
    price: '31000',
    availability: 'Available',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'The Summit, Indiranagar',
    type: '3 BHK',
    area: '2200 ft²',
    floor: '10th Floor',
    price: '45000',
    availability: 'Occupied',
    img: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Urban Nest, Electronic City',
    type: '2 BHK',
    area: '1600 ft²',
    floor: '4th Floor',
    price: '28000',
    availability: 'Available',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Sky Villa, Marathahalli',
    type: '1 BHK',
    area: '950 ft²',
    floor: '6th Floor',
    price: '22000',
    availability: 'Available',
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Green View, Bellandur',
    type: '3 BHK',
    area: '2400 ft²',
    floor: '3rd Floor',
    price: '38000',
    availability: 'Available',
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Lake View, Whitefield',
    type: '2 BHK',
    area: '1500 ft²',
    floor: '7th Floor',
    price: '26000',
    availability: 'Occupied',
    img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Sunshine Apartments, HSR',
    type: '1 BHK',
    area: '850 ft²',
    floor: '2nd Floor',
    price: '20000',
    availability: 'Available',
    img: 'https://images.unsplash.com/photo-1459535653751-d571815e906b?auto=format&fit=crop&w=600&q=80'
  }
];

const ColivingNoida = () => {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [visibleSpaces, setVisibleSpaces] = useState(6);
  const [filters, setFilters] = useState({
    priceSort: 'default',
    type: 'all',
    availability: 'all'
  });

  // Filter and sort spaces
  useEffect(() => {
    let filteredSpaces = [...initialSpaces];

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
  }, [filters]);

  const handleLoadMore = () => {
    setVisibleSpaces(prev => Math.min(prev + 6, spaces.length));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

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
            <div className="colivingNoida__spaceCard" key={idx}>
              <div className="colivingNoida__spaceImageContainer">
                <img src={space.img} alt={space.title} className="colivingNoida__spaceImg" />
              </div>
              <div className="colivingNoida__spaceInfo">
                <h3 className="colivingNoida__spaceTitle">{space.title}</h3>
                
                <div className="colivingNoida__spaceDetails">
                  <div className="colivingNoida__spaceIconRow">
                    <MdApartment className="colivingNoida__iconMeta" />
                    <span>{space.type}</span>
                  </div>
                  
                  <div className="colivingNoida__spaceIconRow">
                    <FaRulerCombined className="colivingNoida__iconMeta" />
                    <span>{space.area}</span>
                  </div>
                  
                  <div className="colivingNoida__spaceIconRow">
                    <IoBed className="colivingNoida__iconMeta" />
                    <span>{space.floor}</span>
                  </div>
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
