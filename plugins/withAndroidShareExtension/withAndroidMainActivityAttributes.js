/*!
 * Plugin created for Expo Share Intent Demo (https://github.com/achorein/expo-share-intent-demo)
 * author: achorein (https://github.com/achorein)
 *
 * inspired by: https://forums.expo.dev/t/how-to-edit-android-manifest-was-build/65663/4
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidMainActivityAttributes = void 0;
const config_plugins_1 = require("@expo/config-plugins");
function addAttributesToMainActivity(androidManifest, attributes) {
    const { manifest } = androidManifest;
    if (!Array.isArray(manifest["application"])) {
        console.warn("withAndroidMainActivityAttributes: No application array in manifest?");
        return androidManifest;
    }
    const application = manifest["application"].find((item) => item.$["android:name"] === ".MainApplication");
    if (!application) {
        console.warn("withAndroidMainActivityAttributes: No .MainApplication?");
        return androidManifest;
    }
    if (!Array.isArray(application["activity"])) {
        console.warn("withAndroidMainActivityAttributes: No activity array in .MainApplication?");
        return androidManifest;
    }
    const activity = application["activity"].find((item) => item.$["android:name"] === ".MainActivity");
    if (!activity) {
        console.warn("withAndroidMainActivityAttributes: No .MainActivity?");
        return androidManifest;
    }
    const newAttributes = attributes || {
        // "android:windowSoftInputMode": "adjustResize",
        "android:launchMode": "singleTask",
    };
    activity.$ = { ...activity.$, ...newAttributes };
    return androidManifest;
}
const withAndroidMainActivityAttributes = (config, parameters) => {
    return (0, config_plugins_1.withAndroidManifest)(config, (config) => {
        config.modResults = addAttributesToMainActivity(config.modResults, parameters === null || parameters === void 0 ? void 0 : parameters.androidMainActivityAttributes);
        return config;
    });
};
exports.withAndroidMainActivityAttributes = withAndroidMainActivityAttributes;
