import { useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";

import Constants from "expo-constants";
import { usePathname, useRouter } from "expo-router";

import useShareIntent from "../hooks/useShareIntent";

export default function Unmatched() {
  const pathname = usePathname();
  const router = useRouter();

  const { shareIntent, resetShareIntent } = useShareIntent();

  useEffect(() => {
    if (
      pathname?.includes(`dataurl=${Constants.expoConfig.scheme}sharekey`) &&
      shareIntent
    ) {
      router.replace({ pathname: "shareintent", params: { shareIntent } });
      resetShareIntent();
    }
  }, [shareIntent]);

  return (
    <View style={styles.container}>
      <Text style={styles.gap}>Screen could not be found : {pathname}</Text>
      <Text style={styles.gap}>{JSON.stringify(shareIntent)}</Text>
      <Text
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        }}
      >
        Go back.
      </Text>
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
