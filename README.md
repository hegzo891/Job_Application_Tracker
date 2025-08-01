# Job Application Tracker

A responsive web application built with React.js that helps users track their job applications. The app allows users to add, view, edit, and delete job applications, with all data persisted in localStorage.

## Features

- Dashboard: View all saved job applications with key details
- Add New Jobs: Submit new applications with company name, job title, status, date, and notes
- Job Details: View complete application details with edit and delete functionality
- Responsive Design: Optimized for both mobile and desktop views
- Data Persistence: All data saved to localStorage
- Import/Export: Backup and restore your data with JSON file import/export

## Project Structure

```
job-application-tracker/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── JobCard.tsx
│   │   ├── JobForm.tsx
│   │   └── Layout.tsx
│   ├── contexts/
│   │   └── JobContext.tsx
│   ├── pages/
│   │   ├── AddJob.tsx
│   │   ├── Dashboard.tsx
│   │   └── JobDetails.tsx
│   ├── types/
│   │   └── Jobs.ts
│   ├── utils/
│   │   └── storage.tsx
│   ├── App.css
│   ├── App.tsx
│   └── index.css
├── package.json
└── README.md
```

## Features

- Dashboard: View all saved job applications with key details
  Responsive Design: Optimized for both mobile and desktop views

Data Persistence: All data saved to localStorage

Import/Export: Backup and restore your data with JSON file import/export

Technologies Used
React.js

React Router v6

Context API (for state management)

TypeScript

Vite (build tool)

LocalStorage (data persistence)

Project Structure
text
job-application-tracker/
├── public/
│ └── vite.svg
├── src/
│ ├── assets/
│ │ └── react.svg
│ ├── components/
│ │ ├── JobCard.tsx
│ │ ├── JobForm.tsx
│ │ └── Layout.tsx
│ ├── contexts/
│ │ └── JobContext.tsx
│ ├── pages/
│ │ ├── AddJob.tsx
│ │ ├── Dashboard.tsx
│ │ └── JobDetails.tsx
│ ├── types/
│ │ └── Jobs.ts
│ ├── utils/
│ │ └── storage.tsx
│ ├── App.css
│ ├── App.tsx
│ └── index.css
├── package.json
└── README.md
Installation
Clone the repository:

bash
git clone https://github.com/your-username/job-application-tracker.git
Navigate to the project directory:

bash
cd job-application-tracker
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
Open your browser and visit:

text
http://localhost:5173
Usage
Dashboard: The main page shows all your job applications.

Add Job: Click "Add Job" to enter new application details.

View Details: Click any job card to see full details.

Edit/Delete: On the details page, you can edit or delete the entry.

Import/Export: Use the options in the header to backup or restore your data.

Context API Structure
The application uses React's Context API to manage global state. The main context includes:

jobs: Array of all job applications

addJob: Function to add a new job

editJob: Function to edit an existing job

deleteJob: Function to remove a job

importJobs: Function to import jobs from JSON

exportJobs: Function to export jobs to JSON

Data Model
Each job application has the following properties:

typescript
interface Job {
id: string;
company: string;
title: string;
status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
appliedDate: string;
notes: string;
}
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements.
