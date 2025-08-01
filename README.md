# Job Application Tracker

A React-based web application to help you track and manage your job applications efficiently. Built with Vite, Tailwind CSS, Typescript and React, this app provides an intuitive dashboard to add, view, edit, and delete job applications while keeping track of their status.

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
