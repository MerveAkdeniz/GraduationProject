import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
import joblib

# Datasetlerin yolları
train_dataset_path = "train.csv"
test_dataset_path = "test.csv"

# Datasetleri yükleyin
train_data = pd.read_csv(train_dataset_path)
test_data = pd.read_csv(test_dataset_path)

# Gereksiz sütunları kaldırın
train_data = train_data[['Sentence', 'Label']]  # 'Label' doğru sütun adı
test_data = test_data[['Sentence', 'label']]    # Test setinde sütun adı 'label'

# Metinleri küçük harfe çevirerek temizleyin
train_data['Sentence'] = train_data['Sentence'].str.lower()
test_data['Sentence'] = test_data['Sentence'].str.lower()

# Metinleri vektörleştirme (sayısallaştırma)
vectorizer = CountVectorizer()
X_train = vectorizer.fit_transform(train_data['Sentence'])
X_test = vectorizer.transform(test_data['Sentence'])

# Etiketler
y_train = train_data['Label']
y_test = test_data['label']

# Modeli oluşturma ve eğitme
model = MultinomialNB()
model.fit(X_train, y_train)

# Test verisiyle tahmin yapma
y_pred = model.predict(X_test)

# Doğruluk oranını hesaplama
accuracy = accuracy_score(y_test, y_pred)
print(f"Modelin doğruluk oranı: {accuracy * 100:.2f}%")

# Modeli ve vektörizeri kaydetme
joblib.dump(model, "model.joblib")
joblib.dump(vectorizer, "vectorizer.joblib")
print("Model ve vektörizer başarıyla kaydedildi!")
