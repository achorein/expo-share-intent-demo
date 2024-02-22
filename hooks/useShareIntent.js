import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import Constants from "expo-constants";

import ReceiveSharingIntent from "react-native-receive-sharing-intent";

export const getShareIntentAsync = async () => {
  return new Promise((resolve, reject) => {
    ReceiveSharingIntent.getReceivedFiles(
      (data) => {
        if (!data || data.length === 0) {
          console.log("useShareIntent[data] no share intent detected");
          return;
        }
        const intents = data.map((intent) => {
          if (intent.weblink || intent.text) {
            const link = intent.weblink || intent.text || "";
            console.debug("useShareIntent[text/url]", link);
            return { text: JSON.stringify(link) };
          } else if (intent.filePath) {
            console.debug("useShareIntent[file]", {
              uri: intent.contentUri || intent.filePath,
              mimeType: intent.mimeType,
              fileName: intent.fileName,
            });
            return {
              uri: intent.contentUri || intent.filePath,
              mimeType: intent.mimeType,
              fileName: intent.fileName,
            };
          } else {
            console.warn("useShareIntent[get] share type not handled", data);
            reject(new Error("TYPE_NOT_HANDLED"));
          }
        });
        resolve(
          intents.reduce(
            (acc, curr) => {
              acc.text = curr.text;
              if (curr.uri) {
                if (!acc.files) {
                  acc.files = [curr];
                } else {
                  acc.files = [...acc.files, curr];
                }
              }
              return acc;
            },
            { text: null, files: null },
          ),
        );
      },
      (err) => {
        console.error("useShareIntent[get] internal native module error", err);
        reject(err);
      },
      Constants.expoConfig.scheme,
    );
  });
};

export const clearShareIntent = () => {
  ReceiveSharingIntent?.clearReceivedFiles();
};

export default function useShareIntent() {
  const appState = useRef(AppState.currentState);
  const [shareIntent, setShareIntent] = useState(null);
  const [error, setError] = useState();

  const refreshShareIntent = () =>
    getShareIntentAsync()
      .then(setShareIntent)
      .catch((err) => setError("shareIntent error : " + err?.message));

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        console.debug("useShareIntent[active] refresh intent");
        refreshShareIntent();
      } else if (
        appState.current === "active" &&
        ["inactive", "background"].includes(nextAppState)
      ) {
        console.debug("useShareIntent[to-background] reset intent");
        setShareIntent(null);
        clearShareIntent();
      }

      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.debug("useShareIntent[mount]", Constants.expoConfig.scheme);
    refreshShareIntent();
    return clearShareIntent;
  }, []);

  console.debug("useShareIntent[render]", shareIntent);

  return {
    hasShareIntent: shareIntent?.text || shareIntent?.files,
    shareIntent,
    resetShareIntent: () => setShareIntent(null),
    error,
  };
}
