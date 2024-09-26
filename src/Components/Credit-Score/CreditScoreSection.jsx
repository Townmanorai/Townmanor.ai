import React from 'react'
import CreditScoreForm from './CreditScoreForm'

import "../common.css";
import "../commonsecond.css";

const CreditScoreSection = () => {
  return (
    <>
    <section className="HomeLoan_area">
    <div id="Product_Section">
          <div className="container">
            <div className="ProductBanner_bannerFlex align-items-center">
              <div className="ProductBanner_Text">
                <p className="ProductBanner_Heading">Check Your <span className="bold-loan">Credit Score</span></p>
                <h4 className="mt-3 font_size_32">Credit Score Report Absolutely <b>FREE</b></h4>
                <ul className="ProductBanner_features d-block mt-3">
                  <li>
                    <img src="https://townmanor.in/templates/selio/assets/selfImages/bluecirclecheck.svg" width="15" alt="Check Icon" />
                    <p className="features_list_item">Reduce rates on your existing Loans.</p>
                  </li>
                  <li>
                    <img src="https://townmanor.in/templates/selio/assets/selfImages/bluecirclecheck.svg" width="15" alt="Check Icon" />
                    <p className="features_list_item">Suggest Better Rewards Credit Cards.</p>
                  </li>
                  <li>
                    <img src="https://townmanor.in/templates/selio/assets/selfImages/bluecirclecheck.svg" width="15" alt="Check Icon" />
                    <p className="features_list_item">Tips on Improving Credit Score.</p>
                  </li>
                  <li>
                    <img src="https://townmanor.in/templates/selio/assets/selfImages/bluecirclecheck.svg" width="15" alt="Check Icon" />
                    <p className="features_list_item">CIBIL requires accurate details to ensure accuracy & security.</p>
                  </li>
                  <li>
                    <img src="https://townmanor.in/templates/selio/assets/selfImages/bluecirclecheck.svg" width="15" alt="Check Icon" />
                    <p className="features_list_item">Make sure they match your banking records.</p>
                  </li>
                </ul>
              </div>
              <div className="ProductBanner_Img text-center">
                <img width="500" src="./credit-score.jpg" alt="Product Banner" />
              </div>
            </div>
          </div>
        </div>

        <CreditScoreForm />
    </section>
    </>
  )
}

export default CreditScoreSection
