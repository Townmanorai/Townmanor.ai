import React, { useState } from 'react'
import { FaHome, FaCarAlt, FaStar } from "react-icons/fa";
import { MdVerifiedUser, MdFileDownload } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { IoIosEye, IoMdCompass, IoMdKey } from "react-icons/io";
// import { GiFloorTiles } from "react-icons/gi";
import './OwnerAbout.css'
import { GiDominoTiles } from 'react-icons/gi';

function OwnerAbout({ property }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!property) return null;

  const displayDescription = showFullDescription ? property.description : 
    property.description ? `${property.description.slice(0, 200)}...` : 'No description available';

  return (
    <>
      <div className="custom_property_wrapper_2025">
        <div className="custom_property_maincard_2025">
          <h3 className="custom_property_heading_2025">About Property</h3>
          <div className="property_features_container_uniq2025">
            {property.current_lease && (
                <div className="property_features_item_uniq2025">
                    <FaHome className="property_icon_uniq2025" />
                    <div>
                        <div className="property_label_uniq2025">Type of Ownership</div>
                        <div className="property_value_uniq2025">{property.current_lease}</div>
                    </div>
                </div>
            )}

            {property.purpose && (
                <div className="property_features_item_uniq2025">
                    <IoMdKey className="property_icon_uniq2025" />
                    <div>
                        <div className="property_label_uniq2025">Transaction Type</div>
                        <div className="property_value_uniq2025">{property.purpose}</div>
                    </div>
                </div>
            )}

            {property.boundary_wall && (
                <div className="property_features_item_uniq2025">
                    <MdVerifiedUser className="property_icon_uniq2025" />
                    <div>
                        <div className="property_label_uniq2025">Gated Community</div>
                        <div className="property_value_uniq2025">{property.boundary_wall === 'yes' ? 'Yes' : 'No'}</div>
                    </div>
                </div>
            )}

            {property.property_facing && (
                <div className="property_features_item_uniq2025">
                    <IoMdCompass className="property_icon_uniq2025" />
                    <div>
                        <div className="property_label_uniq2025">Facing</div>
                        <div className="property_value_uniq2025">{property.property_facing}</div>
                    </div>
                </div>
            )}

            {property.no_of_open_side && (
                <div className="property_features_item_uniq2025">
                    <IoIosEye className="property_icon_uniq2025" />
                    <div>
                        <div className="property_label_uniq2025">Open Sides</div>
                        <div className="property_value_uniq2025">{property.no_of_open_side}</div>
                    </div>
                </div>
            )}

            {property.length && property.width && (
              <div className="property_features_item_uniq2025">
                <FaHome className="property_icon_uniq2025" />
                <div>
                  <div className="property_label_uniq2025">Plot Dimensions</div>
                  <div className="property_value_uniq2025">{property.length} × {property.width}</div>
                </div>
              </div>
            )}

            {property.property_date && (
              <div className="property_features_item_uniq2025">
                <BsPeopleFill className="property_icon_uniq2025" />
                <div>
                  <div className="property_label_uniq2025">Property Age</div>
                  <div className="property_value_uniq2025">{property.property_date}</div>
                </div>
              </div>
            )}

            {property.floor_allowed && (
              <div className="property_features_item_uniq2025">
                <FaHome className="property_icon_uniq2025" />
                <div>
                  <div className="property_label_uniq2025">Floors Allowed</div>
                  <div className="property_value_uniq2025">{property.floor_allowed}</div>
                </div>
              </div>
            )}
          </div>
          
          <p className="custom_property_description_2025">
            {displayDescription}
          </p>
          {property.description && property.description.length > 200 && (
            <a 
              className="custom_property_showmore_2025" 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setShowFullDescription(!showFullDescription);
              }}
            >
              {showFullDescription ? '- show less' : '+ show more'}
            </a>
          )}
        </div>

        <div className="custom_property_sidecards_2025">
          <div className="custom_property_agentcard_2025">
            <div className="custom_agent_topbadge_2025">🏆 Premium Agent</div>
            <div className="custom_agent_details_2025">
              <img
                src="/Agent.png"
                alt={property.username || 'Agent'}
                className="custom_agent_img_2025"
              />
              <div>
                <div className="custom_agent_name_2025">Townmanor</div>
                <div className="custom_agent_agency_2025">TownManor Infratech LLP</div>
                <small className="custom_agent_rera_2025">RERA ID: UPRERAAGT26073</small>
              </div>
            </div>
            <div className="custom_agent_stats_2025">
              <div>
                <div className="custom_agent_statval_2025">50+</div>
                <small>PROPERTIES FOR SALE</small>
              </div>
              <div>
                <div className="custom_agent_statval_2025">4.5 <FaStar color="gold" /></div>
                <small>RATING</small>
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
                <small>Product specifications and details (PDF)</small>
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