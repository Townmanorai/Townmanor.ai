import React, { useState } from 'react';
import Map from './Map'; 
import SearchForm from './SearchForm'; 
import ResultsItem from './ResultsItem'; 

import "../../common.css";
import "../../commonsecond.css";
import './MainPage.css';
import Pagination from './Pagination';

const MainPage = ({ results, total_rows, view_grid_selected, view_list_selected }) => {
  // console.log({results, total_rows, view_grid_selected, view_list_selected});
  // console.log("main page");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(results.length / itemsPerPage);
  // console.log(totalPages);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = results.slice(startIndex, endIndex);

  return (
    <div className="wrapper half_map">
      <header className="fix">
        {/* <HeaderBar />
        <HeaderMainPanel /> */}
      </header>
      <section className="half-map-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-12">
              <div id="map-container" className={`fullwidth-home-map ${window.innerWidth <= 768 ? 'map-hidden' : ''}`}>
                <Map results={results} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
             <SearchForm />
              <div className="listing-directs">
                <div className="list-head">
                  <div className="sortby">
                    <span>Sort by:</span>
                    <div className="drop-menu">
                      <div className="select">
                        <span>Relevant</span>
                        <i className="la la-caret-down"></i>
                      </div>
                      <input type="hidden" name="search_order" id="search_order" />
                      <ul className="dropeddown">
                        {/* Dropdown Options */}
                      </ul>
                    </div>
                  </div>
                  <div className="view-count">
                    Results: <span className="total_rows">{results.length}</span>
                  </div>
                  <div className="view-change">
                    <ul className="nav nav-tabss grid-type">
                      <li className="nav-item">
                        <a href="#" className={`nav-link grid view-type ${view_grid_selected ? 'active' : ''}`} data-ref="grid">
                          <i className="la la-th-large"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className={`nav-link list view-type ${view_list_selected ? 'active' : ''}`} data-ref="list">
                          <i className="la la-th-list"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="results-container result_preload_box" id="results_conteiner">
                  <div className="list_products">
                    <div className="row">
                      {/* Display only the currentItems */}
                      {currentItems.map((item, key) => (
                        <ResultsItem key={key} item={item} />
                      ))}
                    </div>
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                  <div className="result_preload_indic"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
      {/* Dynamic JavaScript Loading */}
    </div>
  );
};

export default MainPage;
