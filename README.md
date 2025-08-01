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

- Add new job applications with details like job title, company, application date, location, salary, contact email, job URL, and notes.
- View a dashboard with statistics on total applications and status breakdowns: Applied, Interviewing, Offers, Rejected.
- Search and filter job applications by company, job title, location, or status.
- Edit and update job application details.
- Delete job applications with confirmation.
- Persistent data storage using browser local storage.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hegzo891/Job_Application_Tracker.git
   cd Job_Application_Tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal.

## Usage

- **Dashboard:** View all your job applications with status statistics. Use the search bar and status filter to find specific jobs.
- **Add Job:** Click the "Add Job" button to add a new job application with relevant details.
- **Job Details:** Click on a job card to view detailed information, edit the job, or delete it.
- **Theme Toggle:** Switch between light and dark mode using the theme toggle button.

## Technologies Used

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React Icons
- Local Storage for data persistence

## Notes

- All job data is stored locally in your browser's local storage, so data persists between sessions but is limited to the device/browser used.
  New chat
