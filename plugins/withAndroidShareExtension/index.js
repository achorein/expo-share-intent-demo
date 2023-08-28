"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const withAndroidMainActivityAttributes_1 = require("./withAndroidMainActivityAttributes");
const withAndroidIntentFilters_1 = require("./withAndroidIntentFilters");
const withAndroidBuildProperties_1 = require("./withAndroidBuildProperties");
const withAndroidMainActivityExtension_1 = require("./withAndroidMainActivityExtension");
let pkg = {
    name: "expo-config-plugin-share-intent-android",
    version: "UNVERSIONED",
};
const withShareMenu = (0, config_plugins_1.createRunOncePlugin)((config, params) => {
    return (0, config_plugins_1.withPlugins)(config, [
        () => (0, withAndroidBuildProperties_1.withAndroidBuildProperties)(config, params),
        () => (0, withAndroidMainActivityAttributes_1.withAndroidMainActivityAttributes)(config, params),
        () => (0, withAndroidIntentFilters_1.withAndroidIntentFilters)(config, params),
        () => (0, withAndroidMainActivityExtension_1.withAndroidMainActivityExtension)(config, params),
    ]);
}, pkg.name, pkg.version);
exports.default = withShareMenu;
