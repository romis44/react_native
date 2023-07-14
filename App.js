import "react-native-gesture-handler";
import React, { useEffect } from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

import * as SplashScreen from "expo-splash-screen";
import { store, persistor } from "./redux/store";

import RouterNavigator from "./router";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    const close = async () => {
      await SplashScreen.hideAsync();
    };

    fontsLoaded && close();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Text>Loading...</Text>}>
        <NavigationContainer>
          <RouterNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
