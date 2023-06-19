import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, FlatList, Image } from "react-native";

// const ProfileScreen = ({ route }) => {
//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     if (route.params) {
//       setUserPosts((prevState) => [...prevState, route.params]);
//     }
//   }, [route.params]);
//   console.log("posts", userPosts);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={userPosts}
//         keyExtractor={(item, indx) => indx.toString()}
//         renderItem={({ item }) => (
//           <View
//             style={{
//               marginBottom: 10,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Image
//               source={{ uri: item.photo }}
//               style={{ width: 350, height: 200 }}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default ProfileScreen;
