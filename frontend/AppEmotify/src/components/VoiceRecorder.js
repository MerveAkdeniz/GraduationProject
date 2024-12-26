import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';
import { analyzeText } from '../api/apiClient';

const VoiceRecorder = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const startRecording = async () => {
    try {
      Voice.start('tr-TR'); // Türkçe dil kodu
      Voice.onSpeechResults = (event) => {
        setText(event.value[0]); // Ses metne dönüştürülüyor
      };
    } catch (error) {
      console.error('Ses Kaydı Hatası:', error);
    }
  };

  const stopRecording = () => {
    Voice.stop();
  };

  const analyzeEmotion = async () => {
    try {
      const response = await analyzeText(text);
      setResult(response.emotion);
    } catch (error) {
      console.error('Duygu Analizi Hatası:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Kayda Başla" onPress={startRecording} />
      <Button title="Kaydı Durdur" onPress={stopRecording} />
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="Konuşmanızı buradan düzenleyebilirsiniz"
      />
      <Button title="Duygu Analizi Yap" onPress={analyzeEmotion} />
      {result && <Text style={styles.resultText}>Duygu: {result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VoiceRecorder;
