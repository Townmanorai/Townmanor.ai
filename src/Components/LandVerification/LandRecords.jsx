import React from 'react'

function LandRecords() 

{
  // ------------------------------------------
  // State variables
  // ------------------------------------------
  const [states] = useState(['Madhya Pradesh']); // Example: only MP
  const [selectedState, setSelectedState] = useState('');

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [tehsils, setTehsils] = useState([]);
  const [selectedTehsil, setSelectedTehsil] = useState('');

  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState('');

  const [khasras, setKhasras] = useState([]);
  const [selectedKhasra, setSelectedKhasra] = useState('');

  // Mock property details (set after clicking "Search Land Records")
  const [propertyDetails, setPropertyDetails] = useState(null);

  // ------------------------------------------
  // Fetch District List (for MP) on mount
  // ------------------------------------------
  useEffect(() => {
    fetch(
      'https://kyc-api.surepass.io/api/v1/land-verification/madhya-pradesh/meta/district-list',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response?.data) {
          setDistricts(response.data);
        }
      })
      .catch((error) => console.error('Error fetching district list:', error));
  }, []);

  // ------------------------------------------
  // Handlers for dropdown changes
  // ------------------------------------------
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    // Reset dependent fields
    setSelectedDistrict('');
    setSelectedTehsil('');
    setSelectedVillage('');
    setSelectedKhasra('');
    setTehsils([]);
    setVillages([]);
    setKhasras([]);
    setPropertyDetails(null);
  };

  const handleDistrictChange = (e) => {
    const dist = e.target.value;
    setSelectedDistrict(dist);

    // Reset deeper fields
    setSelectedTehsil('');
    setSelectedVillage('');
    setSelectedKhasra('');
    setTehsils([]);
    setVillages([]);
    setKhasras([]);
    setPropertyDetails(null);

    // Fetch Tehsil list
    fetch(
      'https://kyc-api.surepass.io/api/v1/land-verification/madhya-pradesh/meta/tehsil-list',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({ district: dist }),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response?.data?.tehsil_list) {
          setTehsils(response.data.tehsil_list);
        }
      })
      .catch((error) => console.error('Error fetching tehsil list:', error));
  };

  const handleTehsilChange = (e) => {
    const tehsil = e.target.value;
    setSelectedTehsil(tehsil);

    // Reset deeper fields
    setSelectedVillage('');
    setSelectedKhasra('');
    setVillages([]);
    setKhasras([]);
    setPropertyDetails(null);

    // Fetch Village list
    fetch(
      'https://kyc-api.surepass.io/api/v1/land-verification/madhya-pradesh/meta/village-list',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({ district: selectedDistrict, tehsil }),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response?.data?.village_list) {
          setVillages(response.data.village_list);
        }
      })
      .catch((error) => console.error('Error fetching village list:', error));
  };

  const handleVillageChange = (e) => {
    const village = e.target.value;
    setSelectedVillage(village);

    // Reset deeper fields
    setSelectedKhasra('');
    setKhasras([]);
    setPropertyDetails(null);

    // Fetch Khasra list
    fetch(
      'https://kyc-api.surepass.io/api/v1/land-verification/madhya-pradesh/meta/khasra-list',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          district: selectedDistrict,
          tehsil: selectedTehsil,
          village,
        }),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response?.data?.khasra_list) {
          setKhasras(response.data.khasra_list);
        }
      })
      .catch((error) => console.error('Error fetching khasra list:', error));
  };

  const handleKhasraChange = (e) => {
    setSelectedKhasra(e.target.value);
    setPropertyDetails(null);
  };

  // ------------------------------------------
  // Search / Show Property Details
  // ------------------------------------------
  const handleSearchRecords = () => {
    // Typically, you'd call another endpoint to get property details
    // For now, we set a mock object to display
    setPropertyDetails({
      ownerName: 'John Smith',
      propertyId: 'GJ-12345-789',
      landCategory: 'Private',
      area: '2.5 Acres',
      address: '128 Main Street, Sector 7, Gandhinagar, Gujarat',
      verified: true,
    });
  };

  // ------------------------------------------
  // Inline styles to match the screenshot design
  // ------------------------------------------
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const topRowStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '20px',
  };

  const filterGroupStyle = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '4px',
  };

  const selectStyle = {
    width: '200px',
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const searchButtonStyle = {
    backgroundColor: '#000',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const bottomRowStyle = {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
  };

  const cardStyle = {
    flex: 1,
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
  };

  const cardHeaderStyle = {
    marginBottom: '16px',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const verifiedBadgeStyle = {
    display: 'inline-block',
    padding: '4px 8px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '4px',
    fontSize: '12px',
    marginBottom: '10px',
  };

  const detailsRowStyle = {
    marginBottom: '8px',
  };

  const buttonGroupStyle = {
    marginTop: '16px',
  };

  const smallButtonStyle = {
    padding: '8px 12px',
    fontSize: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    marginRight: '8px',
  };

  const mapPlaceholderStyle = {
    width: '100%',
    height: '200px',
    backgroundColor: '#f1f1f1',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
  };

  return (
    <div style={containerStyle}>
      {/* Top Filters Row */}
      <div style={topRowStyle}>
        <div style={filterGroupStyle}>
          {/* State */}
          <div>
            <label style={labelStyle} htmlFor="stateSelect">
              State
            </label>
            <select
              id="stateSelect"
              style={selectStyle}
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label style={labelStyle} htmlFor="districtSelect">
              District
            </label>
            <select
              id="districtSelect"
              style={selectStyle}
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedState}
            >
              <option value="">Select District</option>
              {districts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Tehsil */}
          <div>
            <label style={labelStyle} htmlFor="tehsilSelect">
              Taluka
            </label>
            <select
              id="tehsilSelect"
              style={selectStyle}
              value={selectedTehsil}
              onChange={handleTehsilChange}
              disabled={!selectedDistrict}
            >
              <option value="">Select Taluka</option>
              {tehsils.map((teh) => (
                <option key={teh} value={teh}>
                  {teh}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          style={searchButtonStyle}
          onClick={handleSearchRecords}
          disabled={!selectedTehsil} // or also require Khasra, up to you
        >
          Search Land Records
        </button>
      </div>

      {/* Bottom Content: Two Cards (Property Details & Location) */}
      <div style={bottomRowStyle}>
        {/* Property Details Card */}
        <div style={cardStyle}>
          {/* If property is verified, show the badge */}
          {propertyDetails?.verified && (
            <div style={verifiedBadgeStyle}>Verified</div>
          )}

          <div style={cardHeaderStyle}>Property Details</div>

          {propertyDetails ? (
            <>
              <div style={detailsRowStyle}>
                <strong>Owner Name:</strong> {propertyDetails.ownerName}
              </div>
              <div style={detailsRowStyle}>
                <strong>Property ID:</strong> {propertyDetails.propertyId}
              </div>
              <div style={detailsRowStyle}>
                <strong>Land Category:</strong> {propertyDetails.landCategory}
              </div>
              <div style={detailsRowStyle}>
                <strong>Area:</strong> {propertyDetails.area}
              </div>

              <div style={buttonGroupStyle}>
                <button style={smallButtonStyle}>Download Report</button>
                <button style={smallButtonStyle}>Print Details</button>
              </div>
            </>
          ) : (
            <div>No property details. Please search above.</div>
          )}
        </div>

        {/* Location Card */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>Location</div>
          {propertyDetails ? (
            <>
              <div style={mapPlaceholderStyle}>Map Placeholder</div>
              <div style={detailsRowStyle}>{propertyDetails.address}</div>
            </>
          ) : (
            <div>No location details yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandRecords