import { View, Text, StyleSheet } from 'react-native';

export default function RecommendedBuysScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Recommended Buys</Text>
      <Text style={styles.description}>AI-powered suggestions based on real-time sentiment and price triggers.</Text>
      {/* TODO: Replace with FlatList or ScrollView of buy recommendations */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 10
  },
  description: {
    fontSize: 16, 
    textAlign: 'center'
  }
});
