import React, { useContext } from "react";
import "./VCF.css";
import { DispatchContext } from "../../App";
import { RackContext } from "../../App";

function VCF({ index, color }) {
  const dispatch = useContext(DispatchContext);
  const rack = useContext(RackContext);

  return (
    <div className="container" style={{ backgroundColor: color }}>
      <div className="label">VCF</div>
      <div className="frequencyKnob">
        <input
          className="slider"
          type="range"
          name="frequency"
          id="frequency"
          min="100"
          value={rack.slots[index].frequency}
          max="9000"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                index: index,
                property: "frequency",
                value: e.currentTarget.value,
              },
            });
          }}
        />
        <label htmlFor="frequency">Frequency</label>
      </div>
      <div className="resonanceKnob">
        <input
          className="slider"
          type="range"
          name="resonance"
          id="resonance"
          min="0"
          value={rack.slots[index].resonance}
          max="25"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                index: index,
                property: "resonance",
                value: e.currentTarget.value,
              },
            });
          }}
        />
        <label htmlFor="resonance">Resonance</label>
      </div>
    </div>
  );
}

export default VCF;
