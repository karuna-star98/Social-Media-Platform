# Windows Setup

1. Install Node.js 18+.
2. Configure MongoDB Atlas or local MongoDB.
3. Copy `server/.env.example` to `server/.env` and add the MongoDB URI and a long JWT secret.
4. Copy `client/.env.example` to `client/.env`.
5. From the project root run:

```powershell
npm.cmd install
npm.cmd --prefix server install
npm.cmd --prefix client install
npm.cmd run dev
```

Or double-click `start-dev.bat`.

Expected URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Health: `http://localhost:5000/api/health`
