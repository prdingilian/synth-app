import React, { useReducer, useEffect, useState } from "react";
import Rack from "./components/rack/Rack";
import StepSequencer from "./components/stepSequencer/StepSequencer";
import "./App.css";
import {
  createAmp,
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
import { useInterval } from "react-use";

export const RackContext = React.createContext();
export const DispatchContext = React.createContext();

let oldState;
let scales = [
  [261, 293, 329, 349, 392, 440, 493, 523],
  [261, 293, 311, 349, 392, 440, 466, 523],
];
createOsc(0, "sine");
createOsc(1, "triangle");
createOsc(2, "sawtooth");

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
      VCO1: {
        detune: 0,
        shape: 75,
        octave: 4,
        portamento: 0
      },
      VCO2: {
        detune: 0,
        shape: 25,
        octave: 1,
        portamento: 0
      },
      VCO3: {
        detune: 6,
        shape: 75,
        octave: 2,
        portamento: 0
      },
      VCF: {
        frequency: 2000,
        resonance: 14,
        modulator: 'osc2',
      },
      Delay: { feedback: 0.3, time: 0.5 },
      VCA: { gain: 5 }
    }
  );

  let [active, setActive] = useState(false);
  let [bpm, setBpm] = useState(4000);

  let [osc1Scale, setOsc1Scale] = useState(0);
  let [osc2Scale, setOsc2Scale] = useState(0);
  let [osc3Scale, setOsc3Scale] = useState(0);
  let [osc1Steps, setOsc1Steps] = useState([0, -1, -1, 3, -1, -1, 1, -1]);
  let [osc2Steps, setOsc2Steps] = useState([7, 6, 2, -1, -1, 0, -1, 4]);
  let [osc3Steps, setOsc3Steps] = useState([2, -1, -1, 1, 2,4, -1, 7]);
  let [osc1ClockDivide, setOsc1ClockDivide] = useState(8);
  let [osc2ClockDivide, setOsc2ClockDivide] = useState(8);
  let [osc3ClockDivide, setOsc3ClockDivide] = useState(16);
  let [masterOsc1ClockDivide, setMasterOsc1ClockDivide] = useState(8);
  let [masterOsc2ClockDivide, setMasterOsc2ClockDivide] = useState(8);
  let [masterOsc3ClockDivide, setMasterOsc3ClockDivide] = useState(16);
  const [osc1Frequency, setOsc1Frequency] = useState(0);
  const [osc1Clock, setOsc1Clock] = useState(0);
  const [osc2Frequency, setOsc2Frequency] = useState(0);
  const [osc2Clock, setOsc2Clock] = useState(0);
  const [osc3Frequency, setOsc3Frequency] = useState(0);
  const [osc3Clock, setOsc3Clock] = useState(0);

  useEffect(() => {
    active ? createAmp() : removeAmp();
  }, [active]);

  // Update individual osc clocks on next master clock cycle
  useInterval(() => {
    setMasterOsc2ClockDivide(osc2ClockDivide);
    setMasterOsc3ClockDivide(osc3ClockDivide);
    setMasterOsc1ClockDivide(osc1ClockDivide);
  }, bpm);

  // For each osc, update its frequency as its clock runs
  useInterval(() => {
    if (scales[osc1Scale][osc1Steps[osc1Clock % 8]] > -1) {
      setOsc1Frequency(scales[osc1Scale][osc1Steps[osc1Clock % 8]]);
    } else {
      setOsc1Frequency(0);
    }
    if (VCF.modulator === 'osc1') {
      handleModulator(osc1Steps[osc1Clock % 8])
    }
    setOsc1Clock(osc1Clock + 1);
  }, bpm / masterOsc1ClockDivide);

  useInterval(() => {
    if (scales[osc2Scale][osc2Steps[osc2Clock % 8]] > -1) {
      setOsc2Frequency(scales[osc2Scale][osc2Steps[osc2Clock % 8]]);
    } else {
      setOsc2Frequency(0);
    }
    if (VCF.modulator === 'osc2') {
      handleModulator(osc2Steps[osc2Clock % 8])
    }
    setOsc2Clock(osc2Clock + 1);
  }, bpm / masterOsc2ClockDivide);

  useInterval(() => {
    if (scales[osc3Scale][osc3Steps[osc3Clock % 8]] > -1) {
      setOsc3Frequency(scales[osc3Scale][osc3Steps[osc3Clock % 8]]);
    } else {
      setOsc3Frequency(0);
    }
    if (VCF.modulator === 'osc3') {
      handleModulator(osc3Steps[osc3Clock % 8])
    }
    setOsc3Clock(osc3Clock + 1);
  }, bpm / masterOsc3ClockDivide);

  // Update each oscs pitch/frequency divider
  useEffect(() => {
    changeOscFrequency(0, osc1Frequency / VCO1.octave, VCO1.portamento);
  }, [osc1Frequency, VCO1.octave]);

  useEffect(() => {
    changeOscFrequency(1, osc2Frequency / VCO2.octave, VCO2.portamento);
  }, [osc2Frequency, VCO2.octave]);

  useEffect(() => {
    changeOscFrequency(2, osc3Frequency / VCO3.octave, VCO3.portamento);
  }, [osc3Frequency, VCO3.octave]);

  // Update each oscs shape & detune
  useEffect(() => {
    handleOscSideEffects("VCO1", VCO1, 0);
  }, [VCO1]);

  useEffect(() => {
    handleOscSideEffects("VCO2", VCO2, 1);
  }, [VCO2]);

  useEffect(() => {
    handleOscSideEffects("VCO3", VCO3, 2);
  }, [VCO3]);

  useEffect(() => {
    changeFilterFrequency(VCF.frequency);
    changeFilterResonance(VCF.resonance);
  }, [VCF]);

  useEffect(() => {
    changeDelayFeedback(Delay.feedback);
    changeDelayTime(Delay.time);
  }, [Delay]);

  useEffect(() => {
    changeGain(VCA.gain);
  }, [VCA]);

  function handleModulator(modulatorValue) {
    let modulatedFrequencyValue;
    if (modulatorValue === -1) {
      modulatedFrequencyValue = 100;
    } else {
      modulatorValue++;
      modulatedFrequencyValue = (modulatorValue * 9000) / 8;
    }
    dispatch({
      type: "update-module",
      payload: {
        module: "VCF",
        property: "frequency",
        value: modulatedFrequencyValue
      }
    });
  }

  function handleOscSideEffects(oscName, oscRef, oscId) {
    if (!oldState || oldState[oscName].shape !== oscRef.shape) {
      changeOscShape(oscId, oscRef.shape);
    }
    if (!oldState || oldState[oscName].detune !== oscRef.detune) {
      changeOscDetune(oscId, oscRef.detune);
    }
  };
  

  return (
    <>
      <RackContext.Provider value={{ VCO1, VCO2, VCO3, VCF, Delay, VCA }}>
        <DispatchContext.Provider value={dispatch}>
          <div className="App">
            <div className="header">
              <div>
                <input
                  className="slider"
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
              <h1 className="title"><span className="spanOne">Sequencer</span> <span className="spanTwo">Synthesizer</span></h1>
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
          </div>
        </DispatchContext.Provider>
      </RackContext.Provider>
    </>
  );
}

export default App;
