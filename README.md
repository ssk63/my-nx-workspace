# My NX Workspace

A comprehensive fullstack application built with NX workspace, featuring a frontend with shared components and a personal voice feature, and a backend API service.

## Project Structure

```
my-nx-workspace/
├── apps/
│   └── server/                # Legacy server directory (not in use)
├── server/                    # Backend API service
│   ├── src/                   # Source code
│   │   ├── app/               # Application components
│   │   ├── server.ts          # Server configuration
│   │   └── main.ts            # Entry point
│   ├── docker-compose.yml     # Database setup
│   └── ...
├── libs/
│   ├── shared/                # Shared UI components and icons
│   │   └── src/               # Shared library source code
│   └── personal-voice/        # Personal Voice feature library
│       └── src/               # Personal Voice source code
├── src/                       # Frontend application
│   └── app/                   # Main application code
└── ... (configuration files)
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Docker (for running PostgreSQL)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-nx-workspace
```

2. Install dependencies:
```bash
npm install
```

### Starting the Backend

1. Make sure Docker is running on your machine

2. Start the PostgreSQL database:
```bash
npm run db:up
# or
cd server && docker-compose up -d
```

3. Start the API server:
```bash
npm run server:dev
# or
npx nx run server:serve
```

The API will be available at http://localhost:3001.

### Starting the Frontend

```bash
npm run start
# or
npx nx serve
```

The frontend will be available at http://localhost:4200.

## Development

### Adding a New Feature

1. Create a new library in the libs directory:
```bash
npx nx generate @nx/react:library my-feature
```

2. Import and use the library in your frontend application.

### Running Tests

```bash
npm run test
# or
npx nx test
```

## Features

- **Shared Component Library**: Reusable UI components and icons
- **Personal Voice Feature**: Multi-step form for creating and managing personal voice profiles
- **API Service**: Backend service with PostgreSQL database for storing and retrieving data

## Troubleshooting

### Database Connection Issues

If you have issues connecting to the database:

1. Make sure Docker is running
2. Verify that the PostgreSQL container is running:
```bash
docker ps
```
3. Check if the database URL is correct in your .env file (should be `postgres://postgres:postgres@localhost:5432/app_db`)
4. Try restarting the database:
```bash
cd server && docker-compose down && docker-compose up -d
```

### Frontend API Connection

If the frontend cannot connect to the API:

1. Make sure the API is running at http://localhost:3001
2. Check the browser console for CORS errors
3. Verify that the API URL is correctly configured in your application
