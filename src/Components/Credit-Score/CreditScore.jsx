import React from 'react'
import CreditScoreSection from './CreditScoreSection'
import CreditScoreFAQ from './CreditScoreFAQ'


import "../common.css";
import "../commonsecond.css";

function CreditScore() {
  return (
    <>
    <div className="wpart">
        <CreditScoreSection />
        <CreditScoreFAQ />
    </div>
    </>
  )
}

export default CreditScore
