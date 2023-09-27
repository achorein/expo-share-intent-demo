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
        console.log("useShareIntent[to-background] reset intent");
        setShareIntent(null);
      }

      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log("useShareIntent[mount]", Constants.expoConfig.scheme);
    ReceiveSharingIntent?.getReceivedFiles(
      (data) => {
        if(!data || data.intent.length === 0) {
          console.log("useShareIntent[mount] no share intent detected");
          return;        }
        const intent = data[0];
        if (intent.weblink || intent.text) {
          const link = intent.weblink || intent.text || "";
          console.log("useShareIntent[text/url]", link);
          setShareIntent(JSON.stringify(link));
        } else if (intent.filePath) {
          console.log("useShareIntent[file]", {
            uri: intent.contentUri || intent.filePath,
            mimeType: intent.mimeType,
            fileName: intent.fileName,
          });
          setShareIntent({
            uri: intent.contentUri || intent.filePath,
            mimeType: intent.mimeType,
            fileName: intent.fileName,
          });
        } else {
          console.log("useShareIntent[mount] share type not handled", data);
        }
      },
      (err) => {
        console.log("useShareIntent[mount] error", err);
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
