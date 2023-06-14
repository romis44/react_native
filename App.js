import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as SplashScreen from "expo-splash-screen";
import Home from "./Screens/mainScreen/Home";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
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
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Home" component={Home} />
      <MainTab.Screen name="Create" component={CreatePostsScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
};

export default function App() {
  const routing = useRoute({});
  // const [fontsLoaded] = useFonts({
  //   "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  //   "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  //   "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  // });к

  return <NavigationContainer>{routing}</NavigationContainer>;
}
