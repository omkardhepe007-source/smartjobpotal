# AI Agent Guide for Smart Job Portal

This repository is a full-stack portfolio project with two Spring Boot backend microservices and a React/Vite frontend. Use this guide to understand the codebase layout, primary run commands, and service boundaries.

## Repository structure

- `auth-service/` - Spring Boot authentication microservice
- `job-service/` - Spring Boot job management microservice
- `frontend/` - React + Vite frontend application
- `docker-compose.yml` - local composition of MySQL plus both services
- `README.md` - project-level overview and deployment notes

## Key service details

- Both backend services are Spring Boot 3.3.3 applications targeting Java 21.
- Each backend has its own `pom.xml`, `application.yml`, and service package tree.
- `auth-service` uses JWT authentication and exposes auth endpoints.
- `job-service` handles jobs and applications.
- Both backends include `springdoc-openapi` UI at `/swagger-ui.html`.

## Run commands

- Backend services:
  - `cd auth-service && mvn spring-boot:run`
  - `cd job-service && mvn spring-boot:run`
- Frontend:
  - `cd frontend && npm install && npm run dev`
- Docker compose local start:
  - `docker compose up --build`

## Environment and config conventions

- Backend database connection uses environment variables if present:
  - `DB_URL`
  - `DB_USERNAME`
  - `DB_PASSWORD`
- Backend ports default to:
  - `auth-service`: `8081`
  - `job-service`: `8082`
- Frontend API base URL is configured in `frontend/src/services/api.js` via `VITE_API_BASE_URL`.
- Both backend `application.yml` files default to local MySQL databases:
  - `smartjob_auth` for `auth-service`
  - `smartjob_jobs` for `job-service`

## Development guidance for AI agents

- Preserve the existing microservice boundaries; do not merge auth and job logic into one service.
- Treat `auth-service` and `job-service` as independent Spring Boot modules with their own dependencies.
- When changing frontend API behavior, check `frontend/src/services/api.js` and the backend port assumptions.
- Link to `README.md` for deployment details instead of duplicating them.
- Avoid adding a Maven multi-module aggregator; the repository is arranged as separate service folders.

## Useful files to inspect

- `README.md`
- `auth-service/pom.xml`
- `auth-service/src/main/resources/application.yml`
- `job-service/pom.xml`
- `job-service/src/main/resources/application.yml`
- `frontend/package.json`
- `frontend/src/services/api.js`
- `docker-compose.yml`
