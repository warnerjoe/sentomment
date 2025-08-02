import { useState } from 'react';
import axios from 'axios';
import './ReviewForm.css';

export default function ReviewForm() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/reviews/submit`, {
        reviewText: review
      });
      setResult(response.data.data);
      setReview('');
    } catch (error) {
      console.error('Error submitting review', error);
      setError('Failed to analyze review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSentimentEmoji = (sentiment) => {
    switch(sentiment) {
      case 'Positive': return '😊';
      case 'Negative': return '😔';
      default: return '😐';
    }
  };

  const getSentimentClass = (sentiment) => {
    switch(sentiment) {
      case 'Positive': return 'positive';
      case 'Negative': return 'negative';
      default: return 'neutral';
    }
  };

  return (
    <div className="review-container">
      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">
            <span className="gradient-text">Sentiment Analyzer</span>
          </h1>
          <p className="form-subtitle">Discover the emotion behind your words</p>
        </div>
        
        <form onSubmit={handleSubmit} className="review-form">
          <div className="textarea-wrapper">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="review-textarea"
              rows="5"
              placeholder="Share your thoughts, feelings, or review here..."
              disabled={loading}
            />
            <div className="char-count">{review.length} characters</div>
          </div>
          
          <button 
            type="submit" 
            className={`submit-button ${loading ? 'loading' : ''}`}
            disabled={loading || !review.trim()}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              <>
                <span className="button-icon">✨</span>
                Analyze Sentiment
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {result && !loading && (
          <div className={`result-card ${getSentimentClass(result.sentiment)}`}>
            <div className="sentiment-header">
              <span className="sentiment-emoji">{getSentimentEmoji(result.sentiment)}</span>
              <h2 className="sentiment-label">{result.sentiment}</h2>
            </div>
            
            <div className="score-container">
              <div className="score-bar">
                <div 
                  className="score-fill" 
                  style={{
                    width: `${Math.abs(result.score) / 100}%`,
                    maxWidth: '100%'
                  }}
                />
              </div>
              <div className="score-value">
                Score: <span className="score-number">{result.score.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="review-text">
              <p className="review-label">Your review:</p>
              <p className="review-content">"{result.reviewText}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
