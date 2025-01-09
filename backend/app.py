from flask import Flask, request, jsonify
from pydub import AudioSegment
import joblib
import json
import os
import speech_recognition as sr
import base64

app = Flask(__name__)

# FFmpeg yolları
AudioSegment.converter = "C:/ffmpeg/bin/ffmpeg.exe"
AudioSegment.ffprobe = "C:/ffmpeg/bin/ffprobe.exe"

# Model ve vektörleştiriciyi yükleme
model = joblib.load("model.joblib")
vectorizer = joblib.load("vectorizer.joblib")

def speech_to_text(file_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(file_path) as source:
        audio_data = recognizer.record(source)
        return recognizer.recognize_google(audio_data, language="tr-TR")

# Metni duygu analizine tabi tutan fonksiyon
def analyze_text_emotion(text):
    text_vectorized = vectorizer.transform([text.lower()])
    prediction = model.predict(text_vectorized)[0]
    return prediction

@app.route('/')
def home():
    return "Duygu Analizi API'sine Hoşgeldiniz!"


@app.route('/analyze-audio', methods=['POST'])
def analyze_audio():
    try:
        # Ses dosyasını al
        file = request.files.get('file')
        if not file:
            return jsonify({'error': 'Ses dosyası yüklenmedi'}), 400

        # Dosyayı kaydet
        temp_path = "uploaded_audio.mp3"
        file.save(temp_path)

        # MP3 dosyasını WAV formatına dönüştür
        wav_path = "converted_audio.wav"
        audio = AudioSegment.from_file(temp_path)
        audio.export(wav_path, format="wav")

        # Ses dosyasını metne dönüştür
        extracted_text = speech_to_text(wav_path)

        # Duygu analizi yap
        emotion = analyze_text_emotion(extracted_text)

        # Geçici dosyaları temizle
        os.remove(temp_path)
        os.remove(wav_path)

        # Yanıtı döndür
        return jsonify({'message': 'Ses dosyası başarıyla işlendi.', 'text': extracted_text, 'emotion': emotion}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    



@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        text = data.get('text', '')

        text_vectorized = vectorizer.transform([text.lower()])
        prediction = model.predict(text_vectorized)[0]

        response = {'emotion': prediction}
        return app.response_class(
            response=json.dumps(response, ensure_ascii=False),
            status=200,
            mimetype='application/json'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
