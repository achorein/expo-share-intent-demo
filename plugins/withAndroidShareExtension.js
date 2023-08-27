/* eslint-disable */
const {
    withMainActivity,
    withSettingsGradle,
    withAppBuildGradle
} = require('@expo/config-plugins');

const dependencyToAdd = `    implementation project(':reactnativereceivesharingintent')`;
function withSharingIntentAppBuildGradle(config) {
    return withAppBuildGradle(config, (config) => {
        if (!config.modResults.contents.includes('reactnativereceivesharingintent')) {
            config.modResults.contents = config.modResults.contents.replace(
                /(dependencies\s*{)/,
                `$1\n${dependencyToAdd}\n`
            );
        }

        return config;
    });
}

const contentToAdd = `
include ':reactnativereceivesharingintent'
project(':reactnativereceivesharingintent').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-receive-sharing-intent/android')
`.trim();

function withSharingIntentSettingsGradle(config) {
    return withSettingsGradle(config, (config) => {
        if (!config.modResults.contents.includes('reactnativereceivesharingintent')) {
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
    return withMainActivity(config, (config) => {
        if (!config.modResults.contents.includes(importToAdd)) {
            config.modResults.contents = config.modResults.contents.replace(
                /import android.os.Bundle;/,
                `import android.os.Bundle;\n${importToAdd}`
            );
        }

        if (!config.modResults.contents.includes("onNewIntent")) {
            config.modResults.contents = config.modResults.contents.replace(
                /public class MainActivity extends ReactActivity {/,
                `public class MainActivity extends ReactActivity {${methodToAdd}`
            );
        }

        return config;
    });
}

function withAndroidShareExtension(config) {
    config = withSharingIntentAppBuildGradle(config);
    config = withSharingIntentSettingsGradle(config);
    config = withSharingIntentMainActivity(config);
    return config;
}

module.exports = withAndroidShareExtension;
