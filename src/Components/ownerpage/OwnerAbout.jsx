import React from 'react'
import { FaHome, FaCarAlt, FaStar } from "react-icons/fa";
import { MdVerifiedUser, MdFileDownload } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { IoIosEye, IoMdCompass, IoMdKey } from "react-icons/io";
// import { GiFloorTiles } from "react-icons/gi";
import './OwnerAbout.css'
import { GiDominoTiles } from 'react-icons/gi';
function OwnerAbout() {
  return (
    <>
      <div className="custom_property_wrapper_2025">
      <div className="custom_property_maincard_2025">
        <h3 className="custom_property_heading_2025">About Property</h3>
        <div className="property_features_container_uniq2025">
      <div className="property_features_item_uniq2025">
        <FaHome className="property_icon_uniq2025" />
        <div>
          <div className="property_label_uniq2025">Type of Ownership</div>
          <div className="property_value_uniq2025">Freehold</div>
        </div>
      </div>

      <div className="property_features_item_uniq2025">
        <IoMdKey className="property_icon_uniq2025" />
        <div>
          <div className="property_label_uniq2025">Transaction Type</div>
          <div className="property_value_uniq2025">New</div>
        </div>
      </div>

      <div className="property_features_item_uniq2025">
        <MdVerifiedUser className="property_icon_uniq2025" />
        <div>
          <div className="property_label_uniq2025">Gated Community</div>
          <div className="property_value_uniq2025">Yes</div>
        </div>
      </div>

      <div className="property_features_item_uniq2025">
        <IoMdCompass className="property_icon_uniq2025" />
        <div>
          <div className="property_label_uniq2025">Facing</div>
          <div className="property_value_uniq2025">East</div>
        </div>
      </div>

      <div className="property_features_item_uniq2025">
        <IoIosEye className="property_icon_uniq2025" />
        <div>
          <div className="property_label_uniq2025">Overlook</div>
          <div className="property_value_uniq2025">Garden/Park</div>
        </div>
      </div>

      <div className="property_features_item_uniq2025">
        <FaCarAlt className="property_icon_uniq2025" />
        <div>
          <div className="property_label_uniq2025">Open Car Parking</div>
          <div className="property_value_uniq2025">2</div>
        </div>
      </div>

      <div className="property_features_item_uniq2025">
        <BsPeopleFill className="property_icon_uniq2025" />
        <div>
          <div className="property_label_uniq2025">Property Age</div>
          <div className="property_value_uniq2025">0 to 5 years</div>
        </div>
      </div>

      <div className="property_features_item_uniq2025">
        <FaCarAlt className="property_icon_uniq2025" />
        <div>
          <div className="property_label_uniq2025">Covered Car Parking</div>
          <div className="property_value_uniq2025">2</div>
        </div>
      </div>

      {/* <div className="property_features_item_uniq2025">
       
        <GiDominoTiles className="property_icon_uniq2025" />

        <div>
          <div className="property_label_uniq2025">Flooring</div>
          <div className="property_value_uniq2025">Marble</div>
        </div>
      </div> */}
    </div>
        <p className="custom_property_description_2025">
          4 BHK Flat with a built-up area of 2600 Sq.ft available for Sale at Sector37C - Gurgaon in a good and well maintained society name as Imperia The Esfera, its a 34 storey structure. Residents can do interior as per their requirement.
        </p>
        <a className="custom_property_showmore_2025" href="#">+ show more</a>
      </div>

      <div className="custom_property_sidecards_2025">
        <div className="custom_property_agentcard_2025">
          <div className="custom_agent_topbadge_2025">🏆 Premium</div>
          <div className="custom_agent_details_2025">
            <img
              src="/Agent.png"
              alt="Agent"
              className="custom_agent_img_2025"
            />
            <div>
              <div className="custom_agent_name_2025">Michael Anderson</div>
              <div className="custom_agent_agency_2025">Premiere Realty Group</div>
              <small className="custom_agent_rera_2025">RERA ID: UPRERA2504892</small>
            </div>
          </div>
          <div className="custom_agent_stats_2025">
            <div>
              <div className="custom_agent_statval_2025">56</div>
              <small>PROPERTIES FOR SALE</small>
            </div>
            <div>
              <div className="custom_agent_statval_2025">5 <FaStar color="gold" /></div>
              <small>CRISIL RATING</small>
            </div>
          </div>
          <div className="custom_agent_buttons_2025">
            <button className="custom_btn_light_2025">View Profile</button>
            <button className="custom_btn_dark_2025">View Properties</button>
          </div>
        </div>

        <div className="custom_property_pdfcard_2025 mobile_view">
          <div className="custom_pdf_text_2025">
            <MdFileDownload size={24} />
            <div>
              <div><strong>Download Brochure</strong></div>
              <small>Product specifications and details (PDF, 2.5MB)</small>
            </div>
          </div>
          <button className="custom_pdf_btn_2025">⬇ Download PDF</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default OwnerAbout