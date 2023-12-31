import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './container/Splash.js';
import Login from './container/Login.js';
import Home from './container/Home.js';
import Register from './container/Register.js';
import Profile from './container/Profile.js';
import UserProfile from './container/UserProfile.js';
import Creation from './container/Creation.js';
import Settings from './container/Settings.js';
import Chat from './container/Chat.js';
import Chatting from './container/Chatting.js';
import Topic from './container/Topic.js';
import {TabScreen} from './bar.js';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [isLoaded] = useFonts({
    'rbt-Light': require('./assets/fonts/RobotoCondensed-Light.otf'),
    'rbt-ExtraLight': require('./assets/fonts/RobotoCondensed-ExtraLight.otf'),
    'rbt-ExtraLightItalic': require('./assets/fonts/RobotoCondensed-ExtraLightItalic.otf'),
    'rbt-LightItalic': require('./assets/fonts/RobotoCondensed-LightItalic.otf'),
    'rbt-ExtraBold': require('./assets/fonts/RobotoCondensed-ExtraBold.otf'),
    'rbt-ExtraBoldItalic': require('./assets/fonts/RobotoCondensed-ExtraBoldItalic.otf'),
    'rbt-SemiBold': require('./assets/fonts/RobotoCondensed-SemiBold.otf'),
    'rbt-SemiBoldItalic': require('./assets/fonts/RobotoCondensed-SemiBoldItalic.otf'),
    'rbt-Regular': require('./assets/fonts/RobotoCondensed-Regular.otf'),
    'rbt-Bold': require('./assets/fonts/RobotoCondensed-Bold.otf'),
    'rbt-BoldItalic': require('./assets/fonts/RobotoCondensed-BoldItalic.otf'),
    'rbt-Medium': require('./assets/fonts/RobotoCondensed-Medium.otf'),
    'rbt-MediumItalic': require('./assets/fonts/RobotoCondensed-MediumItalic.otf'),
    'rbt-Black': require('./assets/fonts/RobotoCondensed-Black.otf'),
    'rbt-BlackItalic': require('./assets/fonts/RobotoCondensed-BlackItalic.otf'),
    'rbt-Italic': require('./assets/fonts/RobotoCondensed-Italic.otf'),
    'rbt-Thin': require('./assets/fonts/RobotoCondensed-Thin.otf'),
    'rbt-ThinItalic': require('./assets/fonts/RobotoCondensed-ThinItalic.otf')
  });

  const handleOnLayout = useCallback(async () => {

    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }
  
  return (
    <SafeAreaProvider onLayout={handleOnLayout}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="TabScreen" component={TabScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Topic" component={Topic} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Chatting" component={Chatting} />
        <Stack.Screen name="Creation" component={Creation} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// "plugins": [
//   [
//     "expo-font",
//     {
//       "fonts": [
//         "./assets/fonts/RobotoCondensed-Light.otf",
//         "./assets/fonts/RobotoCondensed-ExtraLight.otf",
//         "./assets/fonts/RobotoCondensed-ExtraLightItalic.otf",
//         "./assets/fonts/RobotoCondensed-LightItalic.otf",
//         "./assets/fonts/RobotoCondensed-ExtraBold.otf",
//         "./assets/fonts/RobotoCondensed-ExtraBoldItalic.otf",
//         "./assets/fonts/RobotoCondensed-SemiBold.otf",
//         "./assets/fonts/RobotoCondensed-SemiBoldItalic.otf",
//         "./assets/fonts/RobotoCondensed-Regular.otf",
//         "./assets/fonts/RobotoCondensed-Bold.otf",
//         "./assets/fonts/RobotoCondensed-BoldItalic.otf",
//         "./assets/fonts/RobotoCondensed-Medium.otf",
//         "./assets/fonts/RobotoCondensed-MediumItalic.otf",
//         "./assets/fonts/RobotoCondensed-Black.otf",
//         "./assets/fonts/RobotoCondensed-BlackItalic.otf",
//         "./assets/fonts/RobotoCondensed-Italic.otf",
//         "./assets/fonts/RobotoCondensed-Thin.otf",
//         "./assets/fonts/RobotoCondensed-ThinItalic.otf"
//       ]
//     }
//   ]
// ],