var path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-konva.js',
    library: 'vueKonva',
    libraryTarget: 'umd'
  },
  externals: {
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
  }
};
