# Bullish Backend

This is the backend service for **Bullish**, an iOS app that crawls the web for stock sentiment analysis, filters for low-cost high-reward stocks, and delivers real-time push notifications.

The backend handles:
- **Sentiment Analysis API** — Exposes an endpoint to fetch real-time sentiment scores and stock lists.
- **Filtering Logic** — Determines which stocks belong in:
  - `Stocks Owned`
  - `Stocks to Buy`
- **Price & Sentiment Alerts** — Sends triggers to the frontend when thresholds are crossed.

---

## 📂 Project Structure

backend/
├── app.py # Flask application entry point
├── requirements.txt # Python dependencies
├── sentiment/ # (Optional) Custom sentiment analysis code
├── data/ # (Optional) Local data cache
└── README.md # This file

yaml
Copy
Edit

---

## ⚙️ Tech Stack

- **Python 3.10+**
- **Flask** — Web framework for API routes
- **Requests / BeautifulSoup** — For crawling and scraping sentiment data
- **Pandas / NumPy** — For processing and filtering stock data
- **Gunicorn** — For deployment (optional)

---

## 🚀 Running Locally

### 1️⃣ Install Dependencies

Make sure Python 3 is installed, then run:

```bash
cd backend
python3 -m venv venv         # Create virtual environment
source venv/bin/activate     # Activate environment
pip install -r requirements.txt

2️⃣ Start the Backend Server
bash python3 app.py

By default, the Flask server will run on:


http://127.0.0.1:5000

🛠 API Routes
GET /sentiment
Returns a list of stocks with their aggregated sentiment scores.

Example Response:

json

[
  {
    "ticker": "AAPL",
    "sentiment": 0.78,
    "status": "buy"
  },
  {
    "ticker": "TSLA",
    "sentiment": -0.34,
    "status": "sell"
  }
]

🔄 Frontend Integration

The iOS frontend fetches data from http://127.0.0.1:5000/sentiment (or your deployed backend URL).

Data is displayed in two tabs:

Stocks Owned — Shows sentiment trends for user-owned stocks.

Stocks to Buy — Shows AI-selected opportunities.

📌 Development Notes

Keep requirements.txt up to date with pip freeze > requirements.txt.

If running into ModuleNotFoundError, ensure your virtual environment is activated (source venv/bin/activate).

For production, use gunicorn or another WSGI server instead of running Flask directly.

📅 Roadmap

 Integrate live price feed from Yahoo Finance API

 Add WebSocket for push updates

 Add historical sentiment trends

 Deploy to AWS or Heroku for remote access

