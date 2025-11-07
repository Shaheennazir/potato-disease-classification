FROM python:3.8-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install system dependencies and Python packages
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Copy the saved model from the parent directory
COPY ../saved_models/1 /app/saved_model

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]