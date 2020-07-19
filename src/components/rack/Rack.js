import React from "react";
import "./Rack.css";

function allowDrop(ev) {
  ev.preventDefault();
}

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
              {slot.type}
            </div>
            <button
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
