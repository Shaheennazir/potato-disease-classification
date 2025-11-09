FROM python:3.8-slim

WORKDIR /app

# Install system dependencies with minimal packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python packages with optimized settings
# Use --no-cache-dir to avoid storing cache in image
# Use --extra-index-url for faster downloads
# Set pip timeout and retries for better reliability
RUN pip install --no-cache-dir --timeout 1000 --retries 3 \
    --extra-index-url https://pypi.org/simple/ \
    --trusted-host pypi.org \
    --trusted-host pypi.python.org \
    -r requirements.txt

# Copy application code
COPY . .

# Create non-root user for security
RUN adduser --disabled-password --gecos '' appuser && \
    chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]