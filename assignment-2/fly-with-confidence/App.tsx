import 'react-native-gesture-handler';
import * as React from 'react';
import { useRef } from 'react';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { themeColors } from './src/styles/themeColors';
import { AppHeader, SidePanelItems } from './src/components';
import Home from './src/views/Home';
import SelectionScreen from './src/views/SelectionScreen';
import CategoryOverview from './src/views/Articles/CategoryOverview';
import ArticleOverview from './src/views/Articles/ArticleOverview';
import ForumOverview from "./src/views/Posts/ForumOverview";
import ForumDetail from './src/views/Posts/ForumDetail';

const Stack = createNativeStackNavigator();
const SidePanelDrawer = createDrawerNavigator();

export default function App() {
  const navigationRef = useRef(null);

  const openSidePanel = () => {
    // @ts-ignore
    navigationRef.current?.dispatch(DrawerActions.openDrawer());
  };

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
    <NavigationContainer ref={navigationRef}>
      <SidePanelDrawer.Navigator
        drawerContent={
          (props) =>
            <SidePanelItems
                activeItem={navigationRef.current?.getCurrentRoute().name}
                selectedCategory={navigationRef.current?.getCurrentRoute().params?.selectedCategory}
                {...props}
            />
        }
        initialRouteName="Home"
        screenOptions={{
          header: () => <AppHeader onSidePanelPress={openSidePanel} />,
          drawerPosition: 'right',
          drawerStyle: {
            width: "90%",
            maxWidth: 325,
          },
          drawerItemStyle: {
            backgroundColor: themeColors.white
          }
        }}
      >
        <SidePanelDrawer.Screen
          name="Home"
          options={{
            title: "Home",
            headerShown: false
          }}
        >
          {() => (
            <Stack.Navigator
              screenOptions={{
                animation: 'slide_from_right',
                animationDuration: 100,
                header: () => <AppHeader onSidePanelPress={openSidePanel} />,
              }}
            >
              <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
              <Stack.Screen name="CategoryOverview" component={CategoryOverview} />
              <Stack.Screen name="ArticleOverview" component={ArticleOverview} />
              <Stack.Screen name="ForumOverview" component={ForumOverview} />
              <Stack.Screen name="ForumDetail" component={ForumDetail} />
            </Stack.Navigator>
          )}
        </SidePanelDrawer.Screen>
      </SidePanelDrawer.Navigator>
    </NavigationContainer>
  );
}
