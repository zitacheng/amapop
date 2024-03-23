import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import Splash from "./container/Splash.js";
import Login from "./container/Login.js";
import Home from "./container/Home.js";
import Register from "./container/Register.js";
import Profile from "./container/Profile.js";
import UserProfile from "./container/UserProfile.js";
import Creation from "./container/Creation.js";
import Edit from "./container/Edit.js";
import Settings from "./container/Settings.js";
import Chat from "./container/Chat.js";
import Chatting from "./container/Chatting.js";
import Topic from "./container/Topic.js";
import { TabScreen } from "./bar.js";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import { Provider } from "react-redux";
import { store, persistor } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";
// import { PersistGate } from 'redux-persist/integration/react'

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    // You can also add an alert() to see the error message in case of an error when fetching updates.
    alert(`Error fetching latest Expo update: ${error}`);
  }
}

export default function App() {
  const [isLoaded] = useFonts({
    "rbt-Light": require("./assets/fonts/RobotoCondensed-Light.otf"),
    "rbt-ExtraLight": require("./assets/fonts/RobotoCondensed-ExtraLight.otf"),
    "rbt-ExtraLightItalic": require("./assets/fonts/RobotoCondensed-ExtraLightItalic.otf"),
    "rbt-LightItalic": require("./assets/fonts/RobotoCondensed-LightItalic.otf"),
    "rbt-ExtraBold": require("./assets/fonts/RobotoCondensed-ExtraBold.otf"),
    "rbt-ExtraBoldItalic": require("./assets/fonts/RobotoCondensed-ExtraBoldItalic.otf"),
    "rbt-SemiBold": require("./assets/fonts/RobotoCondensed-SemiBold.otf"),
    "rbt-SemiBoldItalic": require("./assets/fonts/RobotoCondensed-SemiBoldItalic.otf"),
    "rbt-Regular": require("./assets/fonts/RobotoCondensed-Regular.otf"),
    "rbt-Bold": require("./assets/fonts/RobotoCondensed-Bold.otf"),
    "rbt-BoldItalic": require("./assets/fonts/RobotoCondensed-BoldItalic.otf"),
    "rbt-Medium": require("./assets/fonts/RobotoCondensed-Medium.otf"),
    "rbt-MediumItalic": require("./assets/fonts/RobotoCondensed-MediumItalic.otf"),
    "rbt-Black": require("./assets/fonts/RobotoCondensed-Black.otf"),
    "rbt-BlackItalic": require("./assets/fonts/RobotoCondensed-BlackItalic.otf"),
    "rbt-Italic": require("./assets/fonts/RobotoCondensed-Italic.otf"),
    "rbt-Thin": require("./assets/fonts/RobotoCondensed-Thin.otf"),
    "rbt-ThinItalic": require("./assets/fonts/RobotoCondensed-ThinItalic.otf"),
  });

  const handleOnLayout = useCallback(async () => {
    await onFetchUpdateAsync();
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider onLayout={handleOnLayout}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                gestureEnabled: false,
              }}
            >
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="TabScreen" component={TabScreen} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Edit" component={Edit} />
              <Stack.Screen name="Topic" component={Topic} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="UserProfile" component={UserProfile} />
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="Chatting" component={Chatting} />
              <Stack.Screen name="Creation" component={Creation} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
