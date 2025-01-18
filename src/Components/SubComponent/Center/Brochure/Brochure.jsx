// Brochure.jsx
import React from "react";
import "./Brochure.css";
import PropertyPDF from "./PropertyPDF"; 

function Brochure({ property }) {
  return (
    <>
      <div className="brochure-box">
        <div className="brochure-header">
          <h4>Download Brochure</h4>
        </div>
        <div className="brochure-img">
          <img src="/pdf.png" alt="Brochure PDF" />
        </div>
        <div>
          <PropertyPDF property={property} />{" "}
          {/* Include the PDF download button */}
        </div>
      </div>

      {/* <!-- EMI Calculator --> */}
      <div class="widget widget-calculator mortgage_widget clearfix">
        <h3 class="widget-title">Emi Calculator</h3>
        <ul>
          <li>
            <i>₹</i>
            <input
              d="mortgage_balance"
              type="text"
              value="1.47"
              placeholder="House price*"
            />
          </li>
          <li>
            <i>₹</i>
            <input id="mortgage_interest" type="text" placeholder="Interest*" />
          </li>
          <li>
            <i>₹</i>
            <input
              id="mortgage_downpayment"
              type="text"
              value="1.18"
              placeholder="Down payment"
            />
          </li>
          <li>
            <i>Y</i>
            <input id="mortgage_years" type="text" placeholder="Years*" />
          </li>
          <div>
            <button type="submit" class="btn2">
              Calculate
            </button>
          </div>
        </ul>
      </div>

      {/* <div class="widget widget-calculator mortgage_widget clearfix">
        <h3 class="widget-title">EMI Calculator</h3>
         <form method="get" action="#" class="" id="mortgage_calculator">
            <ul>
                <li>
                    <i>₹</i>
                    <input id="mortgage_balance" type="text" value="1.74" placeholder="House price*" fdprocessedid="7ej9h"/>
                </li>
                <li>
                    <i>₹</i>
                    <input id="mortgage_interest" type="text" value="" placeholder="Interest*" fdprocessedid="bvoua"/>
                </li>
                <li>
                    <i>₹</i>
                    <input id="mortgage_downpayment" type="text" value="1.39" placeholder="Down payment" fdprocessedid="x29x2n"/>
                </li>
                <li>
                    <i>Y</i>
                    <input id="mortgage_years" type="text" value="" placeholder="Years*" fdprocessedid="xdsfva"/>
                </li>
                <li class="form-group-result" style="display: none">
                    <label>Monthly Repayments</label>
                    <p id="results_monthly" class="form-control-static center">₹ 0 -</p>
                </li>
                <li class="form-group-result" style="display: none">
                    <label>Weekly Repayments </label>
                    <p id="results_weekly" class="form-control-static center">₹ 0 -</p>
                </li>
            
                <li>
                    <button type="submit" class="btn2" fdprocessedid="4r4zhk">Calculate</button>
                </li>
            </ul>
        </form>
    </div> */}
    </>
  );
}

export default Brochure;


