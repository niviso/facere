module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
    [
      "module-resolver",
      {
        "root": ["./"],
        "alias": {
          "@/components": "./components/",
          "@/constants": "./constants/",
          "@/views": "./views/",
          "locale": "./locale/",
        }
      }
    ]
    ]
  };
};
