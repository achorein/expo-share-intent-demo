import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import useShareIntent from "./hooks/useShareIntent";

export default function App() {
  const { shareIntent, resetShareIntent } = useShareIntent();

  return (
    <View style={styles.container}>
      {!shareIntent && <Text>No Share intent detected</Text>}
      {!!shareIntent && <Text>Share intent value:</Text>}
      {!!shareIntent && !shareIntent.uri && <Text>{shareIntent}</Text>}
      {shareIntent?.uri && <Image source={shareIntent} style={styles.image} />}
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
    gap: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
