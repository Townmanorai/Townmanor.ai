import React from 'react'
import Property_image_slider from './Property_image_slider'
// import Navbar from '../NavFooter/Navbar'
import PropertyTopHeader from './PropertyTopHeader'
import Property_Desc from './Property_Desc'
import Property_Energy_saving from './Property_Energy_saving'
import Property_Documents from './Property_Documents'
import PropertyDetails from './PropertyDetails'
import PropertyAmenities from './PropertyAmenities'
import PropertyAmenitiesOutdoor from './PropertyAmenitiesOutdoor'
import PropertyDistanceDetails from './PropertyDistanceDetails'
import PropertyDynamicCategories from './Property_center_dynamic_categories'
import PropertyFloorPlan from './Property_FloorPlan'
import PropertyRates from './Property_rates_table'
import PropertyLocation from './Property_Map_Location'
import PropertyWalkScore from './Property_center_walkscore'
import PropertyReviewSection from './Property_ReviewSection'
import PropertyFacebookComments from './Property_Facebook_Comment'
import AdsWidget from './Ads_In_Property'
import FeaturedRightAgents from './Property_right_Featured_agent'
import ContactListingAgent from './Property_right_Form_contact'
import DownloadBrochure from './Property_Brochure'
import RightLatestListings from './Property_right_Listing'
import MortgageCalculator from './Property_EMI_Calculator'
import PropertyRightQRCode from './Property_right_QR_code'
import RightPrint from './Property_right_print'
import PropertyCompare from './Property_Compare'
import RightAds from './Property_right_ads'
import SimilarListings from './Property_Similar_Listing'
// import Footer from '../NavFooter/Footer'

function Property() {
    return (
        <div>

            <section class="property-single-pg">
                <div class="container-fluid px-5">
                    {/* <AdsWidget /> */}
                    <div class="property-single-page-content">
                        <div class="row prop-spacing-left-right">
                            <div class="col-md-12">
                                <div class="prop-image-slider"><Property_image_slider />
                                </div>
                                <div class="prop-slider-content"><PropertyTopHeader /></div></div></div>
                        {/* Property Details */}

                        <div class="row">
                            <div class="col-lg-8 pl-0 pr-0">
                                <div class="property-pg-left">
                                    <Property_Desc />
                                    {/* <Property_Energy_saving />   */}
                                    {/* <Property_Documents /> */}
                                    <PropertyDetails />
                                    <PropertyAmenities />
                                    {/* <PropertyAmenitiesOutdoor /> */}
                                    <PropertyDistanceDetails />
                                    {/* <PropertyDynamicCategories /> */}
                                    <PropertyFloorPlan />
                                    {/* <PropertyRates /> */}
                                    <PropertyLocation />
                                    <PropertyWalkScore />
                                    <PropertyReviewSection />
                                    {/* <PropertyFacebookComments /> */}
                                </div>
                                {/* property-pg-left end */}
                            </div>
                            <div class="col-lg-4 pr-0">
                                <div class="sidebar layout2">
                                    <FeaturedRightAgents />
                                    <ContactListingAgent />
                                    <DownloadBrochure />
                                    {/* <RightLatestListings /> */}
                                    <MortgageCalculator />
                                    {/* <PropertyRightQRCode /> */}
                                    {/* <RightPrint /> */}
                                    {/* <PropertyCompare /> */}
                                    {/* <RightAds /> */}

                                </div>
                            </div>
                            {/* sidebar end */}
                        </div>

                    </div>
                </div>
            </section>

        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="similar-prop">
                {/* <SimilarListings /> */}
              </div>
            </div>
          </div>
        </div>

    </div>

    )
}

export default Property
