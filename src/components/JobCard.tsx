import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, MapPin, ExternalLink, ChevronDown } from 'lucide-react';
import { Job } from '../types/Jobs';
import { useJobs } from '../contexts/JobContext';

interface JobCardProps {
  job: Job;
}

const statusColors = {
  Applied: 'bg-blue-100 text-blue-800 border-blue-200',
  Interviewing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Offer: 'bg-green-100 text-green-800 border-green-200',
  Rejected: 'bg-red-100 text-red-800 border-red-200',
};

const statusIcons = {
  Applied: '📤',
  Interviewing: '💬',
  Offer: '🎉',
  Rejected: '❌',
};

export default function JobCard({ job }: JobCardProps) {
  const { updateJobStatus } = useJobs();
  const [showStatusDropdown, setShowStatusDropdown] = React.useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleStatusChange = (newStatus: Job['status'], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateJobStatus(job.id, newStatus);
    setShowStatusDropdown(false);
  };

  const statusOptions: Job['status'][] = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

  return (
    <div className="relative">
      <Link
        to={`/job/${job.id}`}
        className="block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 p-4 sm:p-6 group"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
              {job.jobTitle}
            </h3>
            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
              <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
                <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-200">{job.companyName}</span>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowStatusDropdown(!showStatusDropdown);
              }}
              className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-bold border shadow-sm ${
                statusColors[job.status]
              } whitespace-nowrap hover:shadow-md transition-all duration-200`}
            >
              <span className="mr-1.5">{statusIcons[job.status]}</span>
              {job.status}
              <ChevronDown className="ml-1 h-3 w-3" />
            </button>
            
            {showStatusDropdown && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={(e) => handleStatusChange(status, e)}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                      status === job.status 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <span className="mr-2">{statusIcons[status]}</span>
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400 space-y-2 sm:space-y-0">
          <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
            <Calendar className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
            <span className="font-medium">Applied {formatDate(job.applicationDate)}</span>
          </div>
          {job.location && (
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
              <MapPin className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
              <span className="font-medium truncate">{job.location}</span>
            </div>
          )}
        </div>

        {job.salary && (
          <div className="mt-4 flex items-center bg-green-50 dark:bg-green-900/20 rounded-lg px-3 py-2">
            <span className="text-green-600 dark:text-green-400 mr-2">💰</span>
            <span className="text-sm font-bold text-green-700 dark:text-green-400">{job.salary}</span>
          </div>
        )}

        {job.notes && (
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="line-clamp-2 leading-relaxed">
            {job.notes}
            </p>
          </div>
        )}

        {job.jobUrl && (
          <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-2">
            <ExternalLink className="h-4 w-4 mr-2" />
            <span className="font-semibold">View Job Posting</span>
          </div>
        )}
      </Link>
      
      {/* Backdrop to close dropdown */}
      {showStatusDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowStatusDropdown(false)}
        />
      )}
    </div>
  );
}