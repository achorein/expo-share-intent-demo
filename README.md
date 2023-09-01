# Expo Share Intent Demo

This project demonstrates a functional share intent in an Expo (React Native) project. It allows to use Expo's auto-configuration for the `react-native-receive-sharing-intent` package.

This demo works with **Expo SDK 46** (no longer supported). Is compatible with **Android** and **iOS** and support URL, text, images and files sharing.

More Demo :

- Expo 47 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo47)
- Expo 48 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo48)
- Expo 49 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo49)

## Table of Contents

- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
  - [iOS Configuration](#ios-configuration)
  - [Android Configuration](#android-configuration)
- [Support](#support)

## Getting Started

```
yarn install
yarn prebuild
yarn ios
yarn android
```

## How It Works

We're using and tweaking two awesome projects:

- [react-native-receive-sharing-intent](https://github.com/ajith-ab/react-native-receive-sharing-intent)
- [expo-config-plugin-ios-share-extension](https://github.com/timedtext/expo-config-plugin-ios-share-extension)

And to make life easier, we've got patch-package doing the heavy lifting for patching. Check out the "patches" directory for details.

### iOS Tricks

Thanks to the `expo-config-plugin-ios-share-extension` package, manual configuration, as described in the original [documentation](https://ajith-ab.github.io/react-native-receive-sharing-intent/docs/ios), is not needed.

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

**WIP**: There's a matching [PR](https://github.com/timedtext/expo-config-plugin-ios-share-extension/pull/11) for "expo-config-plugin-ios-share-extension"

### Android Magic

For Android, a config plugin has been added (see `plugins/withAndroidShareExtension` directory) to add missing elements and automate the steps from the [documentation](https://ajith-ab.github.io/react-native-receive-sharing-intent/docs/android/).

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

| Option                        | Values                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| androidIntentFilters          | array of MIME types :`"text/*"` / `"image/*"` / `"*/*"`<br/>_default value_: `["text/*"]` (text and url)                                               |
| androidMainActivityAttributes | _default value_: `{ "android:launchMode": "singleTask" }`                                                                                              |
| androidExtraBuildProperties   | https://docs.expo.dev/versions/latest/sdk/build-properties/#pluginconfigtypeandroid<br/>example: `{ "targetSdkVersion": 33 }` , _default value_: `{}"` |

## Support

Enjoying this project? Wanna show some love? Drop a star and consider buying me a coffee to keep me fueled and motivated

<a href="https://www.buymeacoffee.com/achorein" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
