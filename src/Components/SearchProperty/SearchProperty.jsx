import React, { useState, useEffect } from 'react';
import ResultsItem from './ResultsItem';

const SearchProperty = () => {
  const [searchOrder, setSearchOrder] = useState('id DESC');
  const [totalRows, setTotalRows] = useState(0); // Assuming you will fetch this from an API
  const [viewType, setViewType] = useState('grid');
  const [results, setResults] = useState([]); // Assuming results will be fetched from an API
  const [isAdmin, setIsAdmin] = useState(false); // Mock admin status, adjust accordingly

  useEffect(() => {
    // Fetch data, update searchOrder, totalRows, and results here
  }, []);

  const orderDropdown = {
    'id DESC': 'Relevant',
    'id ASC': 'Oldest',
    'counter_views DESC, id DESC': 'Most View',
    'field_36_int DESC, id DESC': 'Higher price',
    'field_36_int ASC, id DESC': 'Lower price',
  };

  const handleSearchOrderChange = (order) => {
    setSearchOrder(order);
  };

  const handleViewTypeChange = (type) => {
    setViewType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="wrapper half_map">
      <header className="fix">
        {/* Replace with your header component */}
        {/* <HeaderBar />
        <HeaderMainPanel /> */}
      </header>

      <section className="half-map-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-12">
              <div id="map-container" className="fullwidth-home-map">
                <div id="main-map" data-map-zoom="9"></div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-12">
              <div className="widget-property-search widget_edit_enabled property_search_hidekeywords">
                <form className="row banner-search search-form" onSubmit={handleSubmit}>
                  {isAdmin && (
                    <div className="widget-controls-panel widget_controls_panel">
                      <a href="/admin/forms/edit/5" target="_blank" className="btn btn-edit">
                        <i className="ion-edit"></i>
                      </a>
                    </div>
                  )}

                  {/* Primary search form */}
                  <SearchFormPrimary id={5} />

                  <div className="feat-srch">
                    <div className="more-feat">
                      <h3>
                        <i className="la la-cog"></i> Show More Features
                      </h3>
                    </div>

                    <div className={`form_field ${isAdmin ? 'form_field_save' : ''}`}>
                      <div className="form_field_row">
                        <button className="btn btn-outline-primary sw-search-start" type="submit">
                          <span>Search <i className="fa fa-spinner fa-spin fa-ajax-indicator hidden"></i></span>
                        </button>
                        {isAdmin && (
                          <button type="button" id="search-save" className="btn btn-custom btn-savesearch btn-custom-secondary btn-icon">
                            <i className="fa fa-save icon-white fa-ajax-hide"></i>
                            <i className="fa fa-spinner fa-spin fa-ajax-indicator" style={{ display: 'none' }}></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="features_list">
                    <div className="group">
                      {/* Secondary search form */}
                      <SearchFormSecondary id={5} />
                    </div>
                  </div>
                </form>
              </div>

              <div className="listing-directs">
                <div className="list-head">
                  <div className="sortby">
                    <span>Sort by:</span>
                    <div className="drop-menu">
                      <div className="select">
                        <span>{orderDropdown[searchOrder]}</span>
                        <i className="la la-caret-down"></i>
                      </div>
                      <input type="hidden" name="search_order" id="search_order" value={searchOrder} />
                      <ul className="dropeddown">
                        {Object.entries(orderDropdown).map(([key, value]) => (
                          <li key={key} data-value={key} onClick={() => handleSearchOrderChange(key)}>
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="view-count">
                    Results: <span className="total_rows">{totalRows}</span>
                  </div>

                  <div className="view-change">
                    <ul className="nav nav-tabs grid-type">
                      <li className="nav-item">
                        <a
                          href="#"
                          className={`nav-link grid view-type ${viewType === 'grid' ? 'active' : ''}`}
                          onClick={() => handleViewTypeChange('grid')}
                        >
                          <i className="la la-th-large"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#"
                          className={`nav-link list view-type ${viewType === 'list' ? 'active' : ''}`}
                          onClick={() => handleViewTypeChange('list')}
                        >
                          <i className="la la-th-list"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="results-container result_preload_box" id="results_conteiner">
                  {results.length === 0 ? (
                    <div className="list_products">
                      <div className="alert alert-info" role="alert">Results not found</div>
                    </div>
                  ) : (
                    <div className="list_products">
                      <div className="row">
                        {results.map((item, key) => (
                          <ResultsItem key={key} item={item} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pagination */}
                  <nav aria-label="Page navigation example" className="pagination properties">
                    {/* Render pagination links here */}
                  </nav>

                  <div className="result_preload_indic"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Replace with footer component */}
      <Footer />
    </div>
  );
};

export default SearchProperty;
