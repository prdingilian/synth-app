import React from "react";
import "./VCO.css";

function VCO(props) {
  return (
    <div className="container">
      <div className="label">VCO</div>
      <div className="gainKnob">
        <input
          className="slider"
          type="range"
          name="gain"
          id="gain"
          min="0"
          max="10"
        />
        <label for="gain">Gain</label>
      </div>

      <div className="shapeKnob">
        <input
          className="slider"
          type="range"
          name="shape"
          id="shape"
          min="0"
          max="10"
        />
        <label for="gain">Shape</label>
      </div>
    </div>
  );
}

export default VCO;
