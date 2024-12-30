import React, { useState } from 'react';
import './LeaseProperty.css';  // Import the CSS file
import { useNavigate } from 'react-router-dom';

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
    setFormData({
      ...formData,
      [field]: value,
    });
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
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput('');
    }
  };
  const handleAmentiesInputChange = (e) => {
    setamentiesinput(e.target.value);
  };

  // Handle adding category (tag)
  const handleAddAmmenties = () => {
    if (amentiesinput.trim() !== '') {
      setamenties([...amenities, amentiesinput.trim()]);
      setamentiesinput('');
    }
  };
  // Handle file input changes
  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      [field]: files,
    });
  };
  const handleFileChange2 = (e, type) => {
    const file = e.target.files[0];  // Since only one file can be uploaded at a time
    if (type === 'Image_banner') {
      setImageBanner(file);  // Store image banner
    } else if (type === 'Face_image') {
      setFaceImage(file);  // Store face image
    }
  };
  // Handle form submission and create JSON object
  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      Image_banner: imageBanner ? imageBanner.name : '',
      Face_image: faceImage ? faceImage.name : '',
      // Handle other fields for multiple files like floorplan, Main_image, etc.
    };

    console.log('Submitted JSON data:', JSON.stringify(submissionData));
    console.log(formData.Face_image)
    setFormData({
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
    setCategories([]);
    const sqlQuery = `
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
        '${JSON.stringify(categories)}', 
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
        '${JSON.stringify(amenities)}', 
        '${JSON.stringify(distances)}', 
               '${imageBanner ? imageBanner.name : ''}',  
        '${faceImage ? faceImage.name : ''}',  
       '${JSON.stringify(formData.floorplan.map((file) => file.name))}', 
        '${JSON.stringify(formData.Main_image.map((file) => file.name))}', 
        '${JSON.stringify(formData.office_image.map((file) => file.name))}', 
        '${JSON.stringify(formData.Retail_shop.map((file) => file.name))}', 
        '${JSON.stringify(formData.Restuarant.map((file) => file.name))}', 
        '${JSON.stringify(formData.other.map((file) => file.name))}'
    );
    `;
    setquery(sqlQuery);
    // Log the SQL query
    console.log('Generated SQL Query:', sqlQuery);

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
              <option>Noida</option>
              <option>Gurugram</option>
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
              <input
                type="text"
                value={categoryInput}
                onChange={handleCategoryInputChange}
                placeholder="Enter category"
              />
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
              <button type="button" onClick={handleAddAmmenties}>
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
            <input
              type="text"
              value={formData.Construction}
              onChange={(e) => handleInputChange('Construction', e.target.value)}
            />
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
          onChange={(e) => handleFileChange2(e, 'Image_banner')}
        />
        <br />

        <label>Face Image</label>
        <input
          type="file"
          onChange={(e) => handleFileChange2(e, 'Face_image')}
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
