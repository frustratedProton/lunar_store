# lunar_store
A full-stack application to upload, view, and manage files, featuring file previews, metadata display, and download functionality. Built using React, Node.js, PostgreSQL, and Prisma.

## Features
- **Frontend**: 
  - File details display (name, size, owner, upload time).
  - File previews for images and PDFs.
  - File download functionality.
  - Full-screen image preview with modal.
- **Backend**:
  - REST API built with Express.js.
  - PostgreSQL database integration for storing file metadata.
  - Prisma ORM for database operations.
  - Secure file downloads with user authentication.

## Technologies Used
- **Frontend**:
  - React
  - React Router
  - Axios
  - Styled-Components
  - FontAwesome
- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL
  - Prisma

## How to Run

### Prerequisites
- Node.js
- PostgreSQL

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/frustratedProton/lunar_store.git
   cd file-details-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a PostgreSQL database.
   - Update the `.env` file with your database credentials:
     ```env
     DATABASE_URL=postgresql://username:password@localhost:5432/database_name
     PORT=<your-port>
     ```

   - Run Prisma migrations:
     ```bash
     npx prisma migrate
     ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Start the frontend development server:
   ```bash
   cd client && npm run dev
   ```

6. Open the app in your browser:
   ```
   http://localhost:5173/
   ```

## TODO

- [x] Use React For Frontend
- [ ] Integrate with Supabase