import React from 'react'
import { jsPDF } from 'jspdf';

function Agreementgenerate() {
 const data  = {
    "formState": {
        "consent": true,
        "needPhysicalCopy": true,
        "isSubmitted": true,
        "city": "Noida",
        "securityRefundableAmount": "2000",
        "stampPaper": 100,
        "agreementDuration": "11",
        "monthlyRent": "24996",
        "rentMaintenance": true,
        "otherCharges": false,
        "agreementStart": "2020-06-22",
        "yearlyIncrementInRent": "10%",
        "identity": "tenant",
        "noticePeriod": "1",
        "lockInPeriod": 0,
        "propertyType": "apartment",
        "floorNumber": "5",
        "configuration": "2bhk",
        "area": "1300",
        "propertyNumber": "506",
        "buildingName": "Eldeo Studio",
        "locality": "Sector 93 A",
        "pincode": "201304",
        "state": "uttar pradesh",
        "landlordName": "sunny",
        "landlordAge": "25",
        "landlordPhone": "7827743220",
        "landlordAddress": "sector 93 A",
        "landlordIdentityProofNumber": "sdfsd",
        "landlordIdentityType": "Aadhar Card",
        "landlordEmail": "526sunnysinghcse1@gmail.com",
        "landlordGender": "male",
        "tenantName": "rahul",
        "tenantAge": "36",
        "tenantPhone": "12423",
        "tenantAddress": "",
        "tenantIdentityProofNumber": "sadf",
        "tenantIdentityType": "Aadhar Card",
        "tenantEmail": "s@gmail.com",
        "tenantGender": "male",
        "tenantVerified": false,
        "landlordVerified": false,
        "transactionId": "",
        "totalAmount": "",
        "submittedAt": "2025-05-15T06:53:40.285Z",
        "paymentDetails": {
            "stampPaperFee": 100,
            "convenienceFee": 299,
            "deliveryFee": 0,
            "totalAmount": 399
        }
    },
    "verificationStatus": {
        "landlordVerified": false,
        "tenantVerified": false
    },
    "paymentSummary": {
        "stampPaperFee": 100,
        "convenienceFee": 299,
        "deliveryFee": 0,
        "total": 399
    }
}

const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Set font styles
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    
    let y = 20; // Starting Y position
    const leftMargin = 20;
    const pageWidth = 210;
    const contentWidth = 170;
    
    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("Leave and License Agreement", 105, y, { align: "center" });
    
    // Reset font size for content
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    y += 20;

    // Basic Details Section
    doc.text(`1. Licensor(s): ${data.formState.landlordName}`, leftMargin, y);
    y += 10;
    doc.text(`2. Licensee(s): ${data.formState.tenantName}`, leftMargin, y);
    y += 10;
    
    // Property Address
    doc.text(`Property Address: ${data.formState.propertyNumber}, ${data.formState.floorNumber} Floor, ${data.formState.buildingName},`, leftMargin, y);
    y += 7;
    doc.text(`${data.formState.locality}, ${data.formState.city}, ${data.formState.state}, ${data.formState.pincode}`, leftMargin, y);
    y += 10;

    // Format date for display
    const startDate = new Date(data.formState.agreementStart);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + parseInt(data.formState.agreementDuration));
    
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    doc.text(`4. Duration: ${data.formState.agreementDuration} Months commencing from ${formatDate(startDate)} to ${formatDate(endDate)}`, leftMargin, y);
    y += 10;
    doc.text(`5. License Fees: Rs. ${data.formState.monthlyRent} Per month.`, leftMargin, y);
    y += 10;
    doc.text(`6. Deposit: Rs. ${data.formState.securityRefundableAmount}.`, leftMargin, y);
    y += 15;

    // Main Agreement
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("LEAVE AND LICENSE AGREEMENT", 105, y, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    y += 15;

    doc.text(`This agreement is made and executed on ${formatDate(startDate)} at ${data.formState.city}.`, leftMargin, y);
    y += 15;

    // Parties Section
    const addPartyDetails = (title, name, age, gender, pan, address) => {
      doc.setFont("helvetica", "bold");
      doc.text(title, leftMargin, y);
      doc.setFont("helvetica", "normal");
      y += 10;
      
      const panText = pan ? `, PAN: ${pan}` : '';
      doc.text(`Name: ${name} Age: ${age} Years, ${gender}${panText}, residing at ${address}`, leftMargin, y, { maxWidth: contentWidth });
      y += 15;
    };

    // Add Licensor Details
    addPartyDetails(
      "BETWEEN",
      data.formState.landlordName,
      data.formState.landlordAge,
      data.formState.landlordGender,
      data.formState.landlordIdentityProofNumber,
      data.formState.landlordAddress || `${data.formState.propertyNumber}, ${data.formState.buildingName}, ${data.formState.pincode}`
    );

    doc.text("Hereinafter referred to as the 'Licensor' (which expression shall mean and include the Licensor", leftMargin, y, { maxWidth: contentWidth });
    y += 10;
    doc.text("above named and also their respective heirs, successors, assigns, executors and administrators).", leftMargin, y, { maxWidth: contentWidth });
    y += 15;

    // Add Licensee Details
    addPartyDetails(
      "AND",
      data.formState.tenantName,
      data.formState.tenantAge,
      data.formState.tenantGender,
      data.formState.tenantIdentityProofNumber,
      data.formState.tenantAddress || "Faridabad, 121003"
    );

    doc.text("Hereinafter referred to as the Licensee (which expression shall include only the Licensee above", leftMargin, y, { maxWidth: contentWidth });
    y += 10;
    doc.text("named).", leftMargin, y);
    y += 15;

  

    doc.text("WHEREAS the Licensor is the lawful and legal owner and is fully seized and possessed of the", leftMargin, y, { maxWidth: contentWidth });
    y += 10;
    doc.text(`premises located at ${data.formState.propertyNumber}, ${data.formState.floorNumber} Floor, ${data.formState.buildingName},`, leftMargin, y, { maxWidth: contentWidth });
    y += 10;
    doc.text(`${data.formState.locality}, ${data.formState.city}, ${data.formState.state}, ${data.formState.pincode}.`, leftMargin, y, { maxWidth: contentWidth });
    y += 10;
    doc.text(`The said premises has ${data.formState.configuration.includes('bhk') ? data.formState.configuration.replace('bhk', ' Bedroom') : '1 Bedroom'} and 1 bathroom. Hereinafter referred to as "Licensed Premises".`, leftMargin, y, { maxWidth: contentWidth });
    y += 15;
    doc.text("AND WHEREAS the Licensee have approached the Licensor with a request to temporarily occupy", leftMargin, y, { maxWidth: contentWidth });
    y += 20;
    doc.text("the said premises for residential use on a Leave and License basis for a period of", leftMargin, y, { maxWidth: contentWidth });
    y += 10;
    doc.text(`${data.formState.agreementDuration} months commencing from ${formatDate(startDate)} and ending on ${formatDate(endDate)},`, leftMargin, y, { maxWidth: contentWidth });
    y += 10;
    // Check if we need a page break before the AND WHEREAS section
  
      doc.addPage();
      y = 20;
   
    
    
    doc.text("on terms and subject to conditions hereafter appearing.", leftMargin, y, { maxWidth: contentWidth });
    y += 15;

    doc.text("Now it is agreed by and between the parties hereto as follows:", leftMargin, y, { maxWidth: contentWidth });
    y += 15;

    // Terms and Conditions
    const addClause = (number, title, content) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`${number}. ${title}:`, leftMargin, y);
      y += 10;
      doc.setFont("helvetica", "normal");
      doc.text(content, leftMargin, y, { maxWidth: contentWidth });
      y += 55;
    };

    addClause(
      "1",
      "Period",
      `That the Licensor hereby grants to the Licensee herein a revocable leave and license, to occupy the Licensed Premises without creating any tenancy rights or any other rights, title and interest in favour of theLicensee for a period of ${data.formState.agreementDuration} months commencing with effect from ${formatDate(startDate)} to ${formatDate(endDate)}.`
    );

    addClause(
      "2",
      "License Fee",
      `That the Licensee shall pay to the Licensor the amount of Rs. ${data.formState.monthlyRent} per month including maintenance towards the compensation for the use of the said Licensed premises. The Licensee shall pay rent for a particular month in advance on or before 5th day of the month.That the Licensee shall pay to the Licensor the following amount per month towards the compensation for the use of the said licensed premises.`
    );

    addClause(
      "3",
      "Deposit",
      `Licensee have paid / shall pay to the Licensor Rs. ${data.formState.securityRefundableAmount} interest free refundable deposit, for the use of the said Licensed premises. That the Licensee have paid / shall pay the above mentioned deposit/premium by Cash - Rs. ${Math.floor(data.formState.securityRefundableAmount/2)}. This amount shall be refunded by the Licensor to the Licensee at the time of vacating the said premises, after deducting any outstanding license fees, electricity, water, maintenance charges, or any bills, etc., which are payable by the Licensee at the time of vacating the premises.`
    );

    addClause(
      "4",
      "Renewal",
      `That agreement may be renewed for a period of ${data.formState.agreementDuration} months with ${data.formState.yearlyIncrementInRent} increment in license fees and at other terms to be mutually decided thereon. However, that if the Licensor does not wish to renew this agreement, the Licensee has agreed to vacate the premises immediately upon expiry, or sooner, and in good faith hand over the peaceful possession back to the Licensor.`
    );

    addClause(
      "5",
      "Usage, Damages & Repairs",
      `The Licensee shall use the said premises for residential purpose only. The Licensee shall maintain the said premises in its existing condition. Any damage caused to the said premises, the same shall be repaired by theLicensee at their own cost subject to normal wear and tear. The Licensee shall not engage in any activity that is likely to cause nuisance to the occupants of the neighbourhood; that is to the prejudice in any manner to the rights of Licensor in respect of said premises; that is unlawful or prohibited by State or Central Government. Further, the licensee agrees to abide by all the rules and regulations of the Society.`
    );

    addClause(
      "6",
      "No Tenancy",
      `That the Licensee shall not claim any tenancy right and shall not have any right to transfer, assign, and sublet or grant any license or sub-license in respect of the Licensed Premises or any part thereof and also shall not mortgage or raise any loan against the said premises.`
    );

    addClause(
      "7",
      "Possession",
      `That the Licensee on the expiration or termination or cancellation of this agreement the Licensee shall vacate the said premises without delay with all their goods and belongings. In the event of the Licenseefailing to remove themselves and / or their articles from the said premises on expiry of this agreement or sooner, the Licensor shall be entitled to recover damages at the rate of double of the amount of compensation per day; or alternatively the Licensor shall be entitled to remove the Licensee and their belongings from the licensed premises, without recourse to the court of law.`
    );

    addClause(
      "8",
      "Alteration",
      `That the Licensee shall not make any alteration or addition to the construction or arrangements (internal or external) to the said premises without prior written consent from the Licensor.`
    );

    addClause(
      "9",
      "Inspection",
      `That the Licensor shall have a right of access either by himself / herself / themselves or through authorized representative to enter, view and inspect the Licensed premises at reasonable intervals, during reasonable hours with prior notice.`
    );

    addClause(
      "10",
      "Cancellation",
      `That, subject to the condition of lock-in period (if any), if the Licensee commit default in regular and punctual payments of monthly compensation as herein before mentioned; or commits breach of any of the terms, covenants and conditions of this agreement; or if any legislation prohibiting the Leave and License is imposed, the Licensor shall be entitled to revoke and / or cancel the License hereby granted, by giving notice in writing of ${data.formState.noticePeriod} month and the Licensee too will have the right to vacate the said premises by giving a notice in writing of ${data.formState.noticePeriod} month to the Licensor as mentioned earlier.`
    );

    addClause(
      "11",
      "Lock-in Period",
      `That both the parties have agreed to set a lock-in period of ${data.formState.lockInPeriod} months during which neither the Licensor shall ask the Licensee to vacate the premises, nor the Licensee shall vacate the premises on their own during the lock-in period. However, if the Licensee vacates the premises for any reason, they shall pay to the Licensor the license fees for the remaining lock-in period at the rate as agreed upon in Clause 2. On the other hand, Licensor shall compensate the Licensee for loss and inconvenience caused to the Licensee if they have been asked to vacate the premises by the Licensor.`
    );

    addClause(
      "12",
      "Other Charges",
      `That all statutory rates, taxes, levies, assessment etc. in respect of the said premises shall be paid by the Licensor.`
    );

    addClause(
      "13",
      "Furniture and Appliances",
      `The said premises is having the Furniture and Appliances mentioned in the Schedule I. The Licensee shall maintain the said Furniture and Appliances in the said premises in its existing condition. Any damage caused to the said Furniture and Appliances, the same shall be repaired by the Licensee at their own cost, subject to normal wear and tear.`
    );

 
    
    doc.text("IN WITNESS WHEREOF the parties hereto have set and subscribed respective signatures; or by", leftMargin, y, { maxWidth: contentWidth });
    y += 15;
    doc.text("way of putting thumb impression; or electronic signatures on the day and year mentioned", leftMargin, y, { maxWidth: contentWidth });
    y += 15;
    doc.text("hereinabove", leftMargin, y);
    y += 20;

    // Add signature boxes with styling
    doc.setDrawColor(0);
    
    // Licensor signature
    doc.setFont("helvetica", "bold");
    doc.text("Licensor Signed, Sealed and Delivered by", leftMargin, y);
    y += 20;
    doc.setFont("helvetica", "normal");
    doc.text("_______________", leftMargin, y);
    y += 10;
    doc.text(`${data.formState.landlordName}`, leftMargin, y);
    y += 20;

    // Licensee signature
    doc.setFont("helvetica", "bold");
    doc.text("Licensee", leftMargin, y);
    y += 20;
    doc.setFont("helvetica", "normal");
    doc.text("_______________", leftMargin, y);
    y += 10;
    doc.text(`${data.formState.tenantName}`, leftMargin, y);
    y += 20;

    
  };

  return (
    <>
    <div className="agreement-creator" style={{
      height: '100vh',
      marginTop:'8rem'
    }}>
        <button 
          onClick={generatePDF}
          className="generate-pdf-btn"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Generate Rent Agreement PDF
        </button>
        <h1> helloworld</h1>
    </div>
    </>
  )
}

export default Agreementgenerate