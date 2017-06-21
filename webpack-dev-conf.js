const webpack = require('webpack')
const path = require('path')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const buildPath = path.resolve(__dirname, 'build');


var plugins = [
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

module.exports = {
  entry:{
    app:path.join(__dirname, 'src/app.js')
  },
  devServer: {
    contentBase: './', // Relative directory for base of server
    hot: true, // Live-reload
    inline: true,
    port: 3000, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js',
    chunkFilename: '[name].js'
  },
  devtool: 'eval',
  plugins: plugins,
  module: {
    rules: [
      {
        // React-hot loader and
        test: /\.js$/, // All .js files
        loaders: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
    ],
  }
}
