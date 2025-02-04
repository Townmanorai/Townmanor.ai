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

    return (
        <div className='interior-design' style={{ marginBottom: '50px' }}>
            <div className='container'>
                <div className='interior-heading'>
                    <h1>Modular Kitchen</h1>
                </div>
                <div className='design'>
                    {designData.kitchen.map((item, index) => (
                        <div className='d-design' key={index}>
                            <div>
                                <img src={item.img} alt={`Kitchen Design ${index + 1}`} />
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
                        <div className='d-design' key={index}>
                            <div>
                                <img src={item.img} alt={`Living Room Design ${index + 1}`} />
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
