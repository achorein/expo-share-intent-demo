# Expo Share Intent Demo

This project demonstrate a fonctionnal share intent in a Expo (React Native) project. It allows to use an expo auto configuration for react-native-receive-sharing-intent package.

This demo works with old **Expo SDK 46** (not supported anymore) and is for Android and iOS, using url and text sharing.

More Demo :

- Expo 47 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo47)
- Expo 48 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo48)
- Expo 49 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo49)

## Getting Started

```
yarn install
yarn prebuild
yarn ios
yarn android
```

## How

For that we use and patch two projects :

- https://github.com/ajith-ab/react-native-receive-sharing-intent
- https://github.com/timedtext/expo-config-plugin-ios-share-extension

we are using `patch-package` to auto patch, see "patches" directory for details.

### iOS Tricks

Thanks to `expo-config-plugin-ios-share-extension` package we do not need to do manual configuration as described is the original [doc](https://ajith-ab.github.io/react-native-receive-sharing-intent/docs/ios)

#### Content Types

Simply choose content types you need :

```json
  "plugins": [
      [
        "expo-config-plugin-ios-share-extension",
        {
          "activationRules": {
            "NSExtensionActivationSupportsText": true,
            "NSExtensionActivationSupportsWebURLWithMaxCount": 1,
            "NSExtensionActivationSupportsWebPageWithMaxCount": 1,
            "NSExtensionActivationSupportsImageWithMaxCount": 1
          }
        }
      ],
  ],
```

| Option          | Values                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activationRules | Allow **text** sharing with `"NSExtensionActivationSupportsText": true`<br/>**Url** sharing with `"NSExtensionActivationSupportsWebURLWithMaxCount": 1` and `"NSExtensionActivationSupportsWebPageWithMaxCount": 1`<br/>**Images** sharing with `"NSExtensionActivationSupportsImageWithMaxCount": 1`<br/>_default value_: `{ "NSExtensionActivationSupportsWebURLWithMaxCount": 1, "NSExtensionActivationSupportsWebPageWithMaxCount": 1 }"` |

**WIP**: Corresponding [PR](https://github.com/timedtext/expo-config-plugin-ios-share-extension/pull/11) for expo-config-plugin-ios-share-extension

### Android Tricks

For Android build a config plugin has been added (see `plugins/withAndroidShareExtension` directory) to automate the [doc instruction](https://ajith-ab.github.io/react-native-receive-sharing-intent/docs/android/) :

#### Content Types

Simply choose content types you need :

```json
  "plugins": [
      [
        "./plugins/withAndroidShareExtension/index",
        {
          "androidIntentFilters": [
            "text/*",
            "image/*",
          ],
        }
      ],
  ],
```

| Option                        | Values                                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| androidIntentFilters          | array of mime types :`"text/*"` / `"image/*"` / `"*/*"`<br/>_default value_: `["text/*"]` (text and url) |
| androidMainActivityAttributes | _default value_: `{ "android:launchMode": "singleTask" }"`                                               |

## Support

Like my work ? want to say thanks, you can add a star and buy me a coffee to give me strength

<a href="https://www.buymeacoffee.com/achorein" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
