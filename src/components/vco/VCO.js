import React, { useContext } from "react";
import "./VCO.css";
import { DispatchContext } from "../../App";
import { RackContext } from "../../App";

function VCO({ index, color }) {
  const dispatch = useContext(DispatchContext);
  const rack = useContext(RackContext);

  return (
    <div className="container" style={{ backgroundColor: color }}>
      <div className="label">VCO</div>
      <div className="detuneKnob">
        <input
          className="slider"
          type="range"
          name="detune"
          id="detune"
          min="0"
          value={rack.slots[index].detune}
          max="50"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                index: index,
                property: "detune",
                value: e.currentTarget.value,
              },
            });
          }}
        />
        <label htmlFor="gain">Detune</label>
      </div>

      <div className="shapeKnob">
        <input
          className="slider"
          type="range"
          name="shape"
          id="shape"
          min="0"
          step="25"
          value={rack.slots[index].shape}
          max="75"
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
