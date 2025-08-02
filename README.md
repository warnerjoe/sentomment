# Sentiment Analysis App

## Overview
This project is a full-stack application that allows users to submit text for sentiment analysis. It consists of a React frontend where users can input reviews, and a backend powered by a Node server with TextBlob for sentiment analysis. The app processes the submitted text to determine whether the sentiment is positive, neutral, or negative, and displays the sentiment score. MongoDB is used to store the reviews and their sentiment analysis results.

---

## Features
- **Text Input**: Users can submit a text review through a simple form.
- **Sentiment Analysis**: The backend analyzes the text for sentiment using TextBlob.
- **Sentiment Display**: Shows whether the sentiment is positive, neutral, or negative, along with the sentiment score.
- **Data Persistence**: MongoDB is used to store user reviews and the sentiment analysis results.
- **Frontend**: Built with React for smooth user interaction.
- **Backend**: A Node server handles the sentiment analysis requests.
  
---

## Stack

- **Frontend**: React
- **Backend**: Node.js
- **Sentiment Analysis**: TextBlob
- **Database**: MongoDB
- **Styling**: Basic CSS (can be expanded as needed)
- **Deployment**: Docker for containerization (optional for deployment)

---

## Goal
The goal of this project is to provide an easy-to-use tool for analyzing the sentiment of text, which could be used for customer reviews, social media posts, or any other form of textual feedback. The project uses a simple form submission process to interact with a sentiment analysis service, giving users immediate feedback on the tone of their content. MongoDB helps to persist the data for future analysis and review.

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/sentiment-analysis-app.git
cd sentiment-analysis-app
