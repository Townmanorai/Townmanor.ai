import React from 'react';

const ResearchContent = () => {
  return (
    <>
    <div className="widget-panel widget-submit">
        <div className="widget-header header-styles">
          <h2 className="title">My research</h2>
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
                <table
                  className="table table-striped data_table dataTable no-footer dtr-inline"
                  id="DataTables_Table_0"
                  role="grid"
                  aria-describedby="DataTables_Table_0_info"
                >
                  <thead>
                    <tr role="row">
                      <th
                        data-priority="1"
                        className="sorting_asc"
                        aria-sort="ascending"
                      >
                        #
                      </th>
                      <th data-priority="1" className="sorting">
                        Parameters
                      </th>
                      <th data-priority="2" className="sorting">
                        Lang code
                      </th>
                      <th data-priority="2" className="sorting">
                        Activated
                      </th>
                      <th data-priority="1" data-orderable="false" className="sorting_disabled">
                        Edit
                      </th>
                      <th data-priority="1" data-orderable="false" className="sorting_disabled">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd">
                      <td valign="top" colSpan="6" className="dataTables_empty">
                        No data available in table
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 col-md-5">
                <div
                  className="dataTables_info"
                  id="DataTables_Table_0_info"
                  role="status"
                  aria-live="polite"
                >
                  Showing 0 to 0 of 0 entries
                </div>
              </div>
              <div className="col-sm-12 col-md-7">
                <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                  <ul className="pagination">
                    <li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                      <a href="#" aria-controls="DataTables_Table_0" className="page-link">
                        Previous
                      </a>
                    </li>
                    <li className="paginate_button page-item next disabled" id="DataTables_Table_0_next">
                      <a href="#" aria-controls="DataTables_Table_0" className="page-link">
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

export default ResearchContent;
