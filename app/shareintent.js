import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useLocalSearchParams, useRouter } from "expo-router";

export default function ShareIntent() {
  const router = useRouter();
  const shareIntent = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {!shareIntent && <Text>No Share intent detected</Text>}
      {!!shareIntent && (
        <Text style={[styles.gap, { fontSize: 20 }]}>
          Congratz, a share intent value is available
        </Text>
      )}
      {!!shareIntent?.text && (
        <Text style={styles.gap}>{shareIntent.text}</Text>
      )}
      {shareIntent?.uri && (
        <Image source={shareIntent} style={[styles.image, styles.gap]} />
      )}
      {!!shareIntent && (
        <Button onPress={() => router.replace("/")} title="Go home" />
      )}
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
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  gap: {
    marginBottom: 20,
  },
});
