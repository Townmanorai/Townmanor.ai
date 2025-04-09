import React from 'react';
import './OurProcess.css'

const OurProcess = () => {

  const ourprocess = [
    {
      name: 'Consultation',
      process: 'Discussing ideas, preferences, and budget helps align goals'
    },
    {
      name: 'Design Concept',
      process: 'Visual representation of your space'
    },
    {
      name: 'Material Selection',
      process: 'Discuss your ideas, preferences, and budget'
    },
    {
      name: 'Execution',
      process: 'Discuss your ideas, preferences, and budget'
    }
  ]

  return (
    <div style={{ height: '100%', marginTop: '50px' }}>
      <div className='container'>
        <div style={{marginBottom:'30px'}}>
          <h1 className='Wo-heading'>
            Our Process
          </h1>
        </div>

        <div className='Op-cards'>
          {ourprocess.map((item, index) => (
            <div className='Oc-cards' key={index}>
              <i className='icon-FEATURES Oc-icon'>
                <img style={{ filter: 'none', maxWidth: '40px' }} src="/brokerage.png" alt="" />
              </i>
              <h3 className='Oc-cards-h3'>{item.name}</h3>
              <p className='Oc-cards-p'>{item.process}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurProcess;
