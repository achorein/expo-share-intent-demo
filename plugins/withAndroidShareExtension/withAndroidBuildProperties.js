"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidBuildProperties = void 0;
// https://stackoverflow.com/questions/72748846/modify-android-gradle-properties-in-expo-managed-app
const config_plugins_1 = require("@expo/config-plugins");
function addBuildProperties(properties, sdkVersion) {
    return [
        ...properties,
        {
            type: "property",
            key: "kotlinVersion",
            value: "1.6.10",
        },
        ...((sdkVersion === null || sdkVersion === void 0 ? void 0 : sdkVersion.includes("46.")) || (sdkVersion === null || sdkVersion === void 0 ? void 0 : sdkVersion.includes("47."))
            ? [
                {
                    type: "property",
                    key: "compileSdkVersion",
                    value: 33,
                },
                {
                    type: "property",
                    key: "targetSdkVersion",
                    value: 33,
                },
                {
                    type: "property",
                    key: "buildToolsVersion",
                    value: "33.0.0",
                },
            ]
            : []),
    ];
}
const withAndroidBuildProperties = (config, parameters) => {
    return (0, config_plugins_1.withGradleProperties)(config, (config) => {
        config.modResults = addBuildProperties(config.modResults, config.sdkVersion);
        return config;
    });
};
exports.withAndroidBuildProperties = withAndroidBuildProperties;
