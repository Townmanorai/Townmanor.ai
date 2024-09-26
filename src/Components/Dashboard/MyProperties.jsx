import React from 'react';

import "../common.css";
import "../commonsecond.css";

const MyProperties = ({ propertyData, packageData }) => {
  return (
    <>
      <div className="content-box">
        <div className="content widget-controls">
          <a href="https://townmanor.in/frontend/editproperty/en#content" className="btn btn-middle btn-info">
            <i className="fa fa-plus"></i>&nbsp;&nbsp;Add property
          </a>
        </div>

        <div className="table-responsive">
          <table className="table table-striped data_table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Property name</th>
                <th>Listing Type</th>
                <th>Property Type</th>
                <th>Possession Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {propertyData.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>{property.name}</td>
                  <td>{property.listingType}</td>
                  <td>{property.propertyType}</td>
                  <td>{property.possessionDate}</td>
                  <td>
                    <a
                      href={property.editLink}
                      className="btn btn-middle"
                      style={{
                        color: '#fff',backgroundColor: '#066b05',borderColor: '#17a2b8'
                      }}
                    >
                      <i className="fa fa-edit"></i> Edit
                    </a>
                  </td>
                  <td>
                    <a
                      href={property.deleteLink}
                      className="btn btn-middle btn-danger"
                      onClick={() => window.confirm('Are you sure?')}
                    >
                      <i className="fa fa-remove"></i> Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="widget-panel">
        <div className="widget-header header-styles">
          <h2 className="title">My package</h2>
        </div>
        <div className="content-box">
          <div className="table-responsive">
            <table className="table table-striped data_table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Package name</th>
                  <th>Price</th>
                  <th>Days limit</th>
                  <th>Listings limit</th>
                  <th>Featured limit</th>
                  <th>Buy/Extend</th>
                </tr>
              </thead>
              <tbody>
                {packageData.map((pkg) => (
                  <tr key={pkg.id}>
                    <td>{pkg.id}</td>
                    <td>{pkg.name}</td>
                    <td>{pkg.price}</td>
                    <td>{pkg.daysLimit}</td>
                    <td>{pkg.listingsLimit}</td>
                    <td>{pkg.featuredLimit}</td>
                    <td>
                      <a href="https://townmanor.in/en/197/subscription_plans" className="btn btn-middle btn-info" style={{
                        color: '#fff',backgroundColor: '#066b05',borderColor: '#17a2b8'
                      }}>
                        <i className="fa fa-shopping-cart"></i> Buy/Extend
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="widget-panel">
        <div className="widget-header header-styles">
          <h2 className="title">Bank payment details</h2>
        </div>
        <div className="content-box">
          <br />
          Notice: Please enter 'property id #' in Bank transfer notice
        </div>
      </div>
    </>
  );
};

export default MyProperties;
