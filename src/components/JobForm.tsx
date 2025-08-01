import React, { useState } from 'react';
import { Job, JobStatus } from '../types/Jobs';

interface JobFormProps {
  initialJob?: Job;
  onSubmit: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const statusOptions: JobStatus[] = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

export default function JobForm({ initialJob, onSubmit, onCancel, submitLabel = 'Save Job' }: JobFormProps) {
  const [formData, setFormData] = useState({
    companyName: initialJob?.companyName || '',
    jobTitle: initialJob?.jobTitle || '',
    status: initialJob?.status || 'Applied' as JobStatus,
    applicationDate: initialJob?.applicationDate || new Date().toISOString().split('T')[0],
    notes: initialJob?.notes || '',
    salary: initialJob?.salary || '',
    location: initialJob?.location || '',
    jobUrl: initialJob?.jobUrl || '',
    contactEmail: initialJob?.contactEmail || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.applicationDate) {
      newErrors.applicationDate = 'Application date is required';
    }

    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 sm:py-4 border rounded-xl shadow-sm text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
              errors.companyName ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="e.g., Google, Apple, Microsoft"
          />
          {errors.companyName && (
            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 sm:py-4 border rounded-xl shadow-sm text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
              errors.jobTitle ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="e.g., Software Engineer, Product Manager"
          />
          {errors.jobTitle && (
            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{errors.jobTitle}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Application Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="applicationDate" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Application Date *
          </label>
          <input
            type="date"
            id="applicationDate"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 sm:py-4 border rounded-xl shadow-sm text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
              errors.applicationDate ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.applicationDate && (
            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{errors.applicationDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="e.g., San Francisco, CA / Remote"
          />
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Salary Range
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="e.g., $100k - $120k"
          />
        </div>

        <div>
          <label htmlFor="contactEmail" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 sm:py-4 border rounded-xl shadow-sm text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
              errors.contactEmail ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="e.g., hr@company.com"
          />
          {errors.contactEmail && (
            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{errors.contactEmail}</p>
          )}
        </div>

        <div>
          <label htmlFor="jobUrl" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Job Posting URL
          </label>
          <input
            type="url"
            id="jobUrl"
            name="jobUrl"
            value={formData.jobUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="https://company.com/careers/job-id"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleInputChange}
          className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
          placeholder="Add any additional notes about this application..."
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl text-base font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 sm:py-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}