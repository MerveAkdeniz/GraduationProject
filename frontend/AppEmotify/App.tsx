import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      {/* Açılış ekranında basit bir hoşgeldiniz mesajı */}
      <Text style={styles.text}>Hoşgeldiniz</Text>
      <Text style={styles.subtext}>ben merveeeee</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#583269',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 18,
    color: '#666',
  },
});

export default App;
