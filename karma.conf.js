// Karma configuration
// Generated on Sun Jan 27 2019 15:19:41 GMT+0000 (Coordinated Universal Time)
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['mocha'],
    files: [
      'tests/*.js'
    ],
    preprocessors: {
      'src/**/*.js': ['webpack'],
      'tests/**/*.js': ['webpack']
    },

    webpack: {
      mode: 'none',
      externals: {
      /*
        konva: {
          commonjs: 'konva',
          commonjs2: 'konva',
          amd: 'konva',
          root: 'Konva'
        },
        vue: {
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue',
          root: 'Vue'
        }
      */
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  })
}
