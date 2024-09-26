import React, { useState } from 'react';

const InquiriesContent = () => {

  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      date: '2024-09-10',
      mail: 'example@mail.com',
      message: 'Inquiry about the property.',
      estate: 'Estate A',
    },
    {
      id: 2,
      date: '2024-09-11',
      mail: 'contact@domain.com',
      message: 'Looking for more information on the estate.',
      estate: 'Estate B',
    },
  ]);


  return (
    <>
    <div className="widget-panel widget-submit">
        <div className="widget-header header-styles">
          <h2 className="title">My inquiries</h2>
        </div>
        <div className="content-box">
          <div className="validation m25"></div>

          <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="dataTables_length" id="DataTables_Table_0_length">
                  <label>
                    Show{' '}
                    <select
                      name="DataTables_Table_0_length"
                      aria-controls="DataTables_Table_0"
                      className="custom-select custom-select-sm form-control form-control-sm"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>{' '}
                    entries
                  </label>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div id="DataTables_Table_0_filter" className="dataTables_filter">
                  <label>
                    Search
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      placeholder=""
                      aria-controls="DataTables_Table_0"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <table className="table table-striped data_table dataTable no-footer dtr-inline" role="grid">
                  <thead>
                    <tr role="row">
                      <th>#</th>
                      <th>Date</th>
                      <th>Mail</th>
                      <th>Message</th>
                      <th>Estate</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.length > 0 ? (
                      inquiries.map((inquiry) => (
                        <tr key={inquiry.id}>
                          <td>{inquiry.id}</td>
                          <td>{inquiry.date}</td>
                          <td>{inquiry.mail}</td>
                          <td>{inquiry.message}</td>
                          <td>{inquiry.estate}</td>
                          <td>
                            <button className="btn btn-primary">Edit</button>
                          </td>
                          <td>
                            <button className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No data available in table</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 col-md-5">
                <div className="dataTables_info" role="status" aria-live="polite">
                  Showing {inquiries.length > 0 ? '1 to ' + inquiries.length : '0'} of {inquiries.length} entries
                </div>
              </div>
              <div className="col-sm-12 col-md-7">
                <div className="dataTables_paginate paging_simple_numbers">
                  <ul className="pagination">
                    <li className="paginate_button page-item previous disabled">
                      <a href="#" className="page-link">
                        Previous
                      </a>
                    </li>
                    <li className="paginate_button page-item next disabled">
                      <a href="#" className="page-link">
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InquiriesContent;
