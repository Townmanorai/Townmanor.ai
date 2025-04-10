import React from 'react';
import "./HOmePlatforms.css"
import { FaStar } from 'react-icons/fa';  

const Marketplace = () => {
  const sellers = [
    {
      id: 1,
      name: "TechHub Electronics",
      image: "kitchen-design1.jpg",
      sellerImage: "https://creatie.ai/ai/api/search-image?query=Professional headshot of a middle-aged man with a friendly smile wearing a business casual attire, clean background&width=100&height=100&orientation=squarish&flag=aa219901-7d09-404e-8bc8-3afabd13038b&flag=656b7b1e-c2e5-4a37-a88c-b1306a431fa1&flag=d042d6e7-3721-46be-aa7b-c60f38309e52&flag=fccc1b74-8847-45d8-814e-0ac25e874354&flag=9aa274a0-af95-4bdd-bec5-fade4da49664",
      rating: 4.9,
      reviews: 523,
      category: "Living Room",
      verified: true,
    },
    {
      id: 2,
      name: "Style Studio",
      image: "kitchen-design2.jpg",
      sellerImage: "https://creatie.ai/ai/api/search-image?query=Professional headshot of a young woman with a warm smile wearing fashionable business attire, clean background&width=100&height=100&orientation=squarish&flag=0216cd31-aeb2-4db1-95ce-639a8c0e50c4&flag=aebc3d1b-d76a-47da-bbbb-0c330b170d92&flag=666d07a8-b0d5-4465-a608-0d2fe471f8df&flag=3c1db83d-7339-4c7f-8eee-b172ee472e17&flag=88e2e592-7188-40fa-858a-c4ebb7af7ff7",
      rating: 4.8,
      reviews: 428,
      category: "Bedroom",
      verified: true,
    },
    {
      id: 3,
      name: "Home & Living",
      image: "kitchen-design3.jpg",
      sellerImage: "https://creatie.ai/ai/api/search-image?query=Professional headshot of a middle-aged woman with an elegant smile wearing sophisticated business attire, clean background&width=100&height=100&orientation=squarish&flag=af359ed5-7259-4a05-a2ef-b82ebbb4b195&flag=79e44674-6700-48a8-b497-c47951c1a478&flag=f43e665d-5e09-462e-956f-378fa22532a9&flag=007c4182-9032-4996-9019-06e55675f133&flag=aa6ccac6-9974-470b-b537-6f42b3c6f7b5",
      rating: 4.7,
      reviews: 312,
      category: "Bathroom",
      verified: true,
    },
    {
      id: 4,
      name: "Modern Kitchen Solutions",
      image: "kitchen-design2.jpg",
      sellerImage: "https://creatie.ai/ai/api/search-image?query=Professional headshot of a young interior designer&width=100&height=100&flag=3a4541bd-4c42-4cdb-b544-c5ab780a291a&flag=4f949192-e18b-4ebe-84ba-0b3c96bc25da&flag=036ed642-291d-495b-a508-a09c5ce55419",
      rating: 4.8,
      reviews: 245,
      category: "Kitchen",
      verified: true,
    },
  ];

  return (
    <div className="marketplace-container">
      <h2 className="marketplace-title">Home Interior Sellers</h2>
      <div className="sellers-grid">
        {sellers.map((seller) => (
          <div key={seller.id} className="seller-card">
            <div className="seller-image-container">
              <img src={seller.image} alt={seller.name} className="seller-image" />
            </div>
            <div className="seller-details">
              <div className="seller-info">
                <img src={seller.sellerImage} alt="Seller" className="seller-avatar" />
                <div className="seller-text">
                  <h3 className="seller-name">{seller.name}</h3>
                  <div className="seller-rating">
                    {/* <i className="fas fa-star seller-star"></i> */}
                    <FaStar style={{width:'15px',marginRight:'5px'}} size={10} color="gold"/>
                    <span className="seller-rating-value">{seller.rating}</span>
                    <span className="seller-reviews">{seller.reviews} reviews</span>
                  </div>
                </div>
              </div>
              <div className="seller-tags">
                <span className="seller-category">{seller.category}</span>
                {seller.verified && <span className="seller-verified">Verified</span>}
              </div>
              <button className="seller-contact-button">Contact Seller</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function HomePlatforms() {
  const Platforms = [
    {
      img: './logo_image1.png',
      name: 'Homelane',
      data: 'Best Price On Home interior Guranteed',
    },
    {
      img: './logo_image2.png',
      name: 'Pepperfry',
      data: '',
    },
    {
      img: './logo_image3.png',
      name: 'HippoHomes',
      data: 'Nay Ghar ki Suruat Hippo Homes Ke Sath',
    },
    {
      img: './logo_image4.png',
      name: 'Diesigncafe',
      data: 'More Room For Joy',
    },
  ];

  // Duplicate the platforms array to create a seamless loop
  const duplicatedPlatforms = [...Platforms, ...Platforms];

  return (
    <div style={{ height: '100%', marginTop: '50px' }}>
      <div className="">
        <div>
          <div className="hp-heading">
            <h1>
              Explore Leading <span>Home Interior</span> Platforms
            </h1>
          </div>
          <div className="platforms-scroll-container">
            <div className="platforms-scroll">
              {duplicatedPlatforms.map((item, index) => (
                <div className="platform-item" key={index}>
                  <div className="platform-image">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="platform-name">{item.name}</div>
                  {item.data && <div className="platform-tagline">{item.data}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Marketplace />
        </div>
      </div>
    </div>
  );
}

export default HomePlatforms;