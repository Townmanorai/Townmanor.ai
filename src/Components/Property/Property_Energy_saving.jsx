import React, { useEffect } from "react";

import "../common.css";
import "../commonsecond.css";

// Dummy data to simulate PHP variables
const estateData = {
  option_59: "A", // For energy efficiency
  option_60: "B", // For gas emissions
};

const optionsNames = {
  name_59: "Energy Efficiency",
  name_60: "Gas Emission",
};

const valuesCharsEnergy = {
  A: "40",
  B: "80",
  C: "140",
  D: "220",
  E: "320",
  F: "440",
  G: "460",
};

const valuesCharsGas = {
  A: "4",
  B: "9",
  C: "19",
  D: "34",
  E: "54",
  F: "79",
  G: "81",
};

const  Property_Energy_saving = () => {
  // Process option_59 and option_60 like in PHP
  let energyValue = valuesCharsEnergy[estateData.option_59] || estateData.option_59;
  let gasValue = valuesCharsGas[estateData.option_60] || estateData.option_60;

  useEffect(() => {
    // Simulate the dpe.js logic here
    const dpe = {
      show_numbers: true,
      energy_title1: "Energy efficient",
      energy_title2: "80 kWh EP",
      energy_title3: "",
      gg_title1: "Gas emission",
      gg_title2: "30 kg CO2",
      canvas_height: 210,
      sticker_height: 35,
      tag_attribute: "title",
      gg_unit: "",
      all: () => {
        console.log("DPE rendering logic applied");
      },
    };

    if (!dpe.show_numbers) {
      dpe.energy_title2 = "";
      dpe.gg_title2 = "";
    }

    dpe.all();

    // Simulate the jQuery logic to remove energy-eff elements
    setTimeout(() => {
      const energyWarning = document.querySelector(".energy-ef .alert-warning");
      const gasWarning = document.querySelector(".energy-gas .alert-warning");
      if (energyWarning && gasWarning) {
        const featureDiv = document.querySelector(".features-dv");
        featureDiv?.remove();
      }
    }, 5000);
  }, []);

  return (
    <div className="features-dv">
      <h3>
        {optionsNames.name_59} & {optionsNames.name_60}
      </h3>

      {/* Energy Efficiency */}
      {estateData.option_59 && (
        <div className="float-left widget-energy-eff">
          <div className="divider"></div>
          <div
            title={`energie: ${energyValue}`}
            style={{ marginRight: "5px" }}
            className="energy-eff-box energy-ef"
          >
            {energyValue ? (
              <div>{energyValue} kWh</div>
            ) : (
              <div className="alert alert-warning">No Efficiency</div>
            )}
          </div>
        </div>
      )}

      {/* Gas Emissions */}
      {estateData.option_60 && (
        <div className="float-left widget-energy-eff">
          <div className="divider"></div>
          <div
            title={`ges: ${gasValue}`}
            style={{ marginRight: "5px" }}
            className="energy-eff-box energy-gas"
          >
            {gasValue ? (
              <div>{gasValue} kg CO2</div>
            ) : (
              <div className="alert alert-warning">No Gas</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Property_Energy_saving;
