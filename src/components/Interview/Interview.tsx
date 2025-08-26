import React, { useEffect, useState, useCallback } from "react";
import {
  Map,
  useControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl/maplibre";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { DeckProps, MapViewState, LayersList } from "@deck.gl/core";
import { ScatterplotLayer } from "@deck.gl/layers";
import { gasStations } from "../../data/gasStations";
import { groceryStores } from "../../data/groceryStores";
import MapLayerToggle from "../MapLayerToggle";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Tooltip from "../Tooltip";
import type { PickingInfo } from "@deck.gl/core";
import "maplibre-gl/dist/maplibre-gl.css";

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -77,
  latitude: 38.9,
  zoom: 11.5,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const DeckGLOverlay = (props: DeckProps) => {
  const overlay = useControl<MapboxOverlay>(
    () => new MapboxOverlay({ ...props, interleaved: true })
  );
  overlay.setProps(props);
  return null;
};

const Interview = () => {
  const [layers, setLayers] = useState<LayersList>([]);
  const [info, setInfo] = useState<{ [key: string]: PickingInfo }>({});
  const [layerType, setLayerType] = useState<"gas" | "grocery">("gas");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const hideTooltip = useCallback((key: string) => {
    setInfo((prev) => {
      const newInfo = { ...prev };
      delete newInfo[key];
      return newInfo;
    });
  }, []);

  const expandTooltip = useCallback((pickedObject: PickingInfo) => {
    setInfo((prev) => ({
      ...prev,
      [`${pickedObject.object.properties?.GLOBALID}`]: pickedObject,
    }));
  }, []);

  const createScatterplotLayer = useCallback(
    (data: any, type: "gas" | "grocery") =>
      new ScatterplotLayer({
        id: "scatter-plot",
        data,
        radiusScale: 45,
        radiusMinPixels: 0.25,
        getPosition: (d) => d.geometry.coordinates,
        getFillColor: (d) => (type === "gas" ? [0, 128, 255] : [34, 197, 94]),
        getRadius: 1,
        updateTriggers: {
          getFillColor: [type],
        },
        pickable: true,
        onClick: expandTooltip,
      }),
    [expandTooltip]
  );

  useEffect(() => {
    setLayers([createScatterplotLayer(gasStations.features, "gas")]);
  }, [createScatterplotLayer]);

  useEffect(() => {
    const data =
      layerType === "gas" ? gasStations.features : groceryStores.features;
    const names = data.map((feature, index) => {
      const name =
        layerType === "gas"
          ? feature.properties?.NAME
          : feature.properties?.STORENAME;
      const address =
        feature.properties?.ADDRESS || feature.properties?.Address || "";
      return `${name} - ${address}`;
    });
    setFilteredOptions(names);
  }, [layerType]);

  const resetInfo = useCallback(() => {
    setInfo({});
  }, []);

  const handleInputChange = (event: any, value: string) => {
    // Clear the tooltip when the user types
    resetInfo();

    const data =
      layerType === "gas" ? gasStations.features : groceryStores.features;

    const allNames = data.map((feature) => {
      const name =
        layerType === "gas"
          ? feature.properties?.NAME
          : feature.properties?.STORENAME;
      const address =
        feature.properties?.ADDRESS || feature.properties?.Address || "";
      return `${name} - ${address}`;
    });

    if (!value.trim()) {
      setFilteredOptions(allNames);
      return;
    }

    const filtered = allNames.filter((option) =>
      option?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleToggle = (layer: string) => {
    const newLayerType = layer as "gas" | "grocery";
    const data =
      layer === "gas" ? gasStations.features : groceryStores.features;
    setLayers([createScatterplotLayer(data, newLayerType)]);
    setLayerType(newLayerType);
    setFilteredOptions([]);
    resetInfo();
  };

  const handleSelect = (event: any, value: string | null) => {
    // Handle clearing the search
    if (!value) {
      const features =
        layerType === "gas" ? gasStations.features : groceryStores.features;
      setLayers([createScatterplotLayer(features, layerType)]);
      return;
    }

    // Find the exact feature that matches the full "Name - Address" string
    const data =
      layerType === "gas" ? gasStations.features : groceryStores.features;
    const selectedFeature = data.find((feature) => {
      const name =
        layerType === "gas"
          ? feature.properties?.NAME
          : feature.properties?.STORENAME;
      const address =
        feature.properties?.ADDRESS || feature.properties?.Address || "";
      const fullString = `${name} - ${address}`;
      return fullString === value;
    });

    if (selectedFeature) {
      setLayers([createScatterplotLayer([selectedFeature], layerType)]);
    }
  };

  return (
    <div className="w-screen h-screen relative">
      <Map initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE} reuseMaps>
        <DeckGLOverlay layers={layers} onViewStateChange={resetInfo} />
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-right" />
      </Map>
      <div className="absolute top-4 left-4 z-10 bg-white">
        <Autocomplete
          options={filteredOptions}
          onInputChange={handleInputChange}
          onChange={handleSelect}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                layerType === "gas"
                  ? "Search Gas Station"
                  : "Search Grocery Store"
              }
              slotProps={{
                input: {
                  ...params.InputProps,
                },
              }}
            />
          )}
        />
      </div>
      <div className="absolute bottom-4 left-4 z-10">
        <MapLayerToggle onToggle={handleToggle} layer={layerType} />
      </div>
      {Object.keys(info).length > 0 &&
        Object.keys(info).map((key) => {
          return (
            <Tooltip
              key={key}
              layerType={layerType}
              onClose={hideTooltip}
              x={info[key].x}
              y={info[key].y}
              object={info[key].object}
            />
          );
        })}
    </div>
  );
};

export default Interview;
