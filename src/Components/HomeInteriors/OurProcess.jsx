import React from 'react';
import './OurProcess.css';

const OurProcess = () => {
  const ourprocess = [
    {
      name: 'Initial Consultation',
      process: 'We begin with a detailed discussion of your vision, preferences, and budget to ensure perfect alignment with your goals.',
      icon: '/consultation-icon.png'
    },
    {
      name: 'Design Concept',
      process: 'Our expert designers create detailed visual representations of your space, incorporating your style and functional requirements.',
      icon: '/design-icon.png'
    },
    {
      name: 'Material Selection',
      process: 'Choose from our curated collection of premium materials, finishes, and fixtures that match your aesthetic and quality standards.',
      icon: '/material-icon.png'
    },
    {
      name: 'Expert Execution',
      process: 'Our skilled craftsmen bring your design to life with precision, ensuring every detail meets our high standards of excellence.',
      icon: '/execution-icon.png'
    }
  ];

  return (
    <section className="process-section">
      <div className="process-container">
        <div className="process-header">
          <h1 className="process-title">Our Process</h1>
        </div>

        <div className="process-grid">
          {ourprocess.map((item, index) => (
            <div className="process-card" key={index}>
              <div className="process-icon">
                <img src={item.icon} alt={item.name} />
              </div>
              <h3 className="process-name">{item.name}</h3>
              <p className="process-description">{item.process}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
