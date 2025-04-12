# Claude Chatbot

A web-based chatbot interface powered by Anthropic's Claude AI.

## Features

- Simple, clean web interface
- Powered by Claude-3-Opus
- Conversation history maintained during session
- Responsive design for desktop and mobile

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Create a `.env` file from the template:
   ```
   cp .env.example .env
   ```
4. Add your Anthropic API key to the `.env` file
5. Run the application:
   ```
   python app.py
   ```
6. Open your browser and visit `http://localhost:5000`

## Technology Stack

- Backend: Flask (Python)
- Frontend: HTML, CSS, JavaScript
- AI: Anthropic Claude API

## Configuration

You can change the Claude model or adjust other parameters in `app.py`. The default model is set to `claude-3-opus-20240229`.
