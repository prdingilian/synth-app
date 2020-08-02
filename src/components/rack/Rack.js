import React from "react";
import "./Rack.css";
import VCO from "../vco/VCO";
import VCF from "../vcf/VCF";
import VCA from "../vca/VCA";
import Delay from "../delay/Delay";

function Rack() {
  return (
    <div className="rackContainer">
      <div className="rackSlot">
        <VCO name="VCO1" color="coral" />
      </div>
      <div className="rackSlot">
        <VCO name="VCO2" color="paleturquoise" />
      </div>
      <div className="rackSlot">
        <VCO name="VCO3" color="#89edb7" />
      </div>
      <div className="rackSlot">
        <VCF color="aliceblue" />
      </div>
      <div className="rackSlot">
        <Delay color="cornsilk" />
      </div>
      <div className="rackSlot">
        <VCA color="lavender" />
      </div>
    </div>
  );
}

export default Rack;
