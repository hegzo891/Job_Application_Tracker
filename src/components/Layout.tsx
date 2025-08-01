import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Plus, Home, Menu, X, Upload, Download, BarChart3, Moon, Sun } from 'lucide-react';
import { useJobs } from '../contexts/JobContext';
import { exportJobsToJSON, importJobsFromJSON } from '../utils/storage';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { state, importJobs, toggleTheme } = useJobs();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Add Job', href: '/add', icon: Plus },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleExport = () => {
    exportJobsToJSON(state.jobs);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importJobsFromJSON(file)
        .then(jobs => {
          importJobs(jobs);
          alert('Jobs imported successfully!');
        })
        .catch(error => {
          alert(`Import failed: ${error.message}`);
        });
    }
    event.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg group-hover:shadow-lg transition-all duration-200">
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                JobTracker
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-800 to-indigo-800 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Export/Import */}
              <div className="flex items-center space-x-1 ml-6 pl-6 border-l border-gray-200 dark:border-gray-600">
             
                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                  title="Export jobs"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden xl:inline">Export</span>
                </button>
                <label className="flex items-center space-x-2 px-4 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <span className="hidden xl:inline">Import</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="block h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="block h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-3 pb-4 space-y-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4 space-y-2">
                  
                  <button
                    onClick={() => { handleExport(); setIsMenuOpen(false); }}
                    className="flex items-center space-x-3 px-4 py-3 text-base font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 w-full"
                  >
                    <Download className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span>Export Jobs</span>
                  </button>
                  <label className="flex items-center space-x-3 px-4 py-3 text-base font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 cursor-pointer">
                    <Upload className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span>Import Jobs</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => { handleImport(e); setIsMenuOpen(false); }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}