"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidBuildProperties = void 0;
// https://stackoverflow.com/questions/72748846/modify-android-gradle-properties-in-expo-managed-app
const config_plugins_1 = require("@expo/config-plugins");
function addBuildProperties(properties) {
    return [
        ...properties,
        {
            type: "property",
            key: "kotlinVersion",
            value: "1.6.10",
        },
    ];
}
const withAndroidBuildProperties = (config, parameters) => {
    return (0, config_plugins_1.withGradleProperties)(config, (config) => {
        config.modResults = addBuildProperties(config.modResults);
        return config;
    });
};
exports.withAndroidBuildProperties = withAndroidBuildProperties;
