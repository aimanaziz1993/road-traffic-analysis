import { type FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type { RoadCandidate } from '../../types';
import L from 'leaflet';

interface MapAnimatorProps {
  results?: RoadCandidate[];
}

export const MapAnimator: FC<MapAnimatorProps> = ({ results }) => {
  const map = useMap();

  useEffect(() => {
    if (!results || results.length === 0) return;

    // Create a bounding box that contains all road segments
    const bounds = L.latLngBounds(
      results.flatMap(road =>
        road.geometry.coordinates.map(coord => [coord[1], coord[0]] as [number, number])
      )
    );

    if (bounds.isValid()) {
      map.flyToBounds(bounds, {
        padding: [50, 50], // Add some padding around the edges
        duration: 1.5, // Animation duration in seconds
      });
    }
  }, [results, map]);

  return null; // This component does not render anything
};