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
  // Platform,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  email: "",
  password: "",
  login: "",
};

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [dimensionsHeigth, setDimensionsHeigth] = useState(
    Dimensions.get("window").height
  );

  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [emailFocus, setEmailFocus] = useState(false);
  const [loginFocus, setLoginFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const focusInputStyle = (focus) => {
    return focus ? { ...styles.input, ...styles.inputFocus } : styles.input;
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      const height = Dimensions.get("window").height;

      setDimensions(width);
      setDimensionsHeigth(height);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsShowKeyboard(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShowKeyboard(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // setState(initialState);
  };

  const formSubmit = () => {
    setState(initialState);
    setIsSecurePassword(true);
    console.log(state);
  };

  const passwordShown = () => {
    isSecurePassword === true
      ? setIsSecurePassword(false)
      : setIsSecurePassword(true);
  };

  const showPasswordBtn = isSecurePassword ? "Показать" : "Cкрыть";

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    "Roboto-Bolt": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
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
      <View style={{ ...styles.container }} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/Photo_BG.jpg")}
        >
          <View
            style={{
              ...styles.form,
              // marginBottom: isShowKeyboard ? 20 : 50,

              width: dimensions + 16 * 2,
              marginTop: dimensions > dimensionsHeigth ? 100 : 0,
            }}
          >
            <KeyboardAvoidingView
            // behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={styles.avatar}>
                <View style={styles.avatarWrapper}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addAvatarBtn}
                    // onPress={}
                  >
                    <Text style={styles.addAvatarBtnTitle}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  width: dimensions,
                }}
              >
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Регистрация</Text>
                </View>
                <View>
                  <TextInput
                    // style={styles.inputTitle}
                    style={focusInputStyle(loginFocus)}
                    placeholder="Логин"
                    // style={styles.input}
                    textAlign={"center"}
                    onFocus={() => {
                      setIsShowKeyboard(true), setLoginFocus(true);
                    }}
                    onBlur={() => {
                      setLoginFocus(false);
                    }}
                    value={state.login}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, login: value }))
                    }
                  />
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={focusInputStyle(emailFocus)}
                    textAlign={"center"}
                    placeholder="Адрес электронной почты"
                    // style={styles.input}

                    onFocus={() => {
                      setIsShowKeyboard(true), setEmailFocus(true);
                    }}
                    onBlur={() => {
                      setEmailFocus(false);
                    }}
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View style={{ marginTop: 16, marginBottom: 30 }}>
                  <TextInput
                    // style={styles.input}
                    style={focusInputStyle(passwordFocus)}
                    textAlign={"center"}
                    placeholder="Пароль"
                    secureTextEntry={isSecurePassword}
                    // secureTextEntry={true}
                    onFocus={() => {
                      setIsShowKeyboard(true), setPasswordFocus(true);
                    }}
                    onBlur={() => {
                      setPasswordFocus(false);
                    }}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.passwordShowBtn}
                    onPress={passwordShown}
                  >
                    <Text style={styles.registerLinkTitle}>
                      {showPasswordBtn}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
            <View
              style={{
                width: dimensions,
              }}
            >
              <TouchableOpacity
                style={{
                  ...styles.btn,
                  display: isShowKeyboard ? "none" : "flex",
                }}
                activeOpacity={0.8}
                onPress={formSubmit}
              >
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.registerLink,
                  display: isShowKeyboard ? "none" : "flex",
                }}
              >
                <Text style={styles.registerLinkTitle}>
                  Уже есть аккаунт? Войти
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    // justifyContent: "flex-end",
  },

  avatar: {
    alignItems: "center",
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
  addAvatarBtn: {
    position: "absolute",
    bottom: 20,
    right: -12,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 100,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addAvatarBtnTitle: {
    color: "#FF6C00",
  },

  inputFocus: { backgroundColor: "#fff", borderColor: "#FF6C00" },

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
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 500,
    color: "#BDBDBD",
    fontFamily: "Roboto-Medium",
  },
  btn: {
    // marginTop: 40,
    // marginHorizontal: 20,
    borderRadius: 100,
    borderWidth: 1,
    height: 51,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderColor: "transparent",
    paddingVertical: 10,
  },
  btnTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
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
    marginBottom: 32,
    marginTop: 92,
  },
  headerTitle: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.01,
    fontWeight: 500,
    lineHeight: 35,
  },
  registerLinkTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    alignItems: "center",
  },
  registerLink: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 78,
  },
  passwordShowBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});
