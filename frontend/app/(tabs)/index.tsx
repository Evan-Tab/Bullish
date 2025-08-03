import { View, Text, StyleSheet } from 'react-native';

export default function HeldStocksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 Held Stocks</Text>
      <Text style={styles.description}>View stocks you currently own and their current sentiment.</Text>
      {/* TODO: Replace with FlatList or custom card display of held stocks */}
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
