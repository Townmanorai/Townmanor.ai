// import React from 'react'
// import { Link ,useParams } from 'react-router-dom';
// import TopRentedProperties from '../HomePage/TopRentedProperties';
// import ExclusiveOwnerProperties from '../HomePage/ExclusiveOwnerProperties';

// const CityWise = () => {

//     const { cityName } = useParams(); // Get the selected state from the URL
//     const { stateName } = useParams(); 


// const dummyCitiesData = {
//     'Uttar Pradesh': {
//         cities: [
//             { city_name: 'Lucknow' },
//             { city_name: 'Kanpur' },
//             { city_name: 'Varanasi' },
//             { city_name: 'Agra' },
//             { city_name: 'Meerut' }
//         ],
//         reraLink: 'https://www.up-rera.in/projects'
//     },
//     'Delhi': {
//         cities: [
//             { city_name: 'New Delhi' },
//             { city_name: 'Dwarka' },
//             { city_name: 'Rohini' },
//             { city_name: 'Pitampura' },
//             { city_name: 'Lajpat Nagar' }
//         ],
//         reraLink: 'https://rera.delhi.gov.in/'
//     },
//     'Madhya Pradesh': {
//         cities: [
//             { city_name: 'Bhopal' },
//             { city_name: 'Indore' },
//             { city_name: 'Gwalior' },
//             { city_name: 'Jabalpur' },
//             { city_name: 'Ujjain' }
//         ],
//         reraLink: 'https://aiforera.in/StatewiseRera/stateRera/TGk1NC9SY2NmZXJ2bkw0TFJJR3czZz09'
//     },
//     'Maharashtra': {
//         cities: [
//             { city_name: 'Mumbai' },
//             { city_name: 'Pune' },
//             { city_name: 'Nagpur' },
//             { city_name: 'Thane' },
//             { city_name: 'Nashik' }
//         ],
//         reraLink: 'https://maharera.mahaonline.gov.in/'
//     },
//     'Bihar': {
//         cities: [
//             { city_name: 'Patna' },
//             { city_name: 'Gaya' },
//             { city_name: 'Bhagalpur' },
//             { city_name: 'Darbhanga' },
//             { city_name: 'Muzaffarpur' }
//         ],
//         reraLink: 'http://bihar-rera.in/'
//     },
//     'Karnataka': {
//         cities: [
//             { city_name: 'Bengaluru' },
//             { city_name: 'Mysuru' },
//             { city_name: 'Hubli' },
//             { city_name: 'Dharwad' },
//             { city_name: 'Mangalore' }
//         ],
//         reraLink: 'https://rera.karnataka.gov.in/'
//     },
//     'Tamil Nadu': {
//         cities: [
//             { city_name: 'Chennai' },
//             { city_name: 'Coimbatore' },
//             { city_name: 'Madurai' },
//             { city_name: 'Tiruchirappalli' },
//             { city_name: 'Salem' }
//         ],
//         reraLink: 'https://www.tnrera.in/'
//     },
//     'Rajasthan': {
//         cities: [
//             { city_name: 'Jaipur' },
//             { city_name: 'Udaipur' },
//             { city_name: 'Jodhpur' },
//             { city_name: 'Ajmer' },
//             { city_name: 'Bikaner' }
//         ],
//         reraLink: 'https://rera.rajasthan.gov.in/'
//     },
//     'West Bengal': {
//         cities: [
//             { city_name: 'Kolkata' },
//             { city_name: 'Siliguri' },
//             { city_name: 'Howrah' },
//             { city_name: 'Durgapur' },
//             { city_name: 'Asansol' }
//         ],
//         reraLink: 'https://www.wbregistration.gov.in/'
//     },
//     'Telangana': {
//         cities: [
//             { city_name: 'Hyderabad' },
//             { city_name: 'Warangal' },
//             { city_name: 'Nizamabad' },
//             { city_name: 'Khammam' },
//             { city_name: 'Mahbubnagar' }
//         ],
//         reraLink: 'https://www.tsrera.telangana.gov.in/'
//     },
//     'Andhra Pradesh': {
//         cities: [
//             { city_name: 'Visakhapatnam' },
//             { city_name: 'Vijayawada' },
//             { city_name: 'Guntur' },
//             { city_name: 'Nellore' },
//             { city_name: 'Kadapa' }
//         ],
//         reraLink: 'https://rera.ap.gov.in/'
//     },
//     'Gujarat': {
//         cities: [
//             { city_name: 'Ahmedabad' },
//             { city_name: 'Surat' },
//             { city_name: 'Vadodara' },
//             { city_name: 'Rajkot' },
//             { city_name: 'Bhavnagar' }
//         ],
//         reraLink: 'https://gujrera.gujarat.gov.in/'
//     },
//     'Haryana': {
//         cities: [
//             { city_name: 'Gurgaon' },
//             { city_name: 'Faridabad' },
//             { city_name: 'Hisar' },
//             { city_name: 'Panipat' },
//             { city_name: 'Ambala' }
//         ],
//         reraLink: 'https://haryanarera.gov.in/'
//     },
//     'Punjab': {
//         cities: [
//             { city_name: 'Chandigarh' },
//             { city_name: 'Ludhiana' },
//             { city_name: 'Amritsar' },
//             { city_name: 'Jalandhar' },
//             { city_name: 'Patiala' }
//         ],
//         reraLink: 'https://punjab-rera.in/'
//     },
//     'Kerala': {
//         cities: [
//             { city_name: 'Thiruvananthapuram' },
//             { city_name: 'Kochi' },
//             { city_name: 'Kozhikode' },
//             { city_name: 'Kottayam' },
//             { city_name: 'Malappuram' }
//         ],
//         reraLink: 'http://rera.kerala.gov.in/'
//     },
//     'Odisha': {
//         cities: [
//             { city_name: 'Bhubaneswar' },
//             { city_name: 'Cuttack' },
//             { city_name: 'Rourkela' },
//             { city_name: 'Berhampur' },
//             { city_name: 'Sambalpur' }
//         ],
//         reraLink: 'http://odisharera.in/'
//     },
//     'Assam': {
//         cities: [
//             { city_name: 'Guwahati' },
//             { city_name: 'Dibrugarh' },
//             { city_name: 'Silchar' },
//             { city_name: 'Tezpur' },
//             { city_name: 'Nagaon' }
//         ],
//         reraLink: 'https://rera.assam.gov.in/'
//     },
//     'Jammu and Kashmir': {
//         cities: [
//             { city_name: 'Srinagar' },
//             { city_name: 'Jammu' },
//             { city_name: 'Anantnag' },
//             { city_name: 'Baramulla' },
//             { city_name: 'Kupwara' }
//         ],
//         reraLink: 'https://jkrera.nic.in/'
//     },
//     'Chhattisgarh': {
//         cities: [
//             { city_name: 'Raipur' },
//             { city_name: 'Bilaspur' },
//             { city_name: 'Durg' },
//             { city_name: 'Korba' },
//             { city_name: 'Rajnandgaon' }
//         ],
//         reraLink: 'https://cg-rera.in/'
//     },
//     'Uttarakhand': {
//         cities: [
//             { city_name: 'Dehradun' },
//             { city_name: 'Haridwar' },
//             { city_name: 'Nainital' },
//             { city_name: 'Rudrapur' },
//             { city_name: 'Roorkee' }
//         ],
//         reraLink: 'https://ukrera.in/'
//     },
//     'Himachal Pradesh': {
//         cities: [
//             { city_name: 'Shimla' },
//             { city_name: 'Dharamshala' },
//             { city_name: 'Kullu' },
//             { city_name: 'Manali' },
//             { city_name: 'Solan' }
//         ],
//         reraLink: 'https://www.hprera.in/'
//     },
//     'Tripura': {
//         cities: [
//             { city_name: 'Agartala' },
//             { city_name: 'Udaipur' },
//             { city_name: 'Dharmanagar' },
//             { city_name: 'Ambassa' },
//             { city_name: 'Teliamura' }
//         ],
//         reraLink: 'http://www.tripurarera.in/'
//     },
//     'Nagaland': {
//         cities: [
//             { city_name: 'Kohima' },
//             { city_name: 'Dimapur' },
//             { city_name: 'Mokokchung' },
//             { city_name: 'Wokha' },
//             { city_name: 'Peren' }
//         ],
//         reraLink: 'https://nagalandrera.in/'
//     },
//     'Manipur': {
//         cities: [
//             { city_name: 'Imphal' },
//             { city_name: 'Thoubal' },
//             { city_name: 'Churachandpur' },
//             { city_name: 'Kakching' },
//             { city_name: 'Bishnupur' }
//         ],
//         reraLink: 'http://manipurrera.in/'
//     },
//     'Meghalaya': {
//         cities: [
//             { city_name: 'Shillong' },
//             { city_name: 'Tura' },
//             { city_name: 'Jowai' },
//             { city_name: 'Nongpoh' },
//             { city_name: 'Williamnagar' }
//         ],
//         reraLink: 'https://meghalayarera.in/'
//     },
//     'Sikkim': {
//         cities: [
//             { city_name: 'Gangtok' },
//             { city_name: 'Namchi' },
//             { city_name: 'Pelling' },
//             { city_name: 'Gyalshing' },
//             { city_name: 'Mangan' }
//         ],
//         reraLink: 'http://sikkimrera.in/'
//     },
//     'Arunachal Pradesh': {
//         cities: [
//             { city_name: 'Itanagar' },
//             { city_name: 'Naharlagun' },
//             { city_name: 'Pasighat' },
//             { city_name: 'Tezpur' },
//             { city_name: 'Tawang' }
//         ],
//         reraLink: 'http://aprera.in/'
//     },
//     'Andaman and Nicobar Islands': {
//         cities: [
//             { city_name: 'Port Blair' },
//             { city_name: 'Diglipur' },
//             { city_name: 'Havelock' },
//             { city_name: 'Neil Island' },
//             { city_name: 'Baratang' }
//         ],
//         reraLink: 'https://andaman.gov.in/'
//     },
//     'Lakshadweep': {
//         cities: [
//             { city_name: 'Kavaratti' },
//             { city_name: 'Agatti' },
//             { city_name: 'Minicoy' },
//             { city_name: 'Kadmat' },
//             { city_name: 'Amini' }
//         ],
//         reraLink: 'http://lakshadweep.gov.in/'
//     }
// };



//     const cities = dummyCitiesData[stateName] || []; 
//     // const otherCities = cities.filter(city => city.city_name !== cityName);
//     const stateData = dummyCitiesData[stateName] || {};
//     // const cities = stateData.cities || [];
//     const reraLink = stateData.reraLink || '';
//     return (
//         <>
//         <div className="state-details-page">
//             <h2 className="State-name">{cityName}</h2>
//             <div className="options-container">
//                 <Link to={`/properties-for-sale-rent/${cityName}`}>Properties For Sale/Rent</Link>
//                 <Link to={`/pay-house-tax-online/${cityName}`}>Pay House Tax Online</Link>
//                 <Link to={`/land-record-verification/${cityName}`}>Land Record Verification</Link>
//                 {/* <Link to={`/rera/${cityName}`}>RERA</Link> */}
//                 <a href={reraLink} target="_blank" rel="noopener noreferrer">RERA</a>
//             </div>

//             {/* <div className="cities-list">
//                     <h3>Other Cities in {stateName}</h3>
//                     <ul>
//                         {otherCities.map((city, index) => (
//                             <li key={index}>
//                                 <Link to={`/stateName/${stateName}/city/${city.city_name}`}>{city.city_name}</Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </div> */}
//                 <div className="cities-list">
//                     <h3>Other Cities in {stateName}</h3>
//                     <ul>
//                         {cities
//                             .filter(city => city.city_name !== cityName) // Exclude the current city
//                             .map((city, index) => (
//                                 <li key={index}>
//                                     <Link to={`/stateName/${stateName}/city/${city.city_name}`}>{city.city_name}</Link>
//                                 </li>
//                             ))}
//                     </ul>
//                 </div>
//         </div>
//         <ExclusiveOwnerProperties stateName={cityName} />
//         <TopRentedProperties stateName={cityName} />
//         </>
//     );
// };

// export default CityWise

// -------------------------------------------------------------------------------------------------------


// import React from 'react';
// import { Link, useParams } from 'react-router-dom';
// import TopRentedProperties from '../HomePage/TopRentedProperties';
// import ExclusiveOwnerProperties from '../HomePage/ExclusiveOwnerProperties';

// const CityWise = () => {
//     const { cityName, stateName } = useParams(); 

//     const dummyCitiesData = {
//         'Uttar Pradesh': {
//             cities: [
//                 { city_name: 'Lucknow' },
//                 { city_name: 'Kanpur' },
//                 { city_name: 'Varanasi' },
//                 { city_name: 'Agra' },
//                 { city_name: 'Meerut' }
//             ],
//             reraLink: 'https://www.up-rera.in/projects'
//         },
//         'Delhi': {
//             cities: [
//                 { city_name: 'New Delhi' },
//                 { city_name: 'Dwarka' },
//                 { city_name: 'Rohini' },
//                 { city_name: 'Pitampura' },
//                 { city_name: 'Lajpat Nagar' }
//             ],
//             reraLink: 'https://rera.delhi.gov.in/'
//         },
//         'Madhya Pradesh': {
//             cities: [
//                 { city_name: 'Bhopal' },
//                 { city_name: 'Indore' },
//                 { city_name: 'Gwalior' },
//                 { city_name: 'Jabalpur' },
//                 { city_name: 'Ujjain' }
//             ],
//             reraLink: 'https://aiforera.in/StatewiseRera/stateRera/TGk1NC9SY2NmZXJ2bkw0TFJJR3czZz09'
//         },
//         'Maharashtra': {
//             cities: [
//                 { city_name: 'Mumbai' },
//                 { city_name: 'Pune' },
//                 { city_name: 'Nagpur' },
//                 { city_name: 'Thane' },
//                 { city_name: 'Nashik' }
//             ],
//             reraLink: 'https://maharera.mahaonline.gov.in/'
//         },
//         'Bihar': {
//             cities: [
//                 { city_name: 'Patna' },
//                 { city_name: 'Gaya' },
//                 { city_name: 'Bhagalpur' },
//                 { city_name: 'Darbhanga' },
//                 { city_name: 'Muzaffarpur' }
//             ],
//             reraLink: 'http://bihar-rera.in/'
//         },
//         'Karnataka': {
//             cities: [
//                 { city_name: 'Bengaluru' },
//                 { city_name: 'Mysuru' },
//                 { city_name: 'Hubli' },
//                 { city_name: 'Dharwad' },
//                 { city_name: 'Mangalore' }
//             ],
//             reraLink: 'https://rera.karnataka.gov.in/'
//         },
//         'Tamil Nadu': {
//             cities: [
//                 { city_name: 'Chennai' },
//                 { city_name: 'Coimbatore' },
//                 { city_name: 'Madurai' },
//                 { city_name: 'Tiruchirappalli' },
//                 { city_name: 'Salem' }
//             ],
//             reraLink: 'https://www.tnrera.in/'
//         },
//         'Rajasthan': {
//             cities: [
//                 { city_name: 'Jaipur' },
//                 { city_name: 'Udaipur' },
//                 { city_name: 'Jodhpur' },
//                 { city_name: 'Ajmer' },
//                 { city_name: 'Bikaner' }
//             ],
//             reraLink: 'https://rera.rajasthan.gov.in/'
//         },
//         'West Bengal': {
//             cities: [
//                 { city_name: 'Kolkata' },
//                 { city_name: 'Siliguri' },
//                 { city_name: 'Howrah' },
//                 { city_name: 'Durgapur' },
//                 { city_name: 'Asansol' }
//             ],
//             reraLink: 'https://www.wbregistration.gov.in/'
//         },
//         'Telangana': {
//             cities: [
//                 { city_name: 'Hyderabad' },
//                 { city_name: 'Warangal' },
//                 { city_name: 'Nizamabad' },
//                 { city_name: 'Khammam' },
//                 { city_name: 'Mahbubnagar' }
//             ],
//             reraLink: 'https://www.tsrera.telangana.gov.in/'
//         },
//         'Andhra Pradesh': {
//             cities: [
//                 { city_name: 'Visakhapatnam' },
//                 { city_name: 'Vijayawada' },
//                 { city_name: 'Guntur' },
//                 { city_name: 'Nellore' },
//                 { city_name: 'Kadapa' }
//             ],
//             reraLink: 'https://rera.ap.gov.in/'
//         },
//         'Gujarat': {
//             cities: [
//                 { city_name: 'Ahmedabad' },
//                 { city_name: 'Surat' },
//                 { city_name: 'Vadodara' },
//                 { city_name: 'Rajkot' },
//                 { city_name: 'Bhavnagar' }
//             ],
//             reraLink: 'https://gujrera.gujarat.gov.in/'
//         },
//         'Haryana': {
//             cities: [
//                 { city_name: 'Gurgaon' },
//                 { city_name: 'Faridabad' },
//                 { city_name: 'Hisar' },
//                 { city_name: 'Panipat' },
//                 { city_name: 'Ambala' }
//             ],
//             reraLink: 'https://haryanarera.gov.in/'
//         },
//         'Punjab': {
//             cities: [
//                 { city_name: 'Chandigarh' },
//                 { city_name: 'Ludhiana' },
//                 { city_name: 'Amritsar' },
//                 { city_name: 'Jalandhar' },
//                 { city_name: 'Patiala' }
//             ],
//             reraLink: 'https://punjab-rera.in/'
//         },
//         'Kerala': {
//             cities: [
//                 { city_name: 'Thiruvananthapuram' },
//                 { city_name: 'Kochi' },
//                 { city_name: 'Kozhikode' },
//                 { city_name: 'Kottayam' },
//                 { city_name: 'Malappuram' }
//             ],
//             reraLink: 'http://rera.kerala.gov.in/'
//         },
//         'Odisha': {
//             cities: [
//                 { city_name: 'Bhubaneswar' },
//                 { city_name: 'Cuttack' },
//                 { city_name: 'Rourkela' },
//                 { city_name: 'Berhampur' },
//                 { city_name: 'Sambalpur' }
//             ],
//             reraLink: 'http://odisharera.in/'
//         },
//         'Assam': {
//             cities: [
//                 { city_name: 'Guwahati' },
//                 { city_name: 'Dibrugarh' },
//                 { city_name: 'Silchar' },
//                 { city_name: 'Tezpur' },
//                 { city_name: 'Nagaon' }
//             ],
//             reraLink: 'https://rera.assam.gov.in/'
//         },
//         'Jammu and Kashmir': {
//             cities: [
//                 { city_name: 'Srinagar' },
//                 { city_name: 'Jammu' },
//                 { city_name: 'Anantnag' },
//                 { city_name: 'Baramulla' },
//                 { city_name: 'Kupwara' }
//             ],
//             reraLink: 'https://jkrera.nic.in/'
//         },
//         'Chhattisgarh': {
//             cities: [
//                 { city_name: 'Raipur' },
//                 { city_name: 'Bilaspur' },
//                 { city_name: 'Durg' },
//                 { city_name: 'Korba' },
//                 { city_name: 'Rajnandgaon' }
//             ],
//             reraLink: 'https://cg-rera.in/'
//         },
//         'Uttarakhand': {
//             cities: [
//                 { city_name: 'Dehradun' },
//                 { city_name: 'Haridwar' },
//                 { city_name: 'Nainital' },
//                 { city_name: 'Rudrapur' },
//                 { city_name: 'Roorkee' }
//             ],
//             reraLink: 'https://ukrera.in/'
//         },
//         'Himachal Pradesh': {
//             cities: [
//                 { city_name: 'Shimla' },
//                 { city_name: 'Dharamshala' },
//                 { city_name: 'Kullu' },
//                 { city_name: 'Manali' },
//                 { city_name: 'Solan' }
//             ],
//             reraLink: 'https://www.hprera.in/'
//         },
//         'Tripura': {
//             cities: [
//                 { city_name: 'Agartala' },
//                 { city_name: 'Udaipur' },
//                 { city_name: 'Dharmanagar' },
//                 { city_name: 'Ambassa' },
//                 { city_name: 'Teliamura' }
//             ],
//             reraLink: 'http://www.tripurarera.in/'
//         },
//         'Nagaland': {
//             cities: [
//                 { city_name: 'Kohima' },
//                 { city_name: 'Dimapur' },
//                 { city_name: 'Mokokchung' },
//                 { city_name: 'Wokha' },
//                 { city_name: 'Peren' }
//             ],
//             reraLink: 'https://nagalandrera.in/'
//         },
//         'Manipur': {
//             cities: [
//                 { city_name: 'Imphal' },
//                 { city_name: 'Thoubal' },
//                 { city_name: 'Churachandpur' },
//                 { city_name: 'Kakching' },
//                 { city_name: 'Bishnupur' }
//             ],
//             reraLink: 'http://manipurrera.in/'
//         },
//         'Meghalaya': {
//             cities: [
//                 { city_name: 'Shillong' },
//                 { city_name: 'Tura' },
//                 { city_name: 'Jowai' },
//                 { city_name: 'Nongpoh' },
//                 { city_name: 'Williamnagar' }
//             ],
//             reraLink: 'https://meghalayarera.in/'
//         },
//         'Sikkim': {
//             cities: [
//                 { city_name: 'Gangtok' },
//                 { city_name: 'Namchi' },
//                 { city_name: 'Pelling' },
//                 { city_name: 'Gyalshing' },
//                 { city_name: 'Mangan' }
//             ],
//             reraLink: 'http://sikkimrera.in/'
//         },
//         'Arunachal Pradesh': {
//             cities: [
//                 { city_name: 'Itanagar' },
//                 { city_name: 'Naharlagun' },
//                 { city_name: 'Pasighat' },
//                 { city_name: 'Tezpur' },
//                 { city_name: 'Tawang' }
//             ],
//             reraLink: 'http://aprera.in/'
//         },
//         'Andaman and Nicobar Islands': {
//             cities: [
//                 { city_name: 'Port Blair' },
//                 { city_name: 'Diglipur' },
//                 { city_name: 'Havelock' },
//                 { city_name: 'Neil Island' },
//                 { city_name: 'Baratang' }
//             ],
//             reraLink: 'https://andaman.gov.in/'
//         },
//         'Lakshadweep': {
//             cities: [
//                 { city_name: 'Kavaratti' },
//                 { city_name: 'Agatti' },
//                 { city_name: 'Minicoy' },
//                 { city_name: 'Kadmat' },
//                 { city_name: 'Amini' }
//             ],
//             reraLink: 'http://lakshadweep.gov.in/'
//         }
//     };

//     const stateData = dummyCitiesData[stateName];
//     const cities = stateData?.cities || []; // Use optional chaining and default to an empty array

//     console.log("State Data:", stateData); // Log state data
//     console.log("Cities:", cities); // Log cities

//     return (
//         <>
//             <div className="state-details-page">
//                 <h2 className="State-name">{cityName}</h2>
//                 <div className="options-container">
//                     <Link to={`/properties-for-sale-rent/${cityName}`}>Properties For Sale/Rent</Link>
//                     <Link to={`/pay-house-tax-online/${cityName}`}>Pay House Tax Online</Link>
//                     <Link to={`/land-record-verification/${cityName}`}>Land Record Verification</Link>
//                     <Link to={stateData?.reraLink} target="_blank" rel="noopener noreferrer">RERA</Link>
//                 </div>

//                 <div className="cities-list">
//                     <h3>Other Cities in {stateName}</h3>
//                     <ul>
//                         {cities
//                             .filter(city => city.city_name !== cityName) // Exclude the current city
//                             .map((city, index) => (
//                                 <li key={index}>
//                                     <Link to={`/stateName/${stateName}/city/${city.city_name}`}>{city.city_name}</Link>
//                                 </li>
//                             ))}
//                     </ul>
//                 </div>
//             </div>
//             <TopRentedProperties stateName={cityName} />
//             <ExclusiveOwnerProperties stateName={cityName} />
//         </>
//     );
// };

// export default CityWise;


// ----------------------------------------------------------------------------------------------------------

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TopRentedProperties from '../HomePage/TopRentedProperties';
import ExclusiveOwnerProperties from '../HomePage/ExclusiveOwnerProperties';
import dummyCitiesData from '../../JsonData/ecity.json'; 
import NewLaunchedProjects from '../HomePage/NewLaunchedProjects';
import UpComingProjects from '../HomePage/UpComingProjects';

const CityWise = () => {
    const { cityName, stateName } = useParams();

    // Use the imported JSON data
    const stateData = dummyCitiesData[stateName];
    const cities = stateData?.cities || []; // Use optional chaining and default to an empty array

    // Find the current city object
    const currentCity = cities.find(city => city.city_name === cityName);

    console.log("State Data:", stateData); // Log state data
    console.log("Cities:", cities); // Log cities

    return (
        <>
            <div className="state-details-page">
                <h2 className="State-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {currentCity && (
                        <img
                            src={currentCity.image}
                            alt={currentCity.city_name}
                            style={{
                                width: '50px',
                                height: '50px',
                                marginRight: '10px',
                                borderRadius: '15px'
                            }}
                        />
                    )}
                    {cityName}
                </h2>
                <div className="options-container">
                    <Link to={`/properties-for-sale-rent/${cityName}`} style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src="/property-images.png"alt={currentCity.city_name}
                            style={{width: '50px',height: '50px',marginRight: '5px',borderRadius: '15px'}}
                        />
                        Properties For Sale/Rent
                    </Link>

                    <Link to={`/pay-house-tax-online/${cityName}`} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                            src="/house-tax.jpeg"alt={currentCity.city_name}
                            style={{width: '50px',height: '50px',marginRight: '5px',borderRadius: '15px'}}
                        />
                    Pay House Tax Online</Link>

                    <Link to={`/land-record-verification/${cityName}`} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                            src="/lang-veri-images.png"alt={currentCity.city_name}
                            style={{width: '50px',height: '50px',marginRight: '5px',borderRadius: '15px'}}
                        />
                    Land Record Verification</Link>

                    <Link to={stateData?.reraLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                            src="/rera-logo.png"alt={currentCity.city_name}
                            style={{width: '50px',height: '50px',marginRight: '5px',borderRadius: '15px'}}
                        />
                    RERA</Link>
                </div>

                <div className="cities-list">
                    <h3>Other Cities in {stateName}</h3>
                    <ul>
                        {cities
                            .filter(city => city.city_name !== cityName) // Exclude the current city
                            .map((city, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Link to={`/stateName/${stateName}/city/${city.city_name}`} style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src={city.image}
                                            alt={city.city_name}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                marginRight: '10px',
                                                borderRadius: '15px'
                                            }}
                                        />
                                        <span style={{ textAlign: 'center' }}>{city.city_name}</span>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div className='mt-4'>
            <NewLaunchedProjects stateName={cityName}/>
            <TopRentedProperties stateName={cityName} />
            <ExclusiveOwnerProperties stateName={cityName} />
            <UpComingProjects stateName={cityName}/>
            </div>
            
        </>
    );
};

export default CityWise;
