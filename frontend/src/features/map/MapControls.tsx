import { type FC } from 'react';
import type { MapLayer } from './MapView';
import '../../styles/MapControls.css';

interface MapControlsProps {
  activeLayer: MapLayer;
  setActiveLayer: (layer: MapLayer) => void;
}

export const MapControls: FC<MapControlsProps> = ({ activeLayer, setActiveLayer }) => {
  return (
    <div className="leaflet-top leaflet-left">
      <div className="map-controls-container">
        <div className="leaflet-control leaflet-bar layer-switcher">
          <button
            className={activeLayer === 'lines' ? 'active' : ''}
            onClick={() => setActiveLayer('lines')}
            title="Lines View"
          >
            Potential
          </button>
          <button
            className={activeLayer === 'heatmap' ? 'active' : ''}
            onClick={() => setActiveLayer('heatmap')}
            title="Heatmap View"
          >
            Heatmap
          </button>
        </div>
        
        {activeLayer === 'lines' && (
          <div className="leaflet-control legend">
            <div className="legend-title">Location Potential</div>
            <div className="legend-gradient"></div>
            <div className="legend-labels">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};