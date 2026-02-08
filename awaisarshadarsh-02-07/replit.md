# Digiweb Services

## Overview
A digital agency website built with React (frontend) and Express.js (backend). The site showcases services like web development, design, video production, SEO, and marketing.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, Wouter (routing), Framer Motion, Radix UI components
- **Backend**: Express.js, TypeScript, tsx
- **Database**: PostgreSQL with Drizzle ORM
- **Build**: Vite for frontend, esbuild for backend

## Project Structure
```
client/           - React frontend
  src/
    components/   - UI and layout components
    pages/        - Page components (Home, NotFound)
    lib/          - Utilities (queryClient)
server/           - Express backend
  index.ts        - Server entry point
  routes.ts       - API routes
  storage.ts      - Data storage layer
  vite.ts         - Vite dev server integration
  static.ts       - Static file serving (production)
shared/           - Shared code (schema, types)
  schema.ts       - Drizzle database schema
attached_assets/  - Static image assets
script/           - Build scripts
```

## Scripts
- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes

## Architecture Notes
- Development: Express serves Vite dev server as middleware
- Production: Express serves pre-built static files from `dist/public`
- Database schema defines a `users` table with id, username, password
- The server binds to port 5000 on 0.0.0.0
