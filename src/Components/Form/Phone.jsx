import React, { useEffect, useState } from 'react'
import { TbAirConditioning } from "react-icons/tb";
import { FaSatelliteDish } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { LuUtensilsCrossed } from "react-icons/lu";
import { PiThermometerHotBold } from "react-icons/pi";
import { GrElevator } from "react-icons/gr";
import { LiaIntercom } from "react-icons/lia";
import { PiPark } from "react-icons/pi";
import { MdMicrowave } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { RiParkingBoxLine } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";
import { GiKidSlide } from "react-icons/gi";
import { BiCctv } from "react-icons/bi";
import { ImPower } from "react-icons/im";
import { GiGasStove } from "react-icons/gi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaPersonSwimming } from "react-icons/fa6";
import { PiCourtBasketball } from "react-icons/pi";
import { TbBuildingBank } from "react-icons/tb";
import { GiChimney } from "react-icons/gi";
import { FaKitchenSet } from "react-icons/fa6";
import { TbFridge } from "react-icons/tb";
import { GiGrassMushroom } from "react-icons/gi";
import { GiGrass } from "react-icons/gi";
import { FaChargingStation } from "react-icons/fa6";
import { PiWarehouseLight } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

import './PhoneFrom.css'
import './Step.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Phone() {
    const [category, setcategory] = useState('residential')
    const [sold, setsold] = useState('')
    const [floorplan, setfloorplan] = useState([]);
    const [photos, setphotos] = useState([]);
    const [purpose, setpurpose] = useState('sale')
    const [residential, setresidential] = useState('')
    const [commercial, setcommercial] = useState('')
    const [leased, setleased] = useState('no')
    const [activeButton, setActiveButton] = useState('sale');
    const [activeButton2, setActiveButton2] = useState('commercial');
    const [activeButton3, setActiveButton3] = useState('plot');
    const [activeButton4, setActiveButton4] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [visiblepart1, setvisiblepart1] = useState(true)
    const [visiblepart2, setvisiblepart2] = useState(false)
    const [visiblepart3, setvisiblepart3] = useState(false)
    const [visiblepart4, setvisiblepart4] = useState(false)
    const [visiblepart5, setvisiblepart5] = useState(false)
    const [visiblepart6, setvisiblepart6] = useState(false)
    const [coordinates, setCoordinates] = useState(null);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const[count,setcount] = useState(1);
    const [propertyid,setpropertyid] = useState();
    const countincrement = (index)=>{
        setcount(index);
    }
    const countdecrement = (index)=>{
        setcount(index);
    }
    const countreset = ()=>{
        setcount(1);
    }
    const navigate = useNavigate();
    const [cookieValue, setCookieValue] = useState('');
    const [username, setUsername] = useState('');

    // Set a cookie
    const fetchTokenFromCookies = () => {
        const token = Cookies.get('jwttoken'); // Retrieve the JWT token from cookies
        if (token) {
          try {
            // Decode the JWT token to extract information (e.g., username)
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);
    
            // Set the username from the decoded JWT token
            setUsername(decodedToken.username);
            setCookieValue(`Welcome, ${decodedToken.username}`); // Optionally set this to display it
          } catch (error) {
            console.error('Error decoding token:', error);
            setCookieValue('Error: Invalid Token');
          }
        } else {
          setCookieValue('No token found');
        }
      };
      useEffect(() => {
        // Fetch and decode JWT token from cookies on component mount
        fetchTokenFromCookies();
      }, []);
    const initialdata = {
        'pincode': null,
        'city': null,
        'locality': null,
        'property_name': null,
        'address': null,
        'configuration': null,
        'area_detail': null,
        'area_type': null,
        'bathroom': null,
        'balcony': null,
        'description': null,
        'furnish_type': null,
        'rera_id': null,
        'floor_no': null,
        'total_floor': null,
        'construction_status': null,
        'property_date': null,
        'property_facing': null,
        'price': null,
        'maintenance_charge': null,
        'token_amount': null,
        'length': null,
        'width': null,
        'montly_rent': null,
        'securitydeposit': null,
        'current_lease': null,
        'remaining_time': null,
        'boundary_wall': null,
        'no_of_open_side': null,
        'floor_allowed': null,
        'modifyinterior': null,
        'lock_in_period': null,
        'pricerange': 'Lakh',
        'money_type': 'Rupees',
        amenities: [],
        'metro': null,
        'school': null,
        'hospital': null,
        'mall': null,
        'resturant': null,
        'bus': null,
        'cinema': null,
        'country': 'india'
    }
    const [formdata, setformdata] = useState({
        'pincode': null,
        'city': 'noida',
        'locality': null,
        'property_name': null,
        'address': null,
        'configuration': null,
        'area_detail': null,
        'area_type': null,
        'bathroom': null,
        'balcony': null,
        'furnish_type': null,
        'rera_id': null,
        'floor_no': null,
        'total_floor': null,
        'construction_status': null,
        'property_date': null,
        'property_facing': null,
        'price': null,
        'maintenance_charge': null,
        'token_amount': null,
        'length': null,
        'width': null,
        'montly_rent': null,
        'securitydeposit': null,
        'current_lease': null,
        'remaining_time': null,
        'boundary_wall': null,
        'no_of_open_side': null,
        'floor_allowed': null,
        'modifyinterior': null,
        'lock_in_period': null,
        'pricerange': 'Lakh',
        'money_type': 'Rupees',
        amenities: [],
        'metro': null,
        'school': null,
        'hospital': null,
        'mall': null,
        'resturant': null,
        'bus': null,
        'cinema': null,
        'country': 'india'
    })
    const gpskey = import.meta.env.VITE_GPS_KEY
    const aikey = import.meta.env.VITE_OPEN_API_KEY
    const getCoordinates = async () => {
        setCoordinates(null); // Reset coordinates on new request
        try {
            const response = await axios.get(`https://maps.gomaps.pro/maps/api/geocode/json`, {
                params: {
                    address: formdata.property_name,
                    key: gpskey // Your API key
                }
            });

            if (response.data.status === 'OK') {
                const { lat, lng } = response.data.results[0].geometry.location;
                setCoordinates({ lat, lng });

            } else {
            }
        } catch (err) {
            console.error(err);
        }
    };

    const generateDescription = async () => {
        setLoading(true);
        try {
            const response1 = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: `
                            purpose:${formdata.purpose},
                            unittype:${formdata.residential}/${formdata.commercial}
                            constructionstatus:${formdata.construction_status}
                    ->Give briefly tell about ${formdata.property_name} at ${formdata.address} must including famous nearby location and available commute option with  name.
                    ->tell me why we choose this property
                     on basis on these points write proper good descritiption of property and give priority to first point & strictly avoid repetition
                  `,
                        },
                    ],
                },
                {
                    headers: {
                        'Authorization': `Bearer ${aikey}`, // Replace with your API key
                        'Content-Type': 'application/json'
                    },
                }
            );

            const rawDescription = response1.data.choices[0].message.content;
            setDescription(rawDescription);
            console.log(description)


        } catch (error) {
            console.error("Error generating description:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName); // Set the active button when clicked
    };
    const handleButtonClick2 = (buttonName) => {
        setActiveButton2(buttonName); // Set the active button when clicked
    };
    const handleButtonClick3 = (buttonName) => {
        setActiveButton3(buttonName); // Set the active button when clicked
    };
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            handleCheckboxChange(name, value, checked);
        } else {
            setformdata((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const handleCheckboxChange = (name, value, checked) => {
        setformdata((prevData) => ({
            ...prevData,
            [name]: checked
                ? [...prevData[name], value]
                : prevData[name].filter((item) => item !== value),
        }));
    };
    const handleFloorplanChange = async (event) => {
        const files = Array.from(event.target.files);

        // Check if the current floor plans plus the new files exceed the limit
        if (files.length + floorplan.length > 4) {
            alert('You can upload up to 4 floor plans.');
            // Only allow as many as needed to stay within the limit
            files.splice(4 - floorplan.length);
        }

        // Prepare the FormData to send to the backend
        const formData = new FormData();
        files.forEach(file => {
            formData.append("images", file); // 'floorplans' is the key expected by the backend
        });

        try {
            // Upload the floorplans to the backend
            const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-owner-images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Check if the upload was successful
            if (response.status === 200) {
                // Assuming the backend returns the floorplan paths in the `imagePaths` field
                const uploadedFloorplanPaths = response.data.fileUrls;
                console.log(uploadedFloorplanPaths);

                // Trim the paths to remove the "public\\images\\" part
                const trimmedFloorplanPaths = uploadedFloorplanPaths.map((path) => {
                    return path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/", ""); // Modify path as needed
                });

                // Update the floorplan state with the trimmed paths
                setfloorplan((prevFloorPlans) => [...prevFloorPlans, ...trimmedFloorplanPaths]);

                console.log(trimmedFloorplanPaths);
            } else {
                console.error('Error uploading floorplans:', response);
                alert('Failed to upload floorplans');
            }
        } catch (error) {
            console.error('Error uploading floorplans:', error);
            alert('An error occurred while uploading the floorplans');
        }
    };

    const handlePhotosChange = async (event) => {
        const files = Array.from(event.target.files);

        // Check if the current photos plus the new files exceed the limit
        if (files.length + photos.length > 10) {
            alert('You can upload up to 10 photos.');
            // Only allow as many as needed to stay within the limit
            files.splice(10 - photos.length);
        }

        // Prepare the FormData to send to the backend
        const formdata = new FormData();
        files.forEach(file => {
            formdata.append('images', file); // 'images' is the key expected by the backend
        });

        try {
            // Upload the images to the backend
            const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-owner-images', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Check if the upload was successful
            if (response.status === 200) {
                // Assuming the backend returns the image paths in the `imagePaths` field
                const uploadedImagePaths = response.data.fileUrls;
                console.log(uploadedImagePaths);
                // Convert relative paths to full URLs
                const trimmedImagePaths = uploadedImagePaths.map((path) => {
                    return path.replace("https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/", "");
                });

                // Update the photos state with the full image URLs
                setphotos((prevPhotos) => [...prevPhotos, ...trimmedImagePaths]);

                console.log(trimmedImagePaths);
            } else {
                console.error('Error uploading images:', response);
                alert('Failed to upload images');
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('An error occurred while uploading the images');
        }
    };
    const leasedchange1 = (e) => {
        setleased(e.target.value);
    }
    const setuserlisting = async ()=>{
        const url = `https://www.townmanor.ai/api/userpackage/${username}`;
        const requestBody = {
            propertylisting: propertyid, // This could be a number, string, or array
          };
        try{
            const response = await axios.put(url, requestBody);
            console.log('Property listing updated:', response.data);
        }
        catch(error){

        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Show a loading spinner or similar UI feedback while waiting for coordinates
        setLoading(true);

        // Call getCoordinates to update coordinates
        await getCoordinates();

        // Ensure coordinates are successfully retrieved before proceeding


        // Ensure that all required fields are filled out
        // if (!formdata.property_name || !formdata.price || !formdata.city ) {
        //     alert("Please fill in all required fields.");
        //     setLoading(false);  // Stop loading
        //     return;
        // }

        // Generate description using OpenAI (if applicable)
        if (!description) {
            await generateDescription();
        }

        // Wait for the description to be generated
        if (loading) {
            alert("Generating description, please wait...");
            return;
        }

        // Prepare the form data to be sent in the POST request
        const formDataToSubmit = {
            ...formdata,
            city: formdata.city,
            description: description,  // Ensure description is populated
            purpose: purpose,
            category: category,
            residential: residential,
            floorplan: floorplan,
            image_repository: photos,
            Commercail: commercial,
            leased: leased,
            lat: coordinates ? coordinates.lat : null,
            lng: coordinates ? coordinates.lng : null,
            username:username
        };

        console.log("Form Data to Submit:", formDataToSubmit);  // Debugging

        try {
            // Send the form data to the server
            const response = await axios.post('https://www.townmanor.ai/api/owner-property/', formDataToSubmit);

            // Handle the response from the server
            if (response.status === 201) {
                console.log('Property added successfully:', response.data);
                alert('Form submitted successfully!');
                setpropertyid(response.id);
                setLoading(false);
                setuserlisting();
            } else {
                console.error('Error submitting form:', response);
                alert('Failed to submit form.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    const removeFile = (fileName, type) => {
        setformdata((prevData) => ({
            ...prevData,
            [type]: prevData[type].filter(file => file !== fileName)
        }));
    };
    const removeFloorplan = (fileName) => {
        setfloorplan((prevFloorPlans) => prevFloorPlans.filter(file => file !== fileName));
    };
    const removePhoto = (fileName) => {
        setphotos((prevPhotos) => prevPhotos.filter(file => file !== fileName));
    };
    return (
        <>
            <div id='upperview'>
                {/* <h1>Property Listing Form</h1> */}
            </div>
            <div id='formheading'> Property-Listing Form </div>
            <div className='formbody' style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <div>
                    
                    <div id='progressbar' className='progressbarphone' style={{
                        flexBasis:'30%'
                    }}>

                        <div class={`step    ${count>=1 ? 'active step2' : ''}`} >
                            <h2 data-step-id="1">Basic Details</h2>
                           
                            
                        </div>
                        <div class={`step   ${count>=2 ? 'active step2' : ''} `}>
                            <h2 data-step-id="2">Overview</h2>
                           
                          
                        </div>
                        <div class={`step   ${count>=3  ? 'active step2' : ''}`}>
                            <h2 data-step-id="3">Amenities</h2>
                          
                        </div>
                        <div class={`step   ${count>=4  ? 'active step2' : ''}`}>
                            <h2 data-step-id="4">Nearby Distance</h2>
                           
                        </div>
                        <div class={`step   ${count>=5 ? 'active step2' : ''}`}>
                            <h2 data-step-id="5">AI - Description</h2>
                           
                        </div>
                        

                        <div class={`step   ${count>=6? 'active step2' : ''}`}>
                            <h2 data-step-id="6">File upload</h2>
                            <p>Congratulations! You completed all steps.</p>
                        </div>

                    </div>
                </div>



                <div>
                    <>

                        {/* Property navigation button */}
                        <div className='propbtn'>
                            <button className={`propertybtn   ${activeButton === 'sale' ? 'activeb' : ''}`}

                                onClick={() => {
                                    setpurpose('sale');
                                    handleButtonClick('sale');
                                    countreset();
                                }}
                            >Sale</button>
                            <button className={`propertybtn ${activeButton === 'rent' ? 'activeb' : ''}`}
                                onClick={() => {
                                    setpurpose('rent');
                                    handleButtonClick('rent');
                                    countreset();
                                }}>Rent</button>
                            <p>*select the property uploading purpose is wheather Sale or Rent</p>
                            <br></br>
                            <button className={`propertybtn   ${activeButton2 === 'residential' ? 'activeb2' : ''}`}
                                onClick={() => {
                                    setcategory('residential');
                                    handleButtonClick2('residential');
                                    countreset();
                                }}>Residential</button>
                            <button className={`propertybtn ${activeButton2 === 'commercial' ? 'activeb2' : ''}`}
                                onClick={() => {
                                    setcategory('commercial');
                                    handleButtonClick2('commercial');
                                    countreset();
                                }}>Commercial</button>
                            <p>*select the property is commercial or residential</p>
                        </div>

                        {
                            purpose === 'sale' && category === 'residential' && (
                                <>
                                    <div className='innerbuttonbox'>

                                        <button className={`propertybtn  ${activeButton3 === 'apartment' ? 'activeb3' : ''}`}
                                            onClick={() => {
                                                setresidential('apartment');
                                                handleButtonClick3('apartment');
                                                setformdata(initialdata);
                                            }}>Apartment</button>
                                        <button className={`propertybtn   ${activeButton3 === 'house/villa' ? 'activeb3' : ''}`}
                                            onClick={() => {
                                                setresidential('house/villa');
                                                handleButtonClick3('house/villa');
                                                setformdata(initialdata);
                                            }}>House/villa</button>
                                        <button className={`propertybtn  ${activeButton3 === 'plot' ? 'activeb3' : ''}`}
                                            onClick={() => {
                                                setresidential('plot');
                                                handleButtonClick3('plot');
                                                setformdata(initialdata);
                                            }}>Plot</button>
                                        <button className={`propertybtn   ${activeButton3 === 'builderfloor' ? 'activeb3' : ''}`}
                                            onClick={() => {
                                                setresidential('builderfloor');
                                                handleButtonClick3('builderfloor');
                                                setformdata(initialdata);
                                            }}>Builderfloor</button>
                                        <button className={`propertybtn   ${activeButton3 === 'farmhouse' ? 'activeb3' : ''}`}
                                            onClick={() => {
                                                setresidential('farmhouse');
                                                handleButtonClick3('farmhouse');
                                                setformdata(initialdata);
                                            }}>Farmhouse</button>
                                    </div>


                                    <div className='part1' style={{ display: visiblepart1 ? 'block' : 'none' }}>
                                        <div className='partition'>
                                            <label className='formtext'>Country:</label>
                                            <select
                                                className='formfield'
                                                name='country'
                                                onChange={handleChange}
                                                value={formdata.country}
                                                required

                                            >
                                                <option value='india'>India</option>
                                                <option value='uae'>UAE
                                                </option>
                                                <option value='qatar'>QATAR</option>
                                            </select>
                                            <label className='formtext'>City:</label>
                                            <select
                                                className='formfield'
                                                name='city'
                                                onChange={handleChange}
                                                value={formdata.city}
                                                required

                                            >
                                                {formdata.country === 'india' && (
                                                    <>
                                                        <option value='noida'>Noida</option>
                                                        <option value='gurgaon'>Gurgaon
                                                        </option>
                                                        <option value='greaternoida'>Greater Noida</option>
                                                        <option value='ghaziabad'>Ghaziabad</option>
                                                        <option value='delhi'>Delhi</option>
                                                        <option value='faridabad'>Faridabad</option>
                                                    </>
                                                )}
                                                {formdata.country === 'uae' && (
                                                    <>
                                                        <option value='dubai'>Dubai</option>
                                                    </>
                                                )}
                                                {formdata.country === 'qatar' && (
                                                    <>
                                                        <option value='doha'>Doha</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                        <div className='partition'>
                                            <label className='formtext'>locality:</label>
                                            <input type='text' className='formfield-b' placeholder='Enter locality' name='locality' onChange={handleChange} value={formdata.locality}></input>
                                            <label className='formtext'>Pincode:</label>
                                            <input type='text' className='formfield-b' placeholder='Enter Pincode' name='pincode' onChange={handleChange} value={formdata.pincode}></input>
                                        </div>
                                        <div className='partition'>
                                            <label className='formtext'>Property Name:</label>
                                            <input className='formfield-a' placeholder='Enter Property Name' type='text' name='property_name' onChange={handleChange} value={formdata.property_name} required>
                                            </input>
                                        </div>
                                        <div className='partition'>
                                            <label className='formtext'>Property Address:</label>
                                            <input className='formfield-a' type='text' placeholder='Enter Property address' name='address' onChange={handleChange} value={formdata.address} required>
                                            </input>
                                        </div>
                                        {/* <div className='partition'>
                                        <label className='formtext'>Description</label>
                                        <textarea className='formfield-c' name="description" placeholder='Tell Something About Your Property' value={formdata.description} onChange={handleChange} rows={7} cols={70} required></textarea>
                                    </div> */}

                                    </div>
                                    <div className='partition3'
                                        style={{ display: visiblepart1 ? 'flex' : 'none' }}>
                                        <button className='save' id='first' disabled onClick={() => {
                                            
                                        }}>back</button>
                                        <button className='save' onClick={() => {
                                            setvisiblepart2(true);
                                            setvisiblepart1(false);
                                            countincrement(2);
                                        }}

                                        >Save & next</button>
                                    </div>
                                    {/* overview section */}
                                    <div className='formbox'
                                        style={{ display: visiblepart2 ? 'block' : 'none' }}>

                                        
                                    </div>
                                    <div className='part2' style={{ display: visiblepart2 ? 'block' : 'none' }}>
                                        <div className='partition'>
                                            <label className='formtext' >RERA ID:</label>
                                            <input type='text' className='formfield-a' placeholder=' example UPRERAPRJ72xx' name='rera_id' onChange={handleChange} value={formdata.rera_id}></input>
                                        </div>
                                        {residential !== 'plot' && (
                                            <>
                                                <div className='partition'>
                                                    <div>
                                                        <label className='formtext'>Configuration:</label>
                                                        <select
                                                            className='formfield-b'
                                                            name='configuration'
                                                            onChange={handleChange}
                                                            value={formdata.configuration}
                                                            required

                                                        >
                                                            <option value='1BHK'>1BHK</option>
                                                            <option value='1.5BHK'>1.5BHK</option>
                                                            <option value='2BHK'>2BHK</option>
                                                            <option value='2.5BHK'>2.5BHK</option>
                                                            <option value='3BHK'>3BHK</option>
                                                            <option value='4BHK'>4BHK</option>
                                                            <option value='5BHK'>5BHK</option>
                                                            <option value='6BHK'>6BHK</option>
                                                            <option value='6+ BHK'>6+ BHK</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className='formtext'> Bathroom:</label>
                                                        <select
                                                            className='formfield-b'
                                                            name='bathroom'
                                                            onChange={handleChange}
                                                            value={formdata.bathroom}
                                                            required
                                                        >
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                            <option value='5'>5</option>
                                                            <option value='5+'>5+</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className='formtext'> Balcony:</label>
                                                        <select
                                                            className='formfield-b'
                                                            name='balcony'
                                                            onChange={handleChange}
                                                            value={formdata.balcony}
                                                            required
                                                        >
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                            <option value='5'>5</option>
                                                            <option value='5+'>5+</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className='partition'>
                                                    <label className='formtext'>Area Detail(in sq.ft) : </label>
                                                    <br></br>
                                                    <input type='number' className='formfield formfield-d' name='area_detail' onChange={handleChange} value={formdata.area_detail} required>
                                                    </input>
                                                    <select
                                                        className='formfield formfield-d'
                                                        name='area_type'
                                                        onChange={handleChange}
                                                        value={formdata.area_type}
                                                        required
                                                    >
                                                        <option value='Super Built-up Area'>Super Built Up Area</option>
                                                        <option value='Built-up area'>Built-up Area</option>
                                                        <option value='Carpet Area'>Carpet Area</option>
                                                    </select>
                                                </div>
                                                <div className='partition'>
                                                    <div>
                                                        <label className='formtext'>Property Facing:</label>
                                                        <select
                                                            name='property_facing'
                                                            className='formfield-a'
                                                            onChange={handleChange}
                                                            value={formdata.property_facing}
                                                            required
                                                        >
                                                            <option value='North'>North</option>
                                                            <option value='South'>South</option>
                                                            <option value='East'>East</option>
                                                            <option value='West'>West</option>
                                                            <option value='North-East'>North-East</option>
                                                            <option value='North-West'>North-West</option>
                                                            <option value='South-East'>South-East</option>
                                                            <option value='South-West'>South-West</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className='formtext'>Furnish Type:</label>
                                                        <select
                                                            className='formfield-a'
                                                            name='furnish_type'
                                                            onChange={handleChange}
                                                            value={formdata.furnish_type}
                                                            required
                                                        >
                                                            <option value='Fully furnished'>Fully furnished</option>
                                                            <option value='Semi furnished'>Semi furnished</option>
                                                            <option value='Un furnished'>Un furnished</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className='partition'>

                                                    <div>
                                                        <label className='formtext'>Construction Status</label>
                                                        <select
                                                            name='construction_status'
                                                            className='formfield-a'

                                                            onChange={handleChange}
                                                            value={formdata.construction_status}
                                                            required
                                                        >
                                                            <option value='Ready to Move'>Ready to Move</option>
                                                            <option value='Under-Construction'>Under Construction</option>
                                                            <option value='NewLaunch'>New Launch</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className='formtext'> possesion date</label>
                                                        <input className='formfield-a' type='date' name='property_date' onChange={handleChange} value={formdata.property_date} ></input>
                                                    </div>

                                                </div>

                                                <div className='partition'>
                                                    <div>
                                                        <label className='formtext'>Floor no:</label>
                                                        <input className='formfield-b' type='number' name='floor_no' onChange={handleChange} value={formdata.floor_no}></input>
                                                    </div>
                                                    <div>
                                                        <label className='formtext'>Total Floor:</label>
                                                        <input type='number' className='formfield-b' name='total_floor' onChange={handleChange} value={formdata.total_floor}></input>
                                                    </div>
                                                </div>
                                                <div className='partition'>
                                                    <label className='formtext'>Maintenance charge per month:</label>
                                                    <input type='number' className='formfield-a' placeholder='e.g 1500' name='maintenance_charge' onChange={handleChange} value={formdata.maintenance_charge}></input>

                                                </div>
                                            </>)}
                                        {residential === 'plot' && (
                                            <>
                                                <div className='partition'>
                                                    <label className='formtext'>Plot Dimesion:</label>
                                                    <br></br>
                                                    <input type='number' className='formfield' placeholder='Length' name='length' value={formdata.length} onChange={handleChange} required>
                                                    </input>
                                                    X

                                                    <input type='number' className='formfield' placeholder='width' name='width' value={formdata.width} onChange={handleChange} required>

                                                    </input>

                                                </div>
                                            </>
                                        )}
                                        <div className='partition'>
                                            <label className='formtext'>Price:</label>
                                            <input type='number' placeholder='e.g 2.10' className='formfield' name='price' onChange={handleChange} value={formdata.price} required></input>
                                            <select
                                                className='formfield'
                                                name='pricerange'
                                                onChange={handleChange}
                                                value={formdata.pricerange}
                                                required
                                            >

                                                <option value='Lakh'>Lakhs</option>
                                                <option value='Crore'>Crore</option>
                                                <option value='million'>Million</option>
                                                <option value='billion'>Billion</option>
                                            </select>
                                            <select
                                                className='formfield'
                                                name='money_type'
                                                onChange={handleChange}
                                                value={formdata.money_type}
                                                required
                                            >
                                                <option value='Rupees' >IND-Rupees</option>
                                                <option value='AED'>Dubai - AED</option>
                                                <option value='Riyal'>Qatar-Riyal</option>
                                            </select>
                                        </div>

                                        <div className='partition'>
                                            <label className='formtext'>Token amount:</label>
                                            <input type='number' placeholder='eg.50000' className='formfield-a' name='token_amount' onChange={handleChange} value={formdata.token_amount}></input>
                                        </div>


                                    </div>

                                    <div className='partition3'
                                        style={{ display: visiblepart2 ? 'flex' : 'none' }}>
                                        <button className='save' onClick={() => {
                                            setvisiblepart1(true);
                                            setvisiblepart2(false);
                                            countdecrement(1)
                                        }}>back</button>
                                        <button className='save' onClick={() => {
                                            setvisiblepart2(false);
                                            setvisiblepart3(true);
                                            countincrement(3);
                                        }}>Save & Next</button>
                                    </div>
                                    <div className='formbox'
                                        style={{ display: visiblepart3 ? 'block' : 'none' }}>

                                        
                                    </div>
                                    <div className='part3'
                                        style={{ display: visiblepart3 ? 'block' : 'none' }}>
                                        {residential !== 'plot' && (<>
                                            <div className='checkbox-true'>
                                                {[
                                                    { name: 'Air Conditioner', icon: <TbAirConditioning /> },
                                                    { name: 'Cable Tv', icon: <FaSatelliteDish /> },
                                                    { name: 'Wifi', icon: <FaWifi /> },
                                                    { name: 'Dishwasher', icon: <LuUtensilsCrossed /> },
                                                    { name: 'Heating', icon: <PiThermometerHotBold /> },
                                                    { name: 'Lift', icon: <GrElevator /> },
                                                    { name: 'Intercomm Facility', icon: <LiaIntercom /> },
                                                    { name: 'Microwave', icon: <MdMicrowave /> },
                                                    { name: 'Park', icon: <PiPark /> },
                                                    { name: 'Parking', icon: <LuParkingCircle /> },
                                                    { name: 'Guest Parking', icon: <RiParkingBoxLine /> },
                                                    { name: 'Security', icon: <MdSecurity /> },
                                                    { name: 'Play Area', icon: <GiKidSlide /> },
                                                    { name: 'CCTV', icon: <BiCctv /> },
                                                    { name: 'Power Backup', icon: <ImPower /> },
                                                    { name: 'Gas Pipeline', icon: <GiGasStove /> },
                                                    { name: 'Gym', icon: <GiWeightLiftingUp /> },
                                                    { name: 'Swimming Pool', icon: <FaPersonSwimming /> },
                                                    { name: 'Multipurpose Court', icon: <PiCourtBasketball /> },
                                                    { name: 'Multipurpose Hall', icon: <TbBuildingBank /> },
                                                    { name: 'Chimney', icon: <GiChimney /> },
                                                    { name: 'Modular Kitchen', icon: <FaKitchenSet /> },
                                                    { name: 'Refrigerator', icon: <TbFridge /> },
                                                    { name: 'Rear Lawn', icon: <GiGrassMushroom /> },
                                                    { name: 'Front Lawn', icon: <GiGrass /> },
                                                    { name: 'EV Charge', icon: <FaChargingStation /> },
                                                    { name: 'Club House', icon: <PiWarehouseLight /> }
                                                ].map((amenity, index) => (
                                                    <div>
                                                        <label key={index} className='custom'>
                                                            <input
                                                                type="checkbox"
                                                                name="amenities"
                                                                value={amenity.name}
                                                                onChange={handleChange}
                                                            />
                                                            <p className='fieldname2'>
                                                                {amenity.icon && <span className='icon'> <div className='facility_icon'>
                                                                    {amenity.icon}
                                                                </div></span>} {amenity.name}
                                                            </p>
                                                            <span className='checkmk'></span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>

                                        </>)}
                                        <div>
                                            {
                                                residential === 'plot' && (
                                                    <>
                                                        <div className='checkbox-true'>
                                                            {[
                                                                { name: 'Park', icon: <PiPark /> },
                                                                { name: 'Parking', icon: <LuParkingCircle /> },
                                                                { name: 'Security', icon: <MdSecurity /> },
                                                                { name: 'Play Area', icon: <GiKidSlide /> },
                                                                { name: 'CCTV', icon: <BiCctv /> },
                                                                { name: 'Power Backup', icon: <ImPower /> },
                                                                { name: 'Gas Pipeline', icon: <GiGasStove /> },
                                                            ].map((amenity, index) => (
                                                                <label key={index} className='custom'>
                                                                    <input
                                                                        type="checkbox"
                                                                        name="amenities"
                                                                        value={amenity.name}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <p className='fieldname2'>
                                                                        {amenity.icon && <span className='icon'>{amenity.icon}</span>} {amenity.name}
                                                                    </p>
                                                                    <span className='checkmk'></span>
                                                                </label>
                                                            ))}
                                                        </div>

                                                    </>
                                                )
                                            }


                                        </div>




                                    </div>
                                    <div className='partition3'
                                        style={{ display: visiblepart3 ? 'flex' : 'none' }}>
                                        <div>
                                            <button className='save' onClick={() => {
                                                setvisiblepart2(true);
                                                setvisiblepart3(false);
                                                countdecrement(2);
                                            }}>back</button>
                                        </div>
                                        <div>
                                            <button className='save' onClick={() => {
                                                setvisiblepart3(false);
                                                setvisiblepart4(true);
                                                countincrement(4)
                                            }}>Save & Next</button>
                                        </div>
                                    </div>
                                    <div className='formbox'
                                        style={{ display: visiblepart4 ? 'block' : 'none' }}>

                                        
                                    </div>
                                    <div className='part4'
                                        style={{ display: visiblepart4 ? 'block' : 'none' }}
                                    >

                                        <div className='partition2'>
                                            <div>
                                                <label className='formtext'>Metro</label><input className='formfield' type='number' name='metro' value={formdata.metro} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>
                                                <label className='formtext'>Bus</label><input className='formfield' type='number' name='bus' value={formdata.bus} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>

                                                <label className='formtext'>School</label><input className='formfield' type='number' name='school' value={formdata.school} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>
                                                <label className='formtext'>Hospital</label><input className='formfield' type='number' name='hospital' value={formdata.hospital} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>
                                                <label className='formtext'>Mall</label><input className='formfield' type='number' name='mall' value={formdata.mall} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>

                                                <label className='formtext'>Resturant: </label><input className='formfield' type='number' name='resturant' value={formdata.resturant} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>
                                                <label className='formtext'>Cinema: </label><input className='formfield' type='number' name='cinema' value={formdata.cinema} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='partition3'
                                        style={{ display: visiblepart4 ? 'flex' : 'none' }}>
                                        <button className='save' onClick={() => {
                                            setvisiblepart3(true);
                                            setvisiblepart4(false);
                                            countdecrement(3)
                                        }}>back</button>
                                        <button className='save' onClick={() => {
                                            setvisiblepart4(false);
                                            setvisiblepart5(true);
                                            countincrement(5)
                                        }}>Save & Next</button>
                                    </div>

                                    <div className='formbox'
                                        style={{ display: visiblepart5 ? 'block' : 'none' }}>

                                   
                                    </div>
                                    <div className='part5'
                                        style={{ display: visiblepart5 ? 'block' : 'none' }}
                                    >
                                        <button className='save description' onClick={generateDescription}>
                                            {loading ? "Generating..." : "Generate AI Description"}
                                        </button>
                                        <div className='partitionx'>
                                            {/* Textarea to show the generated description */}
                                            <div>
                                                <label className='formtext'>Description</label>
                                            </div>
                                            <div>
                                                <textarea
                                                    className='formfield-c'
                                                    name="description"
                                                    placeholder='Tell Something About Your Property'
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)} // Use setDescription directly here
                                                    rows={7}
                                                    cols={70}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='partition3'
                                        style={{ display: visiblepart5 ? 'flex' : 'none' }}>
                                        <button className='save' onClick={() => {
                                            setvisiblepart4(true);
                                            setvisiblepart5(false);
                                            countdecrement(4);
                                        }}>back</button>
                                        <button className='save' onClick={() => {
                                            setvisiblepart5(false);
                                            setvisiblepart6(true);
                                            countincrement(6)
                                        }}>Save & Next</button>
                                    </div>
                                    <div className='formbox'
                                        style={{ display: visiblepart6 ? 'block' : 'none' }}>

                                      
                                    </div>
                                    <div className='part5'
                                        style={{ display: visiblepart6 ? 'block' : 'none' }}
                                    >

                                        {residential !== 'plot' && (
                                            <>

                                                <div className='partition5'>
                                                    <div>
                                                        <label className='formtext'>Floor Plan:</label>
                                                        <input
                                                            className='fieldvalue4'
                                                            type="file"
                                                            name="floorplan"
                                                            id="floorplan"
                                                            onChange={handleFloorplanChange}
                                                            multiple
                                                            accept=".jpg,.png,.pdf"
                                                        />
                                                        <label htmlFor="floorplan" className='file_upload'>
                                                            Choose Floor Plan
                                                        </label>
                                                    </div>
                                                    <div>
                                                        {floorplan.length > 0 && (
                                                            <ul id='floorplanbox2'>
                                                                {floorplan.map((fileName, index) => (

                                                                    <span id='floorplanname2'><li key={index}>{fileName}   <MdDelete id='deleteicon2' onClick={() => removeFloorplan(fileName)} />  </li></span>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>

                                                </div>
                                                <div className='partition5'>
                                                    <div>
                                                        <label className='formtext'>Attachment: </label>
                                                        <input
                                                            className='fieldvalue4'
                                                            type="file"
                                                            name="photos"
                                                            id="photos"
                                                            onChange={handlePhotosChange}
                                                            multiple
                                                            accept=".jpg,.png"
                                                        />
                                                        <label htmlFor="photos" className='file_upload'>
                                                            Choose Attachment
                                                        </label>
                                                    </div>
                                                    <div>
                                                        {photos.length > 0 && (
                                                            <ul id='photosbox2'>
                                                                {photos.map((fileName, index) => (
                                                                    <span id='filebox2'><li key={index} id='photoName'>
                                                                        {fileName}
                                                                        <MdDelete id='deleteicon2' onClick={() => removePhoto(fileName)} />
                                                                    </li>
                                                                    </span>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {residential === 'plot' && (
                                            <>
                                                <div className='partition5'>
                                                    <div>
                                                        <label className='formtext'>Attachment: </label>
                                                        <input
                                                            className='fieldvalue4'
                                                            type="file"
                                                            name="photos"
                                                            id="photos"
                                                            onChange={handlePhotosChange}
                                                            multiple
                                                            accept=".jpg,.png"
                                                        />
                                                        <label htmlFor="photos" className='file_upload'>
                                                            Choose Attachment
                                                        </label>
                                                    </div>
                                                    <div>
                                                        {photos.length > 0 && (
                                                            <ul id='photosbox2'>
                                                                {photos.map((fileName, index) => (
                                                                    <span id='filebox2'><li key={index} id='photoName'>
                                                                        {fileName}
                                                                        <MdDelete id='deleteicon2' onClick={() => removePhoto(fileName)} />
                                                                    </li>
                                                                    </span>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                    <div className='partition3'
                                        style={{ display: visiblepart6 ? 'flex' : 'none' }}>
                                        <button className='save' onClick={() => {
                                            setvisiblepart5(true);
                                            setvisiblepart6(false);
                                            countdecrement(5);
                                        }}>back</button>
                                        <button id='last' className='save' onClick={() => {
                                         countincrement(6);
                                        }}
                                            disabled
                                        >Save & next</button>
                                    </div>
                                    <div id='submit'>
                                        <button type='submit'
                                            style={{ display: visiblepart6 ? 'block' : 'none' }}
                                            className='btn2 btnx' onClick={handleSubmit}>submit</button>
                                    </div>

                                </>
                            )
                        }
                        {
                            purpose === 'rent' && category === 'residential' && (
                                <>
                                    <div className='innerbuttonbox' style={{
                                        marginRight: '14vw',
                                    }}>

                                        <button className={`propertybtn  ${activeButton3 === 'apartment' ? 'activeb3' : ''}`}
                                            onClick={() => {
                                                setresidential('apartment');
                                                handleButtonClick3('apartment');
                                                setformdata(initialdata);
                                            }}>Apartment</button>
                                        <button className={`propertybtn   ${activeButton3 === 'house/villa' ? 'activeb3' : ''}`}
                                            onClick={() => {
                                                setresidential('house/villa');
                                                handleButtonClick3('house/villa');
                                                setformdata(initialdata);
                                            }}>House/villa</button>
                                        <button className={`propertybtn   ${activeButton3 === 'builderfloor' ? 'activeb3' : ''}`}
                                            onClick={() => {
                                                setresidential('builderfloor');
                                                handleButtonClick3('builderfloor');
                                                setformdata(initialdata);
                                            }}>Builderfloor</button>
                                        <button className={`propertybtn   ${activeButton3 === 'farmhouse' ? 'activeb3' : ''}`}
                                            onClick={() => {
                                                setresidential('farmhouse');
                                                handleButtonClick3('farmhouse');
                                                setformdata(initialdata);
                                            }}>Farmhouse</button>
                                    </div>
                                    <div className='formbox'
                                        style={{ display: visiblepart1 ? 'block' : 'none' }}>

                                        
                                    </div>
                                    <div className='part1' style={{ display: visiblepart1 ? 'block' : 'none' }}>
                                        <div className='partition'>
                                            <label className='formtext'>Country:</label>
                                            <select
                                                className='formfield'
                                                name='country'
                                                onChange={handleChange}
                                                value={formdata.country}
                                                required

                                            >
                                                <option value='india'>India</option>
                                                <option value='uae'>UAE
                                                </option>
                                                <option value='qatar'>QATAR</option>
                                            </select>
                                            <label className='formtext'>City:</label>
                                            <select
                                                className='formfield'
                                                name='city'
                                                onChange={handleChange}
                                                value={formdata.city}
                                                required

                                            >
                                                {formdata.country === 'india' && (
                                                    <>
                                                        <option value='noida'>Noida</option>
                                                        <option value='gurgaon'>Gurgaon
                                                        </option>
                                                        <option value='greaternoida'>Greater Noida</option>
                                                        <option value='ghaziabad'>Ghaziabad</option>
                                                        <option value='delhi'>Delhi</option>
                                                        <option value='faridabad'>Faridabad</option>
                                                    </>
                                                )}
                                                {formdata.country === 'uae' && (
                                                    <>
                                                        <option value='dubai'>Dubai</option>
                                                    </>
                                                )}
                                                {formdata.country === 'qatar' && (
                                                    <>
                                                        <option value='doha'>Doha</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                        <div className='partition'>
                                            <label className='formtext'>locality:</label>
                                            <input type='text' className='formfield-b' placeholder='Enter locality' name='locality' onChange={handleChange} value={formdata.locality}></input>
                                            <label className='formtext'>Pincode:</label>
                                            <input type='text' className='formfield-b' placeholder='Enter Pincode' name='pincode' onChange={handleChange} value={formdata.pincode}></input>
                                        </div>
                                        <div className='partition'>
                                            <label className='formtext'>Property Name:</label>
                                            <input className='formfield-a' placeholder='Enter Property Name' type='text' name='property_name' onChange={handleChange} value={formdata.property_name} required>
                                            </input>
                                        </div>
                                        <div className='partition'>
                                            <label className='formtext'>Property Address:</label>
                                            <input className='formfield-a' type='text' placeholder='Enter Property address' name='address' onChange={handleChange} value={formdata.address} required>
                                            </input>
                                        </div>


                                    </div>
                                    <div className='partition3'
                                        style={{ display: visiblepart1 ? 'flex' : 'none' }}>
                                        <button className='save' id='first' disabled onClick={() => {

                                        }}>back</button>
                                        <button className='save' onClick={() => {
                                            setvisiblepart2(true);
                                            setvisiblepart1(false);
                                            countincrement(2)
                                        }}

                                        >Save & next</button>
                                    </div>
                                    {/* overview section */}
                                    <div className='formbox'
                                        style={{ display: visiblepart2 ? 'block' : 'none' }}>

                                       
                                    </div>
                                    <div className='part2' style={{ display: visiblepart2 ? 'block' : 'none' }}>
                                        <div className='partition'>
                                            <label className='formtext' >RERA ID:</label>
                                            <input type='text' className='formfield-a' placeholder=' example UPRERAPRJ72xx' name='rera_id' onChange={handleChange} value={formdata.rera_id}></input>
                                        </div>
                                        {residential !== 'plot' && (
                                            <>
                                                <div className='partition'>
                                                    <div>
                                                        <label className='formtext'>Configuration:</label>
                                                        <select
                                                            className='formfield-b'
                                                            name='configuration'
                                                            onChange={handleChange}
                                                            value={formdata.configuration}
                                                            required

                                                        >
                                                            <option value='1BHK'>1BHK</option>
                                                            <option value='1.5BHK'>1.5BHK</option>
                                                            <option value='2BHK'>2BHK</option>
                                                            <option value='2.5BHK'>2.5BHK</option>
                                                            <option value='3BHK'>3BHK</option>
                                                            <option value='4BHK'>4BHK</option>
                                                            <option value='5BHK'>5BHK</option>
                                                            <option value='6BHK'>6BHK</option>
                                                            <option value='6+ BHK'>6+ BHK</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className='formtext'> Bathroom:</label>
                                                        <select
                                                            className='formfield-b'
                                                            name='bathroom'
                                                            onChange={handleChange}
                                                            value={formdata.bathroom}
                                                            required
                                                        >
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                            <option value='5'>5</option>
                                                            <option value='5+'>5+</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className='formtext'> Balcony:</label>
                                                        <select
                                                            className='formfield-b'
                                                            name='balcony'
                                                            onChange={handleChange}
                                                            value={formdata.balcony}
                                                            required
                                                        >
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                            <option value='5'>5</option>
                                                            <option value='5+'>5+</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className='partition'>
                                                    <label className='formtext'>Area Detail(in sq.ft) : </label>
                                                    <br></br>
                                                    <input type='number' className='formfield formfield-d' name='area_detail' onChange={handleChange} value={formdata.area_detail} required>
                                                    </input>
                                                    <select
                                                        className='formfield formfield-d'
                                                        name='area_type'
                                                        onChange={handleChange}
                                                        value={formdata.area_type}
                                                        required
                                                    >
                                                        <option value='Super Built-up Area'>Super Built Up Area</option>
                                                        <option value='Built-up area'>Built-up Area</option>
                                                        <option value='Carpet Area'>Carpet Area</option>
                                                    </select>
                                                </div>
                                                <div className='partition'>
                                                    <div>
                                                        <label className='formtext'>Property Facing:</label>
                                                        <select
                                                            name='property_facing'
                                                            className='formfield-a'
                                                            onChange={handleChange}
                                                            value={formdata.property_facing}
                                                            required
                                                        >
                                                            <option value='North'>North</option>
                                                            <option value='South'>South</option>
                                                            <option value='East'>East</option>
                                                            <option value='West'>West</option>
                                                            <option value='North-East'>North-East</option>
                                                            <option value='North-West'>North-West</option>
                                                            <option value='South-East'>South-East</option>
                                                            <option value='South-West'>South-West</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className='formtext'>Furnish Type:</label>
                                                        <select
                                                            className='formfield-a'
                                                            name='furnish_type'
                                                            onChange={handleChange}
                                                            value={formdata.furnish_type}
                                                            required
                                                        >
                                                            <option value='Fully furnished'>Fully furnished</option>
                                                            <option value='Semi furnished'>Semi furnished</option>
                                                            <option value='Un furnished'>Un furnished</option>
                                                        </select>
                                                    </div>

                                                </div>


                                                <div className='partition'>
                                                    <div>
                                                        <label className='formtext'>Floor no:</label>
                                                        <input className='formfield-b' type='number' name='floor_no' onChange={handleChange} value={formdata.floor_no}></input>
                                                    </div>
                                                    <div>
                                                        <label className='formtext'>Total Floor:</label>
                                                        <input type='number' className='formfield-b' name='total_floor' onChange={handleChange} value={formdata.total_floor}></input>
                                                    </div>
                                                </div>
                                                <div className='partition'>
                                                    <label className='formtext'>Maintenance charge per month:</label>
                                                    <input type='number' className='formfield-a' placeholder='e.g 1500' name='maintenance_charge' onChange={handleChange} value={formdata.maintenance_charge}></input>

                                                </div>
                                            </>)}
                                        <div className='partition'>
                                            <label className='formtext'> Montly Rent:</label>
                                            <input type='number' placeholder='e.g 15000' className='formfield' name='price' onChange={handleChange} value={formdata.price} required></input>
                                            <select
                                                className='formfield'
                                                name='pricerange'
                                                onChange={handleChange}
                                                value={formdata.pricerange}
                                                required
                                            >
                                                <option value='Thousand'>Lakhs</option>
                                                <option value='Lakh'>Lakhs</option>
                                                <option value='Crore'>Crore</option>
                                                <option value='million'>Million</option>
                                                <option value='billion'>Billion</option>
                                            </select>
                                            <select
                                                className='formfield'
                                                name='money_type'
                                                onChange={handleChange}
                                                value={formdata.money_type}
                                                required
                                            >
                                                <option value='Rupees' >IND-Rupees</option>
                                                <option value='AED'>Dubai - AED</option>
                                                <option value='Riyal'>Qatar-Riyal</option>
                                            </select>
                                        </div>


                                        <div className='partition'>
                                            <label className='formtext'>Security amount:</label>
                                            <input type='number' className='formfield-a' name='securitydeposit' onChange={handleChange} value={formdata.securitydeposit}></input>
                                        </div>

                                    </div>

                                    <div className='partition3'
                                        style={{ display: visiblepart2 ? 'flex' : 'none' }}>
                                        <button className='save' onClick={() => {
                                            setvisiblepart1(true);
                                            setvisiblepart2(false);
                                            countdecrement(1)
                                        }}>back</button>
                                        <button className='save' onClick={() => {
                                            setvisiblepart2(false);
                                            setvisiblepart3(true);
                                            countincrement(3)
                                        }}>Save & Next</button>
                                    </div>
                                    <div className='formbox'
                                        style={{ display: visiblepart3 ? 'block' : 'none' }}>

                                       
                                    </div>
                                    <div className='part3'
                                        style={{ display: visiblepart3 ? 'block' : 'none' }}>
                                        {residential !== 'plot' && (<>
                                            <div className='checkbox-true'>
                                                {[
                                                    { name: 'Air Conditioner', icon: <TbAirConditioning /> },
                                                    { name: 'Cable Tv', icon: <FaSatelliteDish /> },
                                                    { name: 'Wifi', icon: <FaWifi /> },
                                                    { name: 'Dishwasher', icon: <LuUtensilsCrossed /> },
                                                    { name: 'Heating', icon: <PiThermometerHotBold /> },
                                                    { name: 'Lift', icon: <GrElevator /> },
                                                    { name: 'Intercomm Facility', icon: <LiaIntercom /> },
                                                    { name: 'Microwave', icon: <MdMicrowave /> },
                                                    { name: 'Park', icon: <PiPark /> },
                                                    { name: 'Parking', icon: <LuParkingCircle /> },
                                                    { name: 'Guest Parking', icon: <RiParkingBoxLine /> },
                                                    { name: 'Security', icon: <MdSecurity /> },
                                                    { name: 'Play Area', icon: <GiKidSlide /> },
                                                    { name: 'CCTV', icon: <BiCctv /> },
                                                    { name: 'Power Backup', icon: <ImPower /> },
                                                    { name: 'Gas Pipeline', icon: <GiGasStove /> },
                                                    { name: 'Gym', icon: <GiWeightLiftingUp /> },
                                                    { name: 'Swimming Pool', icon: <FaPersonSwimming /> },
                                                    { name: 'Multipurpose Court', icon: <PiCourtBasketball /> },
                                                    { name: 'Multipurpose Hall', icon: <TbBuildingBank /> },
                                                    { name: 'Chimney', icon: <GiChimney /> },
                                                    { name: 'Modular Kitchen', icon: <FaKitchenSet /> },
                                                    { name: 'Refrigerator', icon: <TbFridge /> },
                                                    { name: 'Rear Lawn', icon: <GiGrassMushroom /> },
                                                    { name: 'Front Lawn', icon: <GiGrass /> },
                                                    { name: 'EV Charge', icon: <FaChargingStation /> },
                                                    { name: 'Club House', icon: <PiWarehouseLight /> }
                                                ].map((amenity, index) => (
                                                    <div>
                                                        <label key={index} className='custom'>
                                                            <input
                                                                type="checkbox"
                                                                name="amenities"
                                                                value={amenity.name}
                                                                onChange={handleChange}
                                                            />
                                                            <p className='fieldname2'>
                                                                {amenity.icon && <span className='icon'><div className='facility_icon'>
                                                                    {amenity.icon}
                                                                </div></span>} {amenity.name}
                                                            </p>
                                                            <span className='checkmk'></span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>

                                        </>)}




                                    </div>
                                    <div className='partition3'
                                        style={{ display: visiblepart3 ? 'flex' : 'none' }}>
                                        <div>
                                            <button className='save' onClick={() => {
                                                setvisiblepart2(true);
                                                setvisiblepart3(false);
                                                countdecrement(2)
                                            }}>back</button>
                                        </div>
                                        <div>
                                            <button className='save' onClick={() => {
                                                setvisiblepart3(false);
                                                setvisiblepart4(true);
                                                countincrement(4)
                                            }}>Save & Next</button>
                                        </div>
                                    </div>
                                    <div className='formbox'
                                        style={{ display: visiblepart4 ? 'block' : 'none' }}>

                                       
                                    </div>
                                    <div className='part4'
                                        style={{ display: visiblepart4 ? 'block' : 'none' }}
                                    >

                                        <div className='partition2'>
                                            <div>
                                                <label className='formtext'>Metro</label><input className='formfield' type='number' name='metro' value={formdata.metro} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>
                                                <label className='formtext'>Bus</label><input className='formfield' type='number' name='bus' value={formdata.bus} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>

                                                <label className='formtext'>School</label><input className='formfield' type='number' name='school' value={formdata.school} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>
                                                <label className='formtext'>Hospital</label><input className='formfield' type='number' name='hospital' value={formdata.hospital} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>
                                                <label className='formtext'>Mall</label><input className='formfield' type='number' name='mall' value={formdata.mall} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>

                                                <label className='formtext'>Resturant: </label><input className='formfield' type='number' name='resturant' value={formdata.resturant} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                            <div>
                                                <label className='formtext'>Cinema: </label><input className='formfield' type='number' name='cinema' value={formdata.cinema} onChange={handleChange} placeholder='in Km'></input>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='partition3'
                                        style={{ display: visiblepart4 ? 'flex' : 'none' }}>
                                        <button className='save' onClick={() => {
                                            setvisiblepart3(true);
                                            setvisiblepart4(false);
                                            countdecrement(3)
                                        }}>back</button>
                                        <button className='save' onClick={() => {
                                            setvisiblepart4(false);
                                            setvisiblepart5(true);
                                            countincrement(4)
                                        }}>Save & Next</button>
                                    </div>

                                    <div className='formbox'
                                        style={{ display: visiblepart5 ? 'block' : 'none' }}>

                                       
                                    </div>
                                    <div className='part5'
                                        style={{ display: visiblepart5 ? 'block' : 'none' }}
                                    >
                                        <button className='save description' onClick={generateDescription}>
                                            {loading ? "Generating..." : "Generate AI Description"}
                                        </button>
                                        <div className='partitionx'>
                                            {/* Textarea to show the generated description */}
                                            <div>
                                                <label className='formtext'>Description</label>
                                            </div>
                                            <div>
                                                <textarea
                                                    className='formfield-c'
                                                    name="description"
                                                    placeholder='Tell Something About Your Property'
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)} // Use setDescription directly here
                                                    rows={7}
                                                    cols={70}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='partition3'
                                        style={{ display: visiblepart5 ? 'flex' : 'none' }}>
                                        <button className='save' onClick={() => {
                                            setvisiblepart4(true);
                                            setvisiblepart5(false);
                                            countdecrement(4)
                                        }}>back</button>
                                        <button className='save' onClick={() => {
                                            setvisiblepart5(false);
                                            setvisiblepart6(true);
                                            countincrement(6)
                                        }}>Save & Next</button>
                                    </div>
                                    <div className='formbox'
                                        style={{ display: visiblepart6 ? 'block' : 'none' }}>

                                      
                                    </div>
                                    <div className='part5'
                                        style={{ display: visiblepart6 ? 'block' : 'none' }}
                                    >

                                        {residential !== 'plot' && (
                                            <>
                                                <div className='partition5'>
                                                    <div>
                                                        <label className='formtext'>Floor Plan:</label>
                                                        <input
                                                            className='fieldvalue4'
                                                            type="file"
                                                            name="floorplan"
                                                            id="floorplan"
                                                            onChange={handleFloorplanChange}
                                                            multiple
                                                            accept=".jpg,.png,.pdf"
                                                        />
                                                        <label htmlFor="floorplan" className='file_upload'>
                                                            Choose Floor Plan
                                                        </label>
                                                    </div>
                                                    <div>
                                                        {floorplan.length > 0 && (
                                                            <ul id='floorplanbox2'>
                                                                {floorplan.map((fileName, index) => (

                                                                    <span id='floorplanname2'><li key={index}>{fileName}   <MdDelete id='deleteicon2' onClick={() => removeFloorplan(fileName)} />  </li></span>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>

                                                </div>
                                                <div className='partition5'>
                                                    <div>
                                                        <label className='formtext'>Attachment: </label>
                                                        <input
                                                            className='fieldvalue4'
                                                            type="file"
                                                            name="photos"
                                                            id="photos"
                                                            onChange={handlePhotosChange}
                                                            multiple
                                                            accept=".jpg,.png"
                                                        />
                                                        <label htmlFor="photos" className='file_upload'>
                                                            Choose Attachment
                                                        </label>
                                                    </div>
                                                    <div>
                                                        {photos.length > 0 && (
                                                            <ul id='photosbox2'>
                                                                {photos.map((fileName, index) => (
                                                                    <span id='filebox2'><li key={index} id='photoName'>
                                                                        {fileName}
                                                                        <MdDelete id='deleteicon2' onClick={() => removePhoto(fileName)} />
                                                                    </li>
                                                                    </span>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className='partition3'
                                        style={{ display: visiblepart6 ? 'flex' : 'none' }}>
                                        <button className='save' onClick={() => {
                                            setvisiblepart5(true);
                                            setvisiblepart6(false);
                                            countdecrement(5)
                                        }}>back</button>
                                        <button id='last' className='save' onClick={() => {
                                        }}
                                            disabled
                                        >Save & next</button>
                                    </div>
                                    <div id='submit'>
                                        <button type='submit'
                                            style={{ display: visiblepart6 ? 'block' : 'none' }}
                                            className='btn2 btnx' onClick={handleSubmit}>submit</button>
                                    </div>
                                </>
                            )
                        }
                        {purpose === 'sale' && category === 'commercial' && (
                            <>
                                <div className='innerbuttonbox'>

                                    <button className={`propertybtn  ${activeButton3 === 'officespace' ? 'activeb3' : ''}`}
                                        onClick={() => {
                                            setcommercial('officespace');
                                            handleButtonClick3('officespace');
                                            setformdata(initialdata);
                                        }}>OfficeSpace</button>
                                    <button className={`propertybtn   ${activeButton3 === 'shop' ? 'activeb3' : ''}`}
                                        onClick={() => {
                                            setcommercial('shop');
                                            handleButtonClick3('shop');
                                            setformdata(initialdata);
                                        }}>Shop</button>
                                    <button className={`propertybtn   ${activeButton3 === 'land' ? 'activeb3' : ''}`}
                                        onClick={() => {
                                            setcommercial('land');
                                            handleButtonClick3('land');
                                            setformdata(initialdata);
                                        }}>Land</button>
                                    <button className={`propertybtn   ${activeButton3 === 'coworkingspace' ? 'activeb3' : ''}`}
                                        onClick={() => {
                                            setcommercial('coworkingspace');
                                            handleButtonClick3('coworkingspace');
                                            setformdata(initialdata);
                                        }}>Coworking Space</button>
                                    <button className={`propertybtn   ${activeButton3 === 'showroom' ? 'activeb3' : ''}`}
                                        onClick={() => {
                                            setcommercial('showroom');
                                            handleButtonClick3('showroom');
                                            setformdata(initialdata);
                                        }}>Coworking Space</button>
                                </div>
                                <div className='formbox'
                                    style={{ display: visiblepart1 ? 'block' : 'none' }}>

                                  
                                </div>
                                <div className='part1' style={{ display: visiblepart1 ? 'block' : 'none' }}>
                                    <div className='partition'>
                                        <label className='formtext'>Country:</label>
                                        <select
                                            className='formfield'
                                            name='country'
                                            onChange={handleChange}
                                            value={formdata.country}
                                            required

                                        >
                                            <option value='india'>India</option>
                                            <option value='uae'>UAE
                                            </option>
                                            <option value='qatar'>QATAR</option>
                                        </select>
                                        <label className='formtext'>City:</label>
                                        <select
                                            className='formfield'
                                            name='city'
                                            onChange={handleChange}
                                            value={formdata.city}
                                            required

                                        >
                                            {formdata.country === 'india' && (
                                                <>
                                                    <option value='noida'>Noida</option>
                                                    <option value='gurgaon'>Gurgaon
                                                    </option>
                                                    <option value='greaternoida'>Greater Noida</option>
                                                    <option value='ghaziabad'>Ghaziabad</option>
                                                    <option value='delhi'>Delhi</option>
                                                    <option value='faridabad'>Faridabad</option>
                                                </>
                                            )}
                                            {formdata.country === 'uae' && (
                                                <>
                                                    <option value='dubai'>Dubai</option>
                                                </>
                                            )}
                                            {formdata.country === 'qatar' && (
                                                <>
                                                    <option value='doha'>Doha</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                    <div className='partition'>
                                        <label className='formtext'>locality:</label>
                                        <input type='text' className='formfield-b' placeholder='Enter locality' name='locality' onChange={handleChange} value={formdata.locality}></input>
                                        <label className='formtext'>Pincode:</label>
                                        <input type='text' className='formfield-b' placeholder='Enter Pincode' name='pincode' onChange={handleChange} value={formdata.pincode}></input>
                                    </div>
                                    <div className='partition'>
                                        <label className='formtext'>Property Name:</label>
                                        <input className='formfield-a' placeholder='Enter Property Name' type='text' name='property_name' onChange={handleChange} value={formdata.property_name} required>
                                        </input>
                                    </div>
                                    <div className='partition'>
                                        <label className='formtext'>Property Address:</label>
                                        <input className='formfield-a' type='text' placeholder='Enter Property address' name='address' onChange={handleChange} value={formdata.address} required>
                                        </input>
                                    </div>


                                </div>
                                <div className='partition3'
                                    style={{ display: visiblepart1 ? 'flex' : 'none' }}>
                                    <button className='save' id='first' disabled onClick={() => {

                                    }}>back</button>
                                    <button className='save' onClick={() => {
                                        setvisiblepart2(true);
                                        setvisiblepart1(false);
                                        countincrement(2);
                                    }}

                                    >Save & next</button>
                                </div>
                                {/* overview section */}
                                <div className='formbox'
                                    style={{ display: visiblepart2 ? 'block' : 'none' }}>

                                    
                                </div>
                                <div className='part2' style={{ display: visiblepart2 ? 'block' : 'none' }}>
                                    <div className='partition'>
                                        <label className='formtext' >RERA ID:</label>
                                        <input type='text' className='formfield-a' placeholder=' example UPRERAPRJ72xx' name='rera_id' onChange={handleChange} value={formdata.rera_id}></input>
                                    </div>
                                    {commercial !== 'land' && (
                                        <>

                                            <div className='partition'>
                                                <label className='formtext'>Area Detail(in sq.ft) : </label>
                                                <br></br>
                                                <input type='number' placeholder='e.g 1030' className='formfield formfield-d' name='area_detail' onChange={handleChange} value={formdata.area_detail} required>
                                                </input>
                                                <select
                                                    className='formfield formfield-d'
                                                    name='area_type'
                                                    onChange={handleChange}
                                                    value={formdata.area_type}
                                                    required
                                                >
                                                    <option value='Super Built-up Area'>Super Built Up Area</option>
                                                    <option value='Built-up area'>Built-up Area</option>
                                                    <option value='Carpet Area'>Carpet Area</option>
                                                </select>
                                            </div>
                                            <div className='partition'>
                                                <div>
                                                    <label className='formtext'>Property Facing:</label>
                                                    <select
                                                        name='property_facing'
                                                        className='formfield-a'
                                                        onChange={handleChange}
                                                        value={formdata.property_facing}
                                                        required
                                                    >
                                                        <option value='North'>North</option>
                                                        <option value='South'>South</option>
                                                        <option value='East'>East</option>
                                                        <option value='West'>West</option>
                                                        <option value='North-East'>North-East</option>
                                                        <option value='North-West'>North-West</option>
                                                        <option value='South-East'>South-East</option>
                                                        <option value='South-West'>South-West</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className='formtext'>Furnish Type:</label>
                                                    <select
                                                        className='formfield-a'
                                                        name='furnish_type'
                                                        onChange={handleChange}
                                                        value={formdata.furnish_type}
                                                        required
                                                    >
                                                        <option value='Fully furnished'>Fully furnished</option>
                                                        <option value='Semi furnished'>Semi furnished</option>
                                                        <option value='Un furnished'>Un furnished</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div className='partition'>

                                                <div>
                                                    <label className='formtext'>Construction Status</label>
                                                    <select
                                                        name='construction_status'
                                                        className='formfield-a'
                                                        value={formdata.construction_status}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value='Ready to Move'>Ready to Move</option>
                                                        <option value='Under-Construction'>Under Construction</option>
                                                        <option value='NewLaunch'>New Launch</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className='formtext'> possesion date</label>
                                                    <input className='formfield-a' type='date' name='property_date' value={formdata.property_date} onChange={handleChange}></input>
                                                </div>

                                            </div>

                                            <div className='partition'>
                                                <div>
                                                    <label className='formtext'>Floor no:</label>
                                                    <input className='formfield-b' type='number' name='floor_no' onChange={handleChange} value={formdata.floor_no}></input>
                                                </div>
                                                <div>
                                                    <label className='formtext'>Total Floor:</label>
                                                    <input type='number' className='formfield-b' name='total_floor' onChange={handleChange} value={formdata.total_floor}></input>
                                                </div>
                                            </div>
                                            <div className='partition'>
                                                <label className='formtext'>Maintenance charge per month:</label>
                                                <input type='number' className='formfield-a' placeholder='e.g 1500' name='maintenance_charge' onChange={handleChange} value={formdata.maintenance_charge}></input>

                                            </div>
                                        </>)}
                                    {(commercial === 'land' || commercial === 'shop') && (
                                        <>

                                            <div className='partition'>
                                                <label className='formtext'>Land Dimesion:</label>
                                                <br></br>
                                                <input type='number' className='formfield' name='length in ft.' value={formdata.length} onChange={handleChange} placeholder='Length' required>
                                                </input>
                                                X

                                                <input type='number' className='formfield' name='width in ft.' value={formdata.width} onChange={handleChange} placeholder='width' required>

                                                </input>

                                            </div>
                                        </>
                                    )}
                                    {commercial === 'land' && (
                                        <>
                                            <div className='partition'>
                                                <label className='formtext'>Area Detail(in sq.ft) : </label>
                                                <br></br>
                                                <input type='number' placeholder='e.g 1030' className='formfield formfield-d' name='area_detail' onChange={handleChange} value={formdata.area_detail} required>
                                                </input>
                                                <select
                                                    className='formfield formfield-d'
                                                    name='area_type'
                                                    onChange={handleChange}
                                                    value={formdata.area_type}
                                                    required
                                                >
                                                    <option value='Super Built-up Area'>Super Built Up Area</option>
                                                    <option value='Built-up area'>Built-up Area</option>
                                                    <option value='Carpet Area'>Carpet Area</option>
                                                </select>
                                            </div>
                                            <div className='partition'>
                                                <label className='formtext'> Boundary Wall</label>
                                                <label className='radio-container'>
                                                    <span className='radio-label'>Yes</span>
                                                    <input

                                                        type="radio"
                                                        name="boundary_wall"
                                                        value='yes'

                                                        onChange={handleChange}
                                                    />
                                                    <span className='radio-checkmark'></span>
                                                </label>
                                                <label className='radio-container'>
                                                    <span className='radio-label'>No</span>
                                                    <input

                                                        type="radio"
                                                        name="boundary_wall"
                                                        value='no'

                                                        onChange={handleChange}
                                                    />
                                                    <span className='radio-checkmark'></span>
                                                </label>
                                                <br></br>
                                                <div className='partition'>
                                                    <div>
                                                        <label className='formtext'>       No of open side</label>
                                                        <select
                                                            name='no_of_open_side'
                                                            className='formfield'
                                                            value={formdata.no_of_open_side}
                                                            onChange={handleChange}
                                                        >
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                        </select>
                                                        <label className='formtext'>Floor Allowed</label>
                                                    </div>
                                                    <div>
                                                        <select
                                                            className='formfield'
                                                            name='floor_allowed'
                                                            onChange={handleChange}
                                                            value={formdata.floor_allowed}
                                                        >
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                            <option value='5'>5</option>
                                                            <option value='6'>6</option>
                                                            <option value='7'>7</option>
                                                            <option value='7+'>7+</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {commercial !== 'land' && (
                                        <>
                                            <div className='partition'>

                                                <label className='formtext'>Currently leased Out: </label>
                                                <label className='radio-container'>
                                                    <span className='radio-label'>Yes</span>
                                                    <input
                                                        className='fieldvalue'
                                                        type="radio"
                                                        name="leased"
                                                        value='yes'
                                                        checked={leased === "yes"}
                                                        onChange={leasedchange1}
                                                    />
                                                    <span className='radio-checkmark'></span>
                                                </label>
                                                <label className='radio-container'>
                                                    <span className='radio-label'>No</span>
                                                    <input
                                                        className='fieldvalue'
                                                        type="radio"
                                                        name="leased"
                                                        value='no'
                                                        checked={leased === "no"}
                                                        onChange={leasedchange1}
                                                    />
                                                    <span className='radio-checkmark'></span>
                                                </label>

                                                {
                                                    leased === 'yes' && (
                                                        <>
                                                            <br></br>
                                                            <div className='partition'>
                                                                <div>
                                                                    <label className='formtext'>Montly Rent Price :</label>
                                                                    <input className='formfield' type='number' name='montly_rent' value={formdata.montly_rent} onChange={handleChange} ></input>
                                                                </div>
                                                                <div>
                                                                    <label className='formtext'>Remaining Days:</label>
                                                                    <input className='formfield' type='number' name='remaining_time' value={formdata.remaining_time} onChange={handleChange} placeholder='In days'></input>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </>
                                    )}

                                    <div className='partition'>
                                        <label className='formtext'>Price:</label>
                                        <input type='number' placeholder='e.g 2.10' className='formfield' name='price' onChange={handleChange} value={formdata.price} required></input>
                                        <select
                                            className='formfield'
                                            name='pricerange'
                                            onChange={handleChange}
                                            value={formdata.pricerange}
                                            required
                                        >

                                            <option value='Lakh'>Lakhs</option>
                                            <option value='Crore'>Crore</option>
                                            <option value='million'>Million</option>
                                            <option value='billion'>Billion</option>
                                        </select>
                                        <select
                                            className='formfield'
                                            name='money_type'
                                            onChange={handleChange}
                                            value={formdata.money_type}
                                            required
                                        >
                                            <option value='Rupees' >IND-Rupees</option>
                                            <option value='AED'>Dubai - AED</option>
                                            <option value='Riyal'>Qatar-Riyal</option>
                                        </select>
                                    </div>

                                    <div className='partition'>
                                        <label className='formtext'>Token amount:</label>
                                        <input type='number' placeholder='eg.50000' className='formfield-a' name='token_amount' onChange={handleChange} value={formdata.token_amount}></input>
                                    </div>


                                </div>

                                <div className='partition3'
                                    style={{ display: visiblepart2 ? 'flex' : 'none' }}>
                                    <button className='save' onClick={() => {
                                        setvisiblepart1(true);
                                        setvisiblepart2(false);
                                        countdecrement(1)
                                    }}>back</button>
                                    <button className='save' onClick={() => {
                                        setvisiblepart2(false);
                                        setvisiblepart3(true);
                                        countincrement(3)
                                    }}>Save & Next</button>
                                </div>
                                <div className='formbox'
                                    style={{ display: visiblepart3 ? 'block' : 'none' }}>

                                    
                                </div>
                                <div className='part3'
                                    style={{ display: visiblepart3 ? 'block' : 'none' }}>
                                    {commercial !== 'land' && (<>
                                        <div className='checkbox-true'>
                                            {[
                                                { name: 'Air Conditioner', icon: <TbAirConditioning /> },
                                                { name: 'Cable Tv', icon: <FaSatelliteDish /> },
                                                { name: 'Wifi', icon: <FaWifi /> },
                                                { name: 'Dishwasher', icon: <LuUtensilsCrossed /> },
                                                { name: 'Heating', icon: <PiThermometerHotBold /> },
                                                { name: 'Lift', icon: <GrElevator /> },
                                                { name: 'Intercomm Facility', icon: <LiaIntercom /> },
                                                { name: 'Microwave', icon: <MdMicrowave /> },
                                                { name: 'Park', icon: <PiPark /> },
                                                { name: 'Parking', icon: <LuParkingCircle /> },
                                                { name: 'Guest Parking', icon: <RiParkingBoxLine /> },
                                                { name: 'Security', icon: <MdSecurity /> },
                                                { name: 'Play Area', icon: <GiKidSlide /> },
                                                { name: 'CCTV', icon: <BiCctv /> },
                                                { name: 'Power Backup', icon: <ImPower /> },
                                                { name: 'Gas Pipeline', icon: <GiGasStove /> },
                                                { name: 'Gym', icon: <GiWeightLiftingUp /> },
                                                { name: 'Swimming Pool', icon: <FaPersonSwimming /> },
                                                { name: 'Multipurpose Court', icon: <PiCourtBasketball /> },
                                                { name: 'Multipurpose Hall', icon: <TbBuildingBank /> },
                                                { name: 'Chimney', icon: <GiChimney /> },
                                                { name: 'Modular Kitchen', icon: <FaKitchenSet /> },
                                                { name: 'Refrigerator', icon: <TbFridge /> },
                                                { name: 'Rear Lawn', icon: <GiGrassMushroom /> },
                                                { name: 'Front Lawn', icon: <GiGrass /> },
                                                { name: 'EV Charge', icon: <FaChargingStation /> },
                                                { name: 'Club House', icon: <PiWarehouseLight /> }
                                            ].map((amenity, index) => (
                                                <div>
                                                    <label key={index} className='custom'>
                                                        <input
                                                            type="checkbox"
                                                            name="amenities"
                                                            value={amenity.name}
                                                            onChange={handleChange}
                                                        />
                                                        <p className='fieldname2'>
                                                            {amenity.icon && <span className='icon'>
                                                                <div className='facility_icon'>
                                                                    {amenity.icon}
                                                                </div>
                                                            </span>} {amenity.name}
                                                        </p>
                                                        <span className='checkmk'></span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                    </>)}
                                    <div>
                                        {
                                            commercial === 'land' && (
                                                <>
                                                    <div className='checkbox-true'>
                                                        {[
                                                            { name: 'Park', icon: <PiPark /> },
                                                            { name: 'Parking', icon: <LuParkingCircle /> },
                                                            { name: 'Security', icon: <MdSecurity /> },
                                                            { name: 'Play Area', icon: <GiKidSlide /> },
                                                            { name: 'CCTV', icon: <BiCctv /> },
                                                            { name: 'Power Backup', icon: <ImPower /> },
                                                            { name: 'Gas Pipeline', icon: <GiGasStove /> },
                                                        ].map((amenity, index) => (
                                                            <label key={index} className='custom'>
                                                                <input
                                                                    type="checkbox"
                                                                    name="amenities"
                                                                    value={amenity.name}
                                                                    onChange={handleChange}
                                                                />
                                                                <p className='fieldname2'>
                                                                    {amenity.icon && <span className='icon'><div className='facility_icon'>
                                                                        {amenity.icon}
                                                                    </div></span>} {amenity.name}
                                                                </p>
                                                                <span className='checkmk'></span>
                                                            </label>
                                                        ))}
                                                    </div>

                                                </>
                                            )
                                        }


                                    </div>




                                </div>
                                <div className='partition3'
                                    style={{ display: visiblepart3 ? 'flex' : 'none' }}>
                                    <div>
                                        <button className='save' onClick={() => {
                                            setvisiblepart2(true);
                                            setvisiblepart3(false);
                                            countdecrement(2)
                                        }}>back</button>
                                    </div>
                                    <div>
                                        <button className='save' onClick={() => {
                                            setvisiblepart3(false);
                                            setvisiblepart4(true);
                                            countincrement(4)
                                        }}>Save & Next</button>
                                    </div>
                                </div>
                                <div className='formbox'
                                    style={{ display: visiblepart4 ? 'block' : 'none' }}>

                                    
                                </div>
                                <div className='part4'
                                    style={{ display: visiblepart4 ? 'block' : 'none' }}
                                >

                                    <div className='partition2'>
                                        <div>
                                            <label className='formtext'>Metro</label><input className='formfield' type='number' name='metro' value={formdata.metro} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>
                                            <label className='formtext'>Bus</label><input className='formfield' type='number' name='bus' value={formdata.bus} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>

                                            <label className='formtext'>School</label><input className='formfield' type='number' name='school' value={formdata.school} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>
                                            <label className='formtext'>Hospital</label><input className='formfield' type='number' name='hospital' value={formdata.hospital} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>
                                            <label className='formtext'>Mall</label><input className='formfield' type='number' name='mall' value={formdata.mall} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>

                                            <label className='formtext'>Resturant: </label><input className='formfield' type='number' name='resturant' value={formdata.resturant} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>
                                            <label className='formtext'>Cinema: </label><input className='formfield' type='number' name='cinema' value={formdata.cinema} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                    </div>

                                </div>

                                <div className='partition3'
                                    style={{ display: visiblepart4 ? 'flex' : 'none' }}>
                                    <button className='save' onClick={() => {
                                        setvisiblepart3(true);
                                        setvisiblepart4(false);
                                        countdecrement(3)
                                    }}>back</button>
                                    <button className='save' onClick={() => {
                                        setvisiblepart4(false);
                                        setvisiblepart5(true);
                                        countincrement(5)
                                    }}>Save & Next</button>
                                </div>
                               
                                <div className='part5'
                                    style={{ display: visiblepart5 ? 'block' : 'none' }}
                                >
                                    <button className='save description' onClick={generateDescription}>
                                        {loading ? "Generating..." : "Generate AI Description"}
                                    </button>
                                    <div className='partitionx'>
                                        {/* Textarea to show the generated description */}
                                        <div>
                                            <label className='formtext'>Description</label>
                                        </div>
                                        <div>
                                            <textarea
                                                className='formfield-c'
                                                name="description"
                                                placeholder='Tell Something About Your Property'
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)} // Use setDescription directly here
                                                rows={7}
                                                cols={70}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className='partition3'
                                    style={{ display: visiblepart5 ? 'flex' : 'none' }}>
                                    <button className='save' onClick={() => {
                                        setvisiblepart4(true);
                                        setvisiblepart5(false);
                                        countdecrement(5)
                                    }}>back</button>
                                    <button className='save' onClick={() => {
                                        setvisiblepart5(false);
                                        setvisiblepart6(true);
                                        countincrement(6)
                                    }}>Save & Next</button>
                                </div>
                                <div className='formbox'
                                    style={{ display: visiblepart6 ? 'block' : 'none' }}>

                                 
                                </div>
                                <div className='part5'
                                    style={{ display: visiblepart6 ? 'block' : 'none' }}
                                >

                                    {commercial !== 'land' && (
                                        <>
                                            <div className='partition5'>
                                                <div>
                                                    <label className='formtext'>Floor Plan:</label>
                                                    <input
                                                        className='fieldvalue4'
                                                        type="file"
                                                        name="floorplan"
                                                        id="floorplan"
                                                        onChange={handleFloorplanChange}
                                                        multiple
                                                        accept=".jpg,.png,.pdf"
                                                    />
                                                    <label htmlFor="floorplan" className='file_upload'>
                                                        Choose Floor Plan
                                                    </label>
                                                </div>
                                                <div>
                                                    {floorplan.length > 0 && (
                                                        <ul id='floorplanbox2'>
                                                            {floorplan.map((fileName, index) => (

                                                                <span id='floorplanname2'><li key={index}>{fileName}   <MdDelete id='deleteicon2' onClick={() => removeFloorplan(fileName)} />  </li></span>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>

                                            </div>
                                            <div className='partition5'>
                                                <div>
                                                    <label className='formtext'>Attachment: </label>
                                                    <input
                                                        className='fieldvalue4'
                                                        type="file"
                                                        name="photos"
                                                        id="photos"
                                                        onChange={handlePhotosChange}
                                                        multiple
                                                        accept=".jpg,.png"
                                                    />
                                                    <label htmlFor="photos" className='file_upload'>
                                                        Choose Attachment
                                                    </label>
                                                </div>
                                                <div>
                                                    {photos.length > 0 && (
                                                        <ul id='photosbox2'>
                                                            {photos.map((fileName, index) => (
                                                                <span id='filebox2'><li key={index} id='photoName'>
                                                                    {fileName}
                                                                    <MdDelete id='deleteicon2' onClick={() => removePhoto(fileName)} />
                                                                </li>
                                                                </span>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {commercial === 'land' && (
                                        <>
                                            <div className='partition5'>
                                                <div>
                                                    <label className='formtext'>Attachment: </label>
                                                    <input
                                                        className='fieldvalue4'
                                                        type="file"
                                                        name="photos"
                                                        id="photos"
                                                        onChange={handlePhotosChange}
                                                        multiple
                                                        accept=".jpg,.png"
                                                    />
                                                    <label htmlFor="photos" className='file_upload'>
                                                        Choose Attachment
                                                    </label>
                                                </div>
                                                <div>
                                                    {photos.length > 0 && (
                                                        <ul id='photosbox2'>
                                                            {photos.map((fileName, index) => (
                                                                <span id='filebox2'><li key={index} id='photoName'>
                                                                    {fileName}
                                                                    <MdDelete id='deleteicon2' onClick={() => removePhoto(fileName)} />
                                                                </li>
                                                                </span>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                </div>
                                <div className='partition3'
                                    style={{ display: visiblepart6 ? 'flex' : 'none' }}>
                                    <button className='save' onClick={() => {
                                        setvisiblepart4(true);
                                        setvisiblepart5(false);
                                    }}>back</button>
                                    <button id='last' className='save' onClick={() => {
                                    }}
                                        disabled
                                    >Save & next</button>
                                </div>
                                <div id='submit'>
                                    <button type='submit'
                                        style={{ display: visiblepart6 ? 'block' : 'none' }}
                                        className='btn2 btnx' onClick={handleSubmit}>submit</button>
                                </div>
                            </>
                        )}
                        {(category === 'commercial' && purpose === 'rent') && (
                            <>
                                <div className='innerbuttonbox'>

                                    <button className={`propertybtn  ${activeButton3 === 'officespace' ? 'activeb3' : ''}`}
                                        onClick={() => {
                                            setcommercial('officespace');
                                            handleButtonClick3('officespace');
                                            setformdata(initialdata);
                                        }}>OfficeSpace</button>
                                    <button className={`propertybtn   ${activeButton3 === 'shop' ? 'activeb3' : ''}`}
                                        onClick={() => {
                                            setcommercial('shop');
                                            handleButtonClick3('shop');
                                            setformdata(initialdata);
                                        }}>Shop</button>
                                    <button className={`propertybtn   ${activeButton3 === 'land' ? 'activeb3' : ''}`}
                                        onClick={() => {
                                            setcommercial('land');
                                            handleButtonClick3('land');
                                            setformdata(initialdata);
                                        }}>Land</button>
                                    <button className={`propertybtn   ${activeButton3 === 'coworkingspace' ? 'activeb3' : ''}`}
                                        onClick={() => {
                                            setcommercial('coworkingspace');
                                            handleButtonClick3('coworkingspace');
                                            setformdata(initialdata);
                                        }}>Coworking Space</button>
                                    <button className={`propertybtn   ${activeButton3 === 'showroom' ? 'activeb3' : ''}`}
                                        onClick={() => {
                                            setcommercial('showroom');
                                            handleButtonClick3('showroom');
                                            setformdata(initialdata);
                                        }}>Coworking Space</button>
                                </div>
                                <div className='formbox'
                                    style={{ display: visiblepart1 ? 'block' : 'none' }}>

                                  
                                </div>
                                <div className='part1' style={{ display: visiblepart1 ? 'block' : 'none' }}>
                                    <div className='partition'>
                                        <label className='formtext'>Country:</label>
                                        <select
                                            className='formfield'
                                            name='country'
                                            onChange={handleChange}
                                            value={formdata.country}
                                            required

                                        >
                                            <option value='india'>India</option>
                                            <option value='uae'>UAE
                                            </option>
                                            <option value='qatar'>QATAR</option>
                                        </select>
                                        <label className='formtext'>City:</label>
                                        <select
                                            className='formfield'
                                            name='city'
                                            onChange={handleChange}
                                            value={formdata.city}
                                            required

                                        >
                                            {formdata.country === 'india' && (
                                                <>
                                                    <option value='noida'>Noida</option>
                                                    <option value='gurgaon'>Gurgaon
                                                    </option>
                                                    <option value='greaternoida'>Greater Noida</option>
                                                    <option value='ghaziabad'>Ghaziabad</option>
                                                    <option value='delhi'>Delhi</option>
                                                    <option value='faridabad'>Faridabad</option>
                                                </>
                                            )}
                                            {formdata.country === 'uae' && (
                                                <>
                                                    <option value='dubai'>Dubai</option>
                                                </>
                                            )}
                                            {formdata.country === 'qatar' && (
                                                <>
                                                    <option value='doha'>Doha</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                    <div className='partition'>
                                        <label className='formtext'>locality:</label>
                                        <input type='text' className='formfield-b' placeholder='Enter locality' name='locality' onChange={handleChange} value={formdata.locality}></input>
                                        <label className='formtext'>Pincode:</label>
                                        <input type='text' className='formfield-b' placeholder='Enter Pincode' name='pincode' onChange={handleChange} value={formdata.pincode}></input>
                                    </div>
                                    <div className='partition'>
                                        <label className='formtext'>Property Name:</label>
                                        <input className='formfield-a' placeholder='Enter Property Name' type='text' name='property_name' onChange={handleChange} value={formdata.property_name} required>
                                        </input>
                                    </div>
                                    <div className='partition'>
                                        <label className='formtext'>Property Address:</label>
                                        <input className='formfield-a' type='text' placeholder='Enter Property address' name='address' onChange={handleChange} value={formdata.address} required>
                                        </input>
                                    </div>


                                </div>
                                <div className='partition3'
                                    style={{ display: visiblepart1 ? 'flex' : 'none' }}>
                                    <button className='save' id='first' disabled onClick={() => {

                                    }}>back</button>
                                    <button className='save' onClick={() => {
                                        setvisiblepart2(true);
                                        setvisiblepart1(false);
                                    }}

                                    >Save & next</button>
                                </div>
                                {/* overview section */}
                                <div className='formbox'
                                    style={{ display: visiblepart2 ? 'block' : 'none' }}>

                             
                                </div>
                                <div className='part2' style={{ display: visiblepart2 ? 'block' : 'none' }}>
                                    <div className='partition'>
                                        <label className='formtext' >RERA ID:</label>
                                        <input type='text' className='formfield-a' placeholder=' example UPRERAPRJ72xx' name='rera_id' onChange={handleChange} value={formdata.rera_id}></input>
                                    </div>
                                    {commercial !== 'land' && (
                                        <>

                                            <div className='partition'>
                                                <label className='formtext'>Area Detail(in sq.ft) : </label>
                                                <br></br>
                                                <input type='number' placeholder='e.g 1030' className='formfield formfield-d' name='area_detail' onChange={handleChange} value={formdata.area_detail} required>
                                                </input>
                                                <select
                                                    className='formfield formfield-d'
                                                    name='area_type'
                                                    onChange={handleChange}
                                                    value={formdata.area_type}
                                                    required
                                                >
                                                    <option value='Super Built-up Area'>Super Built Up Area</option>
                                                    <option value='Built-up area'>Built-up Area</option>
                                                    <option value='Carpet Area'>Carpet Area</option>
                                                </select>
                                            </div>
                                            <div className='partition'>
                                                <div>
                                                    <label className='formtext'>Property Facing:</label>
                                                    <select
                                                        name='property_facing'
                                                        className='formfield-a'
                                                        onChange={handleChange}
                                                        value={formdata.property_facing}
                                                        required
                                                    >
                                                        <option value='North'>North</option>
                                                        <option value='South'>South</option>
                                                        <option value='East'>East</option>
                                                        <option value='West'>West</option>
                                                        <option value='North-East'>North-East</option>
                                                        <option value='North-West'>North-West</option>
                                                        <option value='South-East'>South-East</option>
                                                        <option value='South-West'>South-West</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className='formtext'>Furnish Type:</label>
                                                    <select
                                                        className='formfield-a'
                                                        name='furnish_type'
                                                        onChange={handleChange}
                                                        value={formdata.furnish_type}
                                                        required
                                                    >
                                                        <option value='Fully furnished'>Fully furnished</option>
                                                        <option value='Semi furnished'>Semi furnished</option>
                                                        <option value='Un furnished'>Un furnished</option>
                                                    </select>
                                                </div>

                                            </div>



                                            <div className='partition'>
                                                <div>
                                                    <label className='formtext'>Floor no:</label>
                                                    <input className='formfield-b' type='number' name='floor_no' onChange={handleChange} value={formdata.floor_no}></input>
                                                </div>
                                                <div>
                                                    <label className='formtext'>Total Floor:</label>
                                                    <input type='number' className='formfield-b' name='total_floor' onChange={handleChange} value={formdata.total_floor}></input>
                                                </div>
                                            </div>
                                            <div className='partition'>
                                                <label className='formtext'>Maintenance charge per month:</label>
                                                <input type='number' className='formfield-a' placeholder='e.g 1500' name='maintenance_charge' onChange={handleChange} value={formdata.maintenance_charge}></input>

                                            </div>
                                        </>)}
                                    {(commercial === 'land' || commercial === 'shop') && (
                                        <>

                                            <div className='partition'>
                                                <label className='formtext'>Land Dimesion:</label>
                                                <br></br>
                                                <input type='number' className='formfield' name='length in ft.' onChange={handleChange} value={formdata.length} placeholder='Length' required>
                                                </input>
                                                X

                                                <input type='number' className='formfield' name='width in ft.' onChange={handleChange} value={formdata.width} placeholder='width' required>

                                                </input>

                                            </div>
                                        </>
                                    )}
                                    {commercial === 'land' && (
                                        <>
                                            <div className='partition'>
                                                <label className='formtext'>Area Detail(in sq.ft) : </label>
                                                <br></br>
                                                <input type='number' placeholder='e.g 1030' className='formfield formfield-d' name='area_detail' onChange={handleChange} value={formdata.area_detail} required>
                                                </input>
                                                <select
                                                    className='formfield formfield-d'
                                                    name='area_type'
                                                    onChange={handleChange}
                                                    value={formdata.area_type}
                                                    required
                                                >
                                                    <option value='Super Built-up Area'>Super Built Up Area</option>
                                                    <option value='Built-up area'>Built-up Area</option>
                                                    <option value='Carpet Area'>Carpet Area</option>
                                                </select>
                                            </div>
                                            <div className='partition'>
                                                <label className='formtext'> Boundary Wall</label>
                                                <label className='radio-container'>
                                                    <span className='radio-label'>Yes</span>
                                                    <input

                                                        type="radio"
                                                        name="boundary_wall"
                                                        value='yes'

                                                        onChange={handleChange}
                                                    />
                                                    <span className='radio-checkmark'></span>
                                                </label>
                                                <label className='radio-container'>
                                                    <span className='radio-label'>No</span>
                                                    <input

                                                        type="radio"
                                                        name="boundary_wall"
                                                        value='no'

                                                        onChange={handleChange}
                                                    />
                                                    <span className='radio-checkmark'></span>
                                                </label>
                                                <br></br>
                                                <div className='partition'>
                                                    <div>
                                                        <label className='formtext'>       No of open side</label>
                                                        <select
                                                            name='no_of_open_side'
                                                            className='formfield'
                                                            value={formdata.no_of_open_side}
                                                            onChange={handleChange}
                                                        >
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                        </select>
                                                        <label className='formtext'>Floor Allowed</label>
                                                    </div>
                                                    <div>
                                                        <select
                                                            className='formfield'
                                                            name='floor_allowed'
                                                            onChange={handleChange}
                                                            value={formdata.floor_allowed}
                                                        >
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                            <option value='5'>5</option>
                                                            <option value='6'>6</option>
                                                            <option value='7'>7</option>
                                                            <option value='7+'>7+</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {commercial !== 'land' && (
                                        <>
                                            <div className='partition'>

                                                <label className='formtext'>Currently leased Out: </label>
                                                <label className='radio-container'>
                                                    <span className='radio-label'>Yes</span>
                                                    <input
                                                        className='fieldvalue'
                                                        type="radio"
                                                        name="leased"
                                                        value='yes'
                                                        checked={leased === "yes"}
                                                        onChange={leasedchange1}
                                                    />
                                                    <span className='radio-checkmark'></span>
                                                </label>
                                                <label className='radio-container'>
                                                    <span className='radio-label'>No</span>
                                                    <input
                                                        className='fieldvalue'
                                                        type="radio"
                                                        name="leased"
                                                        value='no'
                                                        checked={leased === "no"}
                                                        onChange={leasedchange1}
                                                    />
                                                    <span className='radio-checkmark'></span>
                                                </label>

                                                {
                                                    leased === 'yes' && (
                                                        <>
                                                            <br></br>
                                                            <div className='partition'>
                                                                <div>
                                                                    <label className='formtext'>Montly Rent Price :</label>
                                                                    <input className='formfield' type='number' name='montly_rent' value={formdata.montly_rent} onChange={handleChange} ></input>
                                                                </div>
                                                                <div>
                                                                    <label className='formtext'>Remaining Days:</label>
                                                                    <input className='formfield' type='number' name='remaining_time' value={formdata.remaining_time} onChange={handleChange} placeholder='In days'></input>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </>
                                    )}

                                    <div className='partition'>
                                        <label className='formtext'>Price:</label>
                                        <input type='number' placeholder='e.g 2.10' className='formfield' name='price' onChange={handleChange} value={formdata.price} required></input>
                                        <select
                                            className='formfield'
                                            name='pricerange'
                                            onChange={handleChange}
                                            value={formdata.pricerange}
                                            required
                                        >
                                            <option value='thousand'>Thousand</option>
                                            <option value='Lakh'>Lakhs</option>
                                            <option value='Crore'>Crore</option>
                                            <option value='million'>Million</option>
                                            <option value='billion'>Billion</option>
                                        </select>
                                        <select
                                            className='formfield'
                                            name='money_type'
                                            onChange={handleChange}
                                            value={formdata.money_type}
                                            required
                                        >
                                            <option value='Rupees' >IND-Rupees</option>
                                            <option value='AED'>Dubai - AED</option>
                                            <option value='Riyal'>Qatar-Riyal</option>
                                        </select>
                                    </div>
                                    <div className='partition'>
                                        <div>
                                            <label className='formtext'>Security amount:</label>

                                            <input type='number' placeholder=' e.g 50000' className='formfield' name='securitydeposit' value={formdata.securitydeposit} onChange={handleChange}></input>
                                        </div>
                                        <div>
                                            <label className='formtext'>Lock in period:</label>
                                            <input type='number' className='formfield' name='lock_in_period' value={formdata.lock_in_period} onChange={handleChange} placeholder='In Years'></input>
                                        </div>
                                    </div>


                                </div>

                                <div className='partition3'
                                    style={{ display: visiblepart2 ? 'flex' : 'none' }}>
                                    <button className='save' onClick={() => {
                                        setvisiblepart1(true);
                                        setvisiblepart2(false);
                                    }}>back</button>
                                    <button className='save' onClick={() => {
                                        setvisiblepart2(false);
                                        setvisiblepart3(true);
                                    }}>Save & Next</button>
                                </div>
                                <div className='formbox'
                                    style={{ display: visiblepart3 ? 'block' : 'none' }}>

                                    
                                </div>
                                <div className='part3'
                                    style={{ display: visiblepart3 ? 'block' : 'none' }}>
                                    {commercial !== 'land' && (<>
                                        <div className='checkbox-true'>
                                            {[
                                                { name: 'Air Conditioner', icon: <TbAirConditioning /> },
                                                { name: 'Cable Tv', icon: <FaSatelliteDish /> },
                                                { name: 'Wifi', icon: <FaWifi /> },
                                                { name: 'Dishwasher', icon: <LuUtensilsCrossed /> },
                                                { name: 'Heating', icon: <PiThermometerHotBold /> },
                                                { name: 'Lift', icon: <GrElevator /> },
                                                { name: 'Intercomm Facility', icon: <LiaIntercom /> },
                                                { name: 'Microwave', icon: <MdMicrowave /> },
                                                { name: 'Park', icon: <PiPark /> },
                                                { name: 'Parking', icon: <LuParkingCircle /> },
                                                { name: 'Guest Parking', icon: <RiParkingBoxLine /> },
                                                { name: 'Security', icon: <MdSecurity /> },
                                                { name: 'Play Area', icon: <GiKidSlide /> },
                                                { name: 'CCTV', icon: <BiCctv /> },
                                                { name: 'Power Backup', icon: <ImPower /> },
                                                { name: 'Gas Pipeline', icon: <GiGasStove /> },
                                                { name: 'Gym', icon: <GiWeightLiftingUp /> },
                                                { name: 'Swimming Pool', icon: <FaPersonSwimming /> },
                                                { name: 'Multipurpose Court', icon: <PiCourtBasketball /> },
                                                { name: 'Multipurpose Hall', icon: <TbBuildingBank /> },
                                                { name: 'Chimney', icon: <GiChimney /> },
                                                { name: 'Modular Kitchen', icon: <FaKitchenSet /> },
                                                { name: 'Refrigerator', icon: <TbFridge /> },
                                                { name: 'Rear Lawn', icon: <GiGrassMushroom /> },
                                                { name: 'Front Lawn', icon: <GiGrass /> },
                                                { name: 'EV Charge', icon: <FaChargingStation /> },
                                                { name: 'Club House', icon: <PiWarehouseLight /> }
                                            ].map((amenity, index) => (
                                                <div>
                                                    <label key={index} className='custom'>
                                                        <input
                                                            type="checkbox"
                                                            name="amenities"
                                                            value={amenity.name}
                                                            onChange={handleChange}
                                                        />
                                                        <p className='fieldname2'>
                                                            {amenity.icon && <span className='icon'><div className='facility_icon'>
                                                                {amenity.icon}
                                                            </div></span>} {amenity.name}
                                                        </p>
                                                        <span className='checkmk'></span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                    </>)}
                                    <div>
                                        {
                                            commercial === 'land' && (
                                                <>
                                                    <div className='checkbox-true'>
                                                        {[
                                                            { name: 'Park', icon: <PiPark /> },
                                                            { name: 'Parking', icon: <LuParkingCircle /> },
                                                            { name: 'Security', icon: <MdSecurity /> },
                                                            { name: 'Play Area', icon: <GiKidSlide /> },
                                                            { name: 'CCTV', icon: <BiCctv /> },
                                                            { name: 'Power Backup', icon: <ImPower /> },
                                                            { name: 'Gas Pipeline', icon: <GiGasStove /> },
                                                        ].map((amenity, index) => (
                                                            <label key={index} className='custom'>
                                                                <input
                                                                    type="checkbox"
                                                                    name="amenities"
                                                                    value={amenity.name}
                                                                    onChange={handleChange}
                                                                />
                                                                <p className='fieldname2'>
                                                                    {amenity.icon && <span className='icon'><div className='facility_icon'>
                                                                        {amenity.icon}
                                                                    </div></span>} {amenity.name}
                                                                </p>
                                                                <span className='checkmk'></span>
                                                            </label>
                                                        ))}
                                                    </div>

                                                </>
                                            )
                                        }


                                    </div>




                                </div>
                                <div className='partition3'
                                    style={{ display: visiblepart3 ? 'flex' : 'none' }}>
                                    <div>
                                        <button className='save' onClick={() => {
                                            setvisiblepart2(true);
                                            setvisiblepart3(false);
                                        }}>back</button>
                                    </div>
                                    <div>
                                        <button className='save' onClick={() => {
                                            setvisiblepart3(false);
                                            setvisiblepart4(true);
                                        }}>Save & Next</button>
                                    </div>
                                </div>
                                <div className='part4'
                                    style={{ display: visiblepart4 ? 'block' : 'none' }}
                                >

                                    <div className='partition2'>
                                        <div>
                                            <label className='formtext'>Metro</label><input className='formfield' type='number' name='metro' value={formdata.metro} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>
                                            <label className='formtext'>Bus</label><input className='formfield' type='number' name='bus' value={formdata.bus} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>

                                            <label className='formtext'>School</label><input className='formfield' type='number' name='school' value={formdata.school} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>
                                            <label className='formtext'>Hospital</label><input className='formfield' type='number' name='hospital' value={formdata.hospital} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>
                                            <label className='formtext'>Mall</label><input className='formfield' type='number' name='mall' value={formdata.mall} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>

                                            <label className='formtext'>Resturant: </label><input className='formfield' type='number' name='resturant' value={formdata.resturant} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                        <div>
                                            <label className='formtext'>Cinema: </label><input className='formfield' type='number' name='cinema' value={formdata.cinema} onChange={handleChange} placeholder='in Km'></input>
                                        </div>
                                    </div>

                                </div>

                                <div className='partition3'
                                    style={{ display: visiblepart4 ? 'flex' : 'none' }}>
                                    <button className='save' onClick={() => {
                                        setvisiblepart3(true);
                                        setvisiblepart4(false);
                                    }}>back</button>
                                    <button className='save' onClick={() => {
                                        setvisiblepart4(false);
                                        setvisiblepart5(true);
                                    }}>Save & Next</button>
                                </div>
                                <div className='formbox'
                                    style={{ display: visiblepart5 ? 'block' : 'none' }}>

                                   
                                </div>
                                <div className='part5'
                                    style={{ display: visiblepart5 ? 'block' : 'none' }}
                                >
                                    <button className='save description' onClick={generateDescription}>
                                        {loading ? "Generating..." : "Generate AI Description"}
                                    </button>
                                    <div className='partitionx'>
                                        {/* Textarea to show the generated description */}
                                        <div>
                                            <label className='formtext'>Description</label>
                                        </div>
                                        <div>
                                            <textarea
                                                className='formfield-c'
                                                name="description"
                                                placeholder='Tell Something About Your Property'
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)} // Use setDescription directly here
                                                rows={7}
                                                cols={70}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className='partition3'
                                    style={{ display: visiblepart5 ? 'flex' : 'none' }}>
                                    <button className='save' onClick={() => {
                                        setvisiblepart4(true);
                                        setvisiblepart5(false);
                                    }}>back</button>
                                    <button className='save' onClick={() => {
                                        setvisiblepart5(false);
                                        setvisiblepart6(true);
                                    }}>Save & Next</button>
                                </div>
                                <div className='formbox'
                                    style={{ display: visiblepart6 ? 'block' : 'none' }}>

                                    
                                </div>
                                <div className='part5'
                                    style={{ display: visiblepart6 ? 'block' : 'none' }}
                                >

                                    {commercial !== 'land' && (
                                        <>
                                            <div className='partition5'>
                                                <div>
                                                    <label className='formtext'>Floor Plan:</label>
                                                    <input
                                                        className='fieldvalue4'
                                                        type="file"
                                                        name="floorplan"
                                                        id="floorplan"
                                                        onChange={handleFloorplanChange}
                                                        multiple
                                                        accept=".jpg,.png,.pdf"
                                                    />
                                                    <label htmlFor="floorplan" className='file_upload'>
                                                        Choose Floor Plan
                                                    </label>
                                                </div>
                                                <div>
                                                    {floorplan.length > 0 && (
                                                        <ul id='floorplanbox2'>
                                                            {floorplan.map((fileName, index) => (

                                                                <span id='floorplanname2'><li key={index}>{fileName}   <MdDelete id='deleteicon2' onClick={() => removeFloorplan(fileName)} />  </li></span>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>

                                            </div>
                                            <div className='partition5'>
                                                <div>
                                                    <label className='formtext'>Attachment: </label>
                                                    <input
                                                        className='fieldvalue4'
                                                        type="file"
                                                        name="photos"
                                                        id="photos"
                                                        onChange={handlePhotosChange}
                                                        multiple
                                                        accept=".jpg,.png"
                                                    />
                                                    <label htmlFor="photos" className='file_upload'>
                                                        Choose Attachment
                                                    </label>
                                                </div>
                                                <div>
                                                    {photos.length > 0 && (
                                                        <ul id='photosbox2'>
                                                            {photos.map((fileName, index) => (
                                                                <span id='filebox2'><li key={index} id='photoName'>
                                                                    {fileName}
                                                                    <MdDelete id='deleteicon2' onClick={() => removePhoto(fileName)} />
                                                                </li>
                                                                </span>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {commercial === 'land' && (
                                        <>
                                            <div className='partition5'>
                                                <div>
                                                    <label className='formtext'>Attachment: </label>
                                                    <input
                                                        className='fieldvalue4'
                                                        type="file"
                                                        name="photos"
                                                        id="photos"
                                                        onChange={handlePhotosChange}
                                                        multiple
                                                        accept=".jpg,.png"
                                                    />
                                                    <label htmlFor="photos" className='file_upload'>
                                                        Choose Attachment
                                                    </label>
                                                </div>
                                                <div>
                                                    {photos.length > 0 && (
                                                        <ul id='photosbox2'>
                                                            {photos.map((fileName, index) => (
                                                                <span id='filebox2'><li key={index} id='photoName'>
                                                                    {fileName}
                                                                    <MdDelete id='deleteicon2' onClick={() => removePhoto(fileName)} />
                                                                </li>
                                                                </span>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className='partition3'
                                    style={{ display: visiblepart6 ? 'flex' : 'none' }}>
                                    <button className='save' onClick={() => {
                                        setvisiblepart5(true);
                                        setvisiblepart6(false);
                                    }}>back</button>
                                    <button id='last' className='save' onClick={() => {
                                    }}
                                        disabled
                                    >Save & next</button>
                                </div>
                                <div id='submit'>
                                    <button type='submit'
                                        style={{ display: visiblepart6 ? 'block' : 'none' }}
                                        className='btn2 btnx' onClick={handleSubmit}>submit</button>
                                </div>
                            </>
                        )}
                    </>
                </div>
            </div >
        </>
    )
}

export default Phone