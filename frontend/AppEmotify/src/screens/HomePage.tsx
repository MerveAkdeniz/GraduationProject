import React from 'react';
import { SafeAreaView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomePage = ({navigation}: any) => {
    return (
      <SafeAreaView style={styles.container}>
          {/* Uygulama başlığı */}
          <Text style={styles.title}>Emotify</Text>
          {/* Açıklama */}
          <Text style={styles.subtitle}>Yapay zeka destekli duygu analizi</Text>
          {/* Görsel */}
          <Image source={require('../assets/photo1.jpg')} style={styles.image} />
          
          
          {/* Buton */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EmotionAnalysis')} >
           <Text style={styles.buttonText}>Haydi duygularını öğrenelim.</Text>
          </TouchableOpacity>
          
       </SafeAreaView>
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
      fontSize: 36,
      fontWeight: 'bold',
      color: '#333333',
      fontFamily: 'Cursive', // Özel font kullanımı
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: '#666666',
      textAlign: 'center',
      marginBottom: 20,
    },
    image: {
      width: 300, // Görselin genişliği
      height: 200, // Görselin yüksekliği
      resizeMode: 'contain',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#007BFF',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 25,
    },
    buttonText: {
      color: '#007BFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default HomePage;