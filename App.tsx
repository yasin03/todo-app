import { StyleSheet } from "react-native";
import Router from "./src/router/Router";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { useEffect, useState } from "react";

import Login from "./src/screens/auth/Login";
import AuthNavigation from "./src/router/AuthNavigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import authStore from "./src/store/store";

export default function App() {
  const isUserLogin = authStore((state: any) => state.isUserLogin);
  const setIsUserLogin = authStore((state: any) => state.setIsUserLogin);
  const setUser = authStore((state: any) => state.setUser);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log(user);
      setUser(user);
      setIsUserLogin(true);
    }
  }, []);

  return (
    <>
      {isUserLogin ? (
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </ApplicationProvider>
      ) : (
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
