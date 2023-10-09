import * as React from 'react';
import { Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/views/Home";
import SelectionScreen from "./src/views/SelectionScreen";
import CategoryOverview from "./src/views/Articles/CategoryOverview";
import ArticleOverview from "./src/views/Articles/ArticleOverview";
import ForumOverview from "./src/views/Posts/ForumOverview";
import AppHeader from "./src/components/AppHeader";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Lora-Bold-Italic': require('./assets/fonts/lora-v32-latin-700italic.ttf'),
    'Lora-Medium-Italic': require('./assets/fonts/lora-v32-latin-500italic.ttf'),
    'Lora-Italic': require('./assets/fonts/lora-v32-latin-italic.ttf'),
    'Montserrat-Medium': require('./assets/fonts/montserrat-v26-latin-500.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/montserrat-v26-latin-600.ttf'),
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
          // headerShown: Platform.OS !== 'android',
          animation: 'slide_from_right',
          animationDuration: 100,
          header: () => <AppHeader />,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SelectionScreen"
          component={SelectionScreen}
        />

        <Stack.Screen
          name="CategoryOverview"
          component={CategoryOverview}
        />

        <Stack.Screen
          name="ArticleOverview"
          component={ArticleOverview}
        />

        <Stack.Screen
          name="ForumOverview"
          component={ForumOverview}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}