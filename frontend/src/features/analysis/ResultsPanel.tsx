import { type FC } from 'react';
import type { AnalysisRequest, RoadCandidate } from '../../types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { getErrorMessage } from '../../utils/rtkErrorHandling';
import '../../styles/ResultsPanel.css';

interface ResultsPanelProps {
  results?: RoadCandidate[];
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
  onRoadSelect: (road: RoadCandidate) => void;
  filters: AnalysisRequest;
}

const FilterPill: FC<{ label: string }> = ({ label }) => (
  <div className="filter-pill">{label}</div>
);

export const ResultsPanel: FC<ResultsPanelProps> = ({ results, isLoading, error, onRoadSelect, filters }) => {
  if (isLoading) return <div className="results-panel">Loading...</div>;
  if (error) return <div className="results-panel error">{getErrorMessage(error)}</div>;
  if (!results) return <div className="results-panel">Run an analysis to see results.</div>;
  if (results.length === 0) return <div className="results-panel">No roads found for the selected criteria.</div>;

  const filterPills = [
    filters.city && <FilterPill key="city" label={filters.city} />,
    filters.roadType && <FilterPill key="roadType" label={filters.roadType} />,
    filters.minLanes && <FilterPill key="lanes" label={`≥ ${filters.minLanes} lanes`} />
  ].filter(Boolean);

  return (
    <div className="results-panel">
      <h3 className="results-header">Top 10 Potential Locations</h3>
      <div className="filters-display">
        filter: {filterPills.length > 0 ? filterPills : <FilterPill label="All Selangor" />}
      </div>
      <ul className="results-list">
        {results.map((road, index) => (
          <li key={road.id} className="result-item compact" onClick={() => onRoadSelect(road)}>
            <div className="rank">{index + 1}</div>
            <div className="compact-details">
              <div className="road-name">{road.roadName} - {road.city}</div>
              <div className="score-bar-background">
                <div 
                  className="score-bar-foreground" 
                  style={{ width: `${road.locationPotentialScore * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="score-value">{road.locationPotentialScore.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};