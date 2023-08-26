import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import ReceiveSharingIntent from "react-native-receive-sharing-intent";
import useShareIntent from "./hooks/useShareIntent";

export default function App() {
  const { shareIntent, resetShareIntent } = useShareIntent();

  return (
    <View style={styles.container}>
      <Text>Share intent value: {shareIntent || "not found"}</Text>
      {!!shareIntent && <Button onPress={resetShareIntent} title="Reset" />}
      <StatusBar style="auto" />
    </View>
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
