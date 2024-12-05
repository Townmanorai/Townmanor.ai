import React from 'react'
import PhoneSearch from './PhoneSearch'
import PhoneSearchbar from './PhoneSearchbar'
import SearchBar from './SearchBar'
import './MainSearch.css'
function MainSearch() {
  return (
   <>
   <div className='mobile_only'>
    {/* <PhoneSearch></PhoneSearch> */}
    <PhoneSearchbar/>
   </div>
   <div className='laptop_only'>
    <SearchBar/>
   </div>
   </>
  )
}

export default MainSearch