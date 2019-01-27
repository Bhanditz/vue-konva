var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-konva.min.js',
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
