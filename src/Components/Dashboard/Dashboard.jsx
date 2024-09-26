import React from 'react'
import DashboardTopSection from './DahbaordTopImage';
import "../common.css";
import "../commonsecond.css";
import DashboardNavbar from './DashboardNavbar';
// import DashboardNavbar from './DynamicDashboard';


function Dashboard() {
  return (
    <>
    <div className='userDashboard'>
        <DashboardTopSection />
        {/* <DashboardNavbar /> */}
        <DashboardNavbar />
    </div>    
    </>
  )
}

export default Dashboard