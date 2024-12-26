from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

# Model yükleme (model dosyanızın yolunu belirtin)
model_path = "model.joblib"  # Eğitilmiş model dosyanız
if os.path.exists(model_path):
    model = joblib.load(model_path)
else:
    model = None  # Model yüklenemezse bir hata döneceğiz

@app.route('/')
def home():
    return "Duygu Analizi API'sine Hoşgeldiniz!"

@app.route('/analyze', methods=['POST'])
def analyze():
    if not model:
        return jsonify({'error': 'Model yüklenemedi.'}), 500
    
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'Metin eksik!'}), 400
    
    # Model tahmini
    prediction = model.predict([text])[0]
    return jsonify({'emotion': prediction})

if __name__ == '__main__':
    app.run(debug=True)
