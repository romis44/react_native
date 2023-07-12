import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/mainScreen/Home";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

export const RouterNavigator = () => {
  const dispatch = useDispatch();

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "appstore-o";
            return <AntDesign name={iconName} size={24} color={color} />;
          } else if (route.name === "Create") {
            iconName = "add";
            return <Ionicons name={iconName} size={24} color={color} />;
          } else if (route.name === "Profile") {
            iconName = "md-person-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.41,
          color: "#212121",
        },
        headerTitleAlign: "center",
        headerStyle: {
          borderBottomWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.3)",
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          alignItems: "center",
          borderTopWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.3)",
          backgroundColor: "#FFFFFF",
        },
        tabBarItemStyle: {
          width: 70,
          height: 40,
          margin: 9,
          borderRadius: 20,
        },
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveTintColor: "#FFFFFF",
        tabBarActiveBackgroundColor: "#FF6C00",
      })}
    >
      <MainTab.Screen
        options={{
          headerTitle: "Publications",
          headerRight: ({ focused, size, color }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginRight: 10 }}
              onPress={() => dispatch(authSignOutUser())}
            >
              <Feather name="log-out" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          ),
        }}
        name="Home"
        component={Home}
      />

      <MainTab.Screen
        options={{
          headerTitle: "Create post",
          headerLeft: ({ focused, size, color }) => (
            <TouchableOpacity activeOpacity={0.8} style={{ marginLeft: 16 }}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={"rgba(33, 33, 33, 0.8)"}
              />
            </TouchableOpacity>
          ),
        }}
        name="Create"
        component={CreatePostScreen}
      />

      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
};
