import type { FeatureCollection } from "geojson";

export interface MarkerCollection extends FeatureCollection {
  name: string;
  crs?: {
    type: string;
    properties: {
      name: string;
    };
  };
}
