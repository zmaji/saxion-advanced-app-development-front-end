import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/views/Home";
import SelectionScreen from "./src/views/SelectionScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Lora-Bold-Italic': require('./assets/fonts/lora-v32-latin-700italic.ttf'),
    'Lora-Medium-Italic': require('./assets/fonts/lora-v32-latin-500italic.ttf'),
    'Lora-Italic': require('./assets/fonts/lora-v32-latin-italic.ttf'),
    'Montserrat-Medium': require('./assets/fonts/montserrat-v26-latin-500.ttf'),
    'Montserrat-Bold': require('./assets/fonts/montserrat-v26-latin-700.ttf'),
    'Montserrat-Regular': require('./assets/fonts/montserrat-v26-latin-regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="SelectionScreen"
          component={SelectionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}