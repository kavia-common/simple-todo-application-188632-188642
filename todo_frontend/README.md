# Todo Frontend (React)

Single-page React app to manage todos via the FastAPI backend.

Quick start
- Install dependencies: npm install
- Start development server: npm start
- Open the app: http://localhost:3000

Backend expectations
- API base URL: http://localhost:3001 (kept as-is in code; no extra env required)
- Ensure the FastAPI backend is running and reachable at that URL.

Integration verification
1) Open http://localhost:3000 and confirm:
   - You can create a task (Add).
   - Toggle its completion.
   - Edit the title (double-click or Edit button, then Save).
   - Delete the task.
2) Refresh the page; tasks should persist (SQLite via backend).
3) Check developer tools Console:
   - No CORS errors should be present when backend is at http://localhost:3001.
4) If your backend URL differs, update src/App.js:
   - const API_BASE = 'http://YOUR_HOST:PORT';

Troubleshooting
- If the app shows "Loading..." indefinitely or displays a network error:
  - Verify the backend is running at http://localhost:3001 and exposes /todos endpoints.
  - Check CORS: the backend should allow requests from http://localhost:3000.
    - For FastAPI, ensure CORSMiddleware allows origins ["http://localhost:3000"] (or include your dev origin).
  - Mixed ports: confirm nothing else is bound to 3000 (frontend) or 3001 (backend).
  - HTTPS vs HTTP: if frontend is served via https and backend via http, your browser may block mixed content. Use http on both or a local proxy.

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
