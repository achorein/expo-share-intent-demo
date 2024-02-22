import { Button, Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import useShareIntent from "./hooks/useShareIntent";

export default function App() {
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent();

  return (
    <View style={styles.container}>
      {!hasShareIntent && <Text>No Share intent detected</Text>}
      {hasShareIntent && <Text style={styles.gap}>Share intent value:</Text>}
      {hasShareIntent && shareIntent.text && (
        <Text style={styles.gap}>{JSON.stringify(shareIntent)}</Text>
      )}
      {shareIntent?.files?.map((file) => (
        <Image source={file} style={[styles.image, styles.gap]} />
      ))}
      {hasShareIntent && <Button onPress={resetShareIntent} title="Reset" />}
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
