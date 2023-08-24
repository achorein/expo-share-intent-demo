# Expo Share Intent Demo

This project demonstrate a fonctionnal share intent in a Expo (React Native) project. It allows to use an expo auto configuration for react-native-receive-sharing-intent.

This demo is only for iOS at the moment, using url and text sharing.

## Getting Started

```
yarn install
yarn prebuild
yarn ios
```

## How

For that we use and patch two projects :

- https://github.com/ajith-ab/react-native-receive-sharing-intent
- https://github.com/timedtext/expo-config-plugin-ios-share-extension

we are using `patch-package` to auto patch, see "patches" directory for details.
