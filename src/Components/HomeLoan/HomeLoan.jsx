import React from 'react'
import ProductSection from './ProductSection'
import { Helmet } from 'react-helmet'
import "../common.css";
import "../commonsecond.css";
import LoanForm from './LoanForm';
import TownManorAndromeda from './TownManorAndromeda';

const HomeLoan = () => {
  return (
    <>
       <Helmet>
        <title>Home Loan | Affordable and Easy Loan Solutions</title>
        <meta name="description" content="Apply for a home loan with flexible terms and competitive interest rates. Get the best home loan offers today." />
        <meta name="keywords" content="home loan, mortgage, affordable home loan, home loan application, loan services" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Home Loan | Affordable and Easy Loan Solutions" />
        <meta property="og:description" content="Apply for a home loan with flexible terms and competitive interest rates. Get the best home loan offers today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://townmanor.ai/home-loan" /> {/* Optional: Replace with your site URL */}
      </Helmet>
    <div className='wpart'>
    {/* <TownManorAndromeda/> */}
      <section className='HomeLoan_area' style={{paddingTop:'80px'}}>
       
        <ProductSection />
        <LoanForm />
      </section>
    </div>
    </>
  )
}

export default HomeLoan
