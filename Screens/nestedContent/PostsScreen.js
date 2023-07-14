import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { FontAwesome5, EvilIcons } from "@expo/vector-icons";

import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase/config";

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const getDataFromFirestore = async () => {
    try {
      const array = [];

      const snapshot = await getDocs(collection(database, "/posts"));
      snapshot.forEach((post) => array.push({ ...post.data(), id: post.id }));

      setPosts(array);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useFocusEffect(
    useCallback(() => {
      getDataFromFirestore();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.overallWrapper}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.publicationsWrapper}>
              <Image
                style={{ width: "100%", height: 240 }}
                source={{ uri: item.photo }}
              />

              <Text style={styles.publicationTitle}>{item.postTitle}</Text>

              <View style={styles.additionalInfoWrapper}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    navigation.navigate("Comments", { postID: item.id })
                  }
                >
                  <FontAwesome5 name="comments" size={24} color="#BDBDBD" />

                  <Text style={styles.publicationComments}>{}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  }
                >
                  <EvilIcons name="location" size={24} color="#BDBDBD" />

                  <Text style={styles.publicationLocation}>
                    {item.location.coords}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
  publicationsWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  publicationTitle: {
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  additionalInfoWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  publicationComments: {
    marginLeft: 9,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  publicationLocation: {
    marginLeft: 9,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});
