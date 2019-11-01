const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: [path.resolve(__dirname, 'js/main.js')],
    vendor: ['phaser'],
  },
  mode: 'development',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dead-language/',
    filename: '[name].js',
  },
  watch: true,
  plugins: [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./', './build'],
      },
    }),
    new CopyPlugin([
      { from: 'index.html', to: '.' },
      { from: 'css', to: 'css' },
      { from: 'assets', to: 'assets' },
      { from: 'CNAME', to: '.' },
      { from: 'android-chrome-144x144.png', to: '.' },
      { from: 'apple-touch-icon.png', to: '.' },
      { from: 'favicon-16x16.png', to: '.' },
      { from: 'favicon-32x32.png', to: '.' },
      { from: 'favicon.ico', to: '.' },
      { from: 'mstile-150x150.png', to: '.' },
      { from: 'safari-pinned-tab.svg', to: '.' },
      { from: 'site.webmanifest', to: '.' },
      { from: 'browserconfig.xml', to: '.' },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'js'),
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  },
};
