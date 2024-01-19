/* eslint-disable */
// Fix https://github.com/facebook/react-native/issues/37748
const { withDangerousMod, withPlugins } = require("@expo/config-plugins");
const {
  mergeContents,
} = require("@expo/config-plugins/build/utils/generateCode");
const fs = require("fs");
const path = require("path");

async function readFileAsync(path) {
  return fs.promises.readFile(path, "utf8");
}

async function saveFileAsync(path, content) {
  return fs.promises.writeFile(path, content, "utf8");
}

const withPatchBoostPod = (c) => {
  return withDangerousMod(c, [
    "ios",
    async (config) => {
      const file = path.join(config.modRequest.platformProjectRoot, "Podfile");
      const contents = await readFileAsync(file);
      await saveFileAsync(file, patchBoostPod(contents));
      return config;
    },
  ]);
};

function patchBoostPod(src) {
  return mergeContents({
    tag: `rn-boost-unary`,
    src,
    newSrc: `system("sed -i -e 's/std::unary_function/std::__unary_function/g' ./Pods/boost/boost/container_hash/hash.hpp")`,
    anchor: /__apply_Xcode_12_5_M1_post_install_workaround\(installer\)/,
    offset: 1,
    comment: "#",
  }).contents;
}

module.exports = (config) => withPlugins(config, [withPatchBoostPod]);
