import React, { useState } from 'react';

const FavoritesContent = () => {
  const [favorites, setFavorites] = useState([]); // Dummy data can be set here
  return (
    <>
    <div className="widget-panel widget-submit">
        <div className="widget-header header-styles">
          <h2 className="title">Saved Property</h2>
        </div>
        <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="dataTables_length" id="DataTables_Table_0_length">
                <label>
                  Show
                  <select name="DataTables_Table_0_length" className="custom-select custom-select-sm form-control form-control-sm">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  entries
                </label>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div id="DataTables_Table_0_filter" className="dataTables_filter">
                <label>
                  Search
                  <input type="search" className="form-control form-control-sm" />
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <table className="table table-striped data_table dataTable no-footer dtr-inline" id="DataTables_Table_0" role="grid">
                <thead>
                  <tr role="row">
                    <th>#</th>
                    <th>Property</th>
                    <th>Language</th>
                    <th>Open</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {favorites.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="dataTables_empty">
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    favorites.map((favorite, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{favorite.property}</td>
                        <td>{favorite.language}</td>
                        <td><button className="btn btn-primary">Open</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-5">
              <div className="dataTables_info">Showing 0 to 0 of 0 entries</div>
            </div>
            <div className="col-sm-12 col-md-7">
              <div className="dataTables_paginate paging_simple_numbers">
                <ul className="pagination">
                  <li className="paginate_button page-item previous disabled">
                    <a href="#" className="page-link">Previous</a>
                  </li>
                  <li className="paginate_button page-item next disabled">
                    <a href="#" className="page-link">Next</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritesContent;
