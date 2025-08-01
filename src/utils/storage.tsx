import { Job } from '../types/Jobs';

const STORAGE_KEY = 'job-applications';

export const loadJobsFromStorage = (): Job[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading jobs from storage:', error);
    return [];
  }
};

export const saveJobsToStorage = (jobs: Job[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  } catch (error) {
    console.error('Error saving jobs to storage:', error);
  }
};

export const exportJobsToJSON = (jobs: Job[]): void => {
  try {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `job-applications-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  } catch (error) {
    console.error('Error exporting jobs:', error);
  }
};

export const importJobsFromJSON = (file: File): Promise<Job[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const jobs = JSON.parse(content) as Job[];
        
        // Validate the imported data
        if (Array.isArray(jobs) && jobs.every(job => 
          job.id && job.companyName && job.jobTitle && job.status && job.applicationDate
        )) {
          resolve(jobs);
        } else {
          reject(new Error('Invalid job data format'));
        }
      } catch (error) {
        reject(new Error('Failed to parse JSON file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

// Clear all data (useful for testing or reset functionality)
export const clearAllData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('job-tracker-theme');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

// Get storage usage info
export const getStorageInfo = () => {
  try {
    const jobs = loadJobsFromStorage();
    const jobsSize = JSON.stringify(jobs).length;
    const themeSize = localStorage.getItem('job-tracker-theme')?.length || 0;
    
    return {
      totalJobs: jobs.length,
      storageSize: jobsSize + themeSize,
      lastUpdated: jobs.length > 0 ? Math.max(...jobs.map(job => new Date(job.updatedAt).getTime())) : null
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { totalJobs: 0, storageSize: 0, lastUpdated: null };
  }
};