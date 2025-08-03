from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import requests
import re
import threading

app = Flask(__name__)

# ------------------------------
# In-memory storage for now
# ------------------------------
owned_stocks = [
    {"ticker": "SOFI", "cost_basis": 7.23},
    {"ticker": "PLTR", "cost_basis": 17.35},
]
buy_recommendations = []  # auto-populated

# ------------------------------
# Scraping Utilities
# ------------------------------

def fetch_google_summary(ticker):
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        search_url = f"https://www.google.com/search?q={ticker}+stock"
        response = requests.get(search_url, headers=headers)
        soup = BeautifulSoup(response.text, "html.parser")

        ai_summary_div = soup.find("div", string=re.compile("Summary|About"))
        if ai_summary_div:
            ai_text = ai_summary_div.get_text()
        else:
            ai_text = soup.get_text()

        text = ai_text.lower()
        if "strong buy" in text or ("buy" in text and "sell" not in text):
            return "buy", 0.9
        elif "hold" in text:
            return "hold", 0.7
        elif "sell" in text:
            return "sell", 0.9
        else:
            return "unknown", 0.5
    except Exception as e:
        return "error", 0.0

# ------------------------------
# Endpoint: Your Holdings
# ------------------------------

@app.route("/owned", methods=["GET", "POST"])
def handle_owned():
    global owned_stocks
    if request.method == "POST":
        data = request.json
        owned_stocks = data.get("stocks", owned_stocks)
        return jsonify({"status": "updated", "owned": owned_stocks})

    enriched = []
    for stock in owned_stocks:
        ticker = stock["ticker"]
        sentiment, confidence = fetch_google_summary(ticker)
        enriched.append({
            "ticker": ticker,
            "cost_basis": stock["cost_basis"],
            "sentiment": sentiment,
            "confidence": confidence
        })
    return jsonify(enriched)

# ------------------------------
# Endpoint: Recommendations
# ------------------------------

@app.route("/recommendations", methods=["GET"])
def recommend_stocks():
    # You can swap in your own target tickers or use a broader index
    target_tickers = ["SOFI", "PLTR", "RIVN", "NIO", "DNA", "WBD", "CVNA", "FUBO", "OPEN", "BBBYQ"]

    recommendations = []
    for ticker in target_tickers:
        sentiment, confidence = fetch_google_summary(ticker)
        if sentiment == "buy" and confidence > 0.75:
            recommendations.append({
                "ticker": ticker,
                "sentiment": sentiment,
                "confidence": confidence
            })

    return jsonify(sorted(recommendations, key=lambda x: -x["confidence"]))

# ------------------------------
# Run app
# ------------------------------

if __name__ == "__main__":
    # Instead of:
    # app.run(debug=True)
    
    # Use this to allow external connections:
    app.run(host='0.0.0.0', port=5001, debug=True)
