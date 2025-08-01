import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Job } from '../types/Jobs';
import { loadJobsFromStorage, saveJobsToStorage } from '../utils/storage';

interface ThemeState {
  isDarkMode: boolean;
}

interface JobState {
  jobs: Job[];
  loading: boolean;
  searchTerm: string;
  statusFilter: string;
  theme: ThemeState;
}

type JobAction =
  | { type: 'SET_JOBS'; payload: Job[] }
  | { type: 'ADD_JOB'; payload: Job }
  | { type: 'UPDATE_JOB'; payload: Job }
  | { type: 'DELETE_JOB'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_STATUS_FILTER'; payload: string }
  | { type: 'IMPORT_JOBS'; payload: Job[] }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: boolean };

interface JobContextType {
  state: JobState;
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  getJob: (id: string) => Job | undefined;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  importJobs: (jobs: Job[]) => void;
  getFilteredJobs: () => Job[];
  toggleTheme: () => void;
  updateJobStatus: (id: string, status: Job['status']) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const initialState: JobState = {
  jobs: [],
  loading: true,
  searchTerm: '',
  statusFilter: 'all',
  theme: {
    isDarkMode: false,
  },
};

function jobReducer(state: JobState, action: JobAction): JobState {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload, loading: false };
    case 'ADD_JOB':
      return { ...state, jobs: [...state.jobs, action.payload] };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job => 
          job.id === action.payload.id ? action.payload : job
        ),
      };
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload };
    case 'IMPORT_JOBS':
      return { ...state, jobs: action.payload };
    case 'TOGGLE_THEME':
      return { 
        ...state, 
        theme: { ...state.theme, isDarkMode: !state.theme.isDarkMode } 
      };
    case 'SET_THEME':
      return { 
        ...state, 
        theme: { ...state.theme, isDarkMode: action.payload } 
      };
    default:
      return state;
  }
}

export function JobProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('job-tracker-theme');
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: JSON.parse(savedTheme) });
    }
    
    const jobs = loadJobsFromStorage();
    dispatch({ type: 'SET_JOBS', payload: jobs });
  }, []);

  useEffect(() => {
    if (!state.loading) {
      saveJobsToStorage(state.jobs);
    }
  }, [state.jobs, state.loading]);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('job-tracker-theme', JSON.stringify(state.theme.isDarkMode));
    
    // Apply theme to document
    if (state.theme.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme.isDarkMode]);

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newJob: Job = {
      ...jobData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    dispatch({ type: 'ADD_JOB', payload: newJob });
  };

  const updateJob = (job: Job) => {
    const updatedJob = {
      ...job,
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'UPDATE_JOB', payload: updatedJob });
  };

  const updateJobStatus = (id: string, status: Job['status']) => {
    const job = state.jobs.find(j => j.id === id);
    if (job) {
      const updatedJob = {
        ...job,
        status,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_JOB', payload: updatedJob });
    }
  };

  const deleteJob = (id: string) => {
    dispatch({ type: 'DELETE_JOB', payload: id });
  };

  const getJob = (id: string) => {
    return state.jobs.find(job => job.id === id);
  };

  const setSearchTerm = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const setStatusFilter = (status: string) => {
    dispatch({ type: 'SET_STATUS_FILTER', payload: status });
  };

  const importJobs = (jobs: Job[]) => {
    dispatch({ type: 'IMPORT_JOBS', payload: jobs });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const getFilteredJobs = () => {
    let filtered = state.jobs;

    if (state.searchTerm) {
      const term = state.searchTerm.toLowerCase();
      filtered = filtered.filter(job =>
        job.companyName.toLowerCase().includes(term) ||
        job.jobTitle.toLowerCase().includes(term) ||
        job.location?.toLowerCase().includes(term) ||
        job.status.toLowerCase().includes(term)
      );
    }

    if (state.statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === state.statusFilter);
    }

    return filtered.sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime());
  };

  const value: JobContextType = {
    state,
    addJob,
    updateJob,
    deleteJob,
    getJob,
    setSearchTerm,
    setStatusFilter,
    importJobs,
    getFilteredJobs,
    toggleTheme,
    updateJobStatus,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}