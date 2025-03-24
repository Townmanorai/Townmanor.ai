import React from 'react'
import Banner from './Banner'
import HomeLoanBanner from './HomeLoanBanner'
import FeatureGrid from './FeaturesGrid'
import TrustedBrands from './TrustBrands'
import EMICalculator from './EMICalculator'
import FAQSection from './FAQSection'
import Testimonials from './Testimonials'


function Andromeda() {
   
  return (
    <>
    <div style={{
        backgroundColor:'white'
    }}>
    <Banner/>
    <HomeLoanBanner/>
    <FeatureGrid/>
    <TrustedBrands/>
    <Testimonials/>
   <EMICalculator/>
   {/* <FaqComponent faqs={faqs}/> */}
   <FAQSection/>
    </div>
    </>
  )
}

export default Andromeda