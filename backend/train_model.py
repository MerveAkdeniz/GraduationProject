from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib

# Örnek veri
texts = ["Bugün harikaydı", "Çok üzgünüm", "Harika bir haber!", "Bu durum beni korkutuyor"]
labels = ["mutlu", "üzgün", "mutlu", "korku"]

# Metinleri vektörize etme
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

# Model eğitimi
model = MultinomialNB()
model.fit(X, labels)

# Modeli ve vektörizeri kaydetme
joblib.dump(model, "model.joblib")
joblib.dump(vectorizer, "vectorizer.joblib")
print("Model ve vektörizer başarıyla kaydedildi!")
