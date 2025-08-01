export interface Job {
  id: string;
  companyName: string;
  jobTitle: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  applicationDate: string;
  notes: string;
  salary?: string;
  location?: string;
  jobUrl?: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export type JobStatus = Job['status'];