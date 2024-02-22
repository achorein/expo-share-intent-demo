/*!
 * Plugin created for Expo Share Intent Demo (https://github.com/achorein/expo-share-intent-demo)
 * author: achorein (https://github.com/achorein)
 *
 * inspired by: https://github.com/expo/expo/blob/main/packages/%40expo/config-plugins/src/android/IntentFilters.ts
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidIntentFilters = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const GENERATED_TAG = "data-generated";
function renderIntentFilters(intentFilters) {
    return intentFilters.map((intentFilter) => {
        // <intent-filter>
        return {
            $: {
                "android:autoVerify": intentFilter.autoVerify ? "true" : undefined,
                // Add a custom "generated" tag that we can query later to remove.
                // [GENERATED_TAG]: "true",
            },
            action: [
                // <action android:name="android.intent.action.VIEW"/>
                {
                    $: {
                        "android:name": `${intentFilter.action}`,
                    },
                },
            ],
            data: renderIntentFilterData(intentFilter.data),
            category: renderIntentFilterCategory(intentFilter.category),
        };
    });
}
function renderIntentFilterData(data) {
    return (Array.isArray(data) ? data : [data]).filter(Boolean).map((datum) => ({
        $: Object.entries(datum ?? {}).reduce((prev, [key, value]) => ({ ...prev, [`android:${key}`]: value }), {}),
    }));
}
function renderIntentFilterCategory(category) {
    return (Array.isArray(category) ? category : [category])
        .filter(Boolean)
        .map((category) => ({
        $: {
            "android:name": `${category}`,
        },
    }));
}
function addIntentFilters(androidManifest, currentIntentFilters, filters, multiFilters) {
    const mainActivity = config_plugins_1.AndroidConfig.Manifest.getMainActivityOrThrow(androidManifest);
    // DEFAULT VALUE (text and url)
    const newFilters = filters || ["text/*"];
    console.debug(`[withAndroidIntentFilters] add android filters (${newFilters.join(" ")}) and multi-filters (${multiFilters ? multiFilters.join(" ") : ""})`);
    const newIntentFilters = [
        {
            action: "android.intent.action.SEND",
            category: "android.intent.category.DEFAULT",
            data: newFilters.map((filter) => ({
                mimeType: filter,
            })),
        },
    ];
    const newMultiIntentFilters = multiFilters ? [
        {
            action: "android.intent.action.SEND_MULTIPLE",
            category: "android.intent.category.DEFAULT",
            data: multiFilters.map((filter) => ({
                mimeType: filter,
            })),
        },
    ] : [];
    const renderedNewIntentFilters = renderIntentFilters([...newIntentFilters, ...newMultiIntentFilters]);
    // adds them properly to the manifest
    mainActivity["intent-filter"] = mainActivity["intent-filter"]?.concat(renderedNewIntentFilters);
    return androidManifest;
}
const withAndroidIntentFilters = (config, parameters) => {
    return (0, config_plugins_1.withAndroidManifest)(config, (config) => {
        config.modResults = addIntentFilters(config.modResults, config_plugins_1.AndroidConfig.IntentFilters.getIntentFilters(config), parameters?.androidIntentFilters, parameters?.androidMultiIntentFilters);
        return config;
    });
};
exports.withAndroidIntentFilters = withAndroidIntentFilters;
