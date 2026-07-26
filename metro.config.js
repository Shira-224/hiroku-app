const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// .wasm ファイルをアセットとして読み込めるように追加
config.resolver.assetExts.push('wasm');

module.exports = config;