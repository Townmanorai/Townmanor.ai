import React from 'react'
import CreditScoreSection from './CreditScoreSection'
import CreditScoreFAQ from './CreditScoreFAQ'


import "../common.css";
import "../commonsecond.css";
import { Helmet } from 'react-helmet';

function CreditScore() {
  return (
    <>
    <Helmet>

        <title>Credit Score - TownManor AI</title>

      
        <meta 
          name="description" 
          content="Learn about your credit score, how it affects your financial decisions, and tips to improve it on TownManor AI's Credit Score platform." 
        />

    
        <meta 
          name="keywords" 
          content="credit score, credit score tips , how to get cibil score , how to know my cibil score"
        />
        <meta property="og:title" content="Credit Score - TownManor AI" />
        <meta 
          property="og:description" 
          content="Discover how your credit score impacts financial decisions and find helpful resources on improving your score at TownManor AI." 
        />
         <meta 
          property="og:url" 
          content="https://townmanor.ai/credit-score" 
        />
    </Helmet>
    <div className="wpart">
        <CreditScoreSection />
        <CreditScoreFAQ />
    </div>
    </>
  )
}

export default CreditScore
