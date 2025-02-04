import React from 'react'

function HomePlatforms(){

    const Platforms =  [
        {
            img:'./logo_image1.png',
            name:'Homelane',
            data:'Best Price On Home interior Guranteed'
        },
        {
            img:'./logo_image2.png',
            name:'Pepperfry',
            data:''
        },
        {
            img:'./logo_image3.png',
            name:'HippoHomes',
            data:'Nay Ghar ki Suruat Hippo Homes Ke Sath'
        },
        {
            img:'./logo_image4.png',
            name:'Diesigncafe',
            data:'More Room For Joy'
        }
    ]

  return (
    <div style={{ height: '100%', marginTop: '110px' }}>
      <div className='container'>
        <div className='hp-heading'>
            <h1>Explore Leading <span>Home Interior</span> Platforms</h1>
        </div>
        <div className='hp-icons'>
            {Platforms.map((item, index)=>{
                return(
                    <div className='hp-icon' key={index}>
                        <div className='hpi-images'>
                            <div className='hi-images'>
                                <img src={item.img} alt="" />
                            </div>
                            <span style={{fontSize:'22px',fontWeight:' 500'}}>
                                {item.name}
                            </span>
                        </div>
                        <div className='hpi-para'>
                            {item.data}
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default HomePlatforms