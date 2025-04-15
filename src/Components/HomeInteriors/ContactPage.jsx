import React, { useState } from 'react'
import './HomeInt.css'
import { FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { MdHome } from 'react-icons/md';

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
    <div className='contact-page' style={{
        padding: '40px 0',
        background: 'white',
        minHeight: '500px'
    }}>
        <div className='container' style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
        }}>
            {/* Contact Form Section */}
            <div className='c-contact' style={{
                flex: '1',
                padding: '30px',
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
            >
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '5px',
                    background: 'linear-gradient(to right, #ff4447, #8a2e2e)'
                }}></div>
                
                <h2 style={{
                    marginBottom: '25px',
                    color: '#333',
                    fontSize: '28px',
                    fontWeight: '600',
                    position: 'relative',
                    paddingBottom: '10px'
                }}>
                    Get in Touch
                    <div style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        width: '50px',
                        height: '3px',
                        background: 'linear-gradient(to right, #ff4447, #8a2e2e)'
                    }}></div>
                </h2>
                
                <form action="" className='cc-form' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}>
                    <div style={{ position: 'relative' }}>
                        <FaUser style={{
                            position: 'absolute',
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#ff4447',
                            fontSize: '18px'
                        }} />
                        <input 
                            type="text" 
                            name='name' 
                            placeholder='Name' 
                            value={formData.name} 
                            required 
                            onChange={handelChange}
                            style={{
                                width: '100%',
                                padding: '12px 15px 12px 45px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '16px',
                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                outline: 'none'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#ff4447';
                                e.target.style.boxShadow = '0 0 0 2px rgba(255, 68, 71, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#ddd';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    
                    <div style={{ position: 'relative' }}>
                        <FaEnvelope style={{
                            position: 'absolute',
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#ff4447',
                            fontSize: '18px'
                        }} />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder='Email' 
                            value={formData.email} 
                            required 
                            onChange={handelChange}
                            style={{
                                width: '100%',
                                padding: '12px 15px 12px 45px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '16px',
                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                outline: 'none'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#ff4447';
                                e.target.style.boxShadow = '0 0 0 2px rgba(255, 68, 71, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#ddd';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    
                    <div style={{ position: 'relative' }}>
                        <FaPhone style={{
                            position: 'absolute',
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#ff4447',
                            fontSize: '18px'
                        }} />
                        <input 
                            type="tel" 
                            name="phone" 
                            placeholder='Phone No' 
                            value={formData.phone} 
                            required 
                            onChange={handelChange}
                            style={{
                                width: '100%',
                                padding: '12px 15px 12px 45px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '16px',
                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                outline: 'none'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#ff4447';
                                e.target.style.boxShadow = '0 0 0 2px rgba(255, 68, 71, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#ddd';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    
                    <div className='terms' style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginTop: '5px'
                    }}>
                        <input 
                            type="checkbox" 
                            name='terms' 
                            checked={formData.terms} 
                            onChange={handelChange}
                            style={{
                                width: '18px',
                                height: '18px',
                                accentColor: '#ff4447'
                            }}
                        />
                        <label style={{
                            fontSize: '14px',
                            color: '#555'
                        }}>
                            I agree to the Terms & Conditions and Privacy Policy
                        </label>
                    </div>
                    
                    <button 
                        type='submit' 
                        className='cp-submit-btn' 
                        onClick={handelSubmit}
                        style={{
                            marginTop: '10px',
                            padding: '12px 20px',
                            background: 'linear-gradient(to right, #ff4447, #8a2e2e)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 68, 71, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Submit <FaArrowRight />
                    </button>
                </form>
            </div>
            
            {/* Advertisement Section */}
            <div style={{
                flex: '1',
                padding: '30px',
                borderRadius: '15px',
                background: 'linear-gradient(135deg, rgba(255, 68, 71, 0.8) 0%, rgba(138, 46, 46, 0.8) 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: '0.2',
                    zIndex: '0'
                }}></div>
                
                <div style={{ position: 'relative', zIndex: '1' }}>
                    <MdHome style={{
                        fontSize: '60px',
                        marginBottom: '20px',
                        color: 'rgba(255, 255, 255, 0.9)'
                    }} />
                    
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: '600',
                        marginBottom: '15px',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        color:'white'
                    }}>
                        Transform Your Living Space
                    </h2>
                    
                    <p style={{
                        fontSize: '16px',
                        lineHeight: '1.6',
                        marginBottom: '25px',
                        color: 'rgba(255, 255, 255, 0.9)'
                    }}>
                        Get expert interior design consultation and transform your home into a beautiful, functional space that reflects your style and personality.
                    </p>
                    
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        marginTop: '20px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <FaCheckCircle style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                            <span>Professional Designers</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <FaCheckCircle style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                            <span>Customized Solutions</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <FaCheckCircle style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                            <span>Quality Materials</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactPage;