import React, { useState } from 'react'
import './Faliure2.css';
function Failure2() {
  const [sucessmsg, setsucessmsg] = useState([]);
  const dummysucess = {
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
    status: 'Fail',
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
    name_on_card: ''

  }
  return (
    <>
      <div>&nbsp;</div>

      <div id='main2'>
        <div className='message2'>
          <h4>{dummysucess.addedon}</h4>
          <div className='payment2'>
            <img src='./failure.png' id='sucess' />
            <h1>Payment {dummysucess.status}</h1>

          </div>
          <h2>{dummysucess.error_Message}</h2>
          <div id='paymentdata2'>
            <p>Payment Via:<span>phonepe</span></p>
            <p>Transaction No:{dummysucess.txnid}</p>
            <p id='lastline2'>if the Money  Debited from your Account will be credited back in 24 hours</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Failure2