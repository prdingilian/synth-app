import React from "react";
import "./StepSequencer.css";

let stepArr = [0, 1, 2, 3, 4, 5, 6, 7];
let seqArr = [0, 1, 2, 3, 4, 5, 6, 7];

function StepSequencer({
  steps,
  setOscSteps,
  clock,
  color,
  setOscClockDivide,
  clockDivide,
  scale,
  setOscScale,
}) {
  function handleStepClick(i, j) {
    let newSteps = [...steps];
    if (newSteps[j] === stepArr.length - 1 - i) {
      newSteps[j] = -1;
    } else {
      newSteps[j] = stepArr.length - 1 - i;
    }
    setOscSteps(newSteps);
  }

  return (
    <div class="allSeq">
      <div className="seqParams">
        <div>
          <input
            className="slider sliderFull"
            type="range"
            name="clockDivide"
            id="clockDivide"
            min="0"
            value={clockDivide}
            max="16"
            step="2"
            onChange={(e) => {
              setOscClockDivide(e.target.value);
            }}
          />
          <label htmlFor="clockDivide">Clock</label>
        </div>
        <div>
          <input
            className="slider sliderFull"
            type="range"
            name="scale"
            id="scale"
            min="0"
            value={scale}
            max="1"
            step="1"
            onChange={(e) => {
              setOscScale(e.target.value);
            }}
          />
          <label htmlFor="scale">Scale</label>
        </div>
      </div>
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
                opacity: (clock - 1) % 8 === j ? "1" : "0.7",
              }}
              className="step"
            ></div>
          ));
        })}
      </div>
    </div>
  );
}

export default StepSequencer;
