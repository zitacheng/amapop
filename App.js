import { StatusBar } from 'expo-status-bar';
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
import {TabScreen} from './bar.js';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
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
