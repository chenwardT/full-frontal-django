var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

const INTERFACE = '192.168.1.5';

module.exports = {
  context: __dirname,

  // Entry point of our app
  // assets/js/index.js should require other js modules and dependencies it needs
  entry: [
    'webpack-dev-server/client?http://' + INTERFACE + ':3000',
    'webpack/hot/only-dev-server',
    './assets/js/index'
  ],

  output: {
    path: path.resolve('./assets/bundles/'),
    filename: "[name]-[hash].js",
    // Tell django to use this URL to load packages instead of STATIC_URL + bundle_name
    publicPath: 'http://' + INTERFACE + ':3000/assets/bundles/'
  },

  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // Disable reloading if there is an error
    new webpack.NoErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats.json'})
  ],

  module: {
    loaders: [
      // Transform JSX into JS
      // Pass output from babel loader to react-hot loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel?presets[]=react,presets[]=es2015'
        ]
      }
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  }
};