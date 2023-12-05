import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../router/AuthNavigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passVisible, setPassVisible] = useState<boolean>(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const togglePassword = () => {
    setPassVisible(!passVisible);
  };

  const handleSignup = async () => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Başarılı", "Başarılı bir şekilde giriş yapıldı.");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginImageContainer}>
        <Image
          source={require("../../../assets/logo/logo.png")}
          style={{ width: 150, height: 150 }}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.loginInput}>
          <TextInput placeholder="Email" onChangeText={setEmail}></TextInput>
          <Icon
            name="email"
            size={30}
            color="#C7C7C7"
            style={styles.loginInputIcon}
          />
        </View>
        <View style={styles.loginInput}>
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry={passVisible ? true : false}
          ></TextInput>
          <Icon
            name={passVisible ? "lock" : "lock-open-variant"}
            size={30}
            color="#C7C7C7"
            style={styles.loginInputIcon}
            onPress={togglePassword}
          />
        </View>
        <View style={styles.signupContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Forgot Password!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.loginButtonText}>GİRİŞ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialLoginContainer}>
        <View style={styles.loginWith}>
          <View style={styles.loginWithLine} />
          <Text style={styles.loginWithText}>or Signup with</Text>
          <View style={styles.loginWithLine} />
        </View>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.loginGoogle}>
            <Image
              source={require("../../../assets/logo/google.png")}
              style={styles.googleIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginFacebook}>
            <Image
              source={require("../../../assets/logo/facebook.png")}
              style={styles.facebookIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={require("../../../assets/logo/logo.png")}
        style={styles.bgImage}
      />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  loginImageContainer: {
    flex: 0.3,
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputContainer: {
    flex: 0.4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginInput: {
    padding: 12,
    width: "90%",
    marginTop: 15,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
  },
  loginInputIcon: {
    position: "absolute",
    right: 15,
  },
  loginButton: {
    margin: 2,
    width: "90%",
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 0.25,
    padding: 15,
    backgroundColor: "#383EFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
  },
  signupContainer: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    marginBottom: 15,
  },
  loginWith: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginWithText: {
    fontSize: 16,
    color: "gray",
  },
  loginWithLine: {
    width: 70,
    height: 1,
    backgroundColor: "gray",
    marginHorizontal: 10,
    borderRadius: 50,
  },
  socialLoginContainer: {
    flex: 0.3,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
  },
  socialButtons: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
    gap: 10,
  },
  loginGoogle: {
    borderColor: "grey",
    borderWidth: 0.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 5,
    width: "45%",
  },
  loginFacebook: {
    backgroundColor: "#4267B2",
    borderColor: "grey",
    borderWidth: 0.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 5,
    width: "45%",
  },
  googleIcon: {
    height: 20,
    width: 20,
  },
  facebookIcon: {
    height: 20,
    width: 10,
  },
  bgImage: {
    position: "absolute",
    height: 500,
    width: 500,
    zIndex: 0,
    right: -250,
    bottom: 100,
    opacity: 0.2,
  },
});
