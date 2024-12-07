const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  target: 'node',
  mode: 'production',
  entry: './server.js',
  externals: {
    lowdb: 'commonjs lowdb',
    express: 'commonjs express',
    'swagger-jsdoc': 'commonjs swagger-jsdoc',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  stats: {
    errorDetails: true,
    warningsFilter: [
      /express\/lib\/view/,
      /swagger-jsdoc\/src\/utils/,
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    fallback: {
      url: require.resolve('url'),
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /swagger-jsdoc\/src\/utils/,
    }),
  ],
};
