# Expo Share Intent Demo

This project demonstrates a functional share intent in an Expo (React Native) project. It allows to use Expo's auto-configuration for the `react-native-receive-sharing-intent` package.

This demo works with **Expo SDK 48**. Is compatible with **Android** and **iOS** and support URL, text, images,videos and files sharing.

More Demo :

- Expo 46 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo46) (compatible iOS 12.4)
- Expo 47 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo47)
- Expo 49 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo49) (or with [expo-router](https://github.com/achorein/expo-share-intent-demo/tree/expo49-expo-router))

## Table of Contents

- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
  - [iOS Tricks](#ios-tricks)
  - [Android Magic](#android-magic)
- [Deep Dive](#deep-dive)
  - [Expo Router](#expo-router)
  - [React Navigation](#react-navigation)
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
            "NSExtensionActivationSupportsImageWithMaxCount": 1,
            "NSExtensionActivationSupportsMovieWithMaxCount": 1,
          }
        }
      ],
  ],
```

| Option          | Values                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activationRules | Allow **text** sharing with `"NSExtensionActivationSupportsText": true`<br/>**Url** sharing with `"NSExtensionActivationSupportsWebURLWithMaxCount": 1` and `"NSExtensionActivationSupportsWebPageWithMaxCount": 1`<br/>**Images** sharing with `"NSExtensionActivationSupportsImageWithMaxCount": 1`<br/>**Videos** sharing with `"NSExtensionActivationSupportsImageWithMaxCount": 1`<br/>_default value_: `{ "NSExtensionActivationSupportsWebURLWithMaxCount": 1, "NSExtensionActivationSupportsWebPageWithMaxCount": 1 }"` |

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
            "video/*"
          ],
        }
      ],
  ],
```

| Option                        | Values                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| androidIntentFilters          | array of MIME types :`"text/*"` / `"image/*"` / `"video/*"` / `"*/*"`<br/>_default value_: `["text/*"]` (text and url)                                 |
| androidMainActivityAttributes | _default value_: `{ "android:launchMode": "singleTask" }`                                                                                              |
| androidExtraBuildProperties   | https://docs.expo.dev/versions/latest/sdk/build-properties/#pluginconfigtypeandroid<br/>example: `{ "targetSdkVersion": 33 }` , _default value_: `{}"` |

## Deep Dive

### Expo Router

To use expo-router you need to handle [Unmatched Routes](https://docs.expo.dev/routing/error-handling/#unmatched-routes) . It's the only "screen" where we can call the native module using deeplink url (useShareIntent hook).

An example is available with Expo Router v2 on [branch expo49-expo-router](https://github.com/achorein/expo-share-intent-demo/tree/expo49-expo-router)

### React Navigation

If you want to handle share intent with react-navigation (v6), we could add a custom mapping function in our linking configuration like this :

```js
  // see: https://reactnavigation.org/docs/configuring-links/#advanced-cases
  getStateFromPath(path, config) {
    if (path?.includes(`dataurl=${Constants.expoConfig.scheme}sharekey`)) {
      return {
        routes: [{ name: 'HomeStackScreen', params: { screen: 'ShareIntentScreen' } }],
      };
    }
    return getStateFromPath(path, config);
  },
```

## Support

Enjoying this project? Wanna show some love? Drop a star and consider buying me a coffee to keep me fueled and motivated

<a href="https://www.buymeacoffee.com/achorein" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
