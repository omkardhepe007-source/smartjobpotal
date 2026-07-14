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

### Netlify (frontend)

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable:
  - `VITE_API_BASE_URL=https://your-auth-service-url.onrender.com`

### Render (backend)

For each Spring Boot service:

- Build command: `mvn clean package -DskipTests`
- Start command: `java -jar target/*.jar`
- Port: Render will set `PORT`; the app already uses `${PORT:8081}` / `${PORT:8082}`.

### Railway / Avion

- Build command: `mvn clean package -DskipTests`
- Start command: `java -jar target/*.jar`
