import React from 'react'
import Banner from './Banner'
import InHouseServices from './InHouseServices'
import Discovermore from './Discovermore'
import PopularListing from './PopularListing'
import RightAgents from './RightAgents'
import CategoriesPresentation from './CategoriesPresentation'
import LocationsGrid from './LocationsGrid'
import ExploreFeatures from './ExploreFeatures'
import ClientsSay from './ClientsSay'
import BlogPosts from './BlogPosts'
import Footer from '../NavFooter/Footer'
import Navbar from '../NavFooter/Navbar'
import StateHouseTax from './StateHouseTax'
import { Helmet } from 'react-helmet';
import './Home.css'
import ExclusiveOwnerProperties from './ExclusiveOwnerProperties'
import TopRentedProperties from './TopRentedProperties'
import AdvertisementVideo from './AdvertisementVideo'
import PropertyList from './PropertyList'
import MainSearch from '../SearchBar/MainSearch'
import Coliving_space from './Coliving_space'
import Services from './Services'
import AdvBanner from '../../AdvBanner'

function Home() {
  return (
    <>
      <Helmet>
      
        <meta charset="UTF-8" />
        <title>Property for sale | office interiors &amp; design - Townmanor Technologies</title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content="Townmanor Technologies is committed to Revolutionizing how people buy homes online with an innovative blend of AI &amp; ML applications" />
        <meta name="keywords" content="House for sale near me , real estate meaning in hindi , commercial real estate ,real estate agent near me , real estate meaning , real estate company in noida , real estate agency" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="author" content="" />
        <meta name="google-site-verification" content="Q-5FmOg3ddHnSHuLt6XNkTvC4ErGOqCZfGh-EGKfmt4" />
        <meta name="google-site-verification" content="TVNuSD_VDF35c6Yyj__SNVQ75tjk--Jt6sZc4doZNBk" />
        <meta property="og:site_name" content="Townmanor Technologies Pvt Ltd." />
        <meta property="og:title" content="Townmanor Technologies Pvt Ltd. - Property for sale | office interiors &amp; design - Townmanor Technologies" />
        <meta property="og:url" content="https://townmanor.ai/" />
        <meta property="og:description" content="Townmanor Technologies is committed to Revolutionizing how people buy homes online with an innovative blend of AI &amp; ML applications" />
        <meta property="og:image" content="https://townmanor.in/templates/selio/assets/img/share-img-logo.png" />
        <link rel="shortcut icon" href="https://townmanor.in/files/logo_9.png" type="image/png" />
        <link rel="canonical" href="https://townmanor.ai/" />
        <link href="https://fonts.googleapis.com/css?family=Lora%7COpen+Sans:300,400,600,700%7CPlayfair+Display:400,700%7CPoppins:300,400,500,600,700%7CRaleway:300,400,500,600,700,800%7CRoboto:300,400,500,700&amp;display=swap&amp;subset=cyrillic&amp;display=swap" rel="stylesheet" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": "Property for sale | office interiors & design - Townmanor Technologies",
            "url": "https://townmanor.ai"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "Townmanor Technologies Pvt Ltd",
            "alternateName": "Townmanor",
            "url": "https://townmanor.ai",
            "logo": "https://townmanor.in/files/footer-logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "7042888903",
              "contactType": "sales"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Townmanor Technologies Pvt Ltd",
            "alternateName": "Townmanor Technologies Pvt Ltd",
            "specialty": "House for sale near me, top interior design companies, property for sale near me, flat near me, room interior decoration",
            "relatedLink": "https://townmanor.in/en/182/about_us",
            "about": "Explore the journey of Town Manor, a premier destination for luxury living and personalized service, dedicated to enhancing your lifestyle",
            "publisher": {
              "@type": "Organization",
              "name": "Townmanor Technologies Pvt Ltd",
              "logo": "https://townmanor.in/files/logo.png",
              "telephone": "7042888903",
              "email": "corporate@townmanor.in",
              "url": "https://townmanor.in/en/182/about_us",
              "description": "Explore the journey of Town Manor, a premier destination for luxury living and personalized service, dedicated to enhancing your lifestyle",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ST-304, Eldeco Studio, Sector 93A",
                "addressLocality": "Noida",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "201304"
              }
            }
          })}
        </script>
      </Helmet>
    <div>
        {/* <AdvBanner/> */}
      {/* <Banner /> */}
      <MainSearch/>
      <PopularListing />
     
      {/* <InHouseServices /> */}
      <Discovermore />
      
      {/* <RightAgents /> */}
      <CategoriesPresentation />
      <ExclusiveOwnerProperties />
      {/* <PropertyList /> */}
      <TopRentedProperties />
      <Services />
      <StateHouseTax />
      <Coliving_space/>
      <LocationsGrid />
      <ExploreFeatures />
      <AdvertisementVideo />
      {/* <ClientsSay /> */}
      <BlogPosts />

    </div>
    </>
  )
}

export default Home
