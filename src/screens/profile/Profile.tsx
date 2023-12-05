import { StyleSheet, Text, View } from "react-native";
import React from "react";
import authStore from "../../store/store";

const Profile = () => {
  const { user } = authStore((state: any) => state.setUser);
  console.log("pppppppppppp"+user);

  return (
    <View style={styles.profileContainer}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
