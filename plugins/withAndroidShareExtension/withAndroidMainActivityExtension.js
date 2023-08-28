"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidMainActivityExtension = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const dependencyToAdd = `    implementation project(':reactnativereceivesharingintent')`;
function withSharingIntentAppBuildGradle(config) {
    return (0, config_plugins_1.withAppBuildGradle)(config, (config) => {
        if (!config.modResults.contents.includes("reactnativereceivesharingintent")) {
            config.modResults.contents = config.modResults.contents.replace(/(\s*if\s*\(enableHermes\)\s*{)/, `\n\n${dependencyToAdd}$1`);
        }
        return config;
    });
}
const contentToAdd = `
include ':reactnativereceivesharingintent'
project(':reactnativereceivesharingintent').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-receive-sharing-intent/android')
`.trim();
function withSharingIntentSettingsGradle(config) {
    return (0, config_plugins_1.withSettingsGradle)(config, (config) => {
        if (!config.modResults.contents.includes("reactnativereceivesharingintent")) {
            config.modResults.contents += `\n${contentToAdd}\n`;
        }
        return config;
    });
}
const importToAdd = `import android.content.Intent;`;
const methodToAdd = `
  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
  }\n`;
function withSharingIntentMainActivity(config) {
    return (0, config_plugins_1.withMainActivity)(config, (config) => {
        if (!config.modResults.contents.includes(importToAdd)) {
            config.modResults.contents = config.modResults.contents.replace(/import android.os.Bundle;/, `import android.os.Bundle;\n${importToAdd}`);
        }
        if (!config.modResults.contents.includes("onNewIntent")) {
            config.modResults.contents = config.modResults.contents.replace(/public class MainActivity extends ReactActivity {/, `public class MainActivity extends ReactActivity {${methodToAdd}`);
        }
        return config;
    });
}
const withAndroidMainActivityExtension = (config) => {
    var _a, _b, _c;
    if (((_a = config.sdkVersion) === null || _a === void 0 ? void 0 : _a.includes("46.")) ||
        ((_b = config.sdkVersion) === null || _b === void 0 ? void 0 : _b.includes("47.")) ||
        ((_c = config.sdkVersion) === null || _c === void 0 ? void 0 : _c.includes("48."))) {
        config = withSharingIntentAppBuildGradle(config);
        config = withSharingIntentSettingsGradle(config);
    }
    config = withSharingIntentMainActivity(config);
    return config;
};
exports.withAndroidMainActivityExtension = withAndroidMainActivityExtension;
