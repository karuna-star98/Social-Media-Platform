# ConnectSphere - Social Media Platform

A full-stack social media web application built for the CodeAlpha Full Stack Development Internship.

## Features

- User registration and JWT login
- Secure password hashing with bcrypt
- User profiles with bio/avatar support
- Edit own profile
- Create and delete posts
- Feed with optional post images via URL
- Like/unlike posts
- Add/delete comments
- Follow/unfollow users
- Followers/following pages
- Single-post detail page
- Responsive desktop/mobile UI
- Loading, validation, empty and error states
- MongoDB persistence through Mongoose
- REST API with protected routes
- Root `npm run dev` script using `concurrently`

## Tech Stack

React, JavaScript, CSS, Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, REST API, Git/GitHub.

## Architecture

Browser → React UI → API service → Express routes/middleware → Controllers → Mongoose Models → MongoDB → JSON response → React state/UI.

## Folder Structure

```text
ConnectSphere/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── docs/
│   ├── API.md
│   ├── TESTING.md
│   └── ARCHITECTURE.md
├── screenshots/
├── test-results/
├── .gitignore
└── package.json
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas or a local MongoDB installation
- Git

## Environment Variables

### Server

Copy `server/.env.example` to `server/.env`.

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

### Client

Copy `client/.env.example` to `client/.env`.

```env
VITE_API_URL=http://localhost:5000
```

Never commit real database credentials or JWT secrets.

## Install

From the project root:

```bash
npm install
npm --prefix server install
npm --prefix client install
```

On Windows PowerShell systems where the `npm.ps1` execution policy is blocked, use `npm.cmd` for the commands above.

## Run

### One-command development

```bash
npm run dev
```

This starts:

- Backend: `http://localhost:5000`
- Frontend: Vite URL, normally `http://localhost:5173`

### Two-terminal development

Terminal 1:

```bash
npm --prefix server run dev
```

Terminal 2:

```bash
npm --prefix client run dev
```

## Verify Backend

Open:

`http://localhost:5000/api/health`

Expected shape:

```json
{
  "ok": true,
  "service": "ConnectSphere API",
  "database": "connected"
}
```

## Demo Data (Optional)

After configuring `server/.env`, run:

```bash
npm --prefix server run seed
```

The seed script creates two demo users and a few posts/comments.

Demo password: `Connect123!`

## Core User Workflow

1. Register.
2. Login.
3. Create a post.
4. Like/unlike posts.
5. Open a post and comment.
6. Open another user's profile.
7. Follow/unfollow that user.
8. Open followers/following lists.
9. Edit your profile.
10. Logout.

## API

Detailed endpoint documentation is in `docs/API.md`.

## Testing

The recommended test matrix is in `docs/TESTING.md`. It follows the internship reference checklist and includes successful, invalid and unauthorized cases.

## GitHub Proof Strategy

Suggested repository name:

`CodeAlpha_Social-Media-Platform`

Suggested commit progression:

- Initialize React and Express projects
- Connect MongoDB and create User model
- Implement JWT authentication
- Add post feed and creation
- Add post comments
- Implement social interactions
- Build profile and network screens
- Improve responsive UI and error handling
- Complete API testing and documentation
- Finalize project documentation

## Future Scope

- Image upload/storage instead of image URLs
- Socket.IO notifications and live feed updates
- Direct messaging
- Search, hashtags and categories
- Pagination/infinite scrolling
- Moderation/admin dashboard
- Production deployment and monitoring
