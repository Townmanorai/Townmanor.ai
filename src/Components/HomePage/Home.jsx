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
import PropertyList from './PropertyList'

function Home() {
  return (
    <div>
      
      <Banner />
      <InHouseServices />
      <Discovermore />
      <PopularListing />
      <RightAgents />
      <CategoriesPresentation />
      <StateHouseTax />
      <PropertyList />
      <ExclusiveOwnerProperties />
      <TopRentedProperties />
      <LocationsGrid />
      <ExploreFeatures />
      <ClientsSay />
      <BlogPosts />

    </div>
  )
}

export default Home
