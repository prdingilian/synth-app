import React, { useContext } from "react";
import { DispatchContext } from "../../App";
import { RackContext } from "../../App";

function Delay({ color }) {
  const dispatch = useContext(DispatchContext);
  const { Delay } = useContext(RackContext);

  return (
    <div className="container" style={{ backgroundColor: color }}>
      <div className="label">Delay</div>
      <div className="frequencyKnob">
        <input
          className="slider"
          type="range"
          name="feedback"
          id="feedback"
          min="0"
          value={Delay.feedback * 10}
          max="9"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                module: "Delay",
                property: "feedback",
                value: e.currentTarget.value / 10,
              },
            });
          }}
        />
        <label htmlFor="feedback">Feedback</label>
      </div>
      <div className="resonanceKnob">
        <input
          className="slider"
          type="range"
          name="time"
          id="time"
          min="0"
          value={Delay.time * 10}
          max="9"
          onChange={(e) => {
            dispatch({
              type: "update-module",
              payload: {
                module: "Delay",
                property: "time",
                value: e.currentTarget.value / 10,
              },
            });
          }}
        />
        <label htmlFor="time">Time</label>
      </div>
    </div>
  );
}

export default Delay;
