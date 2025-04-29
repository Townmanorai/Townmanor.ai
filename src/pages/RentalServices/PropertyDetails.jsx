import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../styles/PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('room1');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [activeRoomPriceBreakdown, setActiveRoomPriceBreakdown] = useState('');
  const [showLightbox, setShowLightbox] = useState(false);

  // Property Images
  const propertyImages = [
    "https://readdy.ai/api/search-image?query=modern%20luxury%20apartment%20living%20room%20with%20large%20windows%2C%20natural%20light%2C%20contemporary%20furniture%2C%20minimalist%20design%2C%20high-end%20finishes%2C%20wooden%20flooring%2C%20elegant%20decor%2C%20spacious%20layout%2C%20neutral%20color%20palette%2C%20stylish%20interior&width=600&height=400&seq=1&orientation=landscape",
    "https://readdy.ai/api/search-image?query=modern%20apartment%20kitchen%20with%20marble%20countertops%2C%20stainless%20steel%20appliances%2C%20wooden%20cabinets%2C%20island%20counter%2C%20pendant%20lights%2C%20sleek%20design%2C%20contemporary%20fixtures%2C%20open%20concept%2C%20bright%20lighting%2C%20minimalist%20style&width=600&height=400&seq=2&orientation=landscape",
    "https://readdy.ai/api/search-image?query=luxurious%20master%20bedroom%20with%20king%20size%20bed%2C%20elegant%20headboard%2C%20bedside%20tables%2C%20reading%20lamps%2C%20large%20windows%2C%20wooden%20flooring%2C%20neutral%20colors%2C%20minimalist%20decor%2C%20spacious%20layout%2C%20modern%20design&width=600&height=400&seq=3&orientation=landscape",
    "https://readdy.ai/api/search-image?query=modern%20bathroom%20with%20walk-in%20shower%2C%20bathtub%2C%20marble%20tiles%2C%20minimalist%20design%2C%20glass%20partition%2C%20contemporary%20fixtures%2C%20neutral%20colors%2C%20elegant%20vanity%2C%20large%20mirror%2C%20ambient%20lighting&width=600&height=400&seq=4&orientation=landscape",
    "https://readdy.ai/api/search-image?query=apartment%20balcony%20with%20city%20view%2C%20outdoor%20furniture%2C%20plants%2C%20wooden%20deck%2C%20glass%20railing%2C%20evening%20ambiance%2C%20cozy%20setup%2C%20modern%20design%2C%20outdoor%20lighting%2C%20urban%20landscape&width=600&height=400&seq=5&orientation=landscape",
    "https://readdy.ai/api/search-image?query=modern%20apartment%20dining%20area%20with%20wooden%20table%2C%20designer%20chairs%2C%20pendant%20lighting%2C%20minimalist%20decor%2C%20large%20windows%2C%20elegant%20setting%2C%20contemporary%20design%2C%20neutral%20colors%2C%20spacious%20layout&width=600&height=400&seq=6&orientation=landscape",
    "https://readdy.ai/api/search-image?query=apartment%20second%20bedroom%20with%20queen%20bed%2C%20modern%20furniture%2C%20large%20windows%2C%20wooden%20flooring%2C%20minimalist%20design%2C%20bedside%20tables%2C%20reading%20lamps%2C%20elegant%20decor%2C%20neutral%20colors&width=600&height=400&seq=7&orientation=landscape",
    "https://readdy.ai/api/search-image?query=apartment%20study%20area%20with%20desk%2C%20ergonomic%20chair%2C%20bookshelf%2C%20modern%20design%2C%20natural%20light%2C%20minimalist%20decor%2C%20laptop%20setup%2C%20indoor%20plants%2C%20contemporary%20style&width=600&height=400&seq=8&orientation=landscape",
  ];

  // Room Images
  const roomImages = [
    "https://readdy.ai/api/search-image?query=luxurious%20master%20bedroom%20with%20king%20size%20bed%2C%20elegant%20headboard%2C%20bedside%20tables%2C%20reading%20lamps%2C%20large%20windows%2C%20wooden%20flooring%2C%20neutral%20colors%2C%20minimalist%20decor%2C%20spacious%20layout%2C%20modern%20design&width=400&height=300&seq=9&orientation=landscape",
    "https://readdy.ai/api/search-image?query=modern%20bedroom%20workspace%20with%20desk%2C%20ergonomic%20chair%2C%20laptop%2C%20natural%20light%2C%20minimalist%20design%2C%20wooden%20surfaces%2C%20contemporary%20style%2C%20organized%20setup%2C%20neutral%20colors&width=400&height=300&seq=10&orientation=landscape",
    "https://readdy.ai/api/search-image?query=bedroom%20walk-in%20closet%20with%20wooden%20shelves%2C%20hanging%20space%2C%20drawers%2C%20minimalist%20design%2C%20organized%20storage%2C%20modern%20fixtures%2C%20neutral%20colors%2C%20elegant%20setup&width=400&height=300&seq=11&orientation=landscape",
    "https://readdy.ai/api/search-image?query=bedroom%20attached%20bathroom%20with%20shower%2C%20modern%20fixtures%2C%20marble%20tiles%2C%20glass%20partition%2C%20minimalist%20design%2C%20elegant%20vanity%2C%20large%20mirror%2C%20neutral%20colors&width=400&height=300&seq=12&orientation=landscape",
    "https://readdy.ai/api/search-image?query=bedroom%20balcony%20view%20with%20outdoor%20seating%2C%20plants%2C%20wooden%20deck%2C%20glass%20railing%2C%20city%20view%2C%20modern%20design%2C%20cozy%20setup%2C%20evening%20ambiance&width=400&height=300&seq=13&orientation=landscape",
  ];

  // Similar Properties
  const similarProperties = [
    {
      id: 2,
      name: "Parkview Residences",
      type: "2 BHK Apartment",
      area: 1250,
      price: 35000,
      location: "Sector 15, Gurugram",
      availability: "Available from May 15",
      image: "https://readdy.ai/api/search-image?query=modern%20apartment%20building%20exterior%20with%20glass%20facade%2C%20balconies%2C%20landscaped%20entrance%2C%20contemporary%20architecture%2C%20urban%20setting%2C%20elegant%20design%2C%20neutral%20colors%2C%20residential%20complex&width=300&height=200&seq=14&orientation=landscape",
    },
    {
      id: 4,
      name: "Horizon Heights",
      type: "3 BHK Apartment",
      area: 1650,
      price: 48000,
      location: "Sector 48, Noida",
      availability: "Booked",
      image: "https://readdy.ai/api/search-image?query=luxury%20apartment%20complex%20with%20swimming%20pool%2C%20modern%20architecture%2C%20glass%20balconies%2C%20landscaped%20gardens%2C%20contemporary%20design%2C%20residential%20towers%2C%20elegant%20facade%2C%20urban%20setting&width=300&height=200&seq=15&orientation=landscape",
    },
    {
      id: 7,
      name: "Serene Suites",
      type: "1 BHK Studio",
      area: 850,
      price: 22000,
      location: "Sector 62, Noida",
      availability: "Female Only",
      image: "https://readdy.ai/api/search-image?query=compact%20modern%20apartment%20building%20with%20balconies%2C%20contemporary%20design%2C%20urban%20setting%2C%20glass%20elements%2C%20minimalist%20architecture%2C%20residential%20complex%2C%20elegant%20entrance&width=300&height=200&seq=16&orientation=landscape",
    },
    {
      id: 8,
      name: "Maple Meadows",
      type: "4 BHK Penthouse",
      area: 2200,
      price: 75000,
      location: "DLF Phase 5, Gurugram",
      availability: "Available from June 1",
      image: "https://readdy.ai/api/search-image?query=luxury%20penthouse%20apartment%20building%20with%20rooftop%20terraces%2C%20glass%20facade%2C%20modern%20architecture%2C%20high-end%20residential%20complex%2C%20urban%20setting%2C%20elegant%20design%2C%20contemporary%20style&width=300&height=200&seq=17&orientation=landscape",
    },
  ];

  // Mock properties data - in a real app you'd fetch this from API
  const propertyData = [
    {
      id: 1,
      name: "Skyline Apartments",
      type: "3 BHK Apartment",
      area: 1200,
      floor: "6th Floor",
      parking: 1,
      availability: "Available from July 1, 2023",
      location: "Sector 62, Noida",
      price: 25000,
      description: "Experience modern luxury living in this beautifully designed apartment. The spacious living area features floor-to-ceiling windows that flood the space with natural light and offer stunning views of the city skyline. The contemporary kitchen is equipped with high-end appliances and sleek cabinetry, perfect for both everyday meals and entertaining guests.\n\nThe master bedroom features a walk-in closet and an en-suite bathroom with premium fixtures. Two additional bedrooms provide comfortable spaces for family members or guests. The apartment includes a private balcony where you can enjoy your morning coffee or evening relaxation with panoramic views.\n\nFinished with premium materials throughout, this apartment combines aesthetic appeal with practical functionality. The open floor plan creates a seamless flow between living spaces, while thoughtful design details add character and charm to every room.",
      mainImages: propertyImages,
      amenities: [
        { name: "24x7 Security", icon: "🔒" },
        { name: "Gym", icon: "💪" },
        { name: "Indoor Games", icon: "🎮" },
        { name: "Car Parking", icon: "🚗" },
        { name: "Garbage Pickup", icon: "🗑️" },
        { name: "Garden", icon: "🌱" },
        { name: "Swimming Pool", icon: "🏊" },
        { name: "Power Backup", icon: "⚡" },
        { name: "High-Speed WiFi", icon: "📶" },
        { name: "Community Hall", icon: "🏛️" },
        { name: "Kids Play Area", icon: "🧸" },
        { name: "Rooftop Lounge", icon: "🌆" }
      ],
      nearbyHotspots: [
        { name: "Starbucks Coffee", distance: "0.3 km" },
        { name: "Sector 62 Metro Station", distance: "0.5 km" },
        { name: "M3M Business Park", distance: "1.2 km" },
        { name: "Anytime Fitness", distance: "0.8 km" },
        { name: "Big Bazaar Supermarket", distance: "1.0 km" },
        { name: "Indira Gandhi Hospital", distance: "2.5 km" }
      ],
      rooms: [
        {
          id: "room1",
          name: "Master Bedroom",
          available: true,
          moveInDate: "July 1, 2023",
          images: roomImages,
          rent: 12000,
          priceBreakdown: {
            baseRent: 8500,
            maintenance: 1500,
            furnishing: 1000,
            convenience: 500,
            gst: 500,
            total: 12000
          },
          specs: {
            area: 300,
            bathroom: "Attached",
            balcony: true,
            bedSize: "King",
            workspace: true
          },
          
        },
        {
          id: "room2",
          name: "Second Bedroom",
          available: true,
          moveInDate: "July 15, 2023",
          images: roomImages,
          rent: 10000,
          priceBreakdown: {
            baseRent: 7000,
            maintenance: 1200,
            furnishing: 900,
            convenience: 400,
            gst: 500,
            total: 10000
          },
          specs: {
            area: 250,
            bathroom: "Shared",
            balcony: false,
            bedSize: "Queen",
            workspace: true
          }
        },
        {
          id: "room3",
          name: "Third Bedroom",
          available: false,
          moveInDate: "September 1, 2023",
          images: roomImages,
          rent: 9000,
          priceBreakdown: {
            baseRent: 6000,
            maintenance: 1100,
            furnishing: 800,
            convenience: 400,
            gst: 700,
            total: 9000
          },
          specs: {
            area: 220,
            bathroom: "Shared",
            balcony: false,
            bedSize: "Twin",
            workspace: true
          }
        }
      ],
      flexiblePricing: [
        { duration: "6 months", room1: 13000, room2: 11000, room3: 10000, fullHouse: 32000 },
        { duration: "9 months", room1: 12000, room2: 10000, room3: 9000, fullHouse: 30000 },
        { duration: "11 months", room1: 11000, room2: 9000, room3: 8000, fullHouse: 27000 }
      ],
      utilities: [
        { name: "Electricity", cost: "As per usage" },
        { name: "Water", cost: "Included" },
        { name: "Wi-Fi", cost: "₹1000/month" },
        { name: "Maid", cost: "₹2500/month" },
        { name: "Cook", cost: "₹5000/month" },
        { name: "Car Parking", cost: "₹1500/month" },
        { name: "Move-in assistance", cost: "₹3000 (one-time)" }
      ],
      reviews: [
        { 
          id: 1,
          name: "Rahul Sharma",
          rating: 4.5,
          date: "April 15, 2023",
          comment: "Excellent property with great amenities. The location is convenient and the staff is very helpful."
        },
        { 
          id: 2,
          name: "Priya Patel",
          rating: 5,
          date: "March 10, 2023",
          comment: "I've been living here for 6 months and I absolutely love it. The rooms are spacious and well-maintained."
        }
      ],
      townmanorPromise: [
        "Minimal security deposit (1 month rent)",
        "No hidden exit fees",
        "Flexible notice period (1 month)",
        "Single occupancy at no extra cost",
        "24/7 power backup",
        "Regular maintenance included",
        "Quality kitchenware provided",
        "Modern appliances in working condition",
        "48-hour resolution for complaints"
      ],
      similarListings: [2, 4, 7, 8]
    },
    // Adding mock data for similar properties
    ...similarProperties
  ];

  // Define traditional Indian style images
  const traditionalImages = [
    "https://readdy.ai/api/search-image?query=modern%20luxury%20apartment%20living%20room%20with%20large%20windows%2C%20natural%20light%2C%20contemporary%20furniture%2C%20minimalist%20design%2C%20high-end%20finishes%2C%20wooden%20flooring%2C%20elegant%20decor%2C%20spacious%20layout%2C%20neutral%20color%20palette%2C%20stylish%20interior&width=600&height=400&seq=1&orientation=landscape",
    "https://readdy.ai/api/search-image?query=modern%20apartment%20kitchen%20with%20marble%20countertops%2C%20stainless%20steel%20appliances%2C%20wooden%20cabinets%2C%20island%20counter%2C%20pendant%20lights%2C%20sleek%20design%2C%20contemporary%20fixtures%2C%20open%20concept%2C%20bright%20lighting%2C%20minimalist%20style&width=600&height=400&seq=2&orientation=landscape",
    "https://readdy.ai/api/search-image?query=luxurious%20master%20bedroom%20with%20king%20size%20bed%2C%20elegant%20headboard%2C%20bedside%20tables%2C%20reading%20lamps%2C%20large%20windows%2C%20wooden%20flooring%2C%20neutral%20colors%2C%20minimalist%20decor%2C%20spacious%20layout%2C%20modern%20design&width=600&height=400&seq=3&orientation=landscape",
    "https://readdy.ai/api/search-image?query=modern%20bathroom%20with%20walk-in%20shower%2C%20bathtub%2C%20marble%20tiles%2C%20minimalist%20design%2C%20glass%20partition%2C%20contemporary%20fixtures%2C%20neutral%20colors%2C%20elegant%20vanity%2C%20large%20mirror%2C%20ambient%20lighting&width=600&height=400&seq=4&orientation=landscape",
    "https://readdy.ai/api/search-image?query=apartment%20balcony%20with%20city%20view%2C%20outdoor%20furniture%2C%20plants%2C%20wooden%20deck%2C%20glass%20railing%2C%20evening%20ambiance%2C%20cozy%20setup%2C%20modern%20design%2C%20outdoor%20lighting%2C%20urban%20landscape&width=600&height=400&seq=5&orientation=landscape",
    "https://readdy.ai/api/search-image?query=modern%20apartment%20dining%20area%20with%20wooden%20table%2C%20designer%20chairs%2C%20pendant%20lighting%2C%20minimalist%20decor%2C%20large%20windows%2C%20elegant%20setting%2C%20contemporary%20design%2C%20neutral%20colors%2C%20spacious%20layout&width=600&height=400&seq=6&orientation=landscape",
    "https://readdy.ai/api/search-image?query=apartment%20second%20bedroom%20with%20queen%20bed%2C%20modern%20furniture%2C%20large%20windows%2C%20wooden%20flooring%2C%20minimalist%20design%2C%20bedside%20tables%2C%20reading%20lamps%2C%20elegant%20decor%2C%20neutral%20colors&width=600&height=400&seq=7&orientation=landscape",
    "https://readdy.ai/api/search-image?query=apartment%20study%20area%20with%20desk%2C%20ergonomic%20chair%2C%20bookshelf%2C%20modern%20design%2C%20natural%20light%2C%20minimalist%20decor%2C%20laptop%20setup%2C%20indoor%20plants%2C%20contemporary%20style&width=600&height=400&seq=8&orientation=landscape",
  ];

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundProperty = propertyData.find(p => p.id === parseInt(id));
      if (foundProperty) {
        setProperty(foundProperty);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  const toggleLightbox = () => {
    setShowLightbox(!showLightbox);
  };

  const navigateLightbox = (direction) => {
    if (direction === 'prev') {
      setActiveImageIndex((prev) => (prev === 0 ? traditionalImages.length - 1 : prev - 1));
    } else {
      setActiveImageIndex((prev) => (prev === traditionalImages.length - 1 ? 0 : prev + 1));
    }
  };

  const handleRoomTabClick = (roomId) => {
    setActiveTab(roomId);
    setActiveRoomPriceBreakdown('');
  };

  const togglePriceBreakdown = (roomId) => {
    if (activeRoomPriceBreakdown === roomId) {
      setActiveRoomPriceBreakdown('');
    } else {
      setActiveRoomPriceBreakdown(roomId);
    }
  };

  if (loading) {
    return <div className="property-details-loading">Loading property details...</div>;
  }

  if (!property) {
    return <div className="property-details-error">Property not found</div>;
  }

  return (
    <div className="property-details-container">
      {/* Header Section */}
      <div className="property-header">
        <h1 className="property-title">{property.name}</h1>
        <div className="property-specs">
          <div className="property-spec">{property.type}</div>
          <div className="property-spec">{property.area} sq.ft</div>
          <div className="property-spec">{property.floor}</div>
          <div className="property-spec">{property.parking} Parking</div>
        </div>
        <div className="availability-badge">{property.availability}</div>
        <div className="header-actions">
          <button className="action-button">
            <span>🔗</span> Share
          </button>
          <button className="action-button">
            <span>❤️</span> Save
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="gallery-grid">
          <div className="gallery-main-image-container">
            <img
              src={traditionalImages[activeImageIndex]}
              alt={property.name}
              className="gallery-main-image"
              onClick={toggleLightbox}
            />
          </div>
          <div className="gallery-secondary-images">
            <div className="gallery-small-image-container">
              <img
                src={traditionalImages[1]}
                alt={`${property.name} view 1`}
                className="gallery-small-image"
                onClick={() => handleThumbnailClick(1)}
              />
            </div>
            <div className="gallery-small-image-container">
              <img
                src={traditionalImages[2]}
                alt={`${property.name} view 2`}
                className="gallery-small-image"
                onClick={() => handleThumbnailClick(2)}
              />
            </div>
          
            <div className="gallery-small-image-container">
              <button className="gallery-view-all-button" onClick={toggleLightbox}>
                <span>Show all images</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="lightbox">
          <div className="lightbox-close" onClick={toggleLightbox}>×</div>
          <div className="lightbox-nav lightbox-prev" onClick={() => navigateLightbox('prev')}>‹</div>
          <img
            src={traditionalImages[activeImageIndex]}
            alt={property.name}
            className="lightbox-image"
          />
          <div className="lightbox-nav lightbox-next" onClick={() => navigateLightbox('next')}>›</div>
        </div>
      )}
      
      {/* About this Property */}
      <div className="property-section">
        <h2 className="section-title">About this property</h2>
        <p className="section-description">{property.description}</p>
      </div>

      {/* Video Tour CTA */}
      <div className="video-tour">
        <div className="video-tour-text">Want to explore this property virtually?</div>
        <button className="video-tour-button">Take a video tour</button>
      </div>

      {/* Amenities */}
      <div className="property-section">
        <h2 className="section-title">Amenities</h2>
        <div className="amenities-grid">
          {property.amenities.map((amenity, index) => (
            <div key={index} className="amenity-item">
              <span className="amenity-icon">{amenity.icon}</span>
              <span className="amenity-name">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Hotspots */}
      <div className="property-section">
        <h2 className="section-title">Nearby Hotspots</h2>
        <div className="hotspots-list">
          {property.nearbyHotspots.map((hotspot, index) => (
            <div key={index} className="hotspot-item">
              <div className="hotspot-name">{hotspot.name}</div>
              <div className="hotspot-distance">{hotspot.distance}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Property Rooms */}
      <div className="property-section">
        <h2 className="section-title">Property Rooms</h2>
        
        <div className="room-tabs">
          {property.rooms.map((room) => (
            <div 
              key={room.id}
              className={`room-tab ${activeTab === room.id ? 'active' : ''}`}
              onClick={() => handleRoomTabClick(room.id)}
            >
              <img 
                src={room.images[0]} 
                alt={room.name} 
                className="room-tab-image" 
              />
              <div className="room-tab-name">
                {room.name}
                <span className={`room-tab-status ${room.available ? 'status-available' : 'status-booked'}`}>
                  {room.available ? 'Available' : 'Booked'}
                </span>
              </div>
              <div className="room-tab-price">₹{room.rent}/month</div>
              <div className="room-tab-specs">
                <div className="room-tab-spec">
                  <span>📏</span> {room.specs.area} sq.ft
                </div>
                <div className="room-tab-spec">
                  <span>🛌</span> {room.specs.bedSize}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {property.rooms.map((room) => (
          <div 
            key={room.id}
            className={`room-content ${activeTab === room.id ? 'active' : ''}`}
          >
            <div className="room-header">
              <div className="room-title">{room.name}</div>
              <div className={`room-availability ${!room.available ? 'booked-badge' : ''}`}>
                {room.available ? 'Available' : 'Booked'} | Move in: {room.moveInDate}
              </div>
            </div>
            
            <div className="room-gallery">
              <div className="room-thumbnails">
                {room.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${room.name} image ${index + 1}`}
                    className="gallery-thumbnail"
                  />
                ))}
              </div>
            </div>
            
            <div className="room-price-section">
              <div className="room-price">₹{room.rent}/month</div>
              <button 
                className="price-breakdown-toggle"
                onClick={() => togglePriceBreakdown(room.id)}
              >
                {activeRoomPriceBreakdown === room.id ? 'Hide price breakdown' : 'View price breakdown'}
              </button>
              
              <div className={`price-breakdown ${activeRoomPriceBreakdown === room.id ? 'show' : ''}`}>
                <div className="price-row">
                  <div>Base Rent</div>
                  <div>₹{room.priceBreakdown.baseRent}</div>
                </div>
                <div className="price-row">
                  <div>Maintenance</div>
                  <div>₹{room.priceBreakdown.maintenance}</div>
                </div>
                <div className="price-row">
                  <div>Furnishing</div>
                  <div>₹{room.priceBreakdown.furnishing}</div>
                </div>
                <div className="price-row">
                  <div>Convenience</div>
                  <div>₹{room.priceBreakdown.convenience}</div>
                </div>
                <div className="price-row">
                  <div>GST</div>
                  <div>₹{room.priceBreakdown.gst}</div>
                </div>
                <div className="price-row total">
                  <div>Total</div>
                  <div>₹{room.priceBreakdown.total}</div>
                </div>
              </div>
            </div>
            
            <div className="room-specs-grid">
              <div className="room-spec-item">
                <div>Area</div>
                <div>{room.specs.area} sq.ft</div>
              </div>
              <div className="room-spec-item">
                <div>Bathroom</div>
                <div>{room.specs.bathroom}</div>
              </div>
              <div className="room-spec-item">
                <div>Balcony</div>
                <div>{room.specs.balcony ? 'Yes' : 'No'}</div>
              </div>
              <div className="room-spec-item">
                <div>Bed Size</div>
                <div>{room.specs.bedSize}</div>
              </div>
              <div className="room-spec-item">
                <div>Workspace</div>
                <div>{room.specs.workspace ? 'Yes' : 'No'}</div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
      
      {/* Location & Neighbourhood */}
      <div className="property-section">
        <h2 className="section-title">Location & Neighbourhood</h2>
        <div className="location-map">
          <iframe 
            src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Property location"
          ></iframe>
        </div>
        <p>Check commute times from this location to your work or other important places.</p>
      </div>
      
      {/* Flexible Pricing Options */}
      <div className="property-section">
        <h2 className="section-title">Flexible Pricing Options</h2>
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Lock-in Duration</th>
              <th>{property.rooms[0].name}</th>
              <th>{property.rooms[1].name}</th>
              <th>{property.rooms[2].name}</th>
              <th>Full House</th>
            </tr>
          </thead>
          <tbody>
            {property.flexiblePricing.map((pricing, index) => (
              <tr key={index}>
                <td>{pricing.duration}</td>
                <td>₹{pricing.room1}</td>
                <td>₹{pricing.room2}</td>
                <td>₹{pricing.room3}</td>
                <td>₹{pricing.fullHouse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Primary CTAs */}
      <div className="primary-ctas">
        <Link to="/reserve" className="primary-cta reserve">Join / Reserve</Link>
        <Link to="/chat" className="primary-cta chat">Chat With Us</Link>
        <Link to="/schedule" className="primary-cta visit">Schedule a visit</Link>
      </div>
      
      {/* Utilities & Add-Ons */}
      <div className="property-section">
        <h2 className="section-title">Utilities & Add-Ons</h2>
        <div className="utilities-grid">
          {property.utilities.map((utility, index) => (
            <div key={index} className="utility-item">
              <div className="utility-name">{utility.name}</div>
              <div className="utility-cost">{utility.cost}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reviews */}
      <div className="property-section reviews-section">
        <h2 className="section-title">Reviews</h2>
        {property.reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="review-name">{review.name}</div>
              <div className="review-date">{review.date}</div>
            </div>
            <div className="review-rating">
              {'★'.repeat(Math.floor(review.rating))}
              {review.rating % 1 === 0.5 ? '½' : ''}
              {'☆'.repeat(5 - Math.ceil(review.rating))}
            </div>
            <div className="review-comment">{review.comment}</div>
          </div>
        ))}
      </div>
      
      {/* Townmanor Promise */}
      <div className="property-section">
        <h2 className="section-title">Townmanor Promise</h2>
        <ul className="promise-list">
          {property.townmanorPromise.map((promise, index) => (
            <li key={index} className="promise-item">{promise}</li>
          ))}
        </ul>
      </div>
      
      {/* Similar Listings */}
      <div className="property-section similar-listings">
        <h2 className="section-title">Similar Listings</h2>
        <div className="similar-listings-grid">
          {propertyData
            .filter(p => property.similarListings.includes(p.id))
            .map(similarProperty => (
              <Link 
                key={similarProperty.id} 
                to={`/rental-property/${similarProperty.id}`}
                className="similar-listing-card"
              >
                <img 
                  src={similarProperty.image || similarProperty.mainImages?.[0]} 
                  alt={similarProperty.name} 
                  className="similar-listing-image" 
                />
                <div className="similar-listing-details">
                  <h3 className="similar-listing-name">{similarProperty.name}</h3>
                  <div className="similar-listing-location">{similarProperty.location}</div>
                  <div className="similar-listing-specs">
                    <span>{similarProperty.type}</span>
                    <span>{similarProperty.area} sq.ft</span>
                  </div>
                  <div className="similar-listing-availability">{similarProperty.availability}</div>
                  <div className="similar-listing-price">₹{similarProperty.price}/month</div>
                </div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 