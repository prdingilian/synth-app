import React, { useReducer } from "react";
import Rack from "./components/rack/Rack";
import Modules from "./components/modules/Modules";
import "./App.css";

function reducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case "add-module":
      newState.slots[action.payload.index] = { type: action.payload.type };
      return newState;
    case "delete-module":
      newState.slots[action.payload.index] = { type: null };
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
    <div className="App">
      <Rack rack={rack} dispatch={dispatch} />
      <Modules modules={modules} />
    </div>
  );
}

export default App;
