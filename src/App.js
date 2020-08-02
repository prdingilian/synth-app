import React, { useReducer, useEffect, useState } from "react";
import Rack from "./components/rack/Rack";
import StepSequencer from "./components/stepSequencer/StepSequencer";
import "./App.css";
import {
  createAmp,
  createFilter,
  createOsc,
  removeAmp,
  changeFilterFrequency,
  changeFilterResonance,
  changeGain,
  changeOscFrequency,
  changeOscShape,
  changeOscDetune,
  changeDelayTime,
  changeDelayFeedback,
} from "./webAudio";
import useInterval from "./useInterval";

export const RackContext = React.createContext();
export const DispatchContext = React.createContext();

let oldState;
let scales = [
  [261, 293, 329, 349, 392, 440, 493, 523],
  [261, 293, 311, 349, 392, 440, 466, 523],
];

function reducer(state, action) {
  oldState = state;
  let { VCO1, VCO2, VCO3, VCF, Delay, VCA } = { ...state };
  switch (action.type) {
    case "update-module":
      switch (action.payload.module) {
        case "VCO1":
          VCO1 = { ...VCO1 };
          VCO1[action.payload.property] = action.payload.value;
          break;
        case "VCO2":
          VCO2 = { ...VCO2 };
          VCO2[action.payload.property] = action.payload.value;
          break;
        case "VCO3":
          VCO3 = { ...VCO3 };
          VCO3[action.payload.property] = action.payload.value;
          break;
        case "VCF":
          VCF = { ...VCF };
          VCF[action.payload.property] = action.payload.value;
          break;
        case "Delay":
          Delay = { ...Delay };
          Delay[action.payload.property] = action.payload.value;
          break;
        case "VCA":
          VCA = { ...VCA };
          VCA[action.payload.property] = action.payload.value;
          break;
        default:
          break;
      }
      return { VCO1, VCO2, VCO3, VCF, Delay, VCA };
    default:
      return VCO1, VCO2, VCO3, VCF, Delay, VCA;
  }
}

function App() {
  const [{ VCO1, VCO2, VCO3, VCF, Delay, VCA }, dispatch] = useReducer(
    reducer,
    {
      VCO1: { detune: 0, shape: 0, pitch: 1, octave: 1, active: false },
      VCO2: { detune: 0, shape: 25, pitch: 1, octave: 1, active: false },
      VCO3: { detune: 0, shape: 75, pitch: 1, octave: 1, active: false },
      VCF: { frequency: 4500, resonance: 7, octave: 1, active: false },
      Delay: { feedback: 0.8, time: 0.5 },
      VCA: { gain: 10, active: false },
    }
  );

  let [active, setActive] = useState(false);
  let [bpm, setBpm] = useState(4000);

  let [osc1Scale, setOsc1Scale] = useState(0);
  let [osc2Scale, setOsc2Scale] = useState(0);
  let [osc3Scale, setOsc3Scale] = useState(0);
  let [osc1Steps, setOsc1Steps] = useState([0, 0, 4, 4, 0, 0, 1, 1]);
  let [osc2Steps, setOsc2Steps] = useState([4, 2, 1, -1, 4, 6, 1, -1]);
  let [osc3Steps, setOsc3Steps] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  let [osc1ClockDivide, setOsc1ClockDivide] = useState(2);
  let [osc2ClockDivide, setOsc2ClockDivide] = useState(4);
  let [osc3ClockDivide, setOsc3ClockDivide] = useState(8);
  let [masterOsc1ClockDivide, setMasterOsc1ClockDivide] = useState(2);
  let [masterOsc2ClockDivide, setMasterOsc2ClockDivide] = useState(4);
  let [masterOsc3ClockDivide, setMasterOsc3ClockDivide] = useState(8);
  const [osc1Frequency, setOsc1Frequency] = useState(0);
  const [osc1Clock, setOsc1Clock] = useState(0);
  const [osc2Frequency, setOsc2Frequency] = useState(0);
  const [osc2Clock, setOsc2Clock] = useState(0);
  const [osc3Frequency, setOsc3Frequency] = useState(0);
  const [osc3Clock, setOsc3Clock] = useState(0);

  useEffect(() => {
    active ? createAmp() : removeAmp();
  }, [active]);

  // update master clocks
  useInterval(() => {
    setMasterOsc2ClockDivide(osc2ClockDivide);
    setMasterOsc3ClockDivide(osc3ClockDivide);
    setMasterOsc1ClockDivide(osc1ClockDivide);
  }, bpm / 1);

  // Handle osc 1 clock
  useInterval(() => {
    if (scales[osc1Scale][osc1Steps[osc1Clock % 8]] > -1) {
      setOsc1Frequency(scales[osc1Scale][osc1Steps[osc1Clock % 8]]);
    } else {
      setOsc1Frequency(0);
    }
    setOsc1Clock(osc1Clock + 1);
  }, bpm / masterOsc1ClockDivide);

  // Handle osc 2 clock
  useInterval(() => {
    if (scales[osc2Scale][osc2Steps[osc2Clock % 8]] > -1) {
      setOsc2Frequency(scales[osc2Scale][osc2Steps[osc2Clock % 8]]);
    } else {
      setOsc2Frequency(0);
    }
    setOsc2Clock(osc2Clock + 1);
  }, bpm / masterOsc2ClockDivide);

  // Handle osc 3 clock
  useInterval(() => {
    if (scales[osc3Scale][osc3Steps[osc3Clock % 8]] > -1) {
      setOsc3Frequency(scales[osc3Scale][osc3Steps[osc3Clock % 8]]);
    } else {
      setOsc3Frequency(0);
    }
    setOsc3Clock(osc3Clock + 1);
  }, bpm / masterOsc3ClockDivide);

  // Handle Osc 1 frequency side effects
  useEffect(() => {
    changeOscFrequency(0, osc1Frequency / VCO1.octave);
  }, [osc1Frequency, VCO1.octave]);

  // Handle Osc 2 frequency side effects
  useEffect(() => {
    changeOscFrequency(1, osc2Frequency / VCO2.octave);
  }, [osc2Frequency, VCO2.octave]);

  // Handle Osc 3 frequency side effects
  useEffect(() => {
    changeOscFrequency(2, osc3Frequency / VCO3.octave);
  }, [osc3Frequency, VCO3.octave]);

  // Handle Osc 1 side effects
  useEffect(() => {
    if (VCO1.active) {
      if (oldState.VCO1.shape !== VCO1.shape) {
        changeOscShape(0, VCO1.shape);
      }
      if (oldState.VCO1.detune !== VCO1.detune) {
        changeOscDetune(0, VCO1.detune);
      }
    } else {
      createOsc(0, "sine");
      VCO1.active = true;
    }
  }, [VCO1]);

  // Handle Osc 2 side effects
  useEffect(() => {
    if (VCO2.active) {
      if (oldState.VCO2.shape !== VCO2.shape) {
        changeOscShape(1, VCO2.shape);
      }
      if (oldState.VCO2.detune !== VCO2.detune) {
        changeOscDetune(1, VCO2.detune);
      }
    } else {
      createOsc(1, "triangle");
      VCO2.active = true;
    }
  }, [VCO2]);

  // Handle Osc 3 side effects
  useEffect(() => {
    if (VCO3.active) {
      if (oldState.VCO3.shape !== VCO3.shape) {
        changeOscShape(2, VCO3.shape);
      }
      if (oldState.VCO2.detune !== VCO3.detune) {
        changeOscDetune(2, VCO3.detune);
      }
    } else {
      createOsc(2, "sawtooth");
      VCO3.active = true;
    }
  }, [VCO3]);

  // Handle VCF side effects
  useEffect(() => {
    if (VCF.active) {
      changeFilterFrequency(VCF.frequency);
      changeFilterResonance(VCF.resonance);
    } else {
      createFilter();
      VCF.active = true;
    }
  }, [VCF]);

  // Handle Delay side effects
  useEffect(() => {
    changeDelayFeedback(Delay.feedback);
    changeDelayTime(Delay.time);
  }, [Delay]);

  // Handle VCA side effects
  useEffect(() => {
    if (VCA.active) {
      changeGain(VCA.gain);
    } else {
      // createAmp();
      VCA.active = true;
    }
  }, [VCA]);

  return (
    <>
      <RackContext.Provider value={{ VCO1, VCO2, VCO3, VCF, Delay, VCA }}>
        <DispatchContext.Provider value={dispatch}>
          <div className="App">
            <div class="header">
              <div>
                <input
                  className="slider sliderFull"
                  type="range"
                  name="bpm"
                  id="bpm"
                  min="4000"
                  value={10000 - bpm}
                  max="6000"
                  step="500"
                  onChange={(e) => {
                    setBpm(10000 - e.target.value);
                  }}
                />
                <label htmlFor="scale">Bpm</label>
              </div>
              <h1>wwwsynth</h1>
              <div>
                <button
                  style={{
                    backgroundColor: active ? "indianred" : "seagreen",
                  }}
                  onClick={() => setActive(!active)}
                >
                  {active ? "Mute" : "Turn on Sound"}
                </button>
              </div>
            </div>
            <div className="sequencers">
              <StepSequencer
                steps={osc1Steps}
                setOscSteps={setOsc1Steps}
                clock={osc1Clock}
                color="coral"
                setOscClockDivide={setOsc1ClockDivide}
                clockDivide={osc1ClockDivide}
                scale={osc1Scale}
                setOscScale={setOsc1Scale}
              />
              <StepSequencer
                steps={osc2Steps}
                setOscSteps={setOsc2Steps}
                clock={osc2Clock}
                color="paleturquoise"
                setOscClockDivide={setOsc2ClockDivide}
                clockDivide={osc2ClockDivide}
                scale={osc2Scale}
                setOscScale={setOsc2Scale}
              />
              <StepSequencer
                steps={osc3Steps}
                setOscSteps={setOsc3Steps}
                clock={osc3Clock}
                color="#89edb7"
                setOscClockDivide={setOsc3ClockDivide}
                clockDivide={osc3ClockDivide}
                scale={osc3Scale}
                setOscScale={setOsc3Scale}
              />
            </div>
            <Rack />
            <div class="footer">
              <a href="https://github.com/prdingilian/synth-app">
                View on GitHub
              </a>
            </div>
          </div>
        </DispatchContext.Provider>
      </RackContext.Provider>
    </>
  );
}

export default App;
