import React from 'react';
import "../common.css";  // Ensure you have these styles in your CSS files
import "../commonsecond.css";

// Dummy JSON data
const categories = [
  {
    id: 1,
    name: "Category 1",
    options: [
      {
        option_name: "Option 1",
        option_value: "true",
        option_type: "CHECKBOX",
        option_prefix: "",
        option_suffix: "",
      },
      {
        option_name: "Option 2",
        option_value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        option_type: "INPUTBOX",
        option_prefix: "",
        option_suffix: "",
      },
      {
        option_name: "Option 3",
        option_value: "http://example.com",
        option_type: "INPUTBOX",
        option_prefix: "",
        option_suffix: "",
      },
      {
        option_name: "Option 4",
        option_value: "Some text",
        option_type: "TEXT",
        option_prefix: "",
        option_suffix: "",
      },
    ],
  },
  {
    id: 2,
    name: "Category 2",
    options: [
      {
        option_name: "Option A",
        option_value: "true",
        option_type: "CHECKBOX",
        option_prefix: "",
        option_suffix: "",
      },
      {
        option_name: "Option B",
        option_value: "Some text",
        option_type: "TEXT",
        option_prefix: "",
        option_suffix: "",
      },
    ],
  },
  // Additional categories as needed
];

// Helper function to determine if any category option is defined
const isDefinedCategoryDin = (array = []) => {
  return array.some(v => v.is_checkbox || v.is_text || v.is_dropdown || v.is_tree);
};

// React component
const PropertyDynamicCategories = () => {
  return (
    <>
      {categories.map(category => (
        // Skip categories with certain IDs
        ![1, 21, 65, 66, 52, 43, 42].includes(category.id) && 
        isDefinedCategoryDin(category.options) && (
          <div className="details-info white" key={category.id}>
            <h3>{category.name}</h3>
            <ul>
              {category.options.map((option, index) => {
                const { option_name, option_value, option_prefix, option_suffix, option_type } = option;

                if (option_type === 'CHECKBOX') {
                  return (
                    <li key={index}>
                      <h4>{option_name}:</h4>&nbsp;&nbsp;
                      <span>
                        {option_value === 'true'
                          ? <i className="fa fa-check ok"></i>
                          : <i className="fa fa-close"></i>
                        }
                      </span>
                    </li>
                  );
                }

                if (option_type === 'INPUTBOX' || option_type === 'INTEGER' || option_type === 'DATETIME') {
                  if (option_value.includes('iframe')) {
                    return (
                      <li className="wide" key={index}>
                        <iframe 
                          width="600" 
                          height="338" 
                          src={option_value} 
                          frameBorder="0" 
                          allow="autoplay; encrypted-media" 
                          allowFullScreen
                        ></iframe>
                      </li>
                    );
                  } else if (option_value.includes('vimeo.com') || option_value.includes('watch?v=')) {
                    const embedCode = option_value.includes('vimeo.com')
                      ? option_value
                      : option_value.substring(option_value.indexOf('watch?v=') + 8);
                    return (
                      <li className="wide" key={index}>
                        <iframe 
                          width="600" 
                          height="338" 
                          src={`https://www.youtube.com/embed/${embedCode}`} 
                          frameBorder="0" 
                          allow="autoplay; encrypted-media" 
                          allowFullScreen
                        ></iframe>
                      </li>
                    );
                  } else {
                    return (
                      <li key={index}>
                        <h4>{option_name}:</h4>
                        <span>{option_prefix} {option_value} {option_suffix}</span>
                      </li>
                    );
                  }
                }

                if (option.is_dropdown || option.is_tree) {
                  return (
                    <li key={index}>
                      <h4>{option_name}:</h4>
                      <span>{option_prefix} {option_value} {option_suffix}</span>
                    </li>
                  );
                }

                return null;
              })}
            </ul>
          </div>
        )
      ))}
    </>
  );
};

export default PropertyDynamicCategories;
