# lunar_store

A full-stack application to upload, view, and manage files, featuring file previews, metadata display, and download functionality. Built using React, Node.js, PostgreSQL, Prisma, and Supabase for cloud storage.

## Features

-   **Frontend**:
    -   File details display (name, size, owner, upload time).
    -   File previews for images and PDFs.
    -   File download functionality.
    -   Full-screen image preview with modal.
-   **Backend**:
    -   REST API built with Express.js.
    -   PostgreSQL database integration for storing file metadata.
    -   Prisma ORM for database operations.
    -   Supabase for cloud file storage and secure file handling.
    -   Secure file downloads with user authentication.

## Technologies Used

-   **Frontend**:
    -   React
    -   React Router
    -   Axios
    -   Styled-Components
    -   FontAwesome
-   **Backend**:
    -   Node.js
    -   Express.js
    -   PostgreSQL
    -   Prisma
    -   Supabase (for cloud file storage)

## How to Run

### Prerequisites

-   Node.js
-   PostgreSQL
-   Supabase account (for cloud storage)

### Setup Instructions

1.  Clone the repository:

    ```bash
    git clone https://github.com/frustratedProton/lunar_store.git
    cd lunar_store
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Set up the database:

        - Create a PostgreSQL database.
        - Update the `.env` file with your database credentials:

            ```env
            DATABASE_URL=postgresql://username:password@localhost:5432/database_name
            PORT=<your-port>
            SUPABASE_PROJECT_URL=<your_supabase_project_url>
            SUPABASE_URL=<your_supabase_url>
            SUPABASE_SERVICE_ROLE_KEY=<your_supabase_service_role_key>

    ````

        - Run Prisma migrations:
            ```bash
            npx prisma migrate
            ```

    ````

4.  Set up Supabase:

    Create a Supabase project (if you don't have one).
    Create a bucket for file storage in Supabase (e.g., uploads).
    Ensure your SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are correctly added to the .env file to authenticate with Supabase.

5.  Start the backend server:

    ```bash
    npm start
    ```

6.  Start the frontend development server:

    ```bash
    cd client && npm run dev
    ```

7.  Open the app in your browser:
    ```
    http://localhost:5173/
    ```

## TODO

-   [x] Use React For Frontend
-   [x] Integrate with Supabase
