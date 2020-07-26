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
} from "./webAudio";
import useInterval from "./useInterval";

export const RackContext = React.createContext();
export const DispatchContext = React.createContext();

let oldState;

function reducer(state, action) {
  oldState = state;
  let { VCO1, VCO2, VCO3, VCF, VCA } = { ...state };
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
        case "VCA":
          VCA = { ...VCA };
          VCA[action.payload.property] = action.payload.value;
          break;
        default:
          break;
      }
      return { VCO1, VCO2, VCO3, VCF, VCA };
    default:
      return VCO1, VCO2, VCO3, VCF, VCA;
  }
}

function App() {
  const [{ VCO1, VCO2, VCO3, VCF, VCA }, dispatch] = useReducer(reducer, {
    VCO1: { detune: 0, shape: 0, active: false },
    VCO2: { detune: 0, shape: 25, active: false },
    VCO3: { detune: 0, shape: 75, active: false },
    VCF: { frequency: 4500, resonance: 7, active: false },
    VCA: { gain: 10, active: false },
  });

  let [active, setActive] = useState(false);
  let [bpm, setBpm] = useState(3000);

  let [osc1Scale, setOsc1Scale] = useState([
    261,
    293,
    329,
    349,
    392,
    440,
    493,
    523,
  ]);
  let [osc2Scale, setOsc2Scale] = useState([
    261,
    293,
    329,
    349,
    392,
    440,
    493,
    523,
  ]);
  let [osc3Scale, setOsc3Scale] = useState([
    261,
    293,
    329,
    349,
    392,
    440,
    493,
    523,
  ]);
  let [osc1Steps, setOsc1Steps] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  let [osc2Steps, setOsc2Steps] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  let [osc3Steps, setOsc3Steps] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  let [osc1ClockDivide, setOsc1ClockDivide] = useState(1);
  let [osc2ClockDivide, setOsc2ClockDivide] = useState(2);
  let [osc3ClockDivide, setOsc3ClockDivide] = useState(8);

  const [osc1Frequency, setOsc1Frequency] = useState(444);
  const [osc1Clock, setOsc1Clock] = useState(0);
  const [osc2Frequency, setOsc2Frequency] = useState(888);
  const [osc2Clock, setOsc2Clock] = useState(0);
  const [osc3Frequency, setOsc3Frequency] = useState(666);
  const [osc3Clock, setOsc3Clock] = useState(0);

  useEffect(() => {
    active ? createAmp() : removeAmp();
  }, [active]);

  // Handle osc 1 clock
  useInterval(() => {
    setOsc1Frequency(osc1Scale[osc1Steps[osc1Clock % 8]]);
    setOsc1Clock(osc1Clock + 1);
  }, bpm / osc1ClockDivide);

  // Handle osc 2 clock
  useInterval(() => {
    setOsc2Frequency(osc2Scale[osc2Steps[osc2Clock % 8]]);
    setOsc2Clock(osc2Clock + 1);
  }, bpm / osc2ClockDivide);

  // Handle osc 3 clock
  useInterval(() => {
    setOsc3Frequency(osc3Scale[osc3Steps[osc3Clock % 8]]);
    setOsc3Clock(osc3Clock + 1);
  }, bpm / osc3ClockDivide);

  // Handle Osc 1 frequency side effects
  useEffect(() => {
    changeOscFrequency(0, osc1Frequency);
  }, [osc1Frequency]);

  // Handle Osc 2 frequency side effects
  useEffect(() => {
    changeOscFrequency(1, osc2Frequency);
  }, [osc2Frequency]);

  // Handle Osc 3 frequency side effects
  useEffect(() => {
    changeOscFrequency(2, osc3Frequency);
  }, [osc3Frequency]);

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
      <RackContext.Provider value={{ VCO1, VCO2, VCO3, VCF, VCA }}>
        <DispatchContext.Provider value={dispatch}>
          <div className="App">
            <button
              style={{ backgroundColor: active ? "red" : "green" }}
              onClick={() => setActive(!active)}
            >
              {active ? "Mute" : "Turn on Sound"}
            </button>
            <div className="sequencers">
              <StepSequencer
                steps={osc1Steps}
                setOsc1Steps={setOsc1Steps}
                clock={osc1Clock}
                color="cornsilk"
              />
              <StepSequencer
                steps={osc2Steps}
                setOsc1Steps={setOsc2Steps}
                clock={osc2Clock}
                color="blanchedalmond"
              />
              <StepSequencer
                steps={osc3Steps}
                setOsc1Steps={setOsc3Steps}
                clock={osc3Clock}
                color="burlywood"
              />
            </div>
            <Rack />
          </div>
        </DispatchContext.Provider>
      </RackContext.Provider>
    </>
  );
}

export default App;
