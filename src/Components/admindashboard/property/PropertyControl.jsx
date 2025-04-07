import React, { useEffect, useState } from 'react';
import AdminAccesor from '../navbar/AdminAccesor';
import './PropertyTable.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PropertyControl() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dummydata, setdummydata] = useState([]);
  const [filters, setFilters] = useState({
    projectname: '',
    city: '',
    category: '',
    propertytype: ''
  });
  const itemsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.townmanor.ai/api/property');
        console.log(response)
        setdummydata(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteproperty = async (id) => {
    alert("Are Sure want to delete??");
    try {
      const response = await axios.delete(`https://www.townmanor.ai/api/owner-property/${id}`);
      alert("Property delete Successfully");
      setdummydata((prevData) => prevData.filter((item) => item.id !== id));

      if (currentPage > 1 && (dummydata.length - 1) % itemsPerPage === 0) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredProperties = dummydata.filter((item) => {
    return (
      (filters.projectname ? item.property_name.toLowerCase().includes(filters.projectname.toLowerCase()) : true) &&
      (filters.city ? item.city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
      (filters.category ? item.category.toLowerCase().includes(filters.category.toLowerCase()) : true) &&
      (filters.propertytype ? item.area_type.toLowerCase().includes(filters.propertytype.toLowerCase()) : true)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const Editnavigate = (id) => {
    navigate(`/editform/${id}`);
  };

  const getPaginationNumbers = () => {
    const maxPagesToShow = 5;
    const pageNumbers = [];
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const end = Math.min(totalPages, currentPage + Math.floor(maxPagesToShow / 2));

      if (start > 1) pageNumbers.push(1);
      if (start > 2) pageNumbers.push('...');

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < totalPages - 1) pageNumbers.push('...');
      if (end < totalPages) pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="property-management-layout">
      <div><AdminAccesor /></div>
      <div className="property-dashboard-container">
        <span className="property-dashboard__header-text">Property Listing Management Portal</span>
        <div className="property-filters__section">
          <div className="property-filters__input-group">
            <input 
              type="text" 
              name="projectname" 
              value={filters.projectname} 
              onChange={handleFilterChange}
              className="property-filters__input"
              placeholder="Project Name"
            />
            <button className="property-filters__button">Project Name</button>
          </div>
          <div className="property-filters__input-group">
            <input 
              type="text" 
              name="city" 
              value={filters.city} 
              onChange={handleFilterChange}
              className="property-filters__input"
              placeholder="City"
            />
            <button className="property-filters__button">Sort by City</button>
          </div>
          <div className="property-filters__input-group">
            <select 
              name="category" 
              value={filters.category} 
              onChange={handleFilterChange}
              className="property-filters__select"
            >
              <option value="">Select Category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
            <button className="property-filters__button">Sort by Category</button>
          </div>
          <div className="property-filters__input-group">
            <input 
              type="text" 
              name="propertytype" 
              value={filters.propertytype} 
              onChange={handleFilterChange}
              className="property-filters__input"
              placeholder="Property Type"
            />
            <button className="property-filters__button">Search by Property Type</button>
          </div>
        </div>

        <div className="property-table__container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>property_image</th>
                <th>property name</th>
                <th>city</th>
                <th>Address</th>
                <th>Category</th>
                <th>Construction Status</th>
                <th>configuration</th>
                <th>price</th>
                <th>preview</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentProperties.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {item.image_repository && item.image_repository.length > 0 ? (
                      <img 
                        src={item.image_repository.split(',')[0].trim()}
                        className="property-listing__thumbnail"
                        alt={item.property_name} 
                      />
                    ) : (
                      <img 
                        src="/default-image.jpg"
                        className="property-listing__thumbnail"
                        alt="Default property" 
                      />
                    )}
                  </td>
                  <td>{item.property_name}</td>
                  <td>{item.city}</td>
                  <td>{item.address}</td>
                  <td>{item.category}</td>
                  <td>{item.construction_status}</td>
                  <td>{item.configuration}</td>
                  <td>{item.price}{item.pricerange}</td>
                  <td>
                    <button className="property-action__button">
                      <img src="/preview.png" className="property-action__icon" alt="Preview" />
                    </button>
                  </td>
                  <td>
                    <button className="property-action__button">
                      <img 
                        src="/edit.png" 
                        className="property-action__icon" 
                        onClick={() => Editnavigate(item.id)} 
                        alt="Edit"
                      />
                    </button>
                  </td>
                  <td>
                    <button className="property-action__button">
                      <img 
                        src="/delete.png" 
                        className="property-action__icon" 
                        onClick={() => deleteproperty(item.id)} 
                        alt="Delete"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="property-pagination__container">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="property-filters__button"
            >
              Previous
            </button>

            {getPaginationNumbers().map((number, index) => (
              <button
                key={index}
                onClick={() => number !== '...' && paginate(number)}
                className={`property-filters__button ${number === currentPage ? 'property-filters__button--active' : ''}`}
                disabled={number === '...'}
              >
                {number}
              </button>
            ))}

            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages} 
              className="property-filters__button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyControl;
