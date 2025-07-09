import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { differenceInDays, format } from 'date-fns';
import './BookingUserDetail.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
const BookingUserDetail = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [roomData, setRoomData] = useState(null);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [gst, setGst] = useState(0);
    const [gstPercentage, setGstPercentage] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
        const [nights, setNights] = useState(0);
    const [disabledDates, setDisabledDates] = useState([]);

    const [adharNumber, setAdharNumber] = useState('');
    const [isAdharVerified, setIsAdharVerified] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [otp, setOtp] = useState('');
    const [clientId, setClientId] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [showPhotoUpload, setShowPhotoUpload] = useState(false);
    const [bookingId, setBookingId] = useState(null);
    const [photoUploaded, setPhotoUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [phoneVerificationData, setPhoneVerificationData] = useState(null);

    const roomId = localStorage.getItem('roomId');
    const userId = localStorage.getItem('propertyid');
    const token = Cookies.get('jwttoken');
    if (!token) {
        alert('Please login to proceed.');
        return;
    }
    const decodedToken = jwtDecode(token);
    const username = decodedToken.username;

    useEffect(() => {
        if (roomId) {
            axios.get(`https://townmanor.ai/api/coliving-rooms/${roomId}`)
                .then(response => {
                    setRoomData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching room data:', error);
                });

            axios.get(`https://townmanor.ai/api/bookings/roomdata/${roomId}`)
                .then(response => {
                    const bookings = response.data;
                    const disabled = bookings.flatMap(booking => {
                        const start = new Date(booking.start_date);
                        const end = new Date(booking.end_date);
                        const dates = [];
                        for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
                            dates.push(new Date(dt));
                        }
                        return dates;
                    });
                    setDisabledDates(disabled);
                })
                .catch(error => {
                    console.error('Error fetching room bookings:', error);
                });
        }
    }, [roomId]);

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    useEffect(() => {
        if (roomData && startDate && endDate) {
            const days = differenceInDays(endDate, startDate);
            if (days > 0) {
                setNights(days);
                const basePrice = days * roomData.data.price;
                let gstAmount = 0;
                let currentGstPercentage = 0;

                if (basePrice < 7000) {
                    currentGstPercentage = 10;
                    gstAmount = basePrice * 0.10;
                } else {
                    currentGstPercentage = 18;
                    gstAmount = basePrice * 0.18;
                }

                setCalculatedPrice(basePrice);
                setGst(gstAmount);
                setGstPercentage(currentGstPercentage);
                setTotalPrice(basePrice + gstAmount);
            } else {
                setNights(0);
                setCalculatedPrice(0);
                setGst(0);
                setGstPercentage(0);
                setTotalPrice(0);
            }
        }
    }, [roomData, startDate, endDate]);

    const handleAdharVerify = async () => {
        if (!adharNumber || !/^\d{12}$/.test(adharNumber)) {
            alert('Please enter a valid 12-digit Aadhar number.');
            return;
        }

        setLoading(true);

        const pollAadhaarStatus = async (clientId, retries = 5) => {
            if (retries === 0) {
                alert('Aadhaar verification is taking longer than usual. Please try again later.');
                setLoading(false);
                return;
            }

            try {
                const statusResponse = await axios.get(
                    `https://kyc-api.surepass.io/api/v1/async/status/${clientId}`,
                    {
                        headers: {
                            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
                        },
                    }
                );

                const statusData = statusResponse.data;
                if (statusData && statusData.data.status === 'success') {
                    if (statusData.data.api_resp.success) {
                        setIsAdharVerified(true);
                        alert('Aadhar verified successfully!');
                    } else {
                        alert(`Aadhar verification failed: ${statusData.data.api_resp.message} please check addhar number once again`);
                    }
                    setLoading(false);
                } else if (statusData && statusData.data.status === 'pending') {
                    setTimeout(() => pollAadhaarStatus(clientId, retries - 1), 3000);
                } else {
                    alert('Aadhar verification failed. Please check the number and try again.');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching Aadhar status:', error);
                alert('An error occurred while checking Aadhar verification status.');
                setLoading(false);
            }
        };

        try {
            const submitResponse = await axios.post(
                'https://kyc-api.surepass.io/api/v1/async/submit',
                {
                    type: 'aadhaar_validation',
                    body: {
                        id_number: adharNumber,
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg',
                    },
                }
            );

            if (submitResponse.data && submitResponse.data.success) {
                const clientId = submitResponse.data.data.client_id;
                pollAadhaarStatus(clientId);
            } else {
                alert('Failed to submit Aadhar for verification.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting Aadhar:', error);
            alert('An error occurred during Aadhar verification.');
            setLoading(false);
        }
    };

    const handleGenerateOtp = async () => {
        if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://kyc-api.surepass.io/api/v1/telecom/generate-otp', {
                id_number: phoneNumber
            }, {
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg'
                }
            });

            if (response.data.success) {
                setClientId(response.data.data.client_id);
                setShowOtpInput(true);
                alert('OTP sent successfully!');
            } else {
                alert('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error generating OTP:', error);
            alert('An error occurred while sending OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitOtp = async () => {
        if (!otp) {
            alert('Please enter the OTP.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://kyc-api.surepass.io/api/v1/telecom/submit-otp', {
                client_id: clientId,
                otp: otp
            }, {
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDE0NjA5NiwianRpIjoiNmM0YWMxNTMtNDE2MS00YzliLWI4N2EtZWIxYjhmNDRiOTU5IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnVzZXJuYW1lXzJ5MTV1OWk0MW10bjR3eWpsaTh6b2p6eXZiZEBzdXJlcGFzcy5pbyIsIm5iZiI6MTcxMDE0NjA5NiwiZXhwIjoyMzQwODY2MDk2LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.DfipEQt4RqFBQbOK29jbQju3slpn0wF9aoccdmtIsPg'
                }
            });

            if (response.data.success) {
                setIsPhoneVerified(true);
                setShowOtpInput(false);
                setPhoneVerificationData(response.data);
                alert('Phone number verified successfully!');
            } else {
                alert('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting OTP:', error);
            alert('An error occurred while verifying OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAdharVerified || !isPhoneVerified) {
            alert('Please verify your Aadhar and Phone number.');
            return;
        }
        setLoading(true);
        
        const bookingDetails = {
            user_id: 148, // This should be dynamic based on logged-in user
            room_id: roomId,
            start_date: format(startDate, 'yyyy-MM-dd'),
            end_date: format(endDate, 'yyyy-MM-dd'),
            status: 'pending',
            adhar_verification: isAdharVerified ? 1 : 0,
            phone_verification: isPhoneVerified ? 1 : 0,
            adhar_detail: adharNumber,
            price: totalPrice,
            username: username,
            phone_number: phoneNumber,
        };

        try {
            const response = await axios.post('https://townmanor.ai/api/bookings', bookingDetails);
            const newBookingId = response.data?.booking?.id || response.data?.id || response.data?.bookingId;

            if (newBookingId) {
                setBookingId(newBookingId);

                if (phoneVerificationData) {
                    try {
                        await axios.patch(`https://townmanor.ai/api/bookings/${newBookingId}`, {
                            phone_data: JSON.stringify(phoneVerificationData),
                        });
                    } catch (patchError) {
                        console.error('Error updating booking with phone data:', patchError);
                    }
                }

                if (response.data?.booking?.id) {
                    setShowConfirmation(true);
                } else {
                    setShowPhotoUpload(true);
                    alert('Booking created! Please upload your photo.');
                }
            } else {
                throw new Error('Booking ID not found in response.');
            }
        
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking. ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoUpload = async () => {
        if (!profilePicture) {
            alert('Please select a photo to upload.');
            return;
        }
        setUploading(true);
        const formData = new FormData();
        formData.append('images', profilePicture);
        
        try {
            const response = await fetch('https://www.townmanor.ai/api/image/aws-upload-owner-images', {
                
                method: 'POST',
                body: formData,
            });
            
            const data = await response.json();
            console.log(data);
            if (!data || !data.fileUrls || data.fileUrls.length === 0) {
                throw new Error('Image URL not found in upload response.');
            }

            const imageUrl = data.fileUrls[0];

            await axios.patch(`https://townmanor.ai/api/bookings/${bookingId}`, {
                profile_picture: imageUrl,
            });

            alert('Photo uploaded successfully!');
            setPhotoUploaded(true);
            setShowPhotoUpload(false);

        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Failed to upload photo. ' + (error.message || 'An unknown error occurred.'));
        } finally {
            setUploading(false);
        }
    };

    const handleProceedToPayment = async () => {
        console.log('Proceeding to payment for booking ID:', bookingId);
        try {
            localStorage.setItem('paymentType', 'coliving');
            const userResponse = await fetch(`https://www.townmanor.ai/api/user/${username}`);
            if (!userResponse.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await userResponse.json();

            const txnid = 'OID' + Date.now();

            const paymentData = {
                key: 'UvTrjC',
                txnid: txnid,
                amount: totalPrice,
                productinfo: 'Room Booking',
                firstname: userData.name || username || '',
                email: userData.email || '',
                phone: userData.phone || '',
                surl: `https://townmanor.ai/api/boster/payu/success`,
                furl: `https://townmanor.ai/api/boster/payu/failure`,
                udf1: localStorage.getItem('bookingId'),
                service_provider: 'payu_paisa'
            };

            const response = await axios.post('https://townmanor.ai/api/payu/payment', paymentData);

            if (!response.data || !response.data.paymentUrl || !response.data.params) {
                throw new Error('Invalid payment response received');
            }

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = response.data.paymentUrl;

            Object.entries(response.data.params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value.toString();
                    form.appendChild(input);
                }
            });

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);

        } catch (error) {
            console.error('Payment initiation failed:', error);
            alert(error.response?.data?.message || error.message || 'Failed to initiate payment. Please try again.');
        }
    };

    return (
        <div className="booking-user-detail__container">
            <div className="booking-user-detail__calendar-section">
                <h2>Select your dates</h2>
                <p>{nights > 0 ? `${nights} nights in ${roomData?.name || 'your selected room'}` : 'Select check-in and check-out dates'}</p>
                <DateRange
                    editableDateInputs={true}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                    ranges={[{
                        startDate: startDate,
                        endDate: endDate,
                        key: 'selection',
                    }]}
                    disabledDates={disabledDates}
                    months={2}
                    direction="horizontal"
                    className="booking-user-detail__date-range"
                />
            </div>
            <div className="booking-user-detail__summary-card">
                <form onSubmit={handleSubmit}>
                    <div className="booking-user-detail__price-info">
                        {nights > 0 ? (
                            <h3>₹{totalPrice.toFixed(2)} for {nights} night{nights > 1 ? 's' : ''}</h3>
                        ) : (
                            <h3>Select dates to see price</h3>
                        )}
                    </div>

                    <div className="booking-user-detail__date-inputs">
                        <div className="booking-user-detail__date-input">
                            <label>CHECK-IN</label>
                            <input type="text" value={format(startDate, 'MM/dd/yyyy')} readOnly />
                        </div>
                        <div className="booking-user-detail__date-input">
                            <label>CHECKOUT</label>
                            <input type="text" value={format(endDate, 'MM/dd/yyyy')} readOnly />
                        </div>
                    </div>

                    <div className="booking-user-detail__verification-section">
                        <div className="booking-user-detail__form-group">
                            <label htmlFor="adhar">Aadhar Number</label>
                            <div className="booking-user-detail__verify-input-group">
                                <input
                                    type="text"
                                    id="adhar"
                                    value={adharNumber}
                                    onChange={(e) => setAdharNumber(e.target.value)}
                                    placeholder="XXXX-XXXX-XXXX"
                                    disabled={isAdharVerified}
                                />
                                <button type="button" onClick={handleAdharVerify} disabled={isAdharVerified}>
                                    {isAdharVerified ? 'Verified' : 'Verify'}
                                </button>
                            </div>
                        </div>

                        <div className="booking-user-detail__form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <div className="booking-user-detail__verify-input-group">
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="+91 XXXXX XXXXX"
                                    disabled={isPhoneVerified}
                                />
                                <button type="button" onClick={handleGenerateOtp} disabled={isPhoneVerified || showOtpInput}>
                                    {isPhoneVerified ? 'Verified' : 'Send OTP'}
                                </button>
                            </div>
                            {showOtpInput && (
                                <div className="booking-user-detail__verify-input-group">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter OTP"
                                    />
                                    <button type="button" onClick={handleSubmitOtp}>
                                        Submit OTP
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {!showPhotoUpload && !photoUploaded && (
                        <button type="submit" className="booking-user-detail__reserve-button" disabled={loading}>
                            {loading ? 'Reserving...' : 'Reserve'}
                        </button>
                    )}

                    {photoUploaded && (
                        <button type="button" onClick={handleProceedToPayment} className="booking-user-detail__payment-button">
                            Proceed to Payment
                        </button>
                    )}

                    {nights > 0 && (
                        <div className="booking-user-detail__price-breakdown">
                            <p>You won't be charged yet</p>
                            <div className="booking-user-detail__price-item">
                                <span>{`₹${roomData?.data?.price || 0} x ${nights} nights`}</span>
                                <span>₹{calculatedPrice.toFixed(2)}</span>
                            </div>
                            <div className="booking-user-detail__price-item">
                                <span>{`GST (${gstPercentage}%)`}</span>
                                <span>₹{gst.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="booking-user-detail__price-total">
                                <span>Total</span>
                                <span>₹{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {showPhotoUpload && (
  <div className="booking-user-detail__modal-overlay">
    <div className="booking-user-detail__modal-content custom-photo-upload-modal">
      <button className="booking-user-detail__modal-close-button" onClick={() => setShowPhotoUpload(false)}>&times;</button>
      <h2>Upload Your Photo</h2>
      <div className="custom-photo-upload__camera-preview">
        <div className="custom-photo-upload__camera-icon">
          <span role="img" aria-label="camera" style={{fontSize: '40px', color: '#bdbdbd'}}>&#128247;</span>
        </div>
        <div className="custom-photo-upload__camera-text">Camera preview will appear here</div>
      </div>
      <div className="custom-photo-upload__drag-drop">
        <div className="custom-photo-upload__upload-icon">
          <span role="img" aria-label="upload" style={{fontSize: '32px', color: '#90caf9'}}>&#128228;</span>
        </div>
        <div>Drag and drop your photo here</div>
        <div style={{fontSize: '12px', color: '#888'}}>or click to browse files</div>
        <label htmlFor="photo-upload" className="custom-photo-upload__browse-link">Browse files</label>
        <input
          type="file"
          id="photo-upload"
          accept="image/*"
          onChange={handleFileChange}
          className="custom-photo-upload__file-input"
        />
      </div>
      <div className="custom-photo-upload__button-row">
        <button type="button" className="custom-photo-upload__take-photo-btn">
          <span role="img" aria-label="camera" style={{marginRight: '8px'}}>&#128247;</span>
          Take Photo
        </button>
        <button
          type="button"
          onClick={handlePhotoUpload}
          disabled={uploading || !profilePicture}
          className="custom-photo-upload__upload-btn"
        >
          <span role="img" aria-label="upload" style={{marginRight: '8px'}}>&#8682;</span>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  </div>
)}

           
        </div>
    );
};

export default BookingUserDetail;