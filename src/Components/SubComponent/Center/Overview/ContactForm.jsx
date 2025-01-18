import React from 'react';
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <>
      <div className='sub-contact' >
            <div className="contact-detail">
              <div className="contact-img">
                <img src="/profile.png" alt="Agent" className="agent-photo" />
              </div>
              <div className="contact-box">
                 <input type="text" autocomplete="off" name="text" class="input" placeholder="Name"/>
                 <input type="text" autocomplete="off" name="text" class="input" placeholder="Phone No"/>
                 <input type="text" autocomplete="off" name="text" class="input" placeholder="Email Id"/>
              </div>
            </div>
            <span>
              <button className="whatsapp-btn">WhatsApp</button>
              <button className="contact-btn">Contact</button>
            </span>
          </div>
    </>
  )
}

export default ContactForm
