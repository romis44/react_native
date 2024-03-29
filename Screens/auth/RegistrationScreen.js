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
import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
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

    keyboardHide();
    dispatch(authSignUpUser(state));
    setState(initialState);

    navigation.navigate("Home");
  };

  const passwordShown = () =>
    isPasswordSecured === true
      ? setIsPasswordSecured(false)
      : setIsPasswordSecured(true);

  const showPasswordButton = isPasswordSecured
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
          source={require("../../assets/images/PhotoBG.png")}
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
              <TouchableOpacity style={styles.iconWrapper} activeOpacity={0.8}>
                <Image
                  style={styles.addIcon}
                  source={require("../../assets/images/add.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.registration, width: dimensions }}>
              <Text style={styles.registrationTitle}>Registration</Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.registrationInput}
                  placeholder="Login"
                  onFocus={() => setIsKeyboardShown(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>

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
                    {showPasswordButton}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>

          <View style={{ ...styles.signUpButtonsWrapper, width: dimensions }}>
            <TouchableOpacity
              style={styles.signUpButton}
              activeOpacity={0.8}
              onPress={formSubmit}
            >
              <Text style={styles.signUpButtonTitle}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginForExistedAccount}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginForExistedAccountTitle}>
                Account already exists? Sign In
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
    width: 120,
    height: 120,
    zIndex: 1,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
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
  signUpButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  signUpButtonTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  loginForExistedAccount: {
    marginTop: 16,
    padding: 16,
  },
  loginForExistedAccountTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
