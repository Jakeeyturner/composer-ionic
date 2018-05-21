var webpackConfig = require('./webpack.test.js');

module.exports = function(config) {
  var _config = {
    basePath: '../',

    frameworks: ['jasmine'],

    files: [
      {
        pattern: './test-config/karma-test-shim.js',
        watched: true
      },
      {
        pattern: './src/assets/**/*',
        watched: false,
        included: false,
        served: true,
        nocache: false
      }
    ],

    proxies: {
      '/assets/': '/base/src/assets/'
    },

    preprocessors: {
      './test-config/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

	browserConsoleLogOptions: {
		level: 'log',
		terminal: true
	},

	reporters: config.coverage ? ['coverage-istanbul','spec'] : ['spec'],
	specReporter: {
		maxLogLines: 5,             // limit number of lines logged per test
		suppressErrorSummary: false, // do not print error summary
		suppressFailed: false,      // do not print information about failed tests
		suppressPassed: false,      // do not print information about passed tests
		suppressSkipped: false,      // do not print information about skipped tests
		showSpecTiming: true,      // print the time elapsed for each spec
		failFast: false              // test would finish with error when a first fail occurs.
	},
	coverageIstanbulReporter: {
		reports: [ 'html', 'lcovonly' ],
		fixWebpackSourcePaths: true
	},
	plugins: [
		"karma-spec-reporter",
		"karma-webpack",
		"karma-sourcemap-loader",
		"karma-jasmine",
		"karma-chrome-launcher",
		"karma-coverage-istanbul-reporter"
	],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  };

  config.set(_config);
};
