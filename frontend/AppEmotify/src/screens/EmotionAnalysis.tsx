import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native'; // Navigation için
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  EmotionAnalysis: undefined;
  ResultScreen: { text: string; emotion: string }; // ResultScreen'e metin ve duygu göndereceğiz
};

type EmotionAnalysisNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EmotionAnalysis'
>;

const audioRecorderPlayer = new AudioRecorderPlayer();

const EmotionAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [text, setText] = useState<string>(''); // Backend'den alınan metni saklamak için
  const [emotion, setEmotion] = useState<string>(''); // Backend'den alınan duyguyu saklamak için
  const navigation = useNavigation<EmotionAnalysisNavigationProp>();

  // Ses kaydını başlat
  const startRecording = async () => {
    try {
      const path = Platform.select({
        ios: 'audio.m4a',
        android: `${RNFS.DocumentDirectoryPath}/audio.mp3`,
      });

      const result = await audioRecorderPlayer.startRecorder(path);
      setAudioUri(result);
      setIsRecording(true);
      setStatusMessage('Ses kaydediliyor...');
    } catch (error) {
      console.error('Kayıt başlatma hatası:', error);
      Alert.alert('Hata', 'Ses kaydı başlatılamadı.');
    }
  };

  // Ses kaydını durdur
  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setStatusMessage('Ses kaydı tamamlandı.');
      setAudioUri(result);
    } catch (error) {
      console.error('Kayıt durdurma hatası:', error);
      Alert.alert('Hata', 'Ses kaydı durdurulamadı.');
    }
  };

  // Ses dosyasını backend'e gönder
  const uploadAudio = async () => {
    if (!audioUri) {
      Alert.alert('Hata', 'Ses kaydı bulunamadı.');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: audioUri,
      type: 'audio/mpeg',
      name: 'audio.mp3',
    } as any);

    try {
      const response = await fetch('http://10.0.2.2:5000/analyze-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      console.log('Backend Yanıtı:', result);

      if (response.ok) {
        setText(result.text); // Backend'den alınan metni kaydet
        setEmotion(result.emotion); // Backend'den alınan duyguyu kaydet
        setStatusMessage('Metin ve duygu başarıyla alındı.');
      } else {
        setStatusMessage(`Hata: ${result.error}`);
      }
    } catch (error) {
      console.error('Ses yükleme hatası:', error);
      setStatusMessage('Hata: Ses yüklenemedi.');
    }
  };

  const navigateToResult = () => {
    if (text && emotion) {
      navigation.navigate('ResultScreen', { text, emotion }); // Metin ve duygu sonucu gönder
    } else {
      console.error('Metin veya duygu sonucu eksik!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emotify</Text>
      <Text style={styles.subtitle}>Yapay zeka destekli duygu analizi</Text>

      {/* Mikrofon Düğmesi */}
      <TouchableOpacity
        style={styles.microphoneContainer}
        onPressIn={startRecording}
        onPressOut={stopRecording}
      >
        <View style={styles.microphoneButton} />
      </TouchableOpacity>

      {/* Durum Mesajı */}
      <Text style={styles.statusMessage}>{statusMessage}</Text>

      {/* Ses Dosyasını Yükle ve Analiz Yap */}
      <TouchableOpacity style={styles.button} onPress={uploadAudio}>
        <Text style={styles.buttonText}>Analiz Yap</Text>
      </TouchableOpacity>

      {/* ResultScreen'e Yönlendirme */}
      {text && emotion ? (
        <TouchableOpacity style={styles.button} onPress={navigateToResult}>
          <Text style={styles.buttonText}>Sonucu Gör</Text>
        </TouchableOpacity>
      ) : null}
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
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 20,
  },
  microphoneContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  microphoneButton: {
    width: 60,
    height: 60,
    backgroundColor: '#007BFF',
    borderRadius: 30,
  },
  statusMessage: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default EmotionAnalysis;
