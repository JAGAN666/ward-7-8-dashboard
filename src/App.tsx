import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Story1 } from './pages/Story1';
import { Story2 } from './pages/Story2';
import { DataExplorer } from './pages/DataExplorer';
import { CrimeAnalysis } from './pages/CrimeAnalysis';
import { Ward7 } from './pages/Ward7';
import { Ward8 } from './pages/Ward8';
import { Compare } from './pages/Compare';
import { Demographics } from './pages/Demographics';
import { Economics } from './pages/Economics';
import { Housing } from './pages/Housing';
import { Social } from './pages/Social';
import { FoodAccess } from './pages/FoodAccess';
import { DataDictionary } from './pages/DataDictionary';
import { Map } from './pages/Map';
import { DebugMap } from './pages/DebugMap';
import { ExecutiveSummary } from './pages/ExecutiveSummary';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summary" element={<ExecutiveSummary />} />
            <Route path="/story1" element={<Story1 />} />
            <Route path="/story2" element={<Story2 />} />
            <Route path="/explore" element={<DataExplorer />} />
            <Route path="/crime" element={<CrimeAnalysis />} />
            <Route path="/ward7" element={<Ward7 />} />
            <Route path="/ward8" element={<Ward8 />} />
            <Route path="/compare" element={<Compare />} />
            {/* Research Data Pages */}
            <Route path="/demographics" element={<Demographics />} />
            <Route path="/economics" element={<Economics />} />
            <Route path="/housing" element={<Housing />} />
            <Route path="/social" element={<Social />} />
            <Route path="/food-access" element={<FoodAccess />} />
            <Route path="/data-dictionary" element={<DataDictionary />} />
            <Route path="/map" element={<Map />} />
            <Route path="/debug-map" element={<DebugMap />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
