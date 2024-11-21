import React, { useState } from 'react'
import './Sucess.css'
function Success() {
  const[sucessmsg,setsucessmsg]= useState([]);
  const dummysucess =  {
        country: '',
        udf10: '',
        mode: '',
        error_Message: 'Transaction failed due to customer pressing cancel button.',
        state: '',
        bankcode: '',
        txnid: 'OID1727949586434',
        net_amount_debit: '500.00',
        lastname: '',
        zipcode: '',
        phone: '935415623',
        productinfo: 'Premium',
        hash: '041624245642b7f35a9d15cbed7f9d129648c1e7c267e3898088948697a93037ee3cbba12420016d2fa3ee1f269d40ee8d70c98f81fcc1606f7c156b6c9f378e',
        status: 'Successful',
        firstname: 'ravindra',
        city: '',
        isConsentPayment: '',
        error: 'E1605',
        addedon: '2024-10-03 15:29:09',
        udf9: '',
        udf7: '',
        udf8: '',
        encryptedPaymentId: '21149752512',
        bank_ref_num: '',
        key: 'UvTrjC',
        email: 'ravindranathjha76@gmail.com',
        amount: '500.00',
        unmappedstatus: 'userCancelled',
        address2: '',
        payuMoneyId: '21149752512',
        address1: '',
        udf5: '',
        mihpayid: '21149752512',
        udf6: '',
        udf3: '',
        udf4: '',
        udf1: '',
        udf2: '',
        giftCardIssued: '',
  field1: '',
  cardnum: '',
  field7: '',
  field6: '',
  field9: 'Cancelled by user',
  field8: '',
  amount_split: '{"PAYU":"500.00"}',
  field3: '',
  field2: '',
  field5: '',
  PG_TYPE: '',
  field4: '',
  name_on_card: ''

  }
  return (
    <div id='main2'>
    <div className='message'>
    <h4>Date:23 sep 2024  at 7:35pm</h4>
    <div className='payment'>
  
    <h1>{dummysucess.status}</h1>
    <img src='./sucess.png' id='sucess'/>
    </div>
    <h2>Thank you,your payment of &#8377;{dummysucess.amount} is sucessfully Received</h2>
    <div id='paymentdata'>
        <p>Payment Via:<span>phonepe</span></p>
        <p>Transaction No:{dummysucess.txnid}</p>
        <p id='lastline'>please wait for sometime if credited amount is reflected in your account.<span>Download invoice</span></p>
    </div>
    </div>
    </div>
  )
}

export default Success