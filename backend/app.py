from flask import Flask, request, jsonify
import joblib
import json  # JSON modülü eklendi

app = Flask(__name__)

# Model ve vektörleştiriciyi yükleme
model = joblib.load("model.joblib")  # Eğittiğimiz modeli yüklüyoruz
vectorizer = joblib.load("vectorizer.joblib")  # Vektörleştiriciyi yüklüyoruz

@app.route('/')
def home():
    return "Duygu Analizi API'sine Hoşgeldiniz!"

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        # Kullanıcıdan gelen JSON verisini alıyoruz
        data = request.json
        text = data.get('text', '')

        # Metni vektörleştirip modelle tahmin yapıyoruz
        text_vectorized = vectorizer.transform([text.lower()])  # Küçük harfe çevirme
        prediction = model.predict(text_vectorized)[0]  # Tahmini alıyoruz

        # Yanıtı JSON formatında döndürüyoruz
        response = {'emotion': prediction}
        return app.response_class(
            response=json.dumps(response, ensure_ascii=False),  # ensure_ascii=False eklendi
            status=200,
            mimetype='application/json'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Hata durumunda mesaj döndür

if __name__ == '__main__':
    app.run(debug=True)
