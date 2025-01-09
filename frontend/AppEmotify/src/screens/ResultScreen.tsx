import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ResultScreen = ({ route }: any) => {
  const { emotion } = route.params;

  // Duygulara özel öneriler ve resim yolları
  const emotionData: { [key: string]: { advice: string; image: any } } = {
    üzgün: {
      advice:
        "Bu çok normal. Kendini mutlu hissedeceğin şeylere yönel, örneğin kitap oku veya bir yürüyüş yap.",
      image: require('../assets/uzgun.jpg'),
    },
    korku: {
      advice:
        "Korku, dikkatli olmanız gerektiğini hatırlatan bir duygudur. Kendinizi güvende hissettirecek şeyler yapın.",
      image: require('../assets/korku.jpg'),
    },
    kızgın: {
      advice:
        "Kızgınlık doğaldır, ama nefes alın ve sakinleşmek için zaman ayırın. Sizi mutlu eden şeylere odaklanın.",
      image: require('../assets/kizgin.jpg'),
    },
    mutlu: {
      advice: "Harika! Bu güzel duyguyu başkalarıyla paylaşın ve keyfini çıkarın.",
      image: require('../assets/mutlu.jpg'),
    },
    şaşkın: {
      advice: "Bazen hayat sürprizlerle doludur! Bu anın tadını çıkarın ve rahatlayın.",
      image: require('../assets/saskin.jpg'),
    },
  };

  // Eğer emotion "sürpriz" ise "şaşkın" olarak değiştir
  const displayEmotion = emotion === 'surpriz' ? 'şaşkın' : emotion;
  const currentEmotion = emotionData[displayEmotion];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Duygu Analizi Sonucu</Text>
      <Text style={styles.emotionText}>{displayEmotion.toUpperCase()}</Text>
      <Text style={styles.advice}>{currentEmotion?.advice}</Text>
      <Image source={currentEmotion?.image} style={styles.image} />
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
  emotionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5733',
    textAlign: 'center',
    marginBottom: 10,
  },
  advice: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
  },
});

export default ResultScreen;
