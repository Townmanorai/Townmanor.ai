import React, { useState } from 'react'
import './HomeInt.css'

function ContactPage(){

    const [formData, setFormData] = useState({
        name:'',
        phone:'',
        email:'',
        terms:''
    });

    const handelChange = (e) => {
        const {name, value, checked, type} = e.target;
        setFormData({
            ...formData,
            [name]: type==="checked"?checked:value,
        });
    };

    const handelSubmit = (e) =>{
        e.preventDefault();
        if(!formData.terms){
            alert("Please accept the terms & conditions.");
            return;
        }
        console.log("form submitted", formData);
    }

  return (
    <div className='contact-page' >
        <div className='container' style={{padding:'20px',boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
            <div className='c-contact' style={{padding:'20px'}}>
                <h2 >Contact Form</h2>
                <form action="" className='cc-form'>
                    <input type="text" name='name' placeholder='Name' value={formData.name} required  onChange={handelChange}/>
                    <input type="text" name="email" placeholder='Email' value={formData.email} required onChange={handelChange}/>
                    <input type="text" name="phone" placeholder='Phone No'  value={formData.phone} required onChange={handelChange}/>
                    <div className='terms'>
                        <input type="checkbox" name='terms' checked={formData.terms} onChange={handelChange}/>
                        <label htmlFor="">Terms conditions & Privacy policy</label>
                    </div>
                    <button type='submit' className='cp-submit-btn' onClick={handelSubmit}>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ContactPage;