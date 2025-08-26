import { useState } from "react";
import StoreSVG from "../../assets/store.svg";
import GasStationSVG from "../../assets/gas-station.svg";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface MapLayerToggleProps {
  onToggle: (layer: string) => void;
  layer: string;
}

const MapLayerToggle = ({ onToggle, layer }: MapLayerToggleProps) => {
  const handleToggle = (event: any, value: any) => {
    onToggle(value);
  };

  return (
    <ToggleButtonGroup
      value={layer}
      exclusive
      onChange={handleToggle}
      aria-label="map layer toggle"
    >
      <ToggleButton value="gas" aria-label="left aligned">
        <img src={GasStationSVG} alt="Gas Station Icon" className="w-6 h-6" />
      </ToggleButton>
      <ToggleButton value="grocery" aria-label="centered">
        <img src={StoreSVG} alt="Store Icon" className="w-6 h-6" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default MapLayerToggle;
