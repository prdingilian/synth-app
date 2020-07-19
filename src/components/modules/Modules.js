import React from "react";
import "./Modules.css";

function drag(ev) {
  ev.dataTransfer.setData("module", ev.target.innerHTML);
}

function Modules(props) {
  return (
    <div className="modulesContainer">
      {props.modules.map((module) => (
        <div draggable="true" onDragStart={drag} className="module">
          {module}
        </div>
      ))}
    </div>
  );
}

export default Modules;
