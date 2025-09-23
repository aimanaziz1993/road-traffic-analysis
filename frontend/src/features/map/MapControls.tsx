import { type FC, type ChangeEvent } from 'react';
import type { MapLayer } from './MapView';
import { basemaps } from './map.config';
import '../../styles/MapControls.css';

interface MapControlsProps {
  activeLayer: MapLayer;
  setActiveLayer: (layer: MapLayer) => void;
  activeBasemapId: string;
  setActiveBasemapId: (id: string) => void;
}

export const MapControls: FC<MapControlsProps> = ({ activeLayer, setActiveLayer, activeBasemapId, setActiveBasemapId }) => {
  const handleBasemapChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setActiveBasemapId(event.target.value);
  };

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

        <div className="leaflet-control leaflet-bar basemap-switcher">
          <label htmlFor="basemap-select">Basemap</label>
          <select id="basemap-select" value={activeBasemapId} onChange={handleBasemapChange}>
            {basemaps.map(basemap => (
              <option key={basemap.id} value={basemap.id}>
                {basemap.name}
              </option>
            ))}
          </select>
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