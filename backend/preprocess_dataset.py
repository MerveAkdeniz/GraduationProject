import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split

# Datasetin yolu
train_dataset_path = "train.csv"

# Dataseti yükleyin (UTF-8 kodlamasıyla)
train_data = pd.read_csv(train_dataset_path, encoding='utf-8')

# Gereksiz sütunları kaldırın
train_data = train_data[['Sentence', 'Label']]  # Sadece gerekli sütunları tutuyoruz

# Metinleri temizleme (örnek olarak küçük harfe çevirme)
train_data['Sentence'] = train_data['Sentence'].str.lower()

# Veriyi eğitim ve test seti olarak ayırma
X = train_data['Sentence']  # Metinler
y = train_data['Label']     # Etiketler
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Metinleri vektörleştirme (sayısallaştırma)
vectorizer = CountVectorizer()
X_train_vectorized = vectorizer.fit_transform(X_train)
X_test_vectorized = vectorizer.transform(X_test)

# İşlemlerin başarıyla tamamlandığını yazdırın
print("Veri temizleme ve vektörleştirme işlemleri tamamlandı.")
print(f"Eğitim seti boyutu: {X_train_vectorized.shape}")
print(f"Test seti boyutu: {X_test_vectorized.shape}")
