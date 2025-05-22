# PersonalVoice API Service

Backend API service for the PersonalVoice application. This service provides endpoints for creating, reading, updating, and deleting personal voice profiles.

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL 15+

### Environment Setup

Create a `.env` file in the root of this directory with the following variables:

```
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgres://postgres@localhost:5432/app_db
```

### Running the Database

```bash
# Start PostgreSQL with Docker
npx nx run server:docker:up

# Or use the docker-compose file directly
cd server && docker-compose up -d
```

### Database Migrations

```bash
# Run database migrations
npx nx run server:migrate

# View database schema (Studio)
npx nx run server:studio
```

### Development

```bash
# Start the API in development mode
npx nx run server:serve
```

The API will be available at http://localhost:3001.

## API Endpoints

### Personal Voices

- `GET /api/personal-voices` - Get all personal voices
- `GET /api/personal-voices/:id` - Get a personal voice by ID
- `POST /api/personal-voices` - Create a new personal voice
- `PUT /api/personal-voices/:id` - Update a personal voice
- `DELETE /api/personal-voices/:id` - Delete a personal voice

## Project Structure

```
server/
├── src/                    # Source code
│   ├── app/                # Application components
│   │   ├── config/         # Configuration files
│   │   ├── db/             # Database configuration and schema
│   │   ├── features/       # Feature modules
│   │   │   ├── personal-voice/  # Personal Voice feature
│   │   │   │   ├── controllers/ # Feature-specific controllers
│   │   │   │   ├── middleware/  # Feature-specific middleware
│   │   │   │   ├── models/      # Feature-specific models
│   │   │   │   ├── routes/      # Feature-specific routes
│   │   │   │   ├── services/    # Feature-specific business logic
│   │   │   │   └── types/       # Feature-specific type definitions
│   │   │   └── index.ts         # Feature modules aggregator
│   │   ├── middleware/     # Global middleware functions
│   │   └── routes/         # API route definitions
│   ├── server.ts           # Server configuration
│   └── main.ts             # Application entry point
├── .env.example            # Example environment variables
├── docker-compose.yml      # Database setup
├── drizzle.config.ts       # Drizzle ORM configuration
├── package.json            # NPM package configuration
├── project.json            # NX project configuration
└── tsconfig.json           # TypeScript configuration
```

## Architecture Layers

This project is organized using a feature-based architecture:

1. **Features Layer** (`/app/features`)
   - Each feature has its own dedicated sub-folder
   - Contains feature-specific controllers, models, routes, services, and types
   - Promotes modularity and separation of concerns

2. **Database Layer** (`/app/db`)
   - Contains database schema and connection logic
   - Manages migrations and database operations

3. **Middleware Layer** (`/app/middleware`)
   - Contains global middleware functions
   - Handles cross-cutting concerns like error handling and validation

4. **Routes Layer** (`/app/routes`)
   - Defines the API routes
   - Aggregates and organizes feature routes

## Data Flow

1. Request → Routes → Features Router → Feature-specific Routes
2. Feature Routes → Feature Controllers
3. Controllers → Services → Models
4. Models → Database
5. Response travels back up the chain

## Benefits of This Architecture

- **Separation of concerns**: Each component has a single responsibility
- **Testability**: Isolated components are easier to test
- **Maintainability**: Changes to one layer don't require changes in others
- **Scalability**: Easy to add new features or modify existing ones
- **Readability**: New developers can easily understand the project structure

## Error Handling

Errors are handled at the service layer and propagated up to controllers, which pass them to the error middleware. The error middleware formats errors appropriately for API responses. 