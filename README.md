# My Nx Workspace

This is a monorepo built with Nx containing a web application and server.

## Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the web application:
```bash
npx nx serve web
```
The web app will be available at http://localhost:4200

3. Run the server:
```bash
npx nx serve server
```
The server will be available at http://localhost:3000

## Project Structure

- `apps/web` - React web application
- `apps/server` - Backend server
- `libs/personal-voice` - Shared library for personal voice functionality
- `libs/shared` - Common utilities and components

## Development

- The web app uses Vite for development and building
- The server is built with Node.js
- Both applications support hot reloading during development

## Building

To build the applications:

```bash
# Build web app
npx nx build web

# Build server
npx nx build server
```

## Testing

To run tests:

```bash
# Run web app tests
npx nx test web

# Run server tests
npx nx test server
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

## Project Documentation

- [Server README](server/README.md): Backend API, authentication, multi-tenancy, theming, and database setup.
- [Mobile App README](apps/mobile/README.md): Expo app, registration/login, profile editing, tenant theming, and development scripts.
