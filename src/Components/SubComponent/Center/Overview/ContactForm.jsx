import React, { useEffect, useState } from 'react';
import "./ContactForm.css";
import axios from 'axios';

const ContactForm = ({username}) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://www.townmanor.ai/api/user/${username}`);
        setData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getData();
  }, []);

  console.log(data);

  return (
    <>
      <div className='sub-contact' >
            <h4 style={{paddingBottom:'20px'}}>Contact Owner/Agent</h4>
            <div className="contact-detail">
              <div className="contact-img">
                <img src="/profile.png" alt="Agent" className="agent-photo" />
              </div>
            <div className="contact-box">
              {data ? (
                <>
                  {data.username && <div className='cb-data'>{data.username}</div>}
                  {data.phone && <div className='cb-data'>{data.phone}</div>}
                  {data.email && <div className='cb-data'> {data.email}</div>}
                </>
              ) : (
                <div>Loading...</div>
              )}
            </div>

            </div>
            <span>
            {data?.phone && (<a href={`https://wa.me/${data.phone}`} target="_blank" rel="noopener noreferrer">
              <button className="whatsapp-btn">WhatsApp</button>
            </a>)}
              <a href='tel:+911204420450'>
              <button className="contact-btn">Contact</button>
              </a>
            </span>
          </div>
    </>
  )
}

export default ContactForm
