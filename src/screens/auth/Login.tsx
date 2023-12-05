import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../router/AuthNavigation";
import {
  getAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import authStore from "../../store/store";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { GoogleSignin } from "react-native-google-signin";
import auth from "@react-native-firebase/auth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passVisible, setPassVisible] = useState<boolean>(true);
  const setUser = authStore((state: any) => state.setUser);
  const setIsUserLogin = authStore((state: any) => state.setIsUserLogin);

  const authFirebase = getAuth();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const togglePassword = () => {
    setPassVisible(!passVisible);
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await GoogleSignin.configure({
        // Configure Google Sign-In
        // ...
      });

      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      // Hata durumunda yapılacak işlemler
    }
  };

  const facebookLogin = () => {
    const provider = new FacebookAuthProvider();
    console.log("facebuttu");

    signInWithPopup(authFirebase, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        //const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );
      setUser(user);
      setIsUserLogin(true);
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
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Forgot Password!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>GİRİŞ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialLoginContainer}>
        <View style={styles.loginWith}>
          <View style={styles.loginWithLine} />
          <Text style={styles.loginWithText}>or Login with</Text>
          <View style={styles.loginWithLine} />
        </View>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.loginGoogle} onPress={facebookLogin}>
            <Image
              source={require("../../../assets/logo/google.png")}
              style={styles.googleIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginFacebook}
            onPress={facebookLogin}
          >
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

export default Login;

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
