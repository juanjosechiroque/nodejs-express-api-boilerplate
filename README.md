# Node.js Express TypeScript API Starter

Production-minded REST API starter built with Express 5, TypeScript, MongoDB, JWT authentication, Zod validation, Docker, and Vitest.

The Product module is a small reference feature that shows routing, validation, protected writes, persistence, pagination, and tests without becoming a sample business application.

## Quick start

Requirements: Docker for the standard local setup. Node.js 24+ and npm are only needed to run commands on your machine.

```bash
cp .env.example .env
# Generate a JWT secret and set JWT_SECRET in .env
openssl rand -base64 48
docker compose up -d --build
```

The API listens on `http://localhost:3000`.

## Configuration

Copy `.env.example` to `.env`. Docker Compose uses the local MongoDB service by default. To use Atlas or another external database, replace `MONGODB_URI` with its connection URI.

| Variable                                         | Required | Purpose                                       |
| ------------------------------------------------ | -------- | --------------------------------------------- |
| `MONGODB_URI`                                    | Yes      | MongoDB connection for the API container.     |
| `JWT_SECRET`                                     | Yes      | JWT signing secret; at least 32 characters.   |
| `CORS_ALLOWED_ORIGINS`                           | No       | Comma-separated browser origin allowlist.     |
| `RATE_LIMIT_WINDOW_MINUTES` and `RATE_LIMIT_MAX` | No       | Global per-IP limit; configure both together. |

## API

The complete HTTP contract is in [openapi.yaml](./openapi.yaml). Product writes require `Authorization: Bearer <jwt>`; reads are public.

```bash
# Sign up
curl -s -X POST http://localhost:3000/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"DemoPassword123!"}'

# Log in and create a product
TOKEN=$(curl -s -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"DemoPassword123!"}' | jq -r '.data')

curl -s -X POST http://localhost:3000/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Starter Tee","price":29.99}'
```

## Common commands

| Command                    | Purpose                                            |
| -------------------------- | -------------------------------------------------- |
| `npm run dev`              | Start the development server.                      |
| `npm run validate`         | Run ESLint and Prettier checks.                    |
| `npm test`                 | Run fast tests with mocked persistence.            |
| `npm run test:integration` | Run MongoDB integration tests with Testcontainers. |
| `npm run test:coverage`    | Run fast tests with coverage.                      |
| `npm run build`            | Compile TypeScript.                                |

Integration tests require Docker. After Compose is running, seed demo data with `docker compose exec api node dist/src/scripts/seed.js`.

## Docker

```bash
docker compose up -d --build
```

Compose starts the API and MongoDB, waits for MongoDB health, and exposes API health at `/v1/health`. The image uses a multi-stage build, runs as a non-root user, and handles `SIGTERM` and `SIGINT` gracefully.

Use `docker compose down -v` only when you want to remove the local MongoDB volume.

## Architecture

[ARCHITECTURE.md](./ARCHITECTURE.md) documents module boundaries, decisions, trade-offs, and extension conventions. [SECURITY.md](./SECURITY.md) explains responsible vulnerability reporting.
