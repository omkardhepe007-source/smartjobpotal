# Smart Job Portal

Smart Job Portal is a full-stack portfolio project for a fresher Java developer. It includes:

- Spring Boot 3 microservices
- JWT authentication
- MySQL persistence
- React frontend with Bootstrap 5
- Resume-based interview question generation

## Backend Services

- Auth Service: `http://localhost:8081`
- Job Service: `http://localhost:8082`

## Setup

1. Create MySQL databases: `smartjob_auth` and `smartjob_jobs`
2. Update credentials in the `application.yml` files if needed.
3. Run the backend services with Maven.
4. Run the frontend with Vite.

## Run

```bash
cd auth-service
mvn spring-boot:run

cd ../job-service
mvn spring-boot:run

cd ../frontend
npm run dev
```

## API Docs

- Auth Service Swagger: `http://localhost:8081/swagger-ui.html`
- Job Service Swagger: `http://localhost:8082/swagger-ui.html`

## Deployment

### Database: Aiven MySQL

The backend services are configured to use environment variables for database connection. When deploying on Render, Railway, or Aiven, set these environment variables in your platform's settings:

- `DB_URL` = `jdbc:mysql://mysql-16d7d2a7-omkardhepe007-1a69.d.aivencloud.com:11560/defaultdb?sslMode=REQUIRED&allowPublicKeyRetrieval=true&useSSL=true`
- `DB_USERNAME` = `avnadmin`
- `DB_PASSWORD` = (your Aiven password from console)

The app uses these environment variables; if not provided, it defaults to localhost MySQL (for local development).

### Netlify (frontend)

Use these values in the Netlify form:

- Branch to deploy: `main`
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable:
  - `VITE_API_BASE_URL=https://your-auth-service-url.onrender.com`

### Render (backend)

For each Spring Boot service:

- Build command: `mvn clean package -DskipTests`
- Start command: `java -jar target/*.jar`
- Port: Render will set `PORT`; the app already uses `${PORT:8081}` / `${PORT:8082}`.
- Environment variables (set the Aiven credentials):
  - `DB_URL`
  - `DB_USERNAME`
  - `DB_PASSWORD`

### Railway / Avion

- Build command: `mvn clean package -DskipTests`
- Start command: `java -jar target/*.jar`
