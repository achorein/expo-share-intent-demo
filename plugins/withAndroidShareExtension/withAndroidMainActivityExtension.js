"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidMainActivityExtension = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const importToAdd = `import android.content.Intent;`;
const methodToAdd = `
  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
  }\n`;
const withAndroidMainActivityExtension = (config) => {
    return (0, config_plugins_1.withMainActivity)(config, (config) => {
        if (!config.modResults.contents.includes(importToAdd)) {
            config.modResults.contents = config.modResults.contents.replace(/import android.os.Bundle;/, `import android.os.Bundle;\n${importToAdd}`);
        }
        if (!config.modResults.contents.includes("onNewIntent")) {
            config.modResults.contents = config.modResults.contents.replace(/public class MainActivity extends ReactActivity {/, `public class MainActivity extends ReactActivity {${methodToAdd}`);
        }
        return config;
    });
};
exports.withAndroidMainActivityExtension = withAndroidMainActivityExtension;
