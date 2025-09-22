import { type FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type { RoadCandidate } from '../../types';
import L from 'leaflet';

interface ZoomToFeatureProps {
  feature: RoadCandidate | null;
}

export const ZoomToFeature: FC<ZoomToFeatureProps> = ({ feature }) => {
  const map = useMap();

  useEffect(() => {
    if (!feature) return;

    const bounds = L.latLngBounds(
      feature.geometry.coordinates.map(coord => [coord[1], coord[0]] as [number, number])
    );

    if (bounds.isValid()) {
      map.flyToBounds(bounds, {
        padding: [100, 100],
        duration: 1.5,
        maxZoom: 15,
      });
    }
  }, [feature, map]);

  return null;
};