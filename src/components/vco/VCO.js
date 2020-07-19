import React, { useContext } from "react";
import "./VCO.css";
import { DispatchContext } from "../../App";
import { RackContext } from "../../App";

function VCO({ index }) {
  const dispatch = useContext(DispatchContext);
  const rack = useContext(RackContext);
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
          value={rack.slots[index].gain}
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
          value={rack.slots[index].shape}
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
