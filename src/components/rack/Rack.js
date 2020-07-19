import React from "react";
import "./Rack.css";
import VCO from "../vco/VCO.js";
import VCF from "../vcf/VCF.js";
import VCA from "../vca/VCA.js";

function allowDrop(ev) {
  ev.preventDefault();
}

let displayComponent = (module, index, dispatch) => {
  switch (module.type) {
    case "VCO":
      return (
        <VCO
          gain={module.gain}
          shape={module.shape}
          dispatch={dispatch}
          index={index}
        ></VCO>
      );
    case "VCF":
      return <VCF></VCF>;
    case "VCA":
      return <VCA></VCA>;
    default:
      return "";
  }
};

function Rack(props) {
  return (
    <div className="rackContainer">
      <div className="rack">
        {props.rack.slots.map((slot, i) => (
          <div>
            <div
              className="rackSlot"
              onDragOver={allowDrop}
              onDrop={(e) =>
                props.dispatch({
                  type: "add-module",
                  payload: { index: i, type: e.dataTransfer.getData("module") },
                })
              }
            >
              {displayComponent(slot, i, props.dispatch)}
            </div>
            <button
              className="deleteButton"
              onClick={(e) =>
                props.dispatch({ type: "delete-module", payload: { index: i } })
              }
            >
              Clear Slot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rack;
