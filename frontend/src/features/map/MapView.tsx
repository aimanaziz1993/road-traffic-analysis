import { type FC } from 'react';
import { MapContainer, TileLayer, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { RoadCandidate } from '../../types';
import { MapAnimator } from './MapAnimator';

const getColor = (trafficIndex: number) => {
    const hue = (1 - trafficIndex) * 120; // 0 (red) to 120 (green)
    return `hsl(${hue}, 100%, 50%)`;
};

interface MapViewProps {
  results?: RoadCandidate[];
}

export const MapView: FC<MapViewProps> = ({ results }) => {
  const selangorCenter: [number, number] = [3.0738, 101.5183];

  return (
    <MapContainer center={selangorCenter} zoom={10} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {results && results.map(road => {
        const color = getColor(road.trafficIndex);
        const positions = road.geometry.coordinates.map(coord => [coord[1], coord[0]] as [number, number]);
        return (
          <Polyline
            key={road.id}
            positions={positions}
            pathOptions={{ color: color, weight: 5 }}
          >
            <Tooltip>
              <div><strong>{road.roadName}</strong></div>
              <div>Traffic Index: {road.trafficIndex}</div>
              <div>{road.city}</div>
            </Tooltip>
          </Polyline>
        );
      })}
      <MapAnimator results={results} />
    </MapContainer>
  );
};