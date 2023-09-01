/*!
 * Plugin created for Expo Share Intent Demo (https://github.com/achorein/expo-share-intent-demo)
 * author: achorein (https://github.com/achorein)
 *
 * inspired by: https://stackoverflow.com/questions/72748846/modify-android-gradle-properties-in-expo-managed-app
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidBuildProperties = void 0;
const config_plugins_1 = require("@expo/config-plugins");
function addBuildProperties(properties, sdkVersion, extraBuildProperties = {}) {
    return [
        ...properties,
        {
            type: "property",
            key: "kotlinVersion",
            value: "1.6.10",
        },
        ...Object.keys(extraBuildProperties).map((key) => ({
            type: "property",
            key,
            value: extraBuildProperties[key]
        })),
    ];
}
const withAndroidBuildProperties = (config, parameters) => {
    return (0, config_plugins_1.withGradleProperties)(config, (config) => {
        config.modResults = addBuildProperties(config.modResults, config.sdkVersion, parameters.androidExtraBuildProperties);
        return config;
    });
};
exports.withAndroidBuildProperties = withAndroidBuildProperties;
