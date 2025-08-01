import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { v4 as uuidv4 } from "uuid";

// Backend base URL (update with your local IP or deployed server)
const BACKEND_URL = "http://127.0.0.1:5000";

export default function App() {
  const [ownedStocks, setOwnedStocks] = useState([]);
  const [tickerInput, setTickerInput] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  // --- Handle Push Notifications Setup ---
  useEffect(() => {
    registerForPushNotificationsAsync().then(token =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        console.log("Notification received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log("Notification tapped:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // --- Load Sentiment Data for Owned Stocks ---
  useEffect(() => {
    if (ownedStocks.length === 0) return;

    const fetchSentiment = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/sentiment-check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tickers: ownedStocks.map(stock => stock.ticker),
          }),
        });

        const data = await res.json();
        const updatedStocks = ownedStocks.map(stock => ({
          ...stock,
          sentiment: data[stock.ticker]?.sentiment || "N/A",
          confidence: data[stock.ticker]?.confidence || 0,
        }));

        setOwnedStocks(updatedStocks);
      } catch (err) {
        console.error("Sentiment fetch error:", err);
      }
    };

    fetchSentiment();
  }, [ownedStocks.length]);

  // --- Add a Stock to "Owned" List ---
  const addOwnedStock = () => {
    const ticker = tickerInput.trim().toUpperCase();
    if (!ticker) return;

    if (ownedStocks.find(s => s.ticker === ticker)) {
      Alert.alert("Stock already added.");
      return;
    }

    const newStock = {
      id: uuidv4(),
      ticker,
      sentiment: "Checking...",
      confidence: null,
    };

    setOwnedStocks([...ownedStocks, newStock]);
    setTickerInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 My Stocks</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter stock ticker (e.g. SNIPR)"
          value={tickerInput}
          onChangeText={setTickerInput}
        />
        <Button title="Add Stock" onPress={addOwnedStock} />
      </View>

      <FlatList
        data={ownedStocks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.stockItem}>
            <Text style={styles.ticker}>{item.ticker}</Text>
            <Text style={styles.sentiment}>
              Sentiment: {item.sentiment} ({item.confidence || "?"})
            </Text>
          </View>
        )}
      />

      <Text style={styles.tokenLabel}>Expo Push Token:</Text>
      <Text style={styles.token}>{expoPushToken}</Text>
    </View>
  );
}

// --- Register for Push Notifications ---
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for notifications!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    Alert.alert("Must use physical device for Push Notifications");
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
  },
  form: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 8,
    marginRight: 10,
  },
  stockItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
  ticker: {
    fontSize: 20,
    fontWeight: "600",
  },
  sentiment: {
    color: "gray",
  },
  tokenLabel: {
    marginTop: 40,
    fontSize: 12,
    fontWeight: "bold",
  },
  token: {
    fontSize: 10,
    color: "gray",
  },
});
