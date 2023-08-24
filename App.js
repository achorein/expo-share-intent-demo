import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import ReceiveSharingIntent from "react-native-receive-sharing-intent";

export default function App() {
  const [shareIntent, setShareIntent] = useState(null);

  useEffect(() => {
    ReceiveSharingIntent?.getReceivedFiles(
      (data) => {
        if (data[0].weblink || data[0].text) {
          const link = data[0].weblink || data[0].text || "";
          console.log("share intent navigate", link);
          setShareIntent(JSON.stringify(link));
        } else {
          console.log("share intent not handled", data);
        }
      },
      (err: any) => {
        console.log("share intent error", err);
      },
      "exposhareintentdemo"
    );
    return () => {
      ReceiveSharingIntent?.clearReceivedFiles();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Share intent value: {shareIntent || "not found"}</Text>
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
