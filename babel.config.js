// babel.config.js
module.exports = {
  presets: [
    [
      "@vue/app",
      {
        polyfills: ["es6.promise", "es6.symbol"]
      }
    ]
  ],
  "plugins": [
		["import", {
			"libraryName": "iview",
			"libraryDirectory": "src/components"
		}]
	]
};
