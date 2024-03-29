import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { authLogInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [state, setState] = useState(initialState);
  const [, setIsKeyboardShown] = useState(false);
  const [isPasswordSecured, setIsPasswordSecured] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const keyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const formSubmit = () => {
    setIsPasswordSecured(true);
    dispatch(authLogInUser(state));
    setState(initialState);
    keyboardHide();

    navigation.navigate("Home");
  };

  const passwordShown = () =>
    isPasswordSecured === true
      ? setIsPasswordSecured(false)
      : setIsPasswordSecured(true);

  const showPasswordBtn = isPasswordSecured
    ? "Reveal password"
    : "Hide password";

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardShown(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardShown(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ ...styles.container }}>
        <Image
          style={styles.background}
          source={require("../../assets/images/PhotoBG-2.png")}
        />
        <View
          style={{
            ...styles.overallWrapper,
            width: dimensions + 16 * 2,
          }}
        >
          <KeyboardAvoidingView
            style={styles.keyboardWrappper}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.avatar}>
              <View style={styles.userPhotoWrapper}>
                <Image
                  style={styles.userPhoto}
                  source={require("../../assets/images/profile_add.png")}
                />
              </View>

              <TouchableOpacity style={styles.iconWrapper} activeOpacity={0.8}>
                <Image
                  style={styles.addIcon}
                  source={require("../../assets/images/add.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.registration, width: dimensions }}>
              <Text style={styles.registrationTitle}>Log In</Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.registrationInput}
                  placeholder="E-Mail"
                  onFocus={() => setIsKeyboardShown(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.registrationInput}
                  placeholder="Password"
                  secureTextEntry={isPasswordSecured}
                  onFocus={() => setIsKeyboardShown(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />

                <TouchableOpacity
                  style={styles.revealButton}
                  activeOpacity={0.8}
                  onPress={passwordShown}
                >
                  <Text style={styles.revealButtonTitle}>
                    {showPasswordBtn}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate("Registration")}
            style={{
              marginTop: 20,
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>
              New to applicatio?{" "}
              <Text style={{ fontSize: 20, color: "#ff6347" }}>Sign Up</Text>
            </Text>
          </TouchableOpacity> */}

          <View style={{ ...styles.signUpButtonsWrapper, width: dimensions }}>
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={formSubmit}
            >
              <Text style={styles.loginButtonTitle}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpForNotExistedAccount}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.signUpForNotExistedAccountTitle}>
                Still have no account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    resizeMode: "cover",
  },
  overallWrapper: {
    width: "100%",
    height: "67%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  keyboardWrappper: {
    alignItems: "center",
  },
  avatar: {
    position: "relative",
    top: -60,

    zIndex: 1,
  },
  userPhoto: {
    width: "100%",
    height: "100%",
  },
  iconWrapper: {
    position: "absolute",
    right: -13,
    bottom: 14,
  },
  addIcon: {
    width: 25,
    height: 25,
  },
  registration: {
    width: "100%",
  },
  registrationTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    marginTop: -28,
  },
  inputWrapper: {
    position: "relative",
    marginTop: 16,
    marginHorizontal: 16,
  },
  registrationInput: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    padding: 16,
    color: "#212121",
  },
  revealButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  revealButtonTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  signUpButtonsWrapper: {
    marginHorizontal: 16,
    marginTop: 43,
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  loginButtonTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  signUpForNotExistedAccount: {
    marginTop: 16,
    padding: 16,
  },
  signUpForNotExistedAccountTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  userPhotoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F6F6F6",
  },
});
