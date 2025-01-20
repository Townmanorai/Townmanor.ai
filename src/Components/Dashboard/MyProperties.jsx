import React from 'react';

const MyProperties = ({ propertyData,packageData }) => {
  // console.log('Package Data:', packageData);
  return (
    <>
    <div className="content-box">
      <div className="content widget-controls">
        <a href="https://townmanor.in/frontend/editproperty/en#content" className="btn btn-middle btn-info">
          <i className="fa fa-plus"></i>&nbsp;&nbsp;Add property
        </a>
      </div>
      <div className="table-responsive" style={{boxShadow:"0 0.25rem 1.125rem rgba(75, 70, 92, .1)", margin:"20px 0"}}>
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
                <td>{property.property_name}</td>
                <td>{property.purpose}</td>
                <td>{property.rera_id}</td>
                <td>{property.pricerange}</td>
                <td>
                  <a href={property.editLink} className="button-white  btn btn-middle btn-success" style={{color:"white"}}>
                    <i className="fa fa-edit"></i> Edit
                  </a>
                </td>
                <td>
                  <a
                    href={property.deleteLink}
                    className="btn btn-middle btn-danger"
                    style={{color:"white"}}
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
                {/* Debug to see packageData type */}
                {/* {console.log('Type of packageData:', typeof packageData)} */}
                {/* Check if packageData is an array */}
                {packageData && Array.isArray(packageData) && packageData.length > 0 ? (
                  packageData.map((pkg) => (
                    <tr key={pkg.id}>
                      <td>{pkg.id}</td>
                      <td>{pkg.name}</td>
                      <td>{pkg.price}</td>
                      <td>{pkg.daysLimit}</td>
                      <td>{pkg.listingsLimit}</td>
                      <td>{pkg.featuredLimit}</td>
                      <td>
                        <a
                          href="https://townmanor.in/en/197/subscription_plans"
                          className="btn btn-middle btn-info"
                          style={{
                            color: '#fff',
                            backgroundColor: '#066b05',
                            borderColor: '#17a2b8',
                          }}
                        >
                          <i className="fa fa-shopping-cart"></i> Buy/Extend
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No package data available</td>
                  </tr>
                )}
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
