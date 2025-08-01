import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobProvider } from './contexts/JobContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import JobDetails from './pages/JobDetails';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <JobProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddJob />} />
              <Route path="/job/:id" element={<JobDetails />} />
            </Routes>
          </Layout>
        </Router>
      </JobProvider>
    </div>
  );
}

export default App;