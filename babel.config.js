// babel.config.js
module.exports = {
	presets: [
		//		  [
		//		    "@vue/app",
		//		    {
		//		      polyfills: ["es6.promise", "es6.symbol"]
		//		    }
		//		  ]
		//https://www.npmjs.com/package/@vue/babel-preset-app
		['@vue/babel-preset-app', {
			//			'target': {　　　　　　　　　　
			//				"browser": ["ie>=11", "chrome>=65"],
			////				"node": "8.9.0",
			////				"safari": "tp"　　　　　　　　
			//			},
			//			"modules": false,
			//			"debug": true,
			//			"uglify": true,
			"useBuiltIns": false
		}]
	],
	"plugins": [
		["import", {
			"libraryName": "iview",
			"libraryDirectory": "src/components"
		}]
	]
};