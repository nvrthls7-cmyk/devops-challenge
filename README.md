# Kanban App (Node.js frontend + Spring Boot backend + PostgreSQL)

Overview
- Frontend: Vite + React (Node.js)
- Backend: Spring Boot (Java, Maven) running on port 8085
- Database: PostgreSQL running in Docker (docker-compose)

Run

1) Start PostgreSQL:

```bash
docker-compose up -d
```

This will start Postgres on port 5432 with database `kanbandb` and user `postgres` / password `postgres`.

2) Run backend (requires Java 17 and Maven):

```bash
cd backend
mvn spring-boot:run
```

Backend will start on port 8085.

3) Run frontend (requires Node.js >=16):

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

Notes
- If port 8085 is in use, change `server.port` in `backend/src/main/resources/application.properties`.
- The backend allows CORS from `http://localhost:5173` for development.
