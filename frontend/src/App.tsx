import { useEffect, useState } from 'react';
import { ResultsPanel } from './features/analysis/ResultsPanel';
import { MapView } from './features/map/MapView';
import { AnalysisForm } from './features/analysis/AnalysisForm';
import { useRunAnalysisMutation } from './features/api/analysisApi';
import type { AnalysisRequest, RoadCandidate } from './types';
import './styles/App.css';

const PanelToggleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function App() {
  const [runAnalysis, { data: results, isLoading, error }] = useRunAnalysisMutation();
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [selectedRoad, setSelectedRoad] = useState<RoadCandidate | null>(null);
  const [activeFilters, setActiveFilters] = useState<AnalysisRequest>({});

  useEffect(() => {
    const initialFilters = {};
    setActiveFilters(initialFilters);
    runAnalysis({});
  }, [runAnalysis])

  const handleAnalysis = (filters: AnalysisRequest) => {
    setSelectedRoad(null); 
    setActiveFilters(filters);
    runAnalysis(filters);
  };

  return (
    <div className="App-container">
      <header className="App-header">
        <h1>🍔 Best Burger Teramat Viral - Location Analysis</h1>
      </header>
      <main className="App-main">
        {/* <div className="sidebar">
          <AnalysisForm onAnalyze={handleAnalysis} isLoading={isLoading} />
          <ResultsPanel results={results} isLoading={isLoading} error={error} />
        </div> */}
        <div className={`sidebar ${isPanelOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-content">
            <AnalysisForm onAnalyze={handleAnalysis} isLoading={isLoading} />
            <ResultsPanel 
              results={results} 
              isLoading={isLoading} 
              error={error} 
              onRoadSelect={setSelectedRoad}
              filters={activeFilters}
            />
          </div>
          <button className="panel-toggle-button" onClick={() => setIsPanelOpen(!isPanelOpen)} title="Toggle Panel">
            <PanelToggleIcon />
          </button>
        </div>
        <div className="map-container">
          <MapView results={results} selectedRoad={selectedRoad} />
        </div>
      </main>
    </div>
  );
}

export default App;