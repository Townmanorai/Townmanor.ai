import React from "react";
import "./Property.css";
import Mainproperty from './Mainproperty'
import Ownerprop from "./Ownerprop";
import Listage from "./Listage";

function Property() {
  return (
    <div className="row1">
      <Mainproperty />
      <Ownerprop />
      <Listage />
    </div>
  );
}

export default Property; 
