import React from 'react';
import './RoomBooking.css';
import { FaRulerCombined, FaBed, FaDoorOpen, FaBath, FaUser } from 'react-icons/fa';

const RoomBooking = () => {
    const rooms = [
        {
            id: 1,
            number: 'Room 1',
            price: '15,000',
            status: 'Booked',
            size: '150 sq.ft',
            features: ['Queen Bed', 'Balcony', 'Attached Bathroom'],
            currentOccupant: {
                role: 'Software Engineer at Microsoft'
            }
        },
        {
            id: 2,
            number: 'Room 2',
            price: '16,500',
            status: 'Available',
            size: '160 sq.ft',
            features: ['Queen Bed', 'Balcony', 'Attached Bathroom']
        }
    ];

    return (
        <section className="townmanor_coliving_room_booking">
            <h2>Room Booking</h2>
            <div className="townmanor_coliving_rooms_container">
                {rooms.map(room => (
                    <div key={room.id} className="townmanor_coliving_room_card">
                        <div className="townmanor_coliving_room_header">
                            <h3>{room.number}</h3>
                            <span className={`townmanor_coliving_status townmanor_coliving_status_${room.status.toLowerCase()}`}>
                                {room.status}
                            </span>
                        </div>
                        <div className="townmanor_coliving_room_price">
                            <span className="townmanor_coliving_amount">₹{room.price}</span>
                            <span className="townmanor_coliving_period">/month</span>
                        </div>
                        <div className="townmanor_coliving_room_features">
                            <div className="townmanor_coliving_feature">
                                <FaRulerCombined className="townmanor_coliving_feature_icon" />
                                <span>{room.size}</span>
                            </div>
                            {room.features.map((feature, index) => (
                                <div key={index} className="townmanor_coliving_feature">
                                    {index === 0 ? <FaBed className="townmanor_coliving_feature_icon" /> : 
                                    index === 1 ? <FaDoorOpen className="townmanor_coliving_feature_icon" /> : 
                                    <FaBath className="townmanor_coliving_feature_icon" />}
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                        {room.currentOccupant ? (
                            <div className="townmanor_coliving_current_occupant">
                                <div className="townmanor_coliving_occupant_icon">
                                    <FaUser className="townmanor_coliving_user_icon" />
                                </div>
                                <div className="townmanor_coliving_occupant_info">
                                    <span className="townmanor_coliving_label">Current Occupant</span>
                                    <span className="townmanor_coliving_role">{room.currentOccupant.role}</span>
                                </div>
                            </div>
                        ) : (
                            <button className="townmanor_coliving_book_now">Book Now</button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RoomBooking;
