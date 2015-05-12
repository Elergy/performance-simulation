module.exports = {
  entry: './simulation.es6.js',
  output: {
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {test: /es6\.js$/, exclude: /node_modules|vendor/, loader: 'babel-loader'}
    ]
  }
};