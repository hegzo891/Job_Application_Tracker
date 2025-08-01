import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2, Calendar, MapPin, DollarSign, Mail, ExternalLink, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useJobs } from '../contexts/JobContext';
import JobForm from '../components/JobForm';

export default function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getJob, updateJob, deleteJob } = useJobs();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const job = id ? getJob(id) : undefined;

  if (!job) {
    return (
      <div className="text-center py-16 sm:py-20 transition-colors duration-300">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6">
          <Building2 className="w-full h-full text-gray-400 dark:text-gray-500" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Job not found</h2>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-6">The job application you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleUpdate = (updatedJob: Omit<typeof job, 'id' | 'createdAt' | 'updatedAt'>) => {
    updateJob({ ...job, ...updatedJob });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteJob(job.id);
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto transition-colors duration-300">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => setIsEditing(false)}
            className="inline-flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Cancel Edit
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Edit Job Application
          </h1>
          <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Update the details of your job application
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
          <JobForm
            initialJob={job}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            submitLabel="Update Job Application"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto transition-colors duration-300">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-4 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {job.jobTitle}
            </h1>
            <div className="flex items-center text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <span className="font-semibold">{job.companyName}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <span
              className={`inline-flex items-center px-4 py-2.5 rounded-full text-sm font-bold border shadow-lg ${
                statusColors[job.status]
              }`}
            >
              <span className="mr-2 text-base">{statusIcons[job.status]}</span>
              {job.status}
            </span>
            
            <div className="flex space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2.5 border border-red-300 dark:border-red-600 rounded-xl text-sm font-semibold text-red-700 dark:text-red-400 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Application Date</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatDate(job.applicationDate)}</p>
              </div>
            </div>

            {job.location && (
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                  <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{job.location}</p>
                </div>
              </div>
            )}

            {job.salary && (
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-4">
                  <DollarSign className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Salary Range</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{job.salary}</p>
                </div>
              </div>
            )}

            {job.contactEmail && (
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
                  <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Contact Email</p>
                  <a
                    href={`mailto:${job.contactEmail}`}
                    className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    {job.contactEmail}
                  </a>
                </div>
              </div>
            )}
          </div>

          {job.jobUrl && (
            <div className="mb-8">
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-base font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Job Posting
              </a>
            </div>
          )}

          {job.notes && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Notes</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 sm:p-6">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{job.notes}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-0">
            <span>Created: {formatDate(job.createdAt)}</span>
            <span>Last updated: {formatDate(job.updatedAt)}</span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative mx-auto p-6 border border-gray-200 dark:border-gray-700 w-full max-w-md shadow-2xl rounded-2xl bg-white dark:bg-gray-800">
            <div className="text-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full w-16 h-16 mx-auto mb-4">
                <Trash2 className="w-full h-full text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Job Application</h3>
              <div className="mb-6">
                <p className="text-base text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this job application? This action cannot be undone.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl text-base font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-xl text-base font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}