from flask import Flask, request, jsonify
from textblob import TextBlob
import re

app = Flask(__name__)

@app.route('/')
def health_check():
    return jsonify({'message': 'Sentomment Sentiment Service is running!'})

# Custom word lists for better sentiment detection
STRONG_NEGATIVE_WORDS = ['suck', 'sucks', 'hate', 'horrible', 'terrible', 'awful', 
                         'disgusting', 'worst', 'crap', 'garbage', 'trash', 'useless']
STRONG_POSITIVE_WORDS = ['love', 'amazing', 'excellent', 'wonderful', 'fantastic', 
                         'awesome', 'perfect', 'best', 'great', 'brilliant']

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    review_text = data.get('review')

    if not review_text:
        return jsonify({'error': 'No review text provided'}), 400

    print(f"Review text received: {review_text}")

    # Perform sentiment analysis on the entire review
    blob = TextBlob(review_text)
    polarity = blob.sentiment.polarity  # Range: -1 to 1
    
    # Check for strong negative/positive words if TextBlob returns neutral
    text_lower = review_text.lower()
    if polarity == 0:
        # Count strong negative and positive words
        neg_count = sum(1 for word in STRONG_NEGATIVE_WORDS if word in text_lower)
        pos_count = sum(1 for word in STRONG_POSITIVE_WORDS if word in text_lower)
        
        if neg_count > pos_count:
            polarity = -0.5  # Assign negative sentiment
        elif pos_count > neg_count:
            polarity = 0.5   # Assign positive sentiment
    
    # Convert to percentage scale (-100 to 100)
    score = polarity * 100

    # Determine sentiment category with better thresholds
    if polarity > 0.1:
        sentiment = 'Positive'
    elif polarity < -0.1:
        sentiment = 'Negative'
    else:
        sentiment = 'Neutral'

    return jsonify({
        'sentiment': sentiment,
        'score': round(score, 2)
    })

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)
