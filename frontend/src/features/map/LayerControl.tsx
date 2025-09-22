import type { FC } from 'react';
import '../../styles/LayerControl.css';

export type MapLayer = 'lines' | 'heatmap';

interface LayerControlProps {
  activeLayer: MapLayer;
  setActiveLayer: (layer: MapLayer) => void;
}

export const LayerControl: FC<LayerControlProps> = ({ activeLayer, setActiveLayer }) => {
  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control leaflet-bar layer-control-container">
        <button
          className={activeLayer === 'lines' ? 'active' : ''}
          onClick={() => setActiveLayer('lines')}
          title="Lines View"
        >
          Lines
        </button>
        <button
          className={activeLayer === 'heatmap' ? 'active' : ''}
          onClick={() => setActiveLayer('heatmap')}
          title="Heatmap View"
        >
          Heatmap
        </button>
      </div>
    </div>
  );
};