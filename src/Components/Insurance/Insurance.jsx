import React from 'react'
import InsuranceSection from './InsuranceSection'
import InsuranceSectionFAQ from './InsuranceImageFAQ'
import { Helmet } from 'react-helmet';
const Insurance = () => {
  return (
    <>
          <Helmet>
        <meta charset="UTF-8" />
        <title>Insurance consultant | Health insurance - Townmanor Technologies</title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content="Need help with insurance decisions? Our expert insurance consultants provide personalized solutions for all your coverage needs" />
        <meta name="keywords" content="Health insurance, Insurance consultant, health insurance company, flat near me, insurance broker near me, health insurance company" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="author" content="" />
        <meta name="google-site-verification" content="Q-5FmOg3ddHnSHuLt6XNkTvC4ErGOqCZfGh-EGKfmt4" />
        <meta name="google-site-verification" content="TVNuSD_VDF35c6Yyj__SNVQ75tjk--Jt6sZc4doZNBk" />
        <meta property="og:site_name" content="Townmanor Technologies Pvt Ltd." />
        <meta property="og:title" content="Townmanor Technologies Pvt Ltd. - Insurance consultant | Health insurance - Townmanor Technologies" />
        <meta property="og:url" content="https://townmanor.ai/insurance" />
        <meta property="og:description" content="Need help with insurance decisions? Our expert insurance consultants provide personalized solutions for all your coverage needs" />
        <meta property="og:image" content="https://townmanor.in/templates/selio/assets/img/share-img-logo.png" />
        <link rel="shortcut icon" href="https://townmanor.in/files/logo_9.png" type="image/png" />
        <link rel="canonical" href="https://townmanor.in/en/191/insurance" />
      </Helmet>
    <div className='wpart'>
        <InsuranceSection />
        <InsuranceSectionFAQ />
    </div>
    </>
  )
}

export default Insurance
