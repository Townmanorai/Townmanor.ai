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

import './Home.css'
import ExclusiveOwnerProperties from './ExclusiveOwnerProperties'
import TopRentedProperties from './TopRentedProperties'
// import AdvertisementVideo from './AdvertisementVideo'
import PropertyList from './PropertyList'
import MainSearch from '../SearchBar/MainSearch'
import Coliving_space from './Coliving_space'
import Services from './Services'

function Home() {
  return (
    <div>
      
      {/* <Banner /> */}
      <MainSearch/>
      <Services />
      {/* <InHouseServices /> */}
      {/* <AdvertisementVideo /> */}
      <Discovermore />
      <PopularListing />
      {/* <RightAgents /> */}
      <CategoriesPresentation />
      <ExclusiveOwnerProperties />
      <PropertyList />
      <TopRentedProperties />
      <StateHouseTax />
      <Coliving_space/>
      <LocationsGrid />
      <ExploreFeatures />
      {/* <ClientsSay /> */}
      <BlogPosts />

    </div>
  )
}

export default Home
