import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const EmotionAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const startRecording = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
      console.log('Recording started: ', result);
    } catch (error) {
      console.error('Error starting recorder: ', error);
      Alert.alert('Hata', 'Kayda başlanamadı.');
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      console.log('Recording stopped: ', result);
      if (result) {
        await uploadAudio(result);
      }
    } catch (error) {
      console.error('Error stopping recorder: ', error);
      Alert.alert('Hata', 'Kaydı durdururken bir hata oluştu.');
    }
  };

  const uploadAudio = async (audioUri: string) => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', {
        uri: audioUri,
        name: 'audio.mp3',
        type: 'audio/mpeg',
      } as any); // `as any` kullanımı `append` hatasını çözer

      const response = await fetch('http://10.0.2.2:5000/analyze-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      console.log('Backend Yanıtı: ', result);
      if (response.ok) {
        setUploadStatus('Ses dosyası başarıyla yüklendi ve analiz edildi.');
      } else {
        setUploadStatus('Ses yükleme hatası: ' + result.message || 'Bilinmeyen bir hata oluştu.');
      }
    } catch (error) {
      console.error('Upload error: ', error);
      setUploadStatus('Ses yükleme hatası: ' + (error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emotify</Text>
      <Text style={styles.subtitle}>Yapay zeka destekli duygu analizi</Text>

      <TouchableOpacity
        style={[styles.button, isRecording ? styles.buttonRecording : null]}
        onPressIn={startRecording}
        onPressOut={stopRecording}
      >
        {isRecording ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Kaydı Başlat</Text>
        )}
      </TouchableOpacity>

      {isUploading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <Text style={styles.statusText}>{uploadStatus}</Text>
      )}
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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
  },
  buttonRecording: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
});

export default EmotionAnalysis;
