import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/screens/HomePage';
import EmotionAnalysis from './src/screens/EmotionAnalysis';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="EmotionAnalysis" component={EmotionAnalysis} />
      </Stack.Navigator>
    </NavigationContainer>

);
};


export default App;