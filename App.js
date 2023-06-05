import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
// import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";

import * as SplashScreen from "expo-splash-screen";
const AuthStack = createStackNavigator();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  //   "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  //   "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  // });

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
