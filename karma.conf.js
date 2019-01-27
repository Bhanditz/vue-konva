// Karma configuration
// Generated on Sun Jan 27 2019 15:19:41 GMT+0000 (Coordinated Universal Time)
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['mocha'],
    files: [
      // Mocking must be done before tests.
      'tests/mocking.js',
      'tests/index-test.js'
    ],
    preprocessors: {
      'tests/**/*.js': ['webpack']
    },
    webpack: {
      mode: 'production',
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity
  })
}
