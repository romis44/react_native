import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import AppLoading from "expo-app-loading";

import * as Font from "expo-font";
//1 metod
// import { AppLoading } from "expo";
//2 metod

const loadApplication = async () => {
  await Font.loadAsync({
    "RobotoCondensed-Regular": require("./assets/fonts/RobotoCondensed-Regular.ttf"),
    "RobotoCondensed-Light": require("./assets/fonts/RobotoCondensed-Light.ttf"),
  });
};
//1 metod
// const loadFonts = async () => {
//   await Font.loadAsync({
//     "RobotoCondensed-Regular": require("./assets/fonts/RobotoCondensed-Regular.ttf"),
//   });
// };

const initialState = {
  email: "",
  password: "",
  login: "",
};

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  //1 metod
  // if (!isReady) {
  //   return (
  //     <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} />
  //   );
  // }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/phone-2.jpg")}
        >
          <KeyboardAvoidingView>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 50,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Реєстрація</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Login</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF9933",
    height: 40,
    borderRadius: 5,

    backgroundColor: "#CCFFFF",
  },
  form: {
    marginHorizontal: 40,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 500,
    color: "#ffff",
    fontFamily: "RobotoCondensed-Light",
  },
  btn: {
    height: 40,
    borderRadius: 20,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF9933",
    marginHorizontal: 20,
  },
  btnTitle: {
    fontSize: 15,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
  header: {
    alignItems: "center",
    marginBottom: 100,
  },
  headerTitle: {
    fontSize: 30,
    color: "#ffff",
    fontFamily: "RobotoCondensed-Regular",
  },
});
