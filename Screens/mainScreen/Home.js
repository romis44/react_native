import React from "react";
import { moduleName } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "../nestedContent/PostsScreen";
import CommentsScreen from "../nestedContent/CommentsScreen";
import MapScreen from "../nestedContent/MapScreen";

const NestedScreen = createStackNavigator();

const Home = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="Posts" component={PostsScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
export default Home;
