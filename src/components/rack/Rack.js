import React, { useContext } from "react";
import "./Rack.css";
import VCO from "../vco/VCO";
import VCF from "../vcf/VCF";
import VCA from "../vca/VCA";
import { RackContext } from "../../App";
import { DispatchContext } from "../../App";

function allowDrop(ev) {
  ev.preventDefault();
}

let displayComponent = (module, index, dispatch) => {
  switch (module.type) {
    case "VCO":
      return <VCO index={index} />;
    case "VCF":
      return <VCF></VCF>;
    case "VCA":
      return <VCA></VCA>;
    default:
      return "";
  }
};

function Rack() {
  const rack = useContext(RackContext);
  const dispatch = useContext(DispatchContext);
  return (
    <div className="rackContainer">
      <div className="rack">
        {rack.slots.map((slot, i) => (
          <div>
            <div
              className="rackSlot"
              onDragOver={allowDrop}
              onDrop={(e) =>
                dispatch({
                  type: "add-module",
                  payload: { index: i, type: e.dataTransfer.getData("module") },
                })
              }
            >
              {displayComponent(slot, i, dispatch)}
            </div>
            <button
              className="deleteButton"
              onClick={(e) =>
                dispatch({ type: "delete-module", payload: { index: i } })
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
