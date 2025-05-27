import React, { useRef, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  FiUploadCloud, FiFileText, FiLock, FiCheck, FiCopy, FiExternalLink, FiDownload, FiAlertCircle
} from 'react-icons/fi';
import axios from 'axios';
import './Esign3_custom.css';
import * as pdfjsLib from 'pdfjs-dist';

// Set the PDF.js worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// API Authorization token
const API_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg';

// Helper for copying text
const copyToClipboard = (text, setCopied) => {
  navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 1800);
};

// Helper for opening signing portal
const openSigningPortal = (url) => {
  if (url) {
    window.open(url, '_blank');
  }
};

const STEPS = [
  'Upload', 'Info', 'eSign', 'Done', // First Party
  'Preview', 'Info', 'eSign', 'Done' // Second Party
];

function Esign3() {
  // Get URL parameters and route params
  const { userid } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clientIdFromUrl = queryParams.get('client_id');
  // Stepper state
  const [step, setStep] = useState(1); // 1-8

  // File upload state
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // First party state
  const [fpInfo, setFpInfo] = useState({ name: '', phone: '', email: '' });
  const [fpClientId, setFpClientId] = useState('');
  const [fpRedirectUrl, setFpRedirectUrl] = useState('');
  const [fpLoading, setFpLoading] = useState(false);
  const [fpError, setFpError] = useState('');
  const [fpSuccess, setFpSuccess] = useState(false);
  const [fpCopied, setFpCopied] = useState(false);
  const [fpSignStatus, setFpSignStatus] = useState(''); // 'pending', 'completed', 'error'
  const [fpSignedDocUrl, setFpSignedDocUrl] = useState('');

  // Second party state
  const [spInfo, setSpInfo] = useState({ name: '', phone: '', email: '' });
  const [spClientId, setSpClientId] = useState('');
  const [spRedirectUrl, setSpRedirectUrl] = useState('');
  const [spLoading, setSpLoading] = useState(false);
  const [spError, setSpError] = useState('');
  const [spSuccess, setSpSuccess] = useState(false);
  const [spCopied, setSpCopied] = useState(false);
  const [spSignStatus, setSpSignStatus] = useState(''); // 'pending', 'completed', 'error'
  const [spSignedDocUrl, setSpSignedDocUrl] = useState('');

  // Status checking state
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [statusError, setStatusError] = useState('');

  // Download state
  const [downloaded, setDownloaded] = useState(false);
  const [documentSigned, setDocumentSigned] = useState(false);

  // Dropzone ref
  const fileInputRef = useRef(null);
  
  // Check eSign status
  const checkSignStatus = async (clientId, isFirstParty = true) => {
    if (!clientId) return;
    
    const setLoading = isFirstParty ? setFpLoading : setSpLoading;
    const setError = isFirstParty ? setFpError : setSpError;
    const setSignStatus = isFirstParty ? setFpSignStatus : setSpSignStatus;
    const setSignedDocUrl = isFirstParty ? setFpSignedDocUrl : setSpSignedDocUrl;
    
    setLoading(true);
    setCheckingStatus(true);
    setStatusError('');
    
    try {
      // Check status
      console.log(`Checking eSign status for ${isFirstParty ? 'first' : 'second'} party: ${clientId}`);
      const statusResponse = await axios.get(
        `https://kyc-api.surepass.io/api/v1/esign/status/${clientId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': API_TOKEN
          }
        }
      );
      
      if (statusResponse.data && statusResponse.data.data) {
        const { status, completed, esign_error } = statusResponse.data.data;
        console.log(`Status response: status=${status}, completed=${completed}, error=${esign_error}`);
        
        if (completed && status === 'esign_completed' && !esign_error) {
          setSignStatus('completed');
          console.log(`eSign completed for ${isFirstParty ? 'first' : 'second'} party`);
          
          // Get signed document URL
          try {
            console.log(`Retrieving signed document for ${clientId}`);
            const docResponse = await axios.get(
              `https://kyc-api.surepass.io/api/v1/esign/get-signed-document/${clientId}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': API_TOKEN
                }
              }
            );
            
            if (docResponse.data && docResponse.data.data && docResponse.data.data.url) {
              const signedDocUrl = docResponse.data.data.url;
              console.log(`Retrieved signed document URL: ${signedDocUrl.substring(0, 50)}...`);
              setSignedDocUrl(signedDocUrl);
              
              // Update localStorage
              if (isFirstParty) {
                localStorage.setItem('fpSignedDocUrl', signedDocUrl);
                localStorage.setItem('fpSignStatus', 'completed');
                
                // Move to next step if we're in the right step
                if (step === 3) setStep(4);
              } else {
                localStorage.setItem('spSignedDocUrl', signedDocUrl);
                localStorage.setItem('spSignStatus', 'completed');
                localStorage.setItem('documentSigned', 'true');
                setDocumentSigned(true);
                
                // Move to next step if we're in the right step
                if (step === 7) setStep(8);
              }
            } else {
              console.error('Invalid document URL response:', docResponse.data);
              setError('Could not retrieve signed document URL. Please try again.');
            }
          } catch (docErr) {
            console.error('Error retrieving signed document:', docErr);
            setError('Error retrieving signed document. Please try again.');
          }
        } else if (esign_error) {
          setSignStatus('error');
          setError('Error in e-signing process. Please try again.');
        } else {
          setSignStatus('pending');
        }
      }
    } catch (err) {
      console.error('Error checking sign status:', err);
      setStatusError(err.message || 'Failed to check signing status');
      setSignStatus('error');
    } finally {
      setLoading(false);
      setCheckingStatus(false);
    }
  };
  
  // Load data from localStorage on component mount
  useEffect(() => {
    // Load first party data
    const savedFpInfo = localStorage.getItem('fpInfo');
    const savedFpClientId = localStorage.getItem('fpClientId');
    const savedFpRedirectUrl = localStorage.getItem('fpRedirectUrl');
    const savedFpSignStatus = localStorage.getItem('fpSignStatus');
    const savedFpSignedDocUrl = localStorage.getItem('fpSignedDocUrl');
    const savedFileUrl = localStorage.getItem('fileUrl');
    const savedStep = localStorage.getItem('eSignStep');
    
    if (savedFpInfo) setFpInfo(JSON.parse(savedFpInfo));
    if (savedFpClientId) setFpClientId(savedFpClientId);
    if (savedFpRedirectUrl) setFpRedirectUrl(savedFpRedirectUrl);
    if (savedFpSignStatus) setFpSignStatus(savedFpSignStatus);
    if (savedFpSignedDocUrl) setFpSignedDocUrl(savedFpSignedDocUrl);
    if (savedFileUrl) setFileUrl(savedFileUrl);
    
    // Load second party data
    const savedSpInfo = localStorage.getItem('spInfo');
    const savedSpClientId = localStorage.getItem('spClientId');
    const savedSpRedirectUrl = localStorage.getItem('spRedirectUrl');
    const savedSpSignStatus = localStorage.getItem('spSignStatus');
    const savedSpSignedDocUrl = localStorage.getItem('spSignedDocUrl');
    const savedDocumentSigned = localStorage.getItem('documentSigned');
    
    if (savedSpInfo) setSpInfo(JSON.parse(savedSpInfo));
    if (savedSpClientId) setSpClientId(savedSpClientId);
    if (savedSpRedirectUrl) setSpRedirectUrl(savedSpRedirectUrl);
    if (savedSpSignStatus) setSpSignStatus(savedSpSignStatus);
    if (savedSpSignedDocUrl) setSpSignedDocUrl(savedSpSignedDocUrl);
    if (savedDocumentSigned === 'true') setDocumentSigned(true);
    
    // Set step based on saved data or URL parameters
    if (savedStep) {
      const parsedStep = parseInt(savedStep);
      // Only update step if it's different to avoid infinite loops
      if (parsedStep !== step) {
        setStep(parsedStep);
      }
    }
    
    // Handle URL client_id parameter
    if (clientIdFromUrl) {
      // Check if this is first or second party based on saved data
      if (savedFpClientId === clientIdFromUrl) {
        checkSignStatus(clientIdFromUrl, true);
      } else if (savedSpClientId === clientIdFromUrl) {
        checkSignStatus(clientIdFromUrl, false);
      } else {
        // If we can't determine which party, check if we have first party data
        if (savedFpClientId) {
          // We already have first party data, so this must be second party
          setSpClientId(clientIdFromUrl);
          localStorage.setItem('spClientId', clientIdFromUrl);
          checkSignStatus(clientIdFromUrl, false);
        } else {
          // No data yet, assume first party
          setFpClientId(clientIdFromUrl);
          localStorage.setItem('fpClientId', clientIdFromUrl);
          checkSignStatus(clientIdFromUrl, true);
        }
      }
    }
    // Remove step from dependency array to prevent infinite loops
  }, [clientIdFromUrl]);
  
  // Save current step to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('eSignStep', step.toString());
  }, [step]);

  // File upload handler
  const handleFileUpload = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setFileUrl(URL.createObjectURL(selected));
      if (selected.type === 'application/pdf') {
        countPdfPages(selected);
      } else {
        // Default to 1 page for non-PDF files
        setPageCount(1);
      }
    }
  };
  
  // Count PDF pages
  const countPdfPages = async (pdfFile) => {
    try {
      const fileReader = new FileReader();
      
      fileReader.onload = async (event) => {
        const typedArray = new Uint8Array(event.target.result);
        
        try {
          // Use PDF.js to load the document and count pages
          const loadingTask = pdfjsLib.getDocument({ data: typedArray });
          const pdf = await loadingTask.promise;
          
          // Get the number of pages
          const numPages = pdf.numPages;
          console.log(`PDF loaded with ${numPages} pages`);
          
          // Update state with actual page count
          setPageCount(numPages);
        } catch (err) {
          console.error('Error counting PDF pages:', err);
          setPageCount(1); // Default to 1 if counting fails
        }
      };
      
      fileReader.readAsArrayBuffer(pdfFile);
    } catch (err) {
      console.error('Error reading file:', err);
      setPageCount(1);
    }
  };
  
  // Upload file to server
  const uploadFile = async (selectedFile) => {
    setUploadLoading(true);
    setUploadError('');
    setUploadSuccess(false);
    
    try {
      const formData = new FormData();
      formData.append('images', selectedFile);
      
      const response = await axios.post(
        'https://www.townmanor.ai/api/image/aws-upload-owner-images',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      if (response.data && response.data.fileUrls && response.data.fileUrls.length > 0) {
        setFileUrl(response.data.fileUrls[0]);
        setUploadSuccess(true);
        return response.data.fileUrls[0];
      } else {
        throw new Error('No file URL received from server');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setUploadError(err.message || 'Failed to upload file. Please try again.');
      return null;
    } finally {
      setUploadLoading(false);
    }
  };

  // Dropzone drag handlers
  const [dzActive, setDzActive] = useState(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDzActive(false);
    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setFileUrl(URL.createObjectURL(droppedFile));
      if (droppedFile.type === 'application/pdf') {
        countPdfPages(droppedFile);
      } else {
        setPageCount(1);
      }
    }
  };
  
  // Generate positions based on page count
  const generatePositions = (isFirstParty = true) => {
    const positions = {};
    
    // Create a position for each page in the PDF
    // Use different coordinates for first and second party
    const xPos = isFirstParty ? 10 : 400;
    const yPos = isFirstParty ? 20 : 20;
    
    for (let i = 1; i <= pageCount; i++) {
      positions[i.toString()] = [
        {
          x: xPos,
          y: yPos
        }
      ];
    }
    
    // If pageCount is 0 or undefined, add at least one position
    if (Object.keys(positions).length === 0) {
      positions['1'] = [
        {
          x: xPos,
          y: yPos
        }
      ];
    }
    
    return positions;
  };
  
  // Upload PDF to e-signing service
  const uploadPdfToEsign = async (clientId, fileLink) => {
    try {
      const response = await axios.post(
        'https://kyc-api.surepass.io/api/v1/esign/upload-pdf',
        {
          client_id: clientId,
          link: fileLink
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': API_TOKEN
          }
        }
      );
      
      if (!response.data || !response.data.success) {
        throw new Error('Failed to upload PDF to e-signing service');
      }
      
      return response.data;
    } catch (err) {
      console.error('Error uploading PDF to e-signing service:', err);
      throw new Error('Failed to upload PDF to e-signing service. Please try again.');
    }
  };
  
  // Initialize e-signing process for first party
  const initializeFirstPartyEsign = async () => {
    if (!fileUrl) {
      setFpError('Please upload a file first');
      return;
    }
    
    setFpLoading(true);
    setFpError('');
    setFpSuccess(false);
    
    try {
      // First upload the file if we only have a local URL
      let serverFileUrl = fileUrl;
      if (!fileUrl.startsWith('http')) {
        serverFileUrl = await uploadFile(file);
        if (!serverFileUrl) throw new Error('Failed to upload file');
        
        // Save file URL to localStorage
        localStorage.setItem('fileUrl', serverFileUrl);
      }
      
      // Generate dynamic positions based on page count
      const dynamicPositions = generatePositions(true); // true for first party
      
      // Step 1: Initialize e-signing
      const initResponse = await axios.post(
        'https://kyc-api.surepass.io/api/v1/esign/initialize',
        {
          pdf_pre_uploaded: true,
          callback_url: 'https://www.townmanor.ai/verified',
          config: {
            accept_selfie: true,
            allow_selfie_upload: true,
            accept_virtual_sign: true,
            track_location: true,
            allow_download: false,
            auth_mode: '1',
            reason: 'Contract',
            positions: dynamicPositions
          },
          prefill_options: {
            full_name: fpInfo.name,
            mobile_number: fpInfo.phone,
            user_email: fpInfo.email
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': API_TOKEN
          }
        }
      );
      
      if (initResponse.data && initResponse.data.data) {
        const { client_id, url, token } = initResponse.data.data;
        setFpClientId(client_id);
        setFpRedirectUrl(url);
        
        // Save to localStorage
        localStorage.setItem('fpClientId', client_id);
        localStorage.setItem('fpRedirectUrl', url);
        localStorage.setItem('fpInfo', JSON.stringify(fpInfo));
        
        // Step 2: Upload PDF with client_id
        await uploadPdfToEsign(client_id, serverFileUrl);
        
        setFpSuccess(true);
      } else {
        throw new Error('Failed to initialize e-signing');
      }
    } catch (err) {
      console.error('Error in e-signing process:', err);
      setFpError(err.message || 'Failed to process e-signing request. Please try again.');
    } finally {
      setFpLoading(false);
    }
  };
  
  // Initialize e-signing process for second party
  const initializeSecondPartyEsign = async () => {
    // Check if we have the first party signed document URL
    const savedFpClientId = localStorage.getItem('fpClientId');
    const savedFpSignStatus = localStorage.getItem('fpSignStatus');
    const savedFpSignedDocUrl = localStorage.getItem('fpSignedDocUrl');
    
    // If we don't have the first party signed document URL, check the status
    if (!fpSignedDocUrl && !savedFpSignedDocUrl) {
      if (savedFpClientId) {
        // Check first party signing status before proceeding
        try {
          const statusResponse = await axios.get(
            `https://kyc-api.surepass.io/api/v1/esign/status/${savedFpClientId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': API_TOKEN
              }
            }
          );
          
          if (statusResponse.data && statusResponse.data.data) {
            const { status, completed, esign_error } = statusResponse.data.data;
            
            if (!(completed && status === 'esign_completed' && !esign_error)) {
              setSpError('First party must complete signing before second party can sign');
              return;
            } else {
              // First party has completed signing, get the signed document URL
              const docResponse = await axios.get(
                `https://kyc-api.surepass.io/api/v1/esign/get-signed-document/${savedFpClientId}`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': API_TOKEN
                  }
                }
              );
              
              if (docResponse.data && docResponse.data.data && docResponse.data.data.url) {
                const signedDocUrl = docResponse.data.data.url;
                setFpSignedDocUrl(signedDocUrl);
                localStorage.setItem('fpSignedDocUrl', signedDocUrl);
                localStorage.setItem('fpSignStatus', 'completed');
              } else {
                setSpError('Could not retrieve first party signed document. Please try again.');
                return;
              }
            }
          } else {
            setSpError('Could not verify first party signing status. Please try again.');
            return;
          }
        } catch (err) {
          console.error('Error checking first party status:', err);
          setSpError('Error verifying first party signing. Please try again.');
          return;
        }
      } else {
        setSpError('First party must complete signing before second party can sign');
        return;
      }
    }
    
    setSpLoading(true);
    setSpError('');
    setSpSuccess(false);
    
    try {
      // Get the signed document URL from first party
      const docUrl = fpSignedDocUrl || localStorage.getItem('fpSignedDocUrl');
      
      // Generate dynamic positions based on page count - different position for second party
      const dynamicPositions = generatePositions(false); // false for second party
      
      // Step 1: Initialize e-signing
      const initResponse = await axios.post(
        'https://kyc-api.surepass.io/api/v1/esign/initialize',
        {
          pdf_pre_uploaded: true,
          callback_url: 'https://www.townmanor.ai/verified',
          config: {
            accept_selfie: true,
            allow_selfie_upload: true,
            accept_virtual_sign: true,
            allow_download: false,
            track_location: true,
            auth_mode: '1',
            reason: 'Contract',
            positions: dynamicPositions
          },
          prefill_options: {
            full_name: spInfo.name,
            mobile_number: spInfo.phone,
            user_email: spInfo.email
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': API_TOKEN
          }
        }
      );
      
      if (initResponse.data && initResponse.data.data) {
        const { client_id, url, token } = initResponse.data.data;
        setSpClientId(client_id);
        setSpRedirectUrl(url);
        
        // Save to localStorage
        localStorage.setItem('spClientId', client_id);
        localStorage.setItem('spRedirectUrl', url);
        localStorage.setItem('spInfo', JSON.stringify(spInfo));
        
        // Step 2: Upload PDF with client_id - use the first party signed document
        await uploadPdfToEsign(client_id, docUrl);
        
        setSpSuccess(true);
      } else {
        throw new Error('Failed to initialize e-signing');
      }
    } catch (err) {
      console.error('Error in e-signing process:', err);
      setSpError(err.message || 'Failed to process e-signing request. Please try again.');
    } finally {
      setSpLoading(false);
    }
  };

  // Step logic
  // First party
  const fpContinue = () => {
    if (step === 2) {
      // When moving from info to eSign, initialize the API
      initializeFirstPartyEsign();
    }
    setStep(step + 1);
  };
  const fpBack = () => setStep(step - 1);
  
  // Second party
  const spContinue = () => {
    if (step === 6) {
      // When moving from info to eSign, initialize the API
      initializeSecondPartyEsign();
    } else if (step === 7) {
      // When moving from eSign to Done, mark document as signed
      setDocumentSigned(true);
      localStorage.setItem('documentSigned', 'true');
    }
    setStep(step + 1);
  };
  const spBack = () => setStep(step - 1);
  
  // Periodically check status if we're on the eSign steps
  useEffect(() => {
    let statusInterval;
    
    if (step === 3 && fpClientId) {
      // Check first party status every 5 seconds
      statusInterval = setInterval(() => {
        checkSignStatus(fpClientId, true);
      }, 5000);
    } else if (step === 7 && spClientId) {
      // Check second party status every 5 seconds
      statusInterval = setInterval(() => {
        checkSignStatus(spClientId, false);
      }, 5000);
    }
    
    return () => {
      if (statusInterval) clearInterval(statusInterval);
    };
  }, [step, fpClientId, spClientId]);

  // Download document
  const handleDownload = () => {
    // Use the second party signed document URL if available, otherwise use first party
    const downloadUrl = spSignedDocUrl || fpSignedDocUrl;
    
    if (downloadUrl) {
      // Open the document in a new tab
      window.open(downloadUrl, '_blank');
      
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 1500);
    }
  };

  // Meta (simulate signed date)
  const today = 'May 22, 2025';

  return (
    <div className="tmEsign-root">
      <div className="tmEsign-header">Document eSignature</div>
      {/* Stepper */}
      <div className="tmEsign-stepper">
        {STEPS.map((label, idx) => (
          <React.Fragment key={label+idx}>
            <div className={
              'tmEsign-step-number' +
              (step === idx+1 ? ' tmEsign-active' : '') +
              (step > idx+1 ? ' tmEsign-completed' : '')
            }>
              {(step > idx+1) ? <FiCheck size={18} /> : idx+1}
            </div>
            {idx < STEPS.length-1 && (
              <div className={
                'tmEsign-step-connector'+(step > idx+1 ? ' tmEsign-active':'')
              }></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="tmEsign-cards">
        {/* First Party Card */}
        <div className="tmEsign-card">
          <div className="tmEsign-card-header">
            <span className="tmEsign-card-title">First Party</span>
            <span className={
              'tmEsign-chip'+(step<=4?'':' tmEsign-chip-waiting')
            }>{step<=4 ? 'Active' : 'Done'}</span>
          </div>
          {/* Step 1: Upload */}
          {step===1 && (
            <div className="tmEsign-step">
              <div
                className={
                  'tmEsign-dropzone'+(dzActive?' tmEsign-dropzone-active':'')
                }
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => {e.preventDefault();setDzActive(true);}}
                onDragLeave={e => {e.preventDefault();setDzActive(false);}}
                onDrop={handleDrop}
              >
                <div className="tmEsign-dropzone-icon"><FiUploadCloud /></div>
                <div className="tmEsign-dropzone-label">Drag and drop your document here</div>
                <div className="tmEsign-dropzone-sub">or <span style={{color:'#6366f1',fontWeight:500}}>Browse Files</span></div>
                <input
                  type="file"
                  accept=".pdf,.docx,.jpg,.png"
                  style={{display:'none'}}
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <div className="tmEsign-dropzone-sub" style={{marginTop:10}}>
                  Supported: PDF, DOCX, JPG, PNG (Max 10MB)
                </div>
              </div>
              {file && (
                <div className="tmEsign-file-info">
                  <span className="tmEsign-file-icon"><FiFileText /></span>
                  <span className="tmEsign-file-details">
                    <span className="tmEsign-file-name">{file.name}</span><br/>
                    <span className="tmEsign-file-meta">{(file.size/1024/1024).toFixed(2)} MB</span>
                  </span>
                </div>
              )}
              <button className="tmEsign-btn" disabled={!file} onClick={fpContinue}>Continue</button>
            </div>
          )}
          {/* Step 2: Info */}
          {step===2 && (
            <div className="tmEsign-step">
              <form onSubmit={e=>{e.preventDefault();fpContinue();}}>
                <div className="tmEsign-form-group">
                  <label className="tmEsign-label">Full Name</label>
                  <input className="tmEsign-input" value={fpInfo.name} onChange={e=>setFpInfo({...fpInfo,name:e.target.value})} required placeholder="Enter your full name" />
                </div>
                <div className="tmEsign-form-group">
                  <label className="tmEsign-label">Phone Number</label>
                  <input className="tmEsign-input" type="tel" value={fpInfo.phone} onChange={e=>setFpInfo({...fpInfo,phone:e.target.value})} required placeholder="Enter your phone number" />
                </div>
                <div className="tmEsign-form-group">
                  <label className="tmEsign-label">Email Address</label>
                  <input className="tmEsign-input" type="email" value={fpInfo.email} onChange={e=>setFpInfo({...fpInfo,email:e.target.value})} required placeholder="Enter your email address" />
                </div>
                <div>
                  <button type="button" className="tmEsign-btn tmEsign-btn-secondary" onClick={fpBack}>Back</button>
                  <button type="submit" className="tmEsign-btn">Continue</button>
                </div>
              </form>
            </div>
          )}
          {/* Step 3: eSign Link */}
          {step===3 && (
            <div className="tmEsign-step">
              <div className="tmEsign-link-group">
                <input className="tmEsign-link-input" value={fpRedirectUrl || 'Generating link...'} readOnly />
                <button 
                  className="tmEsign-link-copy" 
                  type="button" 
                  onClick={()=>copyToClipboard(fpRedirectUrl,setFpCopied)}
                  disabled={!fpRedirectUrl}
                >
                  {fpCopied ? <><FiCheck size={16}/> Copied!</> : <><FiCopy size={16}/> Copy</>}
                </button>
              </div>
              {fpError && <div className="tmEsign-error">{fpError}</div>}
              <button className="tmEsign-btn" style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:7}} onClick={()=>{
              window.open(fpRedirectUrl, '_blank');
              }}>
                <FiExternalLink size={18}/> Open Signing Portal
              </button>
              <div style={{marginTop:20}}>
                <button className="tmEsign-btn tmEsign-btn-secondary" onClick={fpBack}>Back</button>
                {/* <button className="tmEsign-btn" onClick={fpContinue}>I've Signed</button> */}
              </div>
            </div>
          )}
          {/* Step 4: Done */}
          {step===4 && (
            <div className="tmEsign-success">
              <div className="tmEsign-success-icon"><FiCheck size={48}/></div>
              <div className="tmEsign-success-title">Document Signed Successfully!</div>
              <div className="tmEsign-success-desc">You have completed your part of the signing process.</div>
              <div className="tmEsign-file-info">
                <span className="tmEsign-file-icon"><FiFileText /></span>
                <span className="tmEsign-file-details">
                  <span className="tmEsign-file-name">{file?.name || 'Contract_Document.pdf'}</span><br/>
                  <span className="tmEsign-file-meta">Signed on {today}</span>
                </span>
              </div>
              <button className="tmEsign-btn" onClick={fpContinue}>Proceed to Second Party</button>
            </div>
          )}
        </div>
        {/* Second Party Card */}
        <div className={
          'tmEsign-card'+(step<=4?' tmEsign-card-disabled':'')
        }>
          <div className="tmEsign-card-header">
            <span className="tmEsign-card-title">Second Party</span>
            <span className={
              'tmEsign-chip'+(step>4?'':' tmEsign-chip-waiting')
            }>{step>4 ? 'Active' : 'Waiting'}</span>
          </div>
          {/* Locked overlay */}
          {step<=4 && (
            <div className="tmEsign-lock">
              <div className="tmEsign-lock-icon"><FiLock /></div>
              <div style={{fontWeight:600,fontSize:'1.07rem'}}>Waiting for First Party</div>
              <div style={{color:'#71717a',marginTop:6}}>This section will be unlocked once the First Party completes their signing process.</div>
            </div>
          )}
          {/* Step 5: Preview */}
          {step===5 && (
            <div className="tmEsign-step">
              <div className="tmEsign-file-info">
                <span className="tmEsign-file-icon"><FiFileText /></span>
                <span className="tmEsign-file-details">
                  <span className="tmEsign-file-name">{file?.name || 'Contract_Document.pdf'}</span><br/>
                  <span className="tmEsign-file-meta">Uploaded by First Party</span>
                </span>
              </div>
              <button className="tmEsign-btn" onClick={spContinue}>Continue</button>
            </div>
          )}
          {/* Step 6: Info */}
          {step===6 && (
            <div className="tmEsign-step">
              <form onSubmit={e=>{e.preventDefault();spContinue();}}>
                <div className="tmEsign-form-group">
                  <label className="tmEsign-label">Full Name</label>
                  <input className="tmEsign-input" value={spInfo.name} onChange={e=>setSpInfo({...spInfo,name:e.target.value})} required placeholder="Enter your full name" />
                </div>
                <div className="tmEsign-form-group">
                  <label className="tmEsign-label">Phone Number</label>
                  <input className="tmEsign-input" type="tel" value={spInfo.phone} onChange={e=>setSpInfo({...spInfo,phone:e.target.value})} required placeholder="Enter your phone number" />
                </div>
                <div className="tmEsign-form-group">
                  <label className="tmEsign-label">Email Address</label>
                  <input className="tmEsign-input" type="email" value={spInfo.email} onChange={e=>setSpInfo({...spInfo,email:e.target.value})} required placeholder="Enter your email address" />
                </div>
                <div>
                  <button type="button" className="tmEsign-btn tmEsign-btn-secondary" onClick={spBack}>Back</button>
                  <button type="submit" className="tmEsign-btn">Continue</button>
                </div>
              </form>
            </div>
          )}
          {/* Step 7: eSign Link */}
          {step===7 && (
            <div className="tmEsign-step">
              <div className="tmEsign-link-group">
                <input className="tmEsign-link-input" value={spRedirectUrl || 'Generating link...'} readOnly />
                <button 
                  className="tmEsign-link-copy" 
                  type="button" 
                  onClick={()=>copyToClipboard(spRedirectUrl,setSpCopied)}
                  disabled={!spRedirectUrl}
                >
                  {spCopied ? <><FiCheck size={16}/> Copied!</> : <><FiCopy size={16}/> Copy</>}
                </button>
              </div>
              {spError && <div className="tmEsign-error">{spError}</div>}
              <button className="tmEsign-btn" style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:7}} onClick={()=>{
              window.open(spRedirectUrl, '_blank');
              }}>
                <FiExternalLink size={18}/> Open Signing Portal
              </button>
              <div style={{marginTop:20}}>
                <button className="tmEsign-btn tmEsign-btn-secondary" onClick={spBack}>Back</button>
                {/* <button className="tmEsign-btn" onClick={spContinue}>I've Signed</button> */}
              </div>
            </div>
          )}
          {/* Step 8: Done */}
          {step===8 && (
            <div className="tmEsign-success">
              <div className="tmEsign-success-icon"><FiCheck size={48}/></div>
              <div className="tmEsign-success-title">All Signatures Complete!</div>
              <div className="tmEsign-success-desc">The document has been signed by all parties.</div>
              <div className="tmEsign-file-info">
                <span className="tmEsign-file-icon"><FiFileText /></span>
                <span className="tmEsign-file-details">
                  <span className="tmEsign-file-name">{file?.name ? file.name.replace(/(\.[^.]+)?$/, '_Signed.pdf') : 'Contract_Document_Signed.pdf'}</span><br/>
                  <span className="tmEsign-file-meta">2.4 MB</span>
                </span>
                <button className="tmEsign-download" onClick={handleDownload}>
                  <FiDownload size={18}/>{downloaded ? 'Downloaded!' : 'Download'}
                </button>
              </div>
              <div className="tmEsign-meta-list">
                <div className="tmEsign-meta-row">
                  <span>First Party:</span>
                  <span>Signed on {today}</span>
                </div>
                <div className="tmEsign-meta-row">
                  <span>Second Party:</span>
                  <span>Signed on {today}</span>
                </div>
              </div>
              <button className="tmEsign-btn tmEsign-btn-secondary" style={{marginTop:22}} onClick={() => {
                // Clear all Esign-related localStorage data
                localStorage.removeItem('fpInfo');
                localStorage.removeItem('fpClientId');
                localStorage.removeItem('fpRedirectUrl');
                localStorage.removeItem('fpSignStatus');
                localStorage.removeItem('fpSignedDocUrl');
                localStorage.removeItem('spInfo');
                localStorage.removeItem('spClientId');
                localStorage.removeItem('spRedirectUrl');
                localStorage.removeItem('spSignStatus');
                localStorage.removeItem('spSignedDocUrl');
                localStorage.removeItem('fileUrl');
                localStorage.removeItem('eSignStep');
                localStorage.removeItem('documentSigned');
                // Reload the page after clearing localStorage
                window.location.reload();
              }}>Start New eSign Process</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Esign3;

 