import React, { useState } from 'react'
import './Description.css'
function Description({property}) {
  const [readmore,setreadmore] = useState(false);
  const data = property.description;
  const truncated = data.slice(0,300);

  return (
    <div>
    <div className='distance'>
      <h3>Description</h3>
      <div >
      <p id='descdata'>{readmore ? data : truncated}</p>
      </div>
      <div style={{
        textAlign:'center'
      }}>
      <button type="button" class="btn btn-link descbutton" onClick={()=>{
        setreadmore(!readmore);
      }}>{readmore ? 'Show less' : 'Read more'}</button></div>
    </div>
  </div>
  )
}

export default Description