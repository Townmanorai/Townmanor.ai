import React, { useEffect, useState } from 'react';
import './LeaseProperty.css';  // Import the CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function LeaseProperty() {
  const [distances, setDistances] = useState([{ name: '', distance: '' }]);
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [amenities, setamenties] = useState([]);
  const [amentiesinput, setamentiesinput] = useState('');
  const [query, setquery] = useState();
  const [imageBanner, setImageBanner] = useState(null);
  const [faceImage, setFaceImage] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    project_Name: '',
    city: 'Noida',
    Address: '',
    invest: '',
    Category: [],
    Return: '',
    Possession_Date: '',
    Builder: '',
    Construction: '',
    Project_Unit: '',
    lat: '',
    lng: '',
    Description: '',
    reraid: '',
    Project_Area_Range: '',
    videoid: '',
    amenities: [],
    Distance: [],
    Image_banner: null,
    Face_image: null,
    floorplan: [],
    Main_image: [],
    office_image: [],
    Retail_shop: [],
    Restuarant: [],
    other: [],
  });
  // Handle input changes for all fields
  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Function to handle adding a new distance field
  const addDistanceField = () => {
    setDistances([...distances, { name: '', distance: '' }]);
  };

  // Handle distance input changes
  const handleDistanceInputChange = (index, field, value) => {
    const newDistances = [...distances];
    newDistances[index][field] = value;
    setDistances(newDistances);
  };

  // Handle category input changes
  const handleCategoryInputChange = (e) => {
    setCategoryInput(e.target.value);
  };

  // Handle adding category (tag)
  const handleAddCategory = () => {
    if (categoryInput.trim() !== '') {
      setCategories(prevCategories => [...prevCategories, categoryInput.trim()]);
      setCategoryInput('');
    }
  };
  const handleAmentiesInputChange = (e) => {
    setamentiesinput(e.target.value);
  };

  // Handle adding category (tag)
  const handleAddAmenities = () => {
    if (amentiesinput.trim() !== '') {
      setamenties(prevAmenities => [...prevAmenities, amentiesinput.trim()]);
      setamentiesinput('');
    }
  };
  // Handle file input changes
  // const handleFileChange = (e, field) => {
  //   const files = Array.from(e.target.files);
  //   setFormData({
  //     ...formData,
  //     [field]: files,
  //   });
  // };
  const handleFileChange = async (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return; // If no files are selected, return

    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-commercial-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        const uploadedPaths = response.data.fileUrls.map(path =>
          path.replace('https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/', '')
        );
        if (type === 'Image_banner') {
          setFormData(prevState => ({
            ...prevState,
            [type]: uploadedPaths[0],
          }));// Store image banner
        } else if (type === 'Face_image') {
          setFormData(prevState => ({
            ...prevState,
            [type]: uploadedPaths[0],
          })); // Store face image
        }
        else{
          setFormData(prevState => ({
            ...prevState,
            [type]: uploadedPaths,
          }));
        }
      }
    } catch (error) {
      console.error('File upload failed:', error);
      alert('An error occurred while uploading the file.');
    }
  };
  const handleFileChange2 = async (e, type) => {
    const file = e.target.files[0]; // Assuming only one file is selected
    if (!file) return; // If no file selected, exit
  
    try {
      // Prepare FormData for file upload
      const formData = new FormData();
      formData.append('images', file); // Append the file to the form data
  
      // Send the file to the server using Axios
      const response = await axios.post('https://www.townmanor.ai/api/image/aws-upload-commercial-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        // Assuming the backend returns the file URLs in the `fileUrls` field
        const uploadedFloorplanPaths = response.data.fileUrls;
        // console.log(uploadedFloorplanPaths);
  
        const trimmedFloorplanPaths = uploadedFloorplanPaths.map((path) =>
          path.replace('https://s3.ap-south-1.amazonaws.com/townamnor.ai/commercial-images/', '') // Modify path as needed
        );
  
        if (type === 'Image_banner') {
          setImageBanner(trimmedFloorplanPaths[0]);  // Store image banner
        } else if (type === 'Face_image') {
          setFaceImage(trimmedFloorplanPaths[0]);  // Store face image
        }
        console.log(formData.type)
      }
    } catch (error) {
      console.error('Error uploading floorplans:', error);
      alert('An error occurred while uploading the floorplans');
    }
  };
  
  // Handle form submission and create JSON object
  const handleSubmit = (e) => {
    e.preventDefault();
   
   
    // Ensure all arrays are initialized as empty arrays if they are undefined
    const submissionData = {
      ...formData,
      Category: categories.length > 0 ? JSON.stringify(categories) : "[]",  // Default to empty array if empty
      amenities: amenities.length > 0 ? JSON.stringify(amenities) : "[]",   // Default to empty array if empty
      Distance: distances.length > 0 ? JSON.stringify(distances) : "[]",    // Default to empty array if empty
      floorplan: JSON.stringify(formData.floorplan), // Directly stringify the floorplan
      Main_image: JSON.stringify(formData.Main_image), // Directly stringify Main_image
      office_image: JSON.stringify(formData.office_image), // Directly stringify office_image
      Retail_shop: JSON.stringify(formData.Retail_shop), // Directly stringify Retail_shop
      Restaurant: JSON.stringify(formData.Restuarant), // Directly stringify Restaurant
      other: JSON.stringify(formData.other),
    }
    const categoryData = JSON.stringify(categories);
    const amenitiesData = JSON.stringify(amenities);
    const distanceData = JSON.stringify(distances);
    const floorplanData = JSON.stringify(formData.floorplan);
    const mainImageData = JSON.stringify(formData.Main_image);
    const officeImageData = JSON.stringify(formData.office_image);
    const retailShopData = JSON.stringify(formData.Retail_shop);
    const restaurantData = JSON.stringify(formData.Restuarant);
    const otherData = JSON.stringify(formData.other);
    const queryx = `
        INSERT INTO commercial_details (
            project_name, 
            city, 
            address, 
            invest, 
            category, 
            return_policy, 
            possession_date, 
            builder, 
            construction_status, 
            project_unit, 
            lat, 
            lng, 
            description, 
            rera_id, 
            project_area_range, 
            video_id, 
            amenities, 
            distance, 
            image_banner, 
            face_image, 
            floorplan, 
            main_image, 
            office_image, 
            retail_shop, 
            restaurant, 
            other
        ) 
        VALUES (
            '${formData.project_Name}', 
            '${formData.city}', 
            '${formData.Address}', 
            '${formData.invest}', 
            '${categoryData}', 
            '${formData.Return}', 
            '${formData.Possession_Date}', 
            '${formData.Builder}', 
            '${formData.Construction}', 
            ${formData.Project_Unit}, 
            ${formData.lat}, 
            ${formData.lng}, 
            '${formData.Description}', 
            '${formData.reraid}', 
            '${formData.Project_Area_Range}', 
            '${formData.videoid}', 
            '${amenitiesData}', 
            '${distanceData}', 
            '${formData.Image_banner}', 
            '${formData.Face_image}', 
            ${floorplanData}, 
            ${mainImageData}, 
            ${officeImageData}, 
            ${retailShopData}, 
            ${restaurantData}, 
            ${otherData}
        );
    `;
    setquery(queryx);
    console.log('Form submission data:', submissionData);
  };
 
  const goToAbout = () => {
    navigate('/commercialform2');  // Navigate to the "/about" page
  };
  return (
    <>
    <div>
    <button type="button" class="btn btn-secondary my-4 mx-4" onClick={goToAbout}>price plan form</button>
    </div>
    <div className="lease-property-form">
      <form onSubmit={handleSubmit}>
        <h2>Lease Property Form</h2>

        <div className="form-row">
          <div className="form-field">
            <label>Project ID</label>
            <input
              type="number"
              value={formData.id}
              onChange={(e) => handleInputChange('id', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Project Name</label>
            <input
              type="text"
              value={formData.project_Name}
              onChange={(e) => handleInputChange('project_Name', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>City</label>
            <select
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            >
              <option value='Noida'>Noida</option>
              <option value='Gurgaon'>Gurugram</option>
              <option value='Delhi'>Delhi</option>
              <option value='Faridabad'>Faridabad</option>
            </select>
          </div>
          <div className="form-field">
            <label>Investment</label>
            <input
              type="text"
              value={formData.invest}
              onChange={(e) => handleInputChange('invest', e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Address</label>
            <input
              type="text"
              value={formData.Address}
              onChange={(e) => handleInputChange('Address', e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Categories (Tags)</label>
            <div className="category-input">
              <select
                type="text"
                value={categoryInput}
                onChange={handleCategoryInputChange}
                placeholder="Enter category"
              >
                <option value="">select option</option>
                <option value="officespace">officespace</option>
                <option value="shop">shop</option>
                <option value="restaurant">restuarant</option>
                <option value="other">other</option>
               </select> 
              <button type="button" onClick={handleAddCategory}>
                Add Category
              </button>
            </div>
            <div className="category-list">
              {categories.length > 0 && (
                <ul>
                  {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="form-field">
            <label>Return</label>
            <input
              type="text"
              value={formData.Return}
              onChange={(e) => handleInputChange('Return', e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Amenties </label>
            <div className="category-input">
              <input
                type="text"
                value={amentiesinput}
                onChange={handleAmentiesInputChange}
                placeholder="Enter amenties"
              />
              <button type="button" onClick={handleAddAmenities}>
                Add Amenties
              </button>
            </div>
            <div className="category-list">
              {amenities.length > 0 && (
                <ul>
                  {amenities.map((amentity, index) => (
                    <li key={index}>{amentity}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Possession Date</label>
            <input
              type="text"
              value={formData.Possession_Date}
              onChange={(e) => handleInputChange('Possession_Date', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Builder</label>
            <input
              type="text"
              value={formData.Builder}
              onChange={(e) => handleInputChange('Builder', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Construction Status</label>
            <select
             select
              value={formData.Construction}
              onChange={(e) => handleInputChange('Construction', e.target.value)}
            >
            <option value="">select option</option>
            <option value="Ready To Move">Ready To Move</option>
            <option value="Under Construction">Under Construction</option>
            <option value="New Launch">New Launch</option>
            </select>
          </div>
          <div className="form-field">
            <label>Project Unit</label>
            <input
              type="number"
              value={formData.Project_Unit}
              onChange={(e) => handleInputChange('Project_Unit', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Latitude</label>
            <input
              type="text"
              value={formData.lat}
              onChange={(e) => handleInputChange('lat', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Longitude</label>
            <input
              type="text"
              value={formData.lng}
              onChange={(e) => handleInputChange('lng', e.target.value)}
            />
          </div>
        </div>

        <label>Description</label>
        <input
          type="text"
          value={formData.Description}
          onChange={(e) => handleInputChange('Description', e.target.value)}
        />
        <br />

        <label>RERA ID</label>
        <input
          type="text"
          value={formData.reraid}
          onChange={(e) => handleInputChange('reraid', e.target.value)}
        />
        <br />

        <label>Project Area Range</label>
        <input
          type="text"
          value={formData.Project_Area_Range}
          onChange={(e) => handleInputChange('Project_Area_Range', e.target.value)}
        />
        <br />
        <label>Video id</label>
        <input
          type="text"
          value={formData.videoid}
          onChange={(e) => handleInputChange('videoid', e.target.value)}
        />
        <br />
        {/* File Uploads */}
        <label>Banner Image</label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, 'Image_banner')}
        />
        <br />

        <label>Face Image</label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, 'Face_image')}
        />
        <br />

        <label>Main Image</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e, 'Main_image')}
        />
        <br />

        <label>Floor Plan</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e, 'floorplan')}
        />
        <br />

        <label>Office Image</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e, 'office_image')}
        />
        <br />

        <label>Retail Shop</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e, 'Retail_shop')}
        />
        <br />

        <label>Restaurant</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e, 'Restuarant')}
        />
        <br />

        <label>Other</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e, 'other')}
        />
        <br />

        {/* Distance fields */}
        <h3>Distances</h3>
        {distances.map((distance, index) => (
          <div key={index}>
            <label>Location Name:</label>
            <input
              type="text"
              value={distance.name}
              onChange={(e) => handleDistanceInputChange(index, 'name', e.target.value)}
              placeholder="Enter location name"
            />
            <br />
            <label>Distance:</label>
            <input
              type="text"
              value={distance.distance}
              onChange={(e) => handleDistanceInputChange(index, 'distance', e.target.value)}
              placeholder="Enter distance"
            />
            <br />
          </div>
        ))}
        <button type="button" onClick={addDistanceField}>Add Distance</button>
        <br />

        <button type="submit">Submit</button>
      </form>
      {query && (
        <div className="sql-query-display">
          <h3>Generated SQL Query:</h3>
          <pre>{query}</pre>
        </div>
      )}
    </div>
    </>
  );
}

export default LeaseProperty;
