import React from 'react'
import ProductSection from './ProductSection'

import "../common.css";
import "../commonsecond.css";
import LoanForm from './LoanForm';

const HomeLoan = () => {
  return (
    <div className='wpart'>
      <section className='HomeLoan_area' style={{paddingTop:'30px'}}>
        <ProductSection />
        <LoanForm />
      </section>
    </div>
  )
}

export default HomeLoan
