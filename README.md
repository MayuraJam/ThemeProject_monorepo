# ThemeProject

This project is a monorepo consisting of a frontend built with Next.js and a backend built with Express.js, utilizing Supabase for the database.

## Project Structure

- `manageThemeColor/`: The frontend application (Next.js 16, Tailwind CSS).
- `backend100theme/`: The backend API (Express.js, Prisma, Supabase).
- `docker-compose.yml`: Docker setup to run both services together.

## Prerequisites

- Node.js (v18 or above recommended)
- Docker & Docker Compose
- Supabase account (for database setup)

## Environment Variables

You need to create a `.env` file in the root of the project with the following variables for the backend and Docker setup:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Running the Application Locally

### 1. Using Docker Compose (Recommended)

To start both the frontend and backend simultaneously using Docker Compose:

```bash
docker-compose up --build
```

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3050

### 2. Running Services Manually

#### Backend
```bash
cd backend100theme
npm install
npm run dev
```
The backend server will start on port 3050. It also includes Swagger for API documentation.

#### Frontend
```bash
cd manageThemeColor
npm install
npm run dev
```
The frontend application will start on port 3000.

## Tech Stack

**Frontend:**
- Next.js (React)
- Tailwind CSS
- Axios
- React Hook Form & Yup (for form validation)
- Lucide React (for icons)

**Backend:**
- Express.js
- Supabase JS Client
- Prisma (ORM)
- Swagger (API Documentation)
- Nodemon (for development)

## Workflows

The project includes GitHub Actions workflows located in `.github/workflows/` for CI/CD processes.
