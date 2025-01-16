import React, { useState, useCallback } from 'react';
import './LeaseProperty.css';
import { useNavigate } from 'react-router-dom';

function CommercialForm2() {
  const [pricePlans, setPricePlans] = useState([
    {
      id: '',
      name: '',
      price: '',
      category: '',
      othercharge: [['', '']],
      paymentplan: [['', '']],
      floorplan: null,
      Available_Unit: '',
      Total_unit: '',
    },
  ]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Optimized input change handler
  const handleInputChange = useCallback((index, field, value) => {
    const updatedPricePlans = [...pricePlans];
    updatedPricePlans[index][field] = value;
    setPricePlans(updatedPricePlans);
  }, [pricePlans]);

  // File change handler
  const handleFileChange = useCallback((index, e) => {
    const updatedPricePlans = [...pricePlans];
    const file = e.target.files[0];
    if (file) {
      updatedPricePlans[index].floorplan = file.name;
    }
    setPricePlans(updatedPricePlans);
  }, [pricePlans]);

  // Handle other charge changes
  const handleOtherChargeChange = useCallback((index, chargeIndex, field, value) => {
    const updatedPricePlans = [...pricePlans];
    updatedPricePlans[index].othercharge[chargeIndex][field] = value;
    setPricePlans(updatedPricePlans);
  }, [pricePlans]);

  // Handle payment plan changes
  const handlePaymentPlanChange = useCallback((index, planIndex, field, value) => {
    const updatedPricePlans = [...pricePlans];
    updatedPricePlans[index].paymentplan[planIndex][field] = value;
    setPricePlans(updatedPricePlans);
  }, [pricePlans]);

  const addPricePlanBox = () => {
    setPricePlans([
      ...pricePlans,
      {
        id: '',
        name: '',
        price: '',
        category: '',
        othercharge: [['', '']],
        paymentplan: [['', '']],
        floorplan: null,
        Available_Unit: '',
        Total_unit: '',
      },
    ]);
  };

  const addOtherChargeField = (index) => {
    const updatedPricePlans = [...pricePlans];
    updatedPricePlans[index].othercharge.push(['', '']);
    setPricePlans(updatedPricePlans);
  };

  const addPaymentPlanField = (index) => {
    const updatedPricePlans = [...pricePlans];
    updatedPricePlans[index].paymentplan.push(['', '']);
    setPricePlans(updatedPricePlans);
  };

  // Function to copy other charges from the previous price plan
  const copyOtherCharges = (index) => {
    if (index > 0) {
      const prevOtherCharges = pricePlans[index - 1].othercharge;
      const updatedPricePlans = [...pricePlans];
      updatedPricePlans[index].othercharge = [...prevOtherCharges];
      setPricePlans(updatedPricePlans);
    }
  };

  // Function to copy payment plans from the previous price plan
  const copyPaymentPlans = (index) => {
    if (index > 0) {
      const prevPaymentPlans = pricePlans[index - 1].paymentplan;
      const updatedPricePlans = [...pricePlans];
      updatedPricePlans[index].paymentplan = [...prevPaymentPlans];
      setPricePlans(updatedPricePlans);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParts = pricePlans.map((pricePlan) => {
      const otherCharges = pricePlan.othercharge
        .map((charge) => `JSON_ARRAY('${charge[0]}', '${charge[1]}')`)
        .join(", ");

      const paymentPlans = pricePlan.paymentplan
        .map((plan) => `JSON_ARRAY('${plan[0]}', '${plan[1]}')`)
        .join(", ");

      const comPropId = pricePlan.id; // Assuming this is populated elsewhere
      const floorplanFile = pricePlan.floorplan ? `'${pricePlan.floorplan}'` : 'NULL';

      return `(
        ${comPropId}, 
        '${pricePlan.category}', 
        '${pricePlan.name}', 
        '${pricePlan.price}', 
        JSON_ARRAY(${otherCharges}), 
        JSON_ARRAY(${paymentPlans}), 
        ${floorplanFile}, 
        '${pricePlan.Available_Unit}', 
        '${pricePlan.Total_unit}'
      )`;
    });

    const sqlQuery = `INSERT INTO commercial_units (com_prop_id, category, name, price, othercharge, paymentplan, floorplan, available_unit, total_unit) 
    VALUES 
    ${queryParts.join(",\n")};`;

    setQuery(sqlQuery);
    console.log(sqlQuery);
  };

  const goToAbout = () => {
    navigate('/commercialform');
  };

  return (
    <>
      <div>
        <button type="button" className="btn btn-secondary my-4 mx-4" onClick={goToAbout}>
          Back to property uploading form
        </button>
      </div>
      <form className="commercial-form" onSubmit={handleSubmit}>
        <div id="priceplan">
          {pricePlans.map((pricePlan, index) => (
            <div key={index} className="price-plan-box">
              <div className="form-field">
                <label className="form-label">Enter ID:</label>
                <input
                  className="input-field"
                  type="text"
                  value={pricePlan.id}
                  onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Enter Name:</label>
                <input
                  className="input-field"
                  type="text"
                  value={pricePlan.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Enter Price:</label>
                <input
                  className="input-field"
                  type="text"
                  value={pricePlan.price}
                  onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Enter Category:</label>
                <input
                  className="input-field"
                  type="text"
                  value={pricePlan.category}
                  onChange={(e) => handleInputChange(index, 'category', e.target.value)}
                />
              </div>

              <div className="form-field">
                <h3>Other Charges</h3>
                {pricePlan.othercharge.map((charge, chargeIndex) => (
                  <div key={chargeIndex} className="charge-field">
                    <input
                      className="input-field"
                      type="text"
                      value={charge[0]}
                      onChange={(e) =>
                        handleOtherChargeChange(index, chargeIndex, 0, e.target.value)
                      }
                      placeholder="Charge Name"
                    />
                    <input
                      className="input-field"
                      type="text"
                      value={charge[1]}
                      onChange={(e) =>
                        handleOtherChargeChange(index, chargeIndex, 1, e.target.value)
                      }
                      placeholder="Charge Amount"
                    />
                  </div>
                ))}
                <button type="button" className="btnn" onClick={() => addOtherChargeField(index)}>
                  Add Other Charge
                </button>
                <button type="button" className="btnn" onClick={() => copyOtherCharges(index)}>
                  Copy from Previous
                </button>
              </div>

              <div className="form-field">
                <h3>Payment Plan</h3>
                {pricePlan.paymentplan.map((plan, planIndex) => (
                  <div key={planIndex} className="payment-plan-field">
                    <input
                      className="input-field"
                      type="text"
                      value={plan[0]}
                      onChange={(e) =>
                        handlePaymentPlanChange(index, planIndex, 0, e.target.value)
                      }
                      placeholder="Payment Plan Name"
                    />
                    <input
                      className="input-field"
                      type="text"
                      value={plan[1]}
                      onChange={(e) =>
                        handlePaymentPlanChange(index, planIndex, 1, e.target.value)
                      }
                      placeholder="Payment Plan Value"
                    />
                  </div>
                ))}
                <button type="button" className="btnn" onClick={() => addPaymentPlanField(index)}>
                  Add Payment Plan
                </button>
                <button type="button" className="btnn" onClick={() => copyPaymentPlans(index)}>
                  Copy from Previous
                </button>
              </div>
              <div className="form-field">
                <label className="form-label">Floor Plan:</label>
                <input
                  className="input-field"
                  type="text"
                  value={pricePlan.floorplan}
                  onChange={(e) => handleInputChange(index, 'floorplan', e.target.value)}
                />
              </div>
              {/* <div className="form-field">
                <label className="form-label">Floor Plan (File Upload):</label>
                <input
                  className="input-field"
                  type="text"
                  onChange={(e) => handleFileChange(index, e)}
                />
              </div> */}

              <div className="form-field">
                <label className="form-label">Available Unit:</label>
                <input
                  className="input-field"
                  type="text"
                  value={pricePlan.Available_Unit}
                  onChange={(e) => handleInputChange(index, 'Available_Unit', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Total Unit:</label>
                <input
                  className="input-field"
                  type="text"
                  value={pricePlan.Total_unit}
                  onChange={(e) => handleInputChange(index, 'Total_unit', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="btnn" onClick={addPricePlanBox}>
          Add Price Plan
        </button>
        <button type="submit" className="btnn">
          Submit
        </button>

        {query && (
          <div className="sql-query-display">
            <h3>Generated SQL Query:</h3>
            <pre>{query}</pre>
          </div>
        )}
      </form>
    </>
  );
}

export default CommercialForm2;
