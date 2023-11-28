import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Detail = () => {
  return (
    <View style={styles.detailContainer}>
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
