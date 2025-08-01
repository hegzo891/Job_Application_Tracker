import React from 'react';
import { Search, Filter, BarChart3, Briefcase, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';
import JobCard from '../components/JobCard';

export default function Dashboard() {
  const { state, setSearchTerm, setStatusFilter, getFilteredJobs } = useJobs();
  const filteredJobs = getFilteredJobs();

  const stats = {
    total: state.jobs.length,
    applied: state.jobs.filter(job => job.status === 'Applied').length,
    interviewing: state.jobs.filter(job => job.status === 'Interviewing').length,
    offers: state.jobs.filter(job => job.status === 'Offer').length,
    rejected: state.jobs.filter(job => job.status === 'Rejected').length,
  };

  if (state.loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 transition-colors duration-300">
      {/* Header */}
      <div className="text-center sm:text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Job Applications Dashboard
          </h1>
          <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Track and manage your job applications
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl">
              <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Applied</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.applied}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-xl">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Interviews</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.interviewing}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Offers</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">{stats.offers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 rounded-xl">
              <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Rejections</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">{stats.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search by company, job title, location, or status..."
                value={state.searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
          <div className="lg:w-56">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <select
                value={state.statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-12 pr-8 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Interviews">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejections">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Job List */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 sm:py-20">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6">
            <Briefcase className="w-full h-full text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            {state.jobs.length === 0 ? 'No job applications yet' : 'No jobs match your search'}
          </h3>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {state.jobs.length === 0 
              ? 'Get started by adding your first job application.'
              : 'Try adjusting your search or filter criteria.'
            }
          </p>
          {state.jobs.length === 0 && (
            <div className="mt-8">
              <Link
                to="/add"
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 border border-transparent text-base sm:text-lg font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                Add Your First Job
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}