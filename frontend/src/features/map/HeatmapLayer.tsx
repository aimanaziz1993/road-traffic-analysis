import { type FC, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

type HeatmapPoint = [number, number, number];

interface HeatmapLayerProps {
  points: HeatmapPoint[];
  radius?: number;
  blur?: number;
}

export const HeatmapLayer: FC<HeatmapLayerProps> = ({ points, radius = 25, blur = 20 }) => {
  const map = useMap();
  const layerRef = useRef<L.HeatLayer | null>(null);

  useEffect(() => {
    if (!points || points.length === 0) {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
      return;
    }

    if (!layerRef.current) {
      layerRef.current = L.heatLayer(points, { radius, blur }).addTo(map);
    } else {
      layerRef.current.setLatLngs(points);
    }

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        // It's good practice to nullify the ref after removing the layer
        layerRef.current = null;
      }
    };

  }, [points, map, radius, blur]);

  return null;
};