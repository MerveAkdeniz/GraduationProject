import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Flask API'nin adresi
  timeout: 10000,
});

export const analyzeText = async (text) => {
  try {
    const response = await apiClient.post('/analyze', { text });
    return response.data;
  } catch (error) {
    console.error('API Hatası:', error);
    throw error;
  }
};
