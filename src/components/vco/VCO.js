import React from "react";
import "./VCO.css";

function VCO({ gain, shape, dispatch, index }) {
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
          value={gain}
          max="100"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                index: index,
                property: "gain",
                value: e.currentTarget.value,
              },
            });
          }}
        />
        <label htmlFor="gain">Gain</label>
      </div>

      <div className="shapeKnob">
        <input
          className="slider"
          type="range"
          name="shape"
          id="shape"
          min="0"
          value={shape}
          max="100"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                index: index,
                property: "shape",
                value: e.currentTarget.value,
              },
            });
          }}
        />
        <label htmlFor="gain">Shape</label>
      </div>
    </div>
  );
}

export default VCO;
