import React, { useReducer } from "react";
import Rack from "./components/rack/Rack";
import Modules from "./components/modules/Modules";
import "./App.css";
import {
  createAmp,
  createFilter,
  createOsc,
  removeAmp,
  removeOsc,
  changeFilterFrequency,
  changeFilterResonance,
  changeGain,
  changeOscShape,
  changeOscDetune,
  removeFilter,
} from "./webAudio";

export const RackContext = React.createContext();
export const DispatchContext = React.createContext();

function reducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case "add-module":
      newState.slots[action.payload.index] = { type: action.payload.type };
      switch (action.payload.type) {
        case "VCO":
          newState.slots[action.payload.index].detune = 0;
          newState.slots[action.payload.index].shape = 0;
          createOsc(action.payload.index, "sine");
          break;
        case "VCA":
          newState.slots[action.payload.index].gain = 10;
          createAmp();
          break;
        case "VCF":
          newState.slots[action.payload.index].frequency = 4500;
          newState.slots[action.payload.index].resonance = 7;
          createFilter();
          break;
        default:
          break;
      }
      return newState;
    case "delete-module":
      switch (newState.slots[action.payload.index].type) {
        case "VCO":
          removeOsc(action.payload.index);
          break;
        case "VCA":
          removeAmp();
          break;
        case "VCF":
          removeFilter();
          break;
        default:
          break;
      }
      newState.slots[action.payload.index] = { type: null };
      return newState;
    case "update-module":
      newState.slots[action.payload.index][action.payload.property] =
        action.payload.value;
      switch (action.payload.property) {
        case "shape":
          changeOscShape(action.payload.index, action.payload.value);
          break;
        case "detune":
          changeOscDetune(action.payload.index, action.payload.value);
          break;
        case "gain":
          changeGain(action.payload.value);
          break;
        case "frequency":
          changeFilterFrequency(action.payload.value);
          break;
        case "resonance":
          changeFilterResonance(action.payload.value);
          break;
        default:
          break;
      }
      return newState;
    default:
      return state;
  }
}

function App() {
  const [rack, dispatch] = useReducer(reducer, {
    slots: [
      { type: null },
      { type: null },
      { type: null },
      { type: null },
      { type: null },
    ],
  });
  const modules = ["VCO", "VCF", "VCA"];

  return (
    <>
      <RackContext.Provider value={rack}>
        <DispatchContext.Provider value={dispatch}>
          <div className="App">
            <Rack />
            <Modules modules={modules} />
          </div>
        </DispatchContext.Provider>
      </RackContext.Provider>
    </>
  );
}

export default App;
