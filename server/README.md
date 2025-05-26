# PersonalVoice API Service

A professional, scalable, multi-tenant backend API service built with Node.js, Express, and TypeScript. This service provides a robust foundation for white-label applications, featuring advanced features like multi-tenancy, authentication, and customizable branding.

## Key Features

- **Multi-tenancy**: Built-in support for multiple organizations/tenants with data isolation
- **White-label Ready**: Designed to support multiple brands and customizations
- **Scalable Architecture**: Feature-based modular architecture for easy scaling
- **Type Safety**: Full TypeScript implementation for robust development
- **Modern Stack**: Built with Node.js, Express, Drizzle ORM, and PostgreSQL
- **Containerized**: Docker support for easy deployment and development
- **Secure**: JWT-based authentication and role-based access control

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

### Available Scripts

```bash
# Start the API in production mode
npm start

# Start the API in development mode with hot reload
npm run dev

# Build the project
npm run build

# Database Management
npm run db:generate  # Generate database migrations
npm run db:push     # Push schema changes to database
npm run db:studio   # Open Drizzle Studio for database management

# Linting
npm run lint
```

### Database Management

The project uses Drizzle ORM for database management. Here are the available commands:

```bash
# Generate database migrations
npm run db:generate

# Push schema changes to database
npm run db:push

# Open Drizzle Studio for database management
npm run db:studio
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

## Multi-tenancy

The application implements a robust multi-tenant architecture that allows:

- Data isolation between different organizations
- Custom branding and configurations per tenant
- Tenant-specific feature toggles
- Shared infrastructure with isolated data

### Tenant Management

```bash
# Tenant-specific endpoints
GET    /api/tenants              # List all tenants
POST   /api/tenants              # Create new tenant
GET    /api/tenants/:id          # Get tenant details
PUT    /api/tenants/:id          # Update tenant
DELETE /api/tenants/:id          # Delete tenant
```

## White-label Features

The application supports white-labeling through:

- Customizable branding per tenant
- Tenant-specific configurations
- Flexible theming system
- Custom domain support
- Brand-specific email templates

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

### Tenants
- `GET /api/tenants` - List all tenants
- `POST /api/tenants` - Create new tenant
- `GET /api/tenants/:id` - Get tenant details
- `PUT /api/tenants/:id` - Update tenant
- `DELETE /api/tenants/:id` - Delete tenant

### Personal Voices

- `GET /api/personal-voices` - Get all personal voices
- `GET /api/personal-voices/:id` - Get a personal voice by ID
- `POST /api/personal-voices` - Create a new personal voice
- `PUT /api/personal-voices/:id` - Update a personal voice
- `DELETE /api/personal-voices/:id` - Delete a personal voice

## Development Guidelines

### Multi-tenant Development

When developing new features:

1. Always consider tenant context
2. Use tenant middleware for data isolation
3. Implement tenant-specific configurations
4. Follow the established data isolation patterns

### White-label Implementation

For white-label features:

1. Use the configuration service for tenant-specific settings
2. Implement theme variables for styling
3. Use the branding service for tenant-specific assets
4. Follow the established theming patterns

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

## Dependencies

### Main Dependencies
- Express.js - Web framework
- Drizzle ORM - Database ORM with multi-tenant support
- PostgreSQL - Robust multi-tenant database
- JWT - Secure authentication
- Nodemailer - Customizable email system
- CORS - Cross-origin resource sharing
- bcryptjs - Secure password hashing

### Development Dependencies
- TypeScript - Type safety
- ts-node-dev - Development server with hot reload
- Drizzle Kit - Database migration tools
- ESLint - Code linting
- Various type definitions for TypeScript 