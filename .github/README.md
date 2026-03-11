# 🏠 Home Service System

A lightweight Node.js application that reports the **system hostname** and server info, packaged as a Docker container with automated CI/CD via GitHub Actions.

---

## 🚀 Quick Start

### Run locally
```bash
node app.js
# Open http://localhost:3000
```

### Run with Docker
```bash
docker build -t home-service-system .
docker run -p 3000:3000 home-service-system
```

### Pull from Docker Hub
```bash
docker pull YOUR_DOCKERHUB_USERNAME/home-service-system:latest
docker run -p 3000:3000 YOUR_DOCKERHUB_USERNAME/home-service-system
```

---

## 🌐 API Endpoints

| Endpoint | Description |
|---|---|
| `GET /` | Web UI showing hostname + system info |
| `GET /api/hostname` | JSON response with full system info |
| `GET /health` | Health check endpoint |

### Example `/api/hostname` response
```json
{
  "hostname": "my-server-01",
  "platform": "linux",
  "arch": "x64",
  "uptime": "120 minutes",
  "totalMemory": "8192 MB",
  "freeMemory": "4096 MB",
  "cpus": 4,
  "nodeVersion": "v20.0.0",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🐳 Docker

### Build
```bash
docker build -t home-service-system .
```

### Run with custom port
```bash
docker run -p 8080:3000 home-service-system
```

### Docker Compose (optional)
```yaml
version: "3.8"
services:
  home-service:
    image: YOUR_DOCKERHUB_USERNAME/home-service-system:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

---

## ⚙️ GitHub Actions CI/CD Setup

The workflow at `.github/workflows/docker-build-push.yml` will:
1. **Test** the app on every push / PR
2. **Build** a multi-arch Docker image (`amd64` + `arm64`)
3. **Push** to Docker Hub with versioned tags
4. **Scan** the image for vulnerabilities with Trivy

### Required GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions** and add:

| Secret | Value |
|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub Access Token (not your password!) |

> **Get a Docker Hub token:** hub.docker.com → Account Settings → Security → New Access Token

### Tagging Strategy

| Event | Tags applied |
|---|---|
| Push to `main` | `latest`, `main`, `sha-xxxxxxx` |
| Tag `v1.2.3` | `1.2.3`, `1.2`, `1`, `latest` |
| Pull Request | `pr-42` (not pushed) |

---

## 📁 Project Structure

```
home-service-system/
├── app.js                            # Main application
├── package.json
├── Dockerfile                        # Multi-stage Docker build
├── .dockerignore
├── .gitignore
└── .github/
    └── workflows/
        └── docker-build-push.yml    # CI/CD pipeline
```
