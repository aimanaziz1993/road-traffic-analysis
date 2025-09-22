import { type FC } from 'react';
import type { RoadCandidate } from '../../types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { getErrorMessage } from '../../utils/rtkErrorHandling';
import '../../styles/ResultsPanel.css';

interface ResultsPanelProps {
  results?: RoadCandidate[];
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

export const ResultsPanel: FC<ResultsPanelProps> = ({ results, isLoading, error }) => {
  if (isLoading) return <div className="results-panel">Loading...</div>;
  if (error) return <div className="results-panel error">{getErrorMessage(error)}</div>;
  if (!results) return <div className="results-panel">Run an analysis to see results.</div>;
  if (results.length === 0) return <div className="results-panel">No roads found for the selected criteria.</div>;

  // This is identical to the previous JS version, but with typed props.
  return (
    <div className="results-panel">
      <h3>Top 10 Candidate Roads</h3>
      <ul className="results-list">
        {results.map((road, index) => (
          <li key={road.id} className="result-item">
            <div className="rank">{index + 1}</div>
            <div className="details">
              <div className="road-name">{road.roadName} - {road.city}</div>
              <div className="reason">{road.reason}</div>
              <div className="score-container">
                  <div className="score-label">Potential Score</div>
                  <div className="score-value">{road.locationPotentialScore.toFixed(2)}</div>
                  <div className="score-bar-background">
                      <div 
                          className="score-bar-foreground" 
                          style={{ width: `${road.locationPotentialScore * 100}%` }}
                      ></div>
                  </div>
              </div>
              {/* <div className="traffic-index" style={{'--traffic-value': road.trafficIndex}  as React.CSSProperties}>
                Traffic Index: {road.trafficIndex}
              </div> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};