// import React, { useState } from 'react';

// // Dummy JSON data for table content
// const propertyData = [
//   {
//     id: 1340,
//     name: "Rishabh Cloud 9 Towers",
//     listingType: "Rent Properties",
//     propertyType: "Apartment",
//     possessionDate: "",
//     editLink: "https://townmanor.in/frontend/editproperty/en/1340",
//     deleteLink: "https://townmanor.in/frontend/deleteproperty/en/1340"
//   }
// ];

// const packageData = [
//   {
//     id: 2,
//     name: "Starter",
//     price: "200.00 INR",
//     daysLimit: "30, 2024-09-21 12:20:46",
//     listingsLimit: 1,
//     featuredLimit: 1
//   }
// ];

// const WidgetPanel = () => {
//   return (
//     <div className="container m-padding">
//       {/* My Properties Section */}
//       <div className="widget-panel">
//         <div className="widget-header header-styles py-5">
//           <div className="col-xl-12 col-12 d-block">
//             <div className="header-address">
//               <a href="https://townmanor.in/frontend/myproperties/en#content">
//                 <i className="fa fa-list"></i> <span>My properties</span>
//               </a>
//               <a href="https://townmanor.in/frontend/mysubscription/en">
//                 <i className="fa fa-list"></i> <span>My Subscription</span>
//               </a>
//               <a href="https://townmanor.in/fresearch/myresearch/en#content">
//                 <i className="fa fa-filter"></i> <span>My research</span>
//               </a>
//               <a href="https://townmanor.in/ffavorites/myfavorites/en#content">
//                 <i className="fa fa-star"></i> <span>My favorites</span>
//               </a>
//               <a href="https://townmanor.in/fmessages/mymessages/en#content">
//                 <i className="fa fa-envelope"></i> <span>My inquiries</span>
//               </a>
//               <a href="https://townmanor.in/frontend/myprofile/en#content">
//                 <i className="fa fa-user"></i> <span>My profile</span>
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="content-box">
//           <div className="content widget-controls">
//             <a
//               href="https://townmanor.in/frontend/editproperty/en#content"
//               className="btn btn-middle btn-info"
//             >
//               <i className="fa fa-plus"></i>&nbsp;&nbsp;Add property
//             </a>
//           </div>

//           <div className="table-responsive">
//             <table className="table table-striped data_table table-hover">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Property name</th>
//                   <th>Listing Type</th>
//                   <th>Property Type</th>
//                   <th>Possession Date</th>
//                   <th>Edit</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {propertyData.map((property) => (
//                   <tr key={property.id}>
//                     <td>{property.id}</td>
//                     <td>{property.name}</td>
//                     <td>{property.listingType}</td>
//                     <td>{property.propertyType}</td>
//                     <td>{property.possessionDate}</td>
//                     <td>
//                       <a href={property.editLink} className="btn btn-middle btn-info">
//                         <i className="fa fa-edit"></i> Edit
//                       </a>
//                     </td>
//                     <td>
//                       <a
//                         href={property.deleteLink}
//                         className="btn btn-middle btn-danger"
//                         onClick={() => window.confirm('Are you sure?')}
//                       >
//                         <i className="fa fa-remove"></i> Delete
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* My Package Section */}
//       <div className="widget-panel">
//         <div className="widget-header header-styles">
//           <h2 className="title">My package</h2>
//         </div>
//         <div className="content-box">
//           <div className="table-responsive">
//             <table className="table table-striped data_table table-hover">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Package name</th>
//                   <th>Price</th>
//                   <th>Days limit</th>
//                   <th>Listings limit</th>
//                   <th>Free featured limit</th>
//                   <th>Buy/Extend</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {packageData.map((pkg) => (
//                   <tr key={pkg.id}>
//                     <td>{pkg.id}</td>
//                     <td>{pkg.name}</td>
//                     <td>{pkg.price}</td>
//                     <td>{pkg.daysLimit}</td>
//                     <td>{pkg.listingsLimit}</td>
//                     <td>{pkg.featuredLimit}</td>
//                     <td>
//                       <a
//                         href="https://townmanor.in/en/197/subscription_plans"
//                         className="btn btn-middle btn-info"
//                       >
//                         <i className="fa fa-shopping-cart"></i> Buy/Extend
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Bank Payment Section */}
//       <div className="widget-panel">
//         <div className="widget-header header-styles">
//           <h2 className="title">Bank payment details</h2>
//         </div>
//         <div className="content-box">
//           <br />
//           Notice: Please enter 'property id #' in Bank transfer notice
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WidgetPanel;


// import React, { useState } from 'react';
// import "../../common.css";
// import "../../commonsecond.css";

// // Dummy JSON data for property table content
// const propertyData = [
//   {
//     id: 1340,
//     name: "Rishabh Cloud 9 Towers",
//     listingType: "Rent Properties",
//     propertyType: "Apartment",
//     possessionDate: "",
//     editLink: "https://townmanor.in/frontend/editproperty/en/1340",
//     deleteLink: "https://townmanor.in/frontend/deleteproperty/en/1340"
//   }
// ];

// const packageData = [
//   {
//     id: 2,
//     name: "Starter",
//     price: "200.00 INR",
//     daysLimit: "30, 2024-09-21 12:20:46",
//     listingsLimit: 1,
//     featuredLimit: 1
//   }
// ];

// const subscriptionHistoryData = [
//   {
//     id: 1,
//     invoiceNo: "2_PAC_83_200.00_4",
//     date: "2024-08-22 15:50:08",
//     description: "New Property",
//     packageValid: "30 Days, 2024-09-21 15:50:08",
//     amount: "200.00 / INR",
//     gst: "18 %",
//     gstAmount: "36",
//     totalAmount: "236.00"
//   }
// ];

// const DashboardNavbar = () => {
//   const [activeTab, setActiveTab] = useState('properties');

//   // Function to handle content rendering based on the selected tab
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'properties':
//         return (
//           <div className="content-box">
//             {/* Properties Table */}
//             <div className="content widget-controls">
//               <a
//                 href="https://townmanor.in/frontend/editproperty/en#content"
//                 className="btn btn-middle btn-info"
//               >
//                 <i className="fa fa-plus"></i>&nbsp;&nbsp;Add property
//               </a>
//             </div>

//             <div className="table-responsive">
//               <table className="table table-striped data_table table-hover">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Property name</th>
//                     <th>Listing Type</th>
//                     <th>Property Type</th>
//                     <th>Possession Date</th>
//                     <th>Edit</th>
//                     <th>Delete</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {propertyData.map((property) => (
//                     <tr key={property.id}>
//                       <td>{property.id}</td>
//                       <td>{property.name}</td>
//                       <td>{property.listingType}</td>
//                       <td>{property.propertyType}</td>
//                       <td>{property.possessionDate}</td>
//                       <td>
//                         <a href={property.editLink} className="btn btn-middle btn-info">
//                           <i className="fa fa-edit"></i> Edit
//                         </a>
//                       </td>
//                       <td>
//                         <a
//                           href={property.deleteLink}
//                           className="btn btn-middle btn-danger"
//                           onClick={() => window.confirm('Are you sure?')}
//                         >
//                           <i className="fa fa-remove"></i> Delete
//                         </a>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Subscription Section */}
//             <h3>My Subscription</h3>
//             <div className="table-responsive">
//               <table className="table table-striped data_table table-hover">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Package name</th>
//                     <th>Price</th>
//                     <th>Days limit</th>
//                     <th>Listings limit</th>
//                     <th>Free featured limit</th>
//                     <th>Buy/Extend</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {packageData.map((pkg) => (
//                     <tr key={pkg.id}>
//                       <td>{pkg.id}</td>
//                       <td>{pkg.name}</td>
//                       <td>{pkg.price}</td>
//                       <td>{pkg.daysLimit}</td>
//                       <td>{pkg.listingsLimit}</td>
//                       <td>{pkg.featuredLimit}</td>
//                       <td>
//                         <a
//                           href="https://townmanor.in/en/197/subscription_plans"
//                           className="btn btn-middle btn-info"
//                         >
//                           <i className="fa fa-shopping-cart"></i> Buy/Extend
//                         </a>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Subscription History Section */}
//             <h3>My Subscription History</h3>
//             <div className="table-responsive">
//               <table className="table table-striped data_table dataTable no-footer">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Invoice No</th>
//                     <th>Date</th>
//                     <th>Description</th>
//                     <th>Package Valid</th>
//                     <th>Currency Code/Amount</th>
//                     <th>GST</th>
//                     <th>GST Amount</th>
//                     <th>Total Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {subscriptionHistoryData.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.id}</td>
//                       <td>{item.invoiceNo}</td>
//                       <td>{item.date}</td>
//                       <td>{item.description}</td>
//                       <td>{item.packageValid}</td>
//                       <td>{item.amount}</td>
//                       <td>{item.gst}</td>
//                       <td>{item.gstAmount}</td>
//                       <td>{item.totalAmount}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       case 'bank':
//         return (
//           <div className="content-box">
//             <br />
//             Notice: Please enter 'property id #' in Bank transfer notice
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container m-padding">
//       {/* Navigation Links */}
//       <div className="widget-header header-styles py-5">
//         <div className="col-xl-12 col-12 d-block">
//           <div className="header-address">
//             <a href="#" onClick={() => setActiveTab('properties')}>
//               <i className="fa fa-list"></i> <span>My properties</span>
//             </a>
//             <a href="#" onClick={() => setActiveTab('properties')}>
//               <i className="fa fa-list"></i> <span>My Subscription</span>
//             </a>
//             <a href="#" onClick={() => setActiveTab('research')}>
//               <i className="fa fa-filter"></i> <span>My research</span>
//             </a>
//             <a href="#" onClick={() => setActiveTab('favorites')}>
//               <i className="fa fa-star"></i> <span>My favorites</span>
//             </a>
//             <a href="#" onClick={() => setActiveTab('inquiries')}>
//               <i className="fa fa-envelope"></i> <span>My inquiries</span>
//             </a>
//             <a href="#" onClick={() => setActiveTab('profile')}>
//               <i className="fa fa-user"></i> <span>My profile</span>
//             </a>
//             <a href="#" onClick={() => setActiveTab('bank')}>
//               <i className="fa fa-bank"></i> <span>Bank payment details</span>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Dynamic Content based on the selected tab */}
//       {renderContent()}
//     </div>
//   );
// };

// export default DashboardNavbar;
