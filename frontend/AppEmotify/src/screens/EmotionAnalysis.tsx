import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const EmotionAnalysis = () => {
    return (
        <View style={styles.container}>
        {/* Logo veya Başlık */}
        <Text style={styles.title}>Emotify</Text>
  
        {/* Alt Başlık */}
        <Text style={styles.subtitle}>Yapay zeka destekli duygu analizi</Text>
  
        {/* Mikrofon Simgesi */}
        <TouchableOpacity style={styles.microphoneContainer}>
          <Image
            source={require('../assets/microphone.png')} // Mikrofon görselini burada belirtin
            style={styles.microphoneIcon}
          />
        </TouchableOpacity>
  
        {/* Açıklama Metni */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Duygu analizi için mikrofon düğmesine basılı tutarak konuşma kaydedin.
          </Text>
          <Text style={styles.instructionText}>
            İşiniz bittiğinde, düğmeyi serbest bırakın.
          </Text>
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
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      fontFamily: 'Cursive', // Özel font kullanmak isterseniz font yüklemeniz gerekir
      color: '#000000',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: '#555555',
      marginBottom: 40,
    },
    microphoneContainer: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: '#F0F0F0',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    microphoneIcon: {
      width: 60,
      height: 60,
      tintColor: '#333333', // Görsel rengi değiştirilebilir
    },
    instructionContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
      alignItems: 'center',
    },
    instructionText: {
      fontSize: 14,
      color: '#666666',
      textAlign: 'center',
      marginBottom: 5,
    },
  });
  export default EmotionAnalysis;