import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { differenceInDays, format } from 'date-fns';
import './BookingUserDetail.css';

const BookingUserDetail = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [roomData, setRoomData] = useState(null);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [gst, setGst] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [nights, setNights] = useState(0);

    const [adharNumber, setAdharNumber] = useState('');
    const [isAdharVerified, setIsAdharVerified] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    const roomId = localStorage.getItem('roomId');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (roomId) {
            axios.get(`https://townmanor.ai/api/coliving-rooms/${roomId}`)
                .then(response => {
                    setRoomData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching room data:', error);
                });
        }
    }, [roomId]);
    console.log(roomData.data.price);

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
                const gstAmount = basePrice * 0.18; // Assuming 18% GST
                setCalculatedPrice(basePrice);
                setGst(gstAmount);
                setTotalPrice(basePrice + gstAmount);
            } else {
                setNights(0);
                setCalculatedPrice(0);
                setGst(0);
                setTotalPrice(0);
            }
        }
    }, [roomData, startDate, endDate]);

    const handleAdharVerify = () => {
        // Add Aadhar verification logic here
        console.log('Verifying Aadhar:', adharNumber);
        setIsAdharVerified(true); // Mock verification
    };

    const handlePhoneVerify = () => {
        // Add Phone verification logic here
        console.log('Verifying Phone:', phoneNumber);
        setIsPhoneVerified(true); // Mock verification
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

        const bookingDetails = {
            user_id: userId,
            room_id: roomId,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            status: 'pending', // Or 'confirmed' after payment
            adhar_verification: isAdharVerified ? 1 : 0,
            phone_verification: isPhoneVerified ? 1 : 0,
            adhar_detail: adharNumber,
            price: totalPrice,
            // payment_receipt and profile_picture would be handled via file upload
        };

        const formData = new FormData();
        formData.append('bookingDetails', JSON.stringify(bookingDetails));
        if (profilePicture) {
            formData.append('profile_picture', profilePicture);
        }

        try {
            // Replace with your actual booking endpoint
            const response = await axios.post('https://townmanor.ai/api/bookings', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Booking successful:', response.data);
            alert('Booking successful!');
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Booking failed. Please try again.');
        }
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
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
                    ranges={[selectionRange]}
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
                                <button type="button" onClick={handlePhoneVerify} disabled={isPhoneVerified}>
                                    {isPhoneVerified ? 'Verified' : 'Verify'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="booking-user-detail__form-group">
                        <label htmlFor="profile-picture">Profile Picture</label>
                        <input type="file" id="profile-picture" onChange={handleFileChange} />
                    </div>

                    <button type="submit" className="booking-user-detail__reserve-button">
                        Reserve
                    </button>

                    {nights > 0 && (
                        <div className="booking-user-detail__price-breakdown">
                            <p>You won't be charged yet</p>
                            <div className="booking-user-detail__price-item">
                                <span>{`₹${roomData?.price || 0} x ${nights} nights`}</span>
                                <span>₹{calculatedPrice.toFixed(2)}</span>
                            </div>
                            <div className="booking-user-detail__price-item">
                                <span>GST (18%)</span>
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
        </div>
    );
};

export default BookingUserDetail;