FROM python:3.12-slim-bullseye

# Set the working directory in the container
WORKDIR /api

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir --progress-bar off -r requirements.txt

COPY . .

EXPOSE 8000

ENV IS_PROD=1

CMD ["python3", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
