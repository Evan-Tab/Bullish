import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// Replace YOUR_IP_HERE with your actual IP address from: ipconfig getifaddr en0
const API_BASE_URL = 'http://192.168.1.186:5001';

function HeldStocksScreen() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeldStocks();
  }, []);

  const fetchHeldStocks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/owned`);
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching held stocks:', error);
      Alert.alert('Error', 'Failed to fetch held stocks. Make sure your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const renderStock = ({ item }) => (
    <View style={styles.stockItem}>
      <View style={styles.stockHeader}>
        <Text style={styles.ticker}>{item.ticker}</Text>
        <Text style={styles.sentiment}>
          {item.sentiment === 'buy' ? '🟢' : item.sentiment === 'sell' ? '🔴' : '🟡'} 
          {item.sentiment.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.costBasis}>Cost Basis: ${item.cost_basis}</Text>
      <Text style={styles.confidence}>Confidence: {(item.confidence * 100).toFixed(0)}%</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2f95dc" />
        <Text>Loading your stocks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📈 Held Stocks</Text>
      {stocks.length > 0 ? (
        <FlatList
          data={stocks}
          renderItem={renderStock}
          keyExtractor={(item) => item.ticker}
          style={styles.list}
        />
      ) : (
        <Text>No stocks found. Check your backend connection.</Text>
      )}
    </View>
  );
}

function RecommendedBuysScreen() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/recommendations`);
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      Alert.alert('Error', 'Failed to fetch recommendations. Make sure your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const renderRecommendation = ({ item }) => (
    <View style={styles.recommendationItem}>
      <View style={styles.stockHeader}>
        <Text style={styles.ticker}>{item.ticker}</Text>
        <Text style={styles.buySignal}>🟢 BUY</Text>
      </View>
      <Text style={styles.confidence}>
        Confidence: {(item.confidence * 100).toFixed(0)}%
      </Text>
      <Text style={styles.sentiment}>
        Sentiment: {item.sentiment.toUpperCase()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2f95dc" />
        <Text>Loading recommendations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💡 Recommended Buys</Text>
      {recommendations.length > 0 ? (
        <FlatList
          data={recommendations}
          renderItem={renderRecommendation}
          keyExtractor={(item) => item.ticker}
          style={styles.list}
        />
      ) : (
        <Text>No buy recommendations at the moment.</Text>
      )}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Held Stocks') {
              iconName = 'wallet';
            } else if (route.name === 'Recommended Buys') {
              iconName = 'trending-up';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2f95dc',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Held Stocks" component={HeldStocksScreen} />
        <Tab.Screen name="Recommended Buys" component={RecommendedBuysScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  list: {
    flex: 1
  },
  stockItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  recommendationItem: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  ticker: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  sentiment: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  buySignal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50'
  },
  costBasis: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4
  },
  confidence: {
    fontSize: 14,
    color: '#666'
  }
});