# Amity Student Management System
# A project by Adithya Gautam
## Overview
A comprehensive student management system for Amity University, designed to streamline student data, attendance, and fee records. The system provides:
- Admin dashboard for managing students, attendance, and payments
- Student view for personal records
- Role-based access control (admin/student)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aryansh007/amity-student-management-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd amity-student-management-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:3000`

## Project Structure
```
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Application pages
│   ├── services/      # API services
│   ├── styles/        # CSS files
│   └── ...
├── package.json       # Project dependencies
└── vite.config.js     # Build configuration
```

## Usage
1. **Login**:
   - Admin: Full access to all features
   - Student: View personal records only

2. **Admin Features**:
   - Add/edit students
   - Record attendance
   - Manage fee payments
   - View student statistics

3. **Student Features**:
   - View attendance records
   - Check fee status
   - Update personal information

## Author
Adithya Gautam