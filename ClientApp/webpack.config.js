const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const outPath = path.join(__dirname, 'dist');
const sourcePath = path.join(__dirname, 'src');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = function (envOptions = {}) {
  const isProduction = envOptions.production === true;
  return {
    context: sourcePath,
    mode: isProduction ? 'production' : 'development',
    target: 'web',
    entry: './index.jsx',
    devtool: isProduction ? false : 'inline-source-map',
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      path: outPath
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.jsx?$/,
          use: [
            'babel-loader'
          ],
          include: sourcePath
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        }
      ]
    },
    resolve: {
      extensions: ['.jsx', '.js'],
      symlinks: false,
      cacheWithContext: false
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development'),
          'zToken': JSON.stringify(envOptions.zToken || '')
        }
      }),
      new Dotenv({
        path: `./.env.${envOptions.buildType}`,
        safe: true,
        systemvars: true,
      }),
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|en-gb/),
      new CompressionPlugin()
    ]
  };
};
