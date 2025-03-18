const PAYU_KEY = process.env.REACT_APP_PAYU_KEY;
const PAYU_SALT = process.env.REACT_APP_PAYU_SALT;

export const initiatePayment = async (amount, productInfo, firstName, email, phone) => {
  try {
    // Generate transaction ID
    const txnid = 'TXN_' + Math.random().toString(36).substr(2, 9);
    
    // Calculate hash
    const hashString = `${PAYU_KEY}|${txnid}|${amount}|${productInfo}|${firstName}|${email}|||||||||||${PAYU_SALT}`;
    const hash = await generateHash(hashString);

    // Create form data
    const formData = {
      key: PAYU_KEY,
      txnid: txnid,
      amount: amount,
      productinfo: productInfo,
      firstname: firstName,
      email: email,
      phone: phone,
      surl: `${window.location.origin}/payment-success`,
      furl: `${window.location.origin}/payment-failure`,
      hash: hash
    };

    // Submit form
    submitPaymentForm(formData);
  } catch (error) {
    console.error('Payment initiation failed:', error);
    throw error;
  }
};

const generateHash = async (string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

const submitPaymentForm = (formData) => {
  // Create a hidden form
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = process.env.NODE_ENV === 'production' 
    ? 'https://secure.payu.in/_payment'
    : 'https://test.payu.in/_payment';

  // Add form fields
  Object.keys(formData).forEach(key => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = formData[key];
    form.appendChild(input);
  });

  // Submit form
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export const verifyPayment = async (paymentResponse) => {
  // Implement payment verification logic here
  // This should verify the payment status with PayU's API
  return true;
}; 