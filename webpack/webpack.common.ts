import path from 'path';
import { Configuration } from 'webpack';
import DotenvPlugin from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import swcconf from '../swc.config.json';
import paths from './paths';

const isProductionMode = process.env.NODE_ENV === 'production';
const styleLoader = isProductionMode
  ? MiniCssExtractPlugin.loader
  : 'style-loader';
const imgUrlProxyPath = isProductionMode ? null : null;

const config: Configuration = {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `$imgUrlProxyPath: ${imgUrlProxyPath};`,
              sassOptions: { includePaths: ['src'] }
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'swc-loader',
          options: swcconf
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(svg|png|jpg|ico)$/,
        use: ['file-loader']
      }
    ]
  },
  entry: [paths.appIndexTsx],
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json', '.svg', '.ico'],
    alias: {
      components: path.resolve(paths.appSrc, 'components')
    }
  },
  plugins: [
    new DotenvPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: './index.html'
    })
  ],
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: 'static/js/[name].[contenthash].js',
    clean: true
  }
};

export default config;
