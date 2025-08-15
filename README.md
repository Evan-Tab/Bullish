BullishApp — Mobile Stock Sentiment Tracker

📌 Overview

BullishApp is a React Native (Expo) mobile application that surfaces real-time stock sentiment data and trading alerts based on AI-driven analysis.
The app aggregates sentiment from multiple web sources, filters for low-cost, high-reward stocks, and sends push notifications for actionable trading opportunities.
It is not a long-term investing tool — the focus is short-term sentiment-based trading.

🏗 Features
Stock Sentiment Analysis

Connects to a Python backend that crawls news, social media, and other sources for stock-related sentiment.

AI aggregates and normalizes sentiment into a single score.

Two Main Lists

Stocks Owned – User's portfolio with current aggregate sentiment.

Stocks to Buy – High-confidence AI sentiment opportunities, filtered for entry price and potential reward.

Real-Time Alerts

Push notifications when sentiment changes or price triggers are hit.

Multi-Tab Navigation (Planned)

Home – Overview dashboard, recent sentiment changes, alerts.

Explore – Discover stocks with trending sentiment.

Portfolio – Manage and track owned stocks.


📂 Project Structure (Key Files)

/BullishApp
├── App.js                # Root entry point — currently shows Expo example tabs
├── navigation/           # Navigation logic (React Navigation recommended)
│   ├── BottomTabs.js     # Bottom tab configuration (Home, Explore, Portfolio)
│   ├── StackNavigator.js # Stack navigation for individual screens
├── screens/              # Each main screen in the app
│   ├── HomeScreen.js
│   ├── ExploreScreen.js
│   ├── PortfolioScreen.js
├── components/           # Shared UI components
│   ├── StockCard.js
│   ├── SentimentBadge.js
├── services/             # API connection logic
│   ├── api.js            # Fetch stock sentiment data from backend
│   ├── notifications.js  # Push notification handling
└── assets/               # Images, icons, etc.


🚀 Getting Started
Prerequisites:
Node.js >= 18

npm or yarn

Expo CLI (npm install -g expo-cli)

Python backend running (not included here)

Installation:
git clone https://github.com/your-username/bullishapp.git
cd bullishapp
npm install
expo start

Running on device:
Install Expo Go on iOS/Android.

Scan the QR code from the terminal or browser after running expo start.

🔄 Updating Screens & Navigation
The current App.js in this repo is still the Expo example with Home and Explore placeholder screens.

The real navigation config will be in /navigation/BottomTabs.js once implemented.

If you want to replace the default example:

Create your real screens in /screens/.

Update /navigation/BottomTabs.js to reference them.

Update App.js to load BottomTabs instead of the example tabs.

🧠 Backend Integration
The backend (Python) is expected to:

Crawl sentiment sources.

Calculate an aggregate sentiment score per stock.

Expose endpoints such as:

GET /sentiment?symbol=TSLA → returns current sentiment score.

GET /recommendations → returns list of “stocks to buy.”

Send push notifications via Expo's notification API when alerts are triggered.


📈 Roadmap

Replace Expo example screens with production UI.

Integrate backend API calls into screens.

Add stock search functionality.

Implement secure authentication.

Add user settings (alert thresholds, watchlist customization).

🤝 Contributing
Please fork the repo, create a feature branch, and submit PRs. Use descriptive commit messages.

🛠 Troubleshooting
If your app is still showing the default Expo example after code changes:

1. Stop the Expo server (Ctrl+C in terminal).

2. Clear cache and restart:

 expo start -c

3. Ensure you’re editing the correct files (check screens/ and navigation setup).

