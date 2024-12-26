import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { i18n } from 'C:/graduation project/GraduationProject/frontend/AppEmotify/node_modules/@react-native/debugger-frontend/dist/third-party/front_end/core/i18n/i18n.js';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{i18n.t('welcome')}</Text> {/* Türkçe çeviri kullanımı */}
      <Text style={styles.text}>{i18n.t('hello')}</Text>   {/* Diğer çeviri kullanımı */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 20,
    margin: 10,
    color: '#333',
  },
});

export default App;
