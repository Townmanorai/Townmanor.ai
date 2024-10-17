// // api.js or estateService.js
// const API_BASE_URL = 'https://your-api-endpoint.com'; // Replace with your actual API base URL

// // Function to get estate data
// export const getEstateData = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/estates`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching estate data:', error);
//     return [];
//   }
// };

// // You can define more functions here, for example:

// // Function to get estate details by ID
// export const getEstateById = async (id) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/estates/${id}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`Error fetching estate with ID ${id}:`, error);
//     return null;
//   }
// };

// // Function to submit estate form data (if needed)
// export const submitEstateData = async (estate) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/estates`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(estate)
//     });
//     if (!response.ok) {
//       throw new Error('Failed to submit estate data');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error submitting estate data:', error);
//     return null;
//   }
// };


const API_BASE_URL = './data'; // Update to point to your local data directory

// Function to get estate data
export const getEstateData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/estates.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching estate data:', error);
    return [];
  }
};

// Function to get estate details by ID
export const getEstateById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/estate.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.id === id ? data : null;
  } catch (error) {
    console.error(`Error fetching estate with ID ${id}:`, error);
    return null;
  }
};

// Function to generate HTML for marker
export const generateMarkerHtml = (item) => {
  let innerMarker = '<div class="marker-container"><div class="marker-card"><div class="front face"><i class="la la-home"></i></div><div class="back face"><i class="la la-home"></i></div><div class="marker-arrow"></div></div></div>';
  
  if (item.icon) {
    innerMarker = `<div class="marker-container marker-container-image"><div class="marker-card"><div class="front face"><img src="${item.icon}" alt="icon"></img></div></div><div class="marker-arrow"></div></div>`;
  } else if (item.fontIconCode) {
    innerMarker = `<div class="marker-container"><div class="marker-card"><div class="front face"><i class="${item.fontIconCode}"></i></div><div class="back face"><i class="${item.fontIconCode}"></i></div><div class="marker-arrow"></div></div></div>`;
  }
  
  
  return innerMarker;
};

// Function to generate popup content for marker
export const generatePopupContent = (item) => {
  return `
    <div class="popup-content" style="background-color: white; padding: 10px; border-radius: 8px;">
     ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: auto; border-radius: 8px;" />` : ''}
      <h3>${item.name}</h3>
      <p><strong>Price:</strong> ${item.price}</p>
      <p><strong>Description:</strong> ${item.description}</p>
     
    </div>
  `;
};