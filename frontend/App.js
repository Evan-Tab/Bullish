import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function HeldStocksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📈 Held Stocks</Text>
      <Text>List of stocks you currently hold will appear here.</Text>
    </View>
  );
}

function RecommendedBuysScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>💡 Recommended Buys</Text>
      <Text>AI-recommended buys will appear here based on sentiment and price triggers.</Text>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  }
});
