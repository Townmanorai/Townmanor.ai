import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './EditableAgreement.css';

const EditableAgreement = ({ agreementData, onSaveContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (agreementData) {
      // Generate the initial HTML content based on the agreement data
      const htmlContent = generateAgreementHTML(agreementData);
      
      // Convert HTML to Draft.js ContentState
      const contentBlocks = convertFromHTML(htmlContent);
      const contentState = ContentState.createFromBlockArray(
        contentBlocks.contentBlocks,
        contentBlocks.entityMap
      );
      
      // Set the editor state with the content
      setEditorState(EditorState.createWithContent(contentState));
      setIsLoading(false);
    }
  }, [agreementData]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onSaveContent(htmlContent);
  };

  const generateAgreementHTML = (data) => {
    if (!data) return '';

    // Format date for display
    const startDate = new Date(data.agreement_start_date);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + parseInt(data.agreement_duration_months));
    
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Generate HTML content that matches the structure of the PDF
    return `
      <h1 style="text-align: center;">Leave and License Agreement</h1>
      
      <p><strong>1. Licensor(s):</strong> ${data.landlord_name}</p>
      <p><strong>2. Licensee(s):</strong> ${data.tenant_name}</p>
      
      <p><strong>Property Address:</strong> ${data.property_number}, ${data.floor_number} Floor, ${data.building_name},
      ${data.locality}, ${data.city}, ${data.state}, ${data.pincode}</p>
      
      <p><strong>4. Duration:</strong> ${data.agreement_duration_months} Months commencing from ${formatDate(startDate)} to ${formatDate(endDate)}</p>
      <p><strong>5. License Fees:</strong> Rs. ${data.monthly_rent} Per month.</p>
      <p><strong>6. Deposit:</strong> Rs. ${data.security_amount}.</p>
      
      <h2 style="text-align: center;">LEAVE AND LICENSE AGREEMENT</h2>
      
      <p>This agreement is made and executed on ${formatDate(startDate)} at ${data.city}.</p>
      
      <p><strong>BETWEEN</strong></p>
      <p>Name: ${data.landlord_name} Age: ${data.landlord_age || 'NA'} Years, residing at ${data.landlord_address || 'NA'}</p>
      
      <p><strong>AND</strong></p>
      <p>Name: ${data.tenant_name} Age: ${data.tenant_age || 'NA'} Years, residing at ${data.tenant_address || 'NA'}</p>
      
      <p>WHEREAS the Licensor is the lawful owner and in possession of the premises situated at ${data.property_number}, ${data.floor_number} Floor, ${data.building_name}, ${data.locality}, ${data.city}, ${data.state}, ${data.pincode} (hereinafter referred to as "the said premises").</p>
      
      <p>AND WHEREAS the Licensee has approached the Licensor with a request to allow the Licensee to use and occupy the said premises on Leave and License basis for a period of ${data.agreement_duration_months} months commencing from ${formatDate(startDate)} to ${formatDate(endDate)} for residential purpose only.</p>
      
      <p>AND WHEREAS the Licensor has agreed to allow the Licensee to use and occupy the said premises on Leave and License basis on the terms and conditions hereinafter mentioned.</p>
      
      <h3>NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:</h3>
      
      <p><strong>1. Period of License</strong></p>
      <p>That the Licensor hereby grants to the Licensee the permission to use and occupy the said premises for a period of ${data.agreement_duration_months} months commencing from ${formatDate(startDate)} to ${formatDate(endDate)}.</p>
      
      <p><strong>2. License Fee</strong></p>
      <p>That the Licensee shall pay to the Licensor the License Fee of Rs. ${data.monthly_rent} per month, payable on or before the 10th day of each month.</p>
      
      <p><strong>3. Security Deposit</strong></p>
      <p>That the Licensee has paid to the Licensor a sum of Rs. ${data.security_amount} as interest-free refundable security deposit, which shall be refunded by the Licensor to the Licensee at the time of vacating the said premises after deducting unpaid license fees, if any, and the cost of damages, if any, caused to the said premises by the Licensee.</p>
      
      <p><strong>4. Electricity Charges</strong></p>
      <p>That the Licensee shall pay the electricity charges as per the meter reading.</p>
      
      <p><strong>5. Water Charges</strong></p>
      <p>That the Licensee shall pay the water charges as per the actual consumption or as mutually agreed between the parties.</p>
      
      <p><strong>6. Use of Premises</strong></p>
      <p>That the Licensee shall use the said premises for residential purpose only and shall not use the same for any other purpose.</p>
      
      <p><strong>7. Maintenance</strong></p>
      <p>That the Licensee shall maintain the said premises in good condition and shall not cause any damage to the said premises or any part thereof.</p>
      
      <p><strong>8. Alterations</strong></p>
      <p>That the Licensee shall not make any structural alterations or additions to the said premises without the prior written consent of the Licensor.</p>
      
      <p><strong>9. Sub-License</strong></p>
      <p>That the Licensee shall not sub-license or part with the possession of the said premises or any part thereof to any person.</p>
      
      <p><strong>10. Notice for Termination</strong></p>
      <p>That either party may terminate this agreement by giving ${data.notice_period_months || '1'} month(s) prior notice in writing to the other party.</p>
      
      <p><strong>11. Renewal</strong></p>
      <p>That this agreement may be renewed for such further period as may be mutually agreed between the parties.</p>
      
      <p><strong>12. Property Tax</strong></p>
      <p>That all statutory rates, taxes, levies, assessment etc. in respect of the said premises shall be paid by the Licensor.</p>
      
      <p><strong>13. Furniture and Appliances</strong></p>
      <p>The said premises is having the Furniture and Appliances mentioned in the Schedule I. The Licensee shall maintain the said Furniture and Appliances in the said premises in its existing condition. Any damage caused to the said Furniture and Appliances, the same shall be repaired by the Licensee at their own cost, subject to normal wear and tear.</p>
      
      <p>IN WITNESS WHEREOF the parties hereto have set and subscribed respective signatures; or by way of putting thumb impression; or electronic signatures on the day and year mentioned hereinabove</p>
      
      <p><strong>Licensor Signed, Sealed and Delivered by</strong></p>
      <p>_______________</p>
      <p>${data.landlord_name} ${data.owner_verified === 1 ? '(Verified)' : ''}</p>
      
      <p><strong>Licensee</strong></p>
      <p>_______________</p>
      <p>${data.tenant_name} ${data.tenant_verified === 1 ? '(Verified)' : ''}</p>
    `;
  };

  if (isLoading) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="editable-agreement-container">
      <div className="editor-container">
        <Editor
          editorState={editorState}
          wrapperClassName="editor-wrapper"
          editorClassName="editor-content"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
            inline: {
              options: ['bold', 'italic', 'underline'],
            },
          }}
        />
      </div>
      <div className="editor-actions">
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditableAgreement;
