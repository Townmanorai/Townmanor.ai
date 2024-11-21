import React, { useEffect, useState } from 'react'
import './Transaction.css'
function Transaction() {
  const [transdata,settransdata] = useState([]);
  const dummytransjson = {
    "name": "Starter",
    "price": "200.00",
    "oldPrice": "1000.00",
    "duration": "one time",
    "benefits": [
      "One Time",
      "1 : Number of Listing",
      "1 : Featured Listing Limit"
    ],
    "claimed": false,
    "formAction": "https://secure.payu.in/_payment",
    "hiddenInputs": {
      "key": "UvTrjC",
      "txnid": "a60bbf658dbf00611316",
      "productinfo": "Starter",
      "amount": "236",
      "currency_code": "INR",
      "email": "rnjha2001@gmail.com",
      "firstname": "Ravindra",
      "lastname": "Ravindra",
      "surl": "https://townmanor.in/customform/payUSuccess",
      "furl": "https://townmanor.in/customform/payUFail",
      "phone": "",
      "hash": "19b233afd917d6f7cbcdb5e76447b334c36f3485ece9967f436cf8098e47a312e7df42bcd05d52550170b90d56723fd8fc69f7ddb960c20a26d49d30d382912b"
    }
  }
  useEffect(() => {
  settransdata(dummytransjson)
}, []);
const orginalprice =(price)=>{
  return price*(100/20);
}
const gstprice =(price,price2)=>{
  return price-price2;
}
  return (
    <>
      <div id='main'>
        <div className='planbox'>
          <h2>{dummytransjson.name}</h2>
          <div className='right'><del>&#8377;{orginalprice(dummytransjson.price)}</del></div>
          <div className='detailx'>
            &#8377;{dummytransjson.price}/{dummytransjson.duration}
          </div>
          <div className='detail2'> 
            <li><span id='bullet'>&#9679;</span>  {dummytransjson.duration}</li>
            <li><span id='bullet'>&#9679;</span> {dummytransjson.benefits[1]}</li>
            <li><span id='bullet'>&#9679;</span> {dummytransjson.benefits[2]}</li>
          </div>
          <div>
            <button type="button" class="btn btn-outline-danger plan">Plan Selected</button>
          </div>
        </div>
        <div
          className='trans-main'>
          <h2>What we offer</h2>
          <p>The Service is offered as an one time option allowing for listing,with featured Listing limit of 3</p>
          <div className='detail'>
            <span className='left'>Transaction No:</span>
            <span className='right'>{dummytransjson.hiddenInputs.txnid}</span>
          </div>
          <div className='detail'>
            <span className='left'>GST Number:</span>
            <span className='right'><input type="text" placeholder='e.g 29GGGGG1314R9Z6' /></span>
          </div>
          <div className='detail'>
            <span className='left'>Special Offer</span>
            <span className='right '><del>&#8377;1000</del> <span id='specialprice'>&#8377;{dummytransjson.price}(80% off)</span></span>
          </div>
          <div className='detail'>
            <span className='left'>Additional & Tax:</span>
            <span className='right'> {gstprice((dummytransjson.price),(dummytransjson.hiddenInputs.amount))} (18% GST)</span>
          </div>
          <div className='detail'>
            <span className='left'>Total Price</span>
            <span className='right'><span id='specialprice'>{dummytransjson.hiddenInputs.amount}/-</span> incl GST</span>
          </div>
          <div className='detail'>
            <button type="button" class="btn btn-outline-success" id='pay'>Pay Now</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Transaction