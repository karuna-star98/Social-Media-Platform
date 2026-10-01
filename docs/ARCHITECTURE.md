# ConnectSphere Architecture

## Layered Architecture

1. Presentation: React components/pages/routes.
2. State: AuthContext and local component state for feed and interactions.
3. API: `client/src/services/api.js` sends JSON REST requests with Bearer tokens.
4. Application: Express routes, authentication middleware and controllers.
5. Data: Mongoose models backed by MongoDB.

## Main Flow

User Browser
↓
React UI
↓
API Service
↓
REST Endpoint
↓
JWT Middleware (when protected)
↓
Controller / Business Logic
↓
Mongoose Model
↓
MongoDB
↓
JSON Response
↓
React State Update

## Data Relationships

- User → many Posts
- Post → many Comments
- User ↔ User through following/followers arrays
- Post ↔ User through likes array

## Security Controls

- Passwords are hashed with bcryptjs and never returned by user-facing APIs.
- User-specific routes require a valid JWT.
- Self-follow is rejected.
- Post/comment deletion is restricted to the original author.
- Server validates required/length-constrained input.
- Secrets remain in `.env` and `.env.example` contains placeholders only.
