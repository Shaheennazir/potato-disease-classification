# Docker Deployment Guide for Potato Disease Classification

This guide explains how to deploy the Potato Disease Classification application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed
- At least 2GB of available RAM

## Quick Start

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd potato-disease-classification
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file if needed (optional)
   ```

3. **Build and run the application**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:8000

## Architecture

The application consists of two main services:

### 1. API Service (`api/`)
- **Port**: 8000
- **Technology**: FastAPI with TensorFlow
- **Function**: Handles image uploads and disease prediction
- **Model**: Loads pre-trained model from `saved_models/1`

### 2. Frontend Service (`frontend/`)
- **Port**: 3000
- **Technology**: ReactJS with Material-UI
- **Function**: User interface for uploading images and viewing results

## Docker Commands

### Build Services
```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build api
docker-compose build frontend
```

### Run Services
```bash
# Run in foreground
docker-compose up

# Run in background
docker-compose up -d

# Run specific service
docker-compose up api
docker-compose up frontend
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### View Logs
```bash
# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs api
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

### Check Service Status
```bash
# List running containers
docker-compose ps

# Check service health
docker-compose top
```

## Environment Variables

### API Service
- `PYTHONPATH=/app` - Python path configuration

### Frontend Service
- `REACT_APP_API_URL=http://api:8000/predict` - API endpoint URL

## Customization

### Changing Ports
Edit `docker-compose.yml` to change exposed ports:
```yaml
services:
  api:
    ports:
      - "8080:8000"  # Change external port to 8080
  
  frontend:
    ports:
      - "8081:3000"  # Change external port to 8081
```

### Using Different Model Version
Update the volume mount in `docker-compose.yml`:
```yaml
services:
  api:
    volumes:
      - ./saved_models/2:/app/saved_model  # Use version 2 model
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change ports in `docker-compose.yml`
   - Stop other services using the ports

2. **Model not found**
   - Ensure `saved_models/1` directory exists with model files
   - Check file permissions

3. **Build failures**
   - Clear Docker cache: `docker-compose build --no-cache`
   - Check available disk space

4. **API connection errors**
   - Verify frontend environment variable `REACT_APP_API_URL`
   - Check if API service is running: `docker-compose ps`

### Debugging

```bash
# Access API container shell
docker-compose exec api bash

# Access frontend container shell
docker-compose exec frontend bash

# Check API health
curl http://localhost:8000/ping

# Test API prediction (replace with actual image file)
curl -X POST -F "file=@test_image.jpg" http://localhost:8000/predict
```

## Production Deployment

For production deployment, consider:

1. **Using a reverse proxy** (nginx) for SSL termination
2. **Setting up monitoring** and logging
3. **Using environment-specific configurations**
4. **Implementing health checks**

## Development Workflow

### Local Development with Docker
```bash
# Start development environment
docker-compose up --build

# Make code changes
# Changes will be reflected automatically (frontend hot-reloads)

# Stop and rebuild when needed
docker-compose down
docker-compose up --build
```

### Adding New Dependencies

1. **API**: Update `api/requirements.txt`
2. **Frontend**: Update `frontend/package.json`
3. **Rebuild**: `docker-compose build --no-cache`

## File Structure

```
potato-disease-classification/
├── api/
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── saved_models/
│   └── 1/  # Pre-trained model
├── docker-compose.yml
└── DOCKER.md
```

## Support

For issues with Docker deployment:
1. Check Docker and Docker Compose versions
2. Review application logs
3. Verify system resources
4. Consult Docker documentation