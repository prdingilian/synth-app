import React, { useReducer } from "react";
import Rack from "./components/rack/Rack";
import Modules from "./components/modules/Modules";
import "./App.css";

function reducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case "add-module":
      newState.slots[action.payload.index] = { type: action.payload.type };
      if (action.payload.type === "VCO") {
        newState.slots[action.payload.index].gain = 50;
        newState.slots[action.payload.index].shape = 50;
      }
      return newState;
    case "delete-module":
      newState.slots[action.payload.index] = { type: null };
      return newState;
    case "update-module":
      newState.slots[action.payload.index][action.payload.property] =
        action.payload.value;
      console.log(newState);
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
    <div className="App">
      <Rack rack={rack} dispatch={dispatch} />
      <Modules modules={modules} />
    </div>
  );
}

export default App;
