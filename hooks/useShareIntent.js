import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import Constants from "expo-constants";

import ReceiveSharingIntent from "react-native-receive-sharing-intent";

export default function useShareIntent() {
  const appState = useRef(AppState.currentState);
  const [shareIntent, setShareIntent] = useState(null);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current === "active" &&
        ["inactive", "background"].includes(nextAppState)
      ) {
        // If App has come to the background reset old share Intent
        console.log("app going to background: reset intent");
        setShareIntent(null);
      }

      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    console.log("useShareIntent mount", Constants.expoConfig.scheme);
    ReceiveSharingIntent?.getReceivedFiles(
      (data) => {
        if (data[0].weblink || data[0].text) {
          const link = data[0].weblink || data[0].text || "";
          console.log("share intent navigate", link);
          setShareIntent(JSON.stringify(link));
        } else if (data[0].filePath) {
          setShareIntent({ uri: data[0].filePath });
        } else {
          console.log("share intent not handled", data);
        }
      },
      (err) => {
        console.log("share intent error", err);
      },
      Constants.expoConfig.scheme
    );
    return () => {
      ReceiveSharingIntent?.clearReceivedFiles();
    };
  }, []);

  return {
    shareIntent,
    resetShareIntent: () => setShareIntent(null),
  };
}
