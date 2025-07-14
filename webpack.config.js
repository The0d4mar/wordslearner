const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/wordslearner/',
  },
  devtool: isDev ? 'eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    historyApiFallback: true,
    hot: true,
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      // JS / TS
      {
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },

      // CSS Modules + SCSS
      {
        test: /\.module\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  // Restore default export behavior for CSS modules
                  namedExport: false,
                  exportLocalsConvention: 'as-is',  // preserve class names as is
                  localIdentName: isDev
                    ? '[name]__[local]--[hash:base64:5]'
                    : '[hash:base64]',
                },
                sourceMap: isDev,
              },
            },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src/styles')],
              },
            },
          },
        ],
      },

      // Global SCSS (not modules)
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src/styles')],
              },
            },
          },
        ],
      },

      // CSS
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },

      // Assets
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff2?|eot|ttf|otf)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    !isDev && new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    isDev && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
