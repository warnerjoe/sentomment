# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Client (React/Vite)
```bash
cd client
npm install                    # Install dependencies
npm run dev                    # Start development server (Vite)
npm run build                  # Build for production
npm run lint                   # Run ESLint
npm run preview                # Preview production build
```

### Server (Node.js/Express)
```bash
cd server
npm install                    # Install dependencies
npm start                      # Start production server
npm run dev                    # Start development server with nodemon
```

### Sentiment Service (Python/Flask)
```bash
cd sentiment-service
python -m venv venv            # Create virtual environment
source venv/bin/activate       # Activate virtual environment (Unix/Mac)
pip install -r requirements.txt # Install dependencies
python app.py                  # Run Flask application
```

### Docker Development
```bash
docker-compose up              # Start all services with Docker
docker-compose down            # Stop all services
docker-compose build           # Rebuild containers
```

## Architecture Overview

This is a full-stack sentiment analysis application with a microservices architecture:

### Service Architecture
1. **Client Service** (Port 3000/4173)
   - React frontend built with Vite
   - Provides UI for submitting text reviews
   - Communicates with backend via axios

2. **Backend Server** (Port 5000)
   - Node.js/Express API gateway
   - Handles client requests and routes them to appropriate services
   - Manages MongoDB persistence for reviews
   - Environment variables: `MONGO_URI`, `SENTIMENT_API_URL`

3. **Sentiment Service** (Port 5001)
   - Python Flask microservice using TextBlob
   - Performs sentiment analysis on submitted text
   - Returns sentiment classification (Positive/Neutral/Negative) and score
   - Polarity threshold: >5 (Positive), <-5 (Negative), else (Neutral)

4. **MongoDB Database** (Port 27017)
   - Stores review history with sentiment analysis results
   - Schema: `reviewText`, `sentiment`, `score`, `createdAt`

### Key API Endpoints
- `POST /reviews/submit` - Submit review for analysis and storage
  - Request: `{ reviewText: string }`
  - Response: `{ message: string, data: { reviewText, sentiment, score } }`

- `POST /analyze` (Sentiment Service)
  - Request: `{ review: string }`
  - Response: `{ sentiment: string, score: number }`

### Data Flow
1. User submits review text via React form
2. Client sends POST request to backend server
3. Backend forwards text to sentiment service for analysis
4. Sentiment service returns classification and score
5. Backend saves complete review data to MongoDB
6. Response sent back to client with analysis results

### Important Files
- `client/src/components/ReviewForm.jsx` - Main UI component
- `server/routes/reviews.js` - API route handlers
- `server/models/Review.js` - MongoDB schema definition
- `sentiment-service/app.py` - Sentiment analysis logic
- `docker-compose.yml` - Multi-container orchestration
- `k8s/` - Kubernetes deployment configurations