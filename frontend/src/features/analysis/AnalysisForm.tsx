import { useState, type FC, type FormEvent } from 'react';
import type { AnalysisRequest } from '../../types';
import '../../styles/AnalysisForm.css';

interface AnalysisFormProps {
  onAnalyze: (filters: AnalysisRequest) => void;
  isLoading: boolean;
}

export const AnalysisForm: FC<AnalysisFormProps> = ({ onAnalyze, isLoading }) => {
  const [city, setCity] = useState('');
  const [roadType, setRoadType] = useState('');
  const [minLanes, setMinLanes] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAnalyze({
      city: city || null,
      roadType: roadType || null,
      minLanes: minLanes ? parseInt(minLanes, 10) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="analysis-form">
      <h3>Analysis Filters</h3>
      <div className="form-group">
        <label>City</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g., Shah Alam" />
      </div>
      <div className="form-group">
        <label>Road Type</label>
        <select value={roadType} onChange={(e) => setRoadType(e.target.value)}>
          <option value="">Any</option>
          <option value="expressway">Expressway</option>
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
        </select>
      </div>
      <div className="form-group">
        <label>Minimum Lanes</label>
        <input type="number" value={minLanes} onChange={(e) => setMinLanes(e.target.value)} placeholder="min lanes must be 1 - 16" />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Run Analysis'}
      </button>
    </form>
  );
};