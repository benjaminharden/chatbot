import os
import requests
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Anthropic API settings
api_key = os.environ.get("ANTHROPIC_API_KEY")
ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
ANTHROPIC_HEADERS = {
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
    "x-api-key": api_key
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    # Call Claude API via REST
    payload = {
        "model": "claude-3-opus-20240229",
        "max_tokens": 1000,
        "messages": [
            {"role": "user", "content": user_message}
        ],
        "temperature": 0.7
    }
    
    response = requests.post(ANTHROPIC_API_URL, headers=ANTHROPIC_HEADERS, json=payload)
    response_data = response.json()
    
    # Extract and return Claude's response
    assistant_message = response_data["content"][0]["text"]
    
    return jsonify({
        "response": assistant_message
    })

@app.route('/api/conversation', methods=['POST'])
def conversation():
    data = request.json
    messages = data.get('messages', [])
    
    # Format messages for Claude API
    formatted_messages = []
    for msg in messages:
        formatted_messages.append({
            "role": msg["role"],
            "content": msg["content"]
        })
    
    # Call Claude API via REST
    payload = {
        "model": "claude-3-opus-20240229",
        "max_tokens": 1000,
        "messages": formatted_messages,
        "temperature": 0.7
    }
    
    response = requests.post(ANTHROPIC_API_URL, headers=ANTHROPIC_HEADERS, json=payload)
    response_data = response.json()
    
    # Extract and return Claude's response
    assistant_message = response_data["content"][0]["text"]
    
    return jsonify({
        "response": assistant_message
    })

if __name__ == '__main__':
    app.run(debug=True)
