import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "../nestedContent/PostsScreen";
import CommentsScreen from "../nestedContent/CommentsScreen";
import MapScreen from "../nestedContent/MapScreen";
import { useSelector } from "react-redux";

const NestedScreen = createStackNavigator();

export default function Home() {
  const { login, isAuth } = useSelector((state) => state);

  return (
    <View style={styles.container}>
      <View style={styles.overallWrapper}>
        <View style={styles.user}>
          <Image
            style={styles.avatar}
            source={require("../../assets/images/profile_add_2x.png")}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{login}</Text>
            <Text style={styles.userMail}>{isAuth && "online"}</Text>
          </View>
        </View>

        <NestedScreen.Navigator screenOptions={{ headerShown: false }}>
          <NestedScreen.Screen name="Posts" component={PostsScreen} />
          <NestedScreen.Screen name="Comments" component={CommentsScreen} />
          <NestedScreen.Screen name="Map" component={MapScreen} />
        </NestedScreen.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  overallWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    marginTop: 32,
    marginHorizontal: 16,
  },
  user: {
    flexDirection: "row",
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  userInfo: {
    justifyContent: "center",
    marginLeft: 8,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userMail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
