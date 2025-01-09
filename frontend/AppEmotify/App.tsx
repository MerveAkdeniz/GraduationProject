import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/screens/HomePage';
import EmotionAnalysis from './src/screens/EmotionAnalysis';
import ResultScreen from './src/screens/ResultScreen';

// RootStackParamList tanımı
export type RootStackParamList = {
  HomePage: undefined;
  EmotionAnalysis: undefined;
  ResultScreen: { emotion: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="EmotionAnalysis" component={EmotionAnalysis} options={{ title: 'Duygu Analizi' }} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ title: 'Sonuç' }} />
      </Stack.Navigator>
    </NavigationContainer>

);
};


export default App;