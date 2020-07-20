import React, { useContext } from "react";
import "./VCA.css";
import { DispatchContext } from "../../App";
import { RackContext } from "../../App";

function VCA({ index, color }) {
  const dispatch = useContext(DispatchContext);
  const rack = useContext(RackContext);

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
          value={rack.slots[index].gain}
          max="20"
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
    </div>
  );
}

export default VCA;
