import { ResultsPanel } from './features/analysis/ResultsPanel';
import { MapView } from './features/map/MapView';
import { AnalysisForm } from './features/analysis/AnalysisForm';
import { useRunAnalysisMutation } from './features/api/analysisApi';
import type { AnalysisRequest } from './types';
import './styles/App.css';
import { useEffect } from 'react';

function App() {
  const [runAnalysis, { data: results, isLoading, error }] = useRunAnalysisMutation();

  useEffect(() => {
    runAnalysis({});
  }, [runAnalysis])

  const handleAnalysis = (filters: AnalysisRequest) => {
    runAnalysis(filters);
  };

  return (
    <div className="App-container">
      <header className="App-header">
        <h1>🍔 Best Burger Teramat Viral - Location Analysis</h1>
      </header>
      <main className="App-main">
        <div className="sidebar">
          <AnalysisForm onAnalyze={handleAnalysis} isLoading={isLoading} />
          <ResultsPanel results={results} isLoading={isLoading} error={error} />
        </div>
        <div className="map-container">
          <MapView results={results} />
        </div>
      </main>
    </div>
  );
}

export default App;