import React, { useState, useCallback, useEffect } from "react";
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
  Dimensions,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  email: "",
  password: "",
  login: "",
};

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    "Roboto-Bolt": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/Photo_BG.jpg")}
        >
          <KeyboardAvoidingView>
            <View
              style={{
                ...styles.form,
                // marginBottom: isShowKeyboard ? 20 : 50,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>
              <View>
                <Text style={styles.inputTitle} placeholder="Логин" />
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
                <Text style={styles.inputTitle} />
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
                <Text style={styles.inputTitle} />
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
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
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
    fontFamily: "Roboto-Regular",

    color: "#BDBDBD",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    padding: 16,
    color: "#212121",
  },
  form: {
    // marginHorizontal: 40,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 500,
    color: "#BDBDBD",
    fontFamily: "Roboto-Medium",
  },
  btn: {
    height: 50,
    borderRadius: 100,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    marginHorizontal: 20,
  },
  btnTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: "#FFFFFF",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 100,
  },
  headerTitle: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.01,
    fontWeight: 500,
    lineHeight: 35,
  },
});
