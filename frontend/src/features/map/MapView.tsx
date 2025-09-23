import{ type FC, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { RoadCandidate } from '../../types';
import { MapAnimator } from './MapAnimator';
// import { LayerControl, type MapLayer } from './LayerControl';
import { ZoomToFeature } from './ZoomToFeature';
import { HeatmapLayer } from './HeatmapLayer';
import { MapControls } from './MapControls';
import '../../styles/MapView.css';

// const getColor = (trafficIndex: number) => {
//     const hue = (1 - trafficIndex) * 120;
//     return `hsl(${hue}, 100%, 50%)`;
// };

const getColor = (score: number) => {
    // Score is 0-1, so hue is 0 (red) to 120 (green)
    const hue = score * 120;
    return `hsl(${hue}, 100%, 50%)`;
};

export type MapLayer = 'lines' | 'heatmap';

interface MapViewProps {
  results?: RoadCandidate[];
  selectedRoad: RoadCandidate | null;
}

export const MapView: FC<MapViewProps> = ({ results, selectedRoad }) => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('lines');
  const selangorCenter: [number, number] = [3.0738, 101.5183];

  const heatmapPoints: [number, number, number][] = results ? results.flatMap(road => road.heatmapPoints) ?? [] : [];

  return (
    <MapContainer center={selangorCenter} zoom={10} style={{ height: '100%', width: '100%' }} zoomControl={false}>
      <TileLayer
        // Using a dark theme tile layer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {/* Conditional Rendering of Layers */}
      {activeLayer === 'lines' && results?.map(road => {
        const positions = road.geometry.coordinates.map(
          coord => [coord[1], coord[0]] as [number, number]
        );
        return (
          <Polyline
            key={road.id}
            positions={positions}
            pathOptions={{ color: getColor(road.locationPotentialScore), weight: 5, opacity: 0.8 }}>
            <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent={false} className="custom-tooltip">
                <h4>{road.roadName} - {road.city}</h4>
                <p>{road.reason}</p>
                <div className="score-line">
                  Potential Score: <strong>{road.locationPotentialScore.toFixed(2)}</strong>, &nbsp;
                  Traffic Index: <strong>{road.trafficIndex}</strong>
                </div>
            </Tooltip>
          </Polyline>
        );
      })}

      {activeLayer === 'heatmap' && (
        <HeatmapLayer points={heatmapPoints} />
      )}

      <MapAnimator results={results} />
      <ZoomToFeature feature={selectedRoad} />
      <MapControls activeLayer={activeLayer} setActiveLayer={setActiveLayer} />
      {/* <LayerControl activeLayer={activeLayer} setActiveLayer={setActiveLayer} /> */}
    </MapContainer>
  );
};