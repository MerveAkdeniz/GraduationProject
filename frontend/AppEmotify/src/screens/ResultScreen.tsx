import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultScreen = ({ route }: any) => {
  // route.params ile gelen text ve emotion parametrelerini alıyoruz
  const { text, emotion } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Duygu Analizi Sonucu</Text>

      {/* Çıkarılan Metin */}
      <View style={styles.resultContainer}>
        <Text style={styles.label}>Çıkarılan Metin:</Text>
        <Text style={styles.resultText}>{text}</Text>
      </View>

      {/* Duygu Analizi Sonucu */}
      <View style={styles.resultContainer}>
        <Text style={styles.label}>Duygu Analizi Sonucu:</Text>
        <Text style={styles.emotionText}>{emotion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  resultContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555555',
  },
  resultText: {
    fontSize: 18,
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
  },
  emotionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5733',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ResultScreen;
