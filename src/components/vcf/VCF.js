import React, { useContext } from "react";
import { DispatchContext } from "../../App";
import { RackContext } from "../../App";

function VCF({ color }) {
  const dispatch = useContext(DispatchContext);
  const { VCF } = useContext(RackContext);

  return (
    <div className="container" style={{ backgroundColor: color }}>
      <div className="label">Filter</div>
      <div className="rowOneKnobHalfOne">
        <input
          className="slider"
          type="range"
          name="resonance"
          id="resonance"
          min="0"
          value={VCF.resonance}
          max="25"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                module: "VCF",
                property: "resonance",
                value: e.currentTarget.value,
              },
            });
          }}
        />
        <label htmlFor="resonance">Resonance</label>
      </div>
      <div className="rowOneKnobHalfTwo">
        <input
          className="slider"
          type="range"
          name="frequency"
          id="frequency"
          min="100"
          value={VCF.frequency}
          max="9000"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                module: "VCF",
                property: "frequency",
                value: e.currentTarget.value,
              },
            });
          }}
        />
        <label htmlFor="frequency">Frequency</label>
      </div>
      <div className="rowTwoKnobFull">
      <label htmlFor="modulator">Modulator</label>
        <select
          name="modulator"
          value={VCF.modulator}
          onChange={(e) => {
          dispatch({
            type: "update-module",
            payload: {
              module: "VCF",
              property: "modulator",
              value: e.currentTarget.value
            }
          });
        }}>
          <option value="none">None</option>
          <option value="osc1">Oscillator 1</option>
          <option value="osc2">Oscillator 2</option>
          <option value="osc3">Oscillator 3</option>
        </select>
      </div>
    </div>
  );
}

export default VCF;
