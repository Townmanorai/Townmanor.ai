import React from "react";
import "./Mainproperty.css";

function Mainproperty() {
  return (
    <>
    <div style={{
      display:'inline-block',
      width:'100%',
      paddingTop:'10vh'
    }}>
      <div className="col-header">
        <div className="sub-header-1">
          <img src="image1.jpg" alt="1" />
        </div>
        <div className="sub-header-2">
          <div className="header-data-1">
            <div className="header-d-details-1">
              <p>Bhutani Apartments</p>
              <span>In Greater Noida</span>
            </div>
            <div className="header-d-details-2">3.5 Cr Onwards</div>
          </div>

          {/* ------------container-2 ------------------- */}
          <div>
            <div className="subitem-div">
              <div className="upper">
                <div className="upper-div">
                  <div class="subdetail-item">
                    <span>Bedroom:</span>
                    <div>
                      <strong>3</strong>
                    </div>
                  </div>
                  <div class="subdetail-item">
                    <span>Bathroom:</span>
                    <div>
                      <strong>3</strong>
                    </div>
                  </div>
                  <div class="subdetail-item">
                    <span>Ownership</span>
                    <div>
                      <strong>Freehold</strong>
                    </div>
                  </div>
                  <div class="subdetail-item">
                    <span>Possesion</span>
                    <div>
                      <strong>Mar 2008</strong>
                    </div>
                  </div>
                  <div class="subdetail-item">
                    <span>Rera Id</span>
                    <div>
                      <strong>UPRERAPRJ270081</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lower">
                <div className="lower-div">
                  <div class="subdetail-item">
                    <span>Furnishing</span>
                    <div>
                      <strong>Semi-Furnished</strong>
                    </div>
                  </div>
                  <div class="subdetail-item">
                    <span>Status</span>
                    <div>
                      <strong>Ready to Move</strong>
                    </div>
                  </div>
                  <div class="subdetail-item">
                    <span>Facing</span>
                    <div>
                      <strong>South-West</strong>
                    </div>
                  </div>
                  <div class="subdetail-item">
                    <span>Carpet Area</span>
                    <div>
                      <strong>1500 sq/ft</strong>
                    </div>
                  </div>
                  <div class="subdetail-item">
                    <span>Floor</span>
                    <div>
                      <strong>2 (out of 4)</strong>
                    </div>
                  </div>
                  <div class="subdetail-item">
                    <span>Project</span>
                    <div>
                      <strong>Godrej Woods</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sub-header-3"></div>
      </div>
      </div>
    </>
  );
}

export default Mainproperty;

{
  /* <div className="header-data-2">
            <p>Details</p>
            <table>
              <tbody>
                <tr>
                  <td>
                    <span>Listing:</span> Sale
                  </td>
                  <td>
                    <span>Construction:</span> Ready
                  </td>
                  <td>
                    <span>RERA ID:</span> UPRERAPRJ10097
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Country:</span> India
                  </td>
                  <td>
                    <span>City:</span> Noida
                  </td>
                  <td>
                    <span>Pin code:</span> 201301
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <button className="know-more-button">View Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */
}
