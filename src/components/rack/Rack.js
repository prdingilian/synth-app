import React from "react";
import "./Rack.css";
import VCO from "../vco/VCO";
import VCF from "../vcf/VCF";
import VCA from "../vca/VCA";

function Rack() {
  return (
    <div className="rackContainer">
      <div className="rackSlot">
        <VCO name="VCO1" color="cornsilk" />
      </div>
      <div className="rackSlot">
        <VCO name="VCO2" color="blanchedalmond" />
      </div>
      <div className="rackSlot">
        <VCO name="VCO3" color="burlywood" />
      </div>
      <div className="rackSlot">
        <VCF color="aliceblue" />
      </div>
      <div className="rackSlot">
        <VCA color="lavender" />
      </div>
    </div>
  );
}

export default Rack;
