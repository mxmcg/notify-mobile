module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@components": "./src/components",
            "@context": "./src/context",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@typeDefs": "./src/types",
            "@theme": "./src/theme",
            "@utils": "./src/utils",
            "@state": "./src/state",
            "@": "./",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
