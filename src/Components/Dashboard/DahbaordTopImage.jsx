import React from 'react';
import "../common.css";
import "../commonsecond.css";


// Dummy JSON data for breadcrumb links
const breadcrumbData = [
  { id: 1, name: 'Home', link: 'https://townmanor.in/en' },
  { id: 2, name: 'My properties' }
];

const DashboardTopSection = () => {
  return (
    <section className="pager-sec bfr widget_edit_enabled">
      <div className="container">
        <div className="pager-sec-details">
          <h3>My properties</h3>
          <ul className="breadcrumb">
            {breadcrumbData.map((item, index) => (
              <li key={item.id}>
                {item.link ? (
                  <a href={item.link}>{item.name}</a>
                ) : (
                  <span>{item.name}</span>
                )}
                {index < breadcrumbData.length - 1 && <span className="delimiter"></span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DashboardTopSection;
