module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Habilita alias @ y @src para Metro/Babel
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "@src": "./src",
          },
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
      ],
      "expo-router/babel",
      "react-native-reanimated/plugin",
    ],
  };
};
