import React from 'react'
import HomeInt from './HomeInt'
import HomeInt1 from './HomeInt1'
import OurProcess from './OurProcess'
import HomePlatforms from './HomePlatforms'
import Interior from './Interior'
import ContactPage from './ContactPage'
import Interior2 from './Interior2'

function HomeInterior() {
  return (
    <div style={{height:'auto'}}>
      <HomeInt />
      <HomeInt1/>
      <OurProcess />
      <HomePlatforms/>
      <Interior />
      <ContactPage />
      <Interior2 />
    </div>
  )
}

export default HomeInterior;