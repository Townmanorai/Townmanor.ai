import React from 'react'
import './AdminAcessor.css'
import { useNavigate } from 'react-router-dom'

// import InquireMain from './Inquirelead/InquireMain';

function AdminAccesor() {
  const navigate = useNavigate();
  const moverfunction = (url) =>{
  navigate(url);
  }
  return (
   <>
   <div id='Controlflow'>
    <div style={{
        marginBottom:"10vh"
    }}>
        <img src='/navbarlogo.png'></img>
    </div>
   <span onClick={()=>
    {
      moverfunction('/adminpropertyacess')
    }
   }>Property control</span>
   <a href='UserAgent'><span>User Agent</span></a> 
   <a href='/Inquire'> <span >Inquire/lead</span></a>
    <a href='/RentController'> <span >Rent Agreement</span></a>
   <a href='/postcontrol'><span>Blog & article</span></a> 
   <a href='/commercialdashboard'><span>Commercial Dashboard</span></a> 
    <a href='/Subscription'><span>package & subscription</span></a> 
    <a href='/advertisment'><span>Advertisement Control</span></a> 
    <a href='/agentfeature'><span>Agent Spotlight & featured Agent</span></a> 
    <a href='/customer'><span>Customer Feedback</span></a> 
    
   </div>
   </>
  )
}

export default AdminAccesor