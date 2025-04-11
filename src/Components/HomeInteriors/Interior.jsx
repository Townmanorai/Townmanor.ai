import React from 'react';
import "./HomeInt.css";

function Interior() {
    const designData = {
        kitchen: [
            {
                img: "kitchen-design1.jpg",
                description: "Modular Kitchen With foldable dining table"
            },
            {
                img: "kitchen-design2.jpg",
                description: "Modular Kitchen With foldable dining table"
            },
            {
                img: "kitchen-design3.jpg",
                description: "Modular Kitchen With foldable dining table"
            },
            {
                img: "kitchen-design2.jpg",
                description: "Modular Kitchen With foldable dining table"
            }
        ],
        livingRoom: [
            {
                img: "kitchen-design1.jpg",
                description: "Modular Kitchen With foldable dining table"
            },
            {
                img: "kitchen-design2.jpg",
                description: "Modular Kitchen With foldable dining table"
            },
            {
                img: "kitchen-design3.jpg",
                description: "Modular Kitchen With foldable dining table"
            },
            {
                img: "kitchen-design2.jpg",
                description: "Modular Kitchen With foldable dining table"
            }
        ]
    };

    const handleKitchenClick = () => {
        window.location.href = "https://townmanor.ai/homelane/kitchen";
    };

    const handleLivingRoomClick = () => {
        window.location.href = "https://townmanor.ai/homelane/livingroom";
    };

    return (
        <div className='interior-design' style={{ marginBottom: '50px' }}>
            <div className='container'>
                <div className='interior-heading'>
                    <h1>Modular Kitchen</h1>
                </div>
                <div className='design'>
                    {designData.kitchen.map((item, index) => (
                        <div 
                            className='d-design' 
                            key={index} 
                            onClick={handleKitchenClick}
                            style={{ 
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                borderRadius: '8px',
                                overflow: 'hidden'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                            }}
                        >
                            <div style={{ overflow: 'hidden' }}>
                                <img 
                                    src={item.img} 
                                    alt={`Kitchen Design ${index + 1}`} 
                                    style={{
                                        transition: 'transform 0.5s ease',
                                        width: '100%',
                                        height: 'auto'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                />
                            </div>
                            <p style={{ paddingLeft: "5px" }}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='container'>
                <div className='interior-heading'>
                    <h1>Living Room</h1>
                </div>
                <div className='design'>
                    {designData.livingRoom.map((item, index) => (
                        <div 
                            className='d-design' 
                            key={index} 
                            onClick={handleLivingRoomClick}
                            style={{ 
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                borderRadius: '8px',
                                overflow: 'hidden'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                            }}
                        >
                            <div style={{ overflow: 'hidden' }}>
                                <img 
                                    src={item.img} 
                                    alt={`Living Room Design ${index + 1}`} 
                                    style={{
                                        transition: 'transform 0.5s ease',
                                        width: '100%',
                                        height: 'auto'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                />
                            </div>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Interior;
