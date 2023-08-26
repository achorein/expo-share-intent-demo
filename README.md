# Expo Share Intent Demo

This project demonstrate a fonctionnal share intent in a Expo (React Native) project. It allows to use an expo auto configuration for react-native-receive-sharing-intent package.

This demo works with old **Expo SDK 48** and is for Android and iOS, using url and text sharing.

More Demo :

- Expo 46 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo46) (Android & iOS, compatible iOS 12.4)
- Expo 47 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo47) (Android & iOS)
- Expo 48 [available here](https://github.com/achorein/expo-share-intent-demo/tree/expo49) (Android & iOS)

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

### Android Tricks

This other examples
