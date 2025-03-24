import React from 'react'
import Banner from './Banner'
import HomeLoanBanner from './HomeLoanBanner'
import FeatureGrid from './FeaturesGrid'
import TrustedBrands from './TrustBrands'
import Testimonials from './TestiMonials'
import EMICalculator from './EmiCalculator'
import FaqComponent from '../HomePage/FaqComponent'
import FAQSection from './FAQSection'


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