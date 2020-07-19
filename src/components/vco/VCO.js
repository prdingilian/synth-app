import React, { useState } from "react";
import "./VCO.css";

function VCO(props) {
  // confused here, I'm managing this state in 2 places now
  let [gain, setGain] = useState(props.gain);

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
            setGain(e.currentTarget.value);
            props.dispatch({
              type: "update-module",
              payload: {
                index: props.index,
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
          max="100"
        />
        <label htmlFor="gain">Shape</label>
      </div>
    </div>
  );
}

export default VCO;
