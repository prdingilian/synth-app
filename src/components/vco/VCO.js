import React, { useContext } from "react";
import { DispatchContext } from "../../App";
import { RackContext } from "../../App";

function VCO({ name, color }) {
  const dispatch = useContext(DispatchContext);
  const { VCO1, VCO2, VCO3 } = useContext(RackContext);
  let thisVCO;
  switch (name) {
    case "VCO1":
      thisVCO = VCO1;
      break;
    case "VCO2":
      thisVCO = VCO2;
      break;
    case "VCO3":
      thisVCO = VCO3;
      break;
    default:
      break;
  }

  return (
    <div className="container" style={{ backgroundColor: color }}>
      <div className="label">Oscillator</div>
      <div className="rowOneKnobHalfOne">
        <input
          className="slider"
          type="range"
          name="detune"
          id="detune"
          min="0"
          value={thisVCO.detune}
          max="50"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                module: name,
                property: "detune",
                value: parseInt(e.currentTarget.value),
              },
            });
          }}
        />
        <label htmlFor="gain">Detune</label>
      </div>

      <div className="rowOneKnobHalfTwo">
        <input
          className="slider"
          type="range"
          name="shape"
          id="shape"
          min="0"
          step="25"
          value={thisVCO.shape}
          max="75"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                module: name,
                property: "shape",
                value: parseInt(e.currentTarget.value),
              },
            });
          }}
        />
        <label htmlFor="gain">Shape</label>
      </div>

      <div className="rowTwoKnobHalfOne">
        <input
          className="slider"
          type="range"
          name="octave"
          id="octave"
          min="1"
          step="1"
          value={5 - thisVCO.octave}
          max="4"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                module: name,
                property: "octave",
                value: 5 - e.currentTarget.value,
              },
            });
          }}
        />
        <label htmlFor="octave">Pitch</label>
      </div>
    </div>
  );
}

export default VCO;
