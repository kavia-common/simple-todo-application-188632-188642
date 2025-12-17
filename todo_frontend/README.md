# Todo Frontend (React)

Single-page React app to manage todos via the FastAPI backend.

Quick start
- Install dependencies: npm install
- Start development server: npm start
- Open the app: http://localhost:3000

Backend expectations
- API base URL: http://localhost:3001 (kept as-is in code; no extra env required)
- Ensure the FastAPI backend is running and reachable at that URL.

Troubleshooting
- If the app shows "Loading..." indefinitely or displays a network error:
  - Verify the backend is running at http://localhost:3001 and exposes /todos endpoints.
  - Check CORS: the backend should allow requests from http://localhost:3000.
    - For FastAPI, ensure CORSMiddleware allows origins ["http://localhost:3000"].
  - Mixed ports: confirm nothing else is bound to 3000 (frontend) or 3001 (backend).
- If using a different backend URL:
  - Update the API base URL in src/App.js (const API_BASE = 'http://localhost:3001').
  - Do not introduce new env unless necessary; the current setup assumes localhost:3001.

Features
- Add, list, edit, toggle complete, and delete tasks
- Inline editing on double-click or the Edit button
- Loading and error states
- Persisted data via backend (e.g., SQLite)
- Minimal test suite with a render smoke test (mocks fetch)

Style guide confirmation
- Theme: light, modern
- Primary: #3b82f6
- Success/Accent: #06b6d4
- Additional palette follows the project style guide in src/App.css
