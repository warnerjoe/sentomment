FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Download NLTK resources
RUN python -m nltk.downloader punkt punkt_tab

# Copy the application files into the container
COPY . /app

# Expose the port
EXPOSE 5001

# Run the application
CMD ["python", "app.py"]
