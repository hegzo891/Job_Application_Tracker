import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';
import JobForm from '../components/JobForm';
import { Job } from '../types/Jobs';

export default function AddJob() {
  const navigate = useNavigate();
  const { addJob } = useJobs();

  const handleSubmit = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    addJob(jobData);
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto transition-colors duration-300">
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Add New Job Application
        </h1>
        <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Keep track of your job applications and their current status
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
        <JobForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')}
          submitLabel="Add Job Application"
        />
      </div>
    </div>
  );
}