import React, { useContext } from "react";
import "./VCA.css";
import { DispatchContext } from "../../App";
import { RackContext } from "../../App";

function VCA({ color }) {
  const dispatch = useContext(DispatchContext);
  const { VCA } = useContext(RackContext);

  return (
    <div className="container" style={{ backgroundColor: color }}>
      <div className="label">VCA</div>
      <div className="gainKnobAmp">
        <input
          className="slider"
          type="range"
          name="gain"
          id="gain"
          min="0"
          value={VCA.gain}
          max="20"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                module: "VCA",
                property: "gain",
                value: e.currentTarget.value,
              },
            });
          }}
        />
        <label htmlFor="gain">Gain</label>
      </div>
    </div>
  );
}

export default VCA;
