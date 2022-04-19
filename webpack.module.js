const path = require('path');

module.exports = {
  entry: {
    module: './src/promiser.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.mjs',
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  }
};
