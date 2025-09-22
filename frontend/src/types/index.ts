export interface GeometryData {
  type: 'LineString';
  coordinates: [number, number][]; // An array of [lng, lat] pairs
}

export interface RoadCandidate {
  id: string;
  roadName: string;
  city: string;
  roadType: string;
  lanes: number;
  trafficIndex: number;
  reason: string;
  locationPotentialScore: number;
  geometry: GeometryData;
  heatmapPoints: [number, number, number][];
}

export interface AnalysisRequest {
  city?: string | null;
  roadType?: string | null;
  minLanes?: number | null;
}