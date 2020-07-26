import React from "react";
import "./StepSequencer.css";

let stepArr = [0, 1, 2, 3, 4, 5, 6, 7];
let seqArr = [0, 1, 2, 3, 4, 5, 6, 7];

function StepSequencer({ steps, setOsc1Steps, clock, color }) {
  function handleStepClick(i, j) {
    let newSteps = [...steps];
    newSteps[j] = stepArr.length - 1 - i;
    setOsc1Steps(newSteps);
  }
  return (
    <div className="seqContainer">
      {stepArr.map((seq, i) => {
        return seqArr.map((step, j) => (
          <div
            onClick={() => handleStepClick(i, j)}
            style={{
              backgroundColor:
                steps[j] >= stepArr.length - 1 - i ? color : "white",
              border:
                (clock - 1) % 8 === j
                  ? "1px solid blue"
                  : "1px solid lightgrey",
            }}
            className="step"
          ></div>
        ));
      })}
    </div>
  );
}

export default StepSequencer;
