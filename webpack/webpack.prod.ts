import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const prodConfig: Configuration = {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/',
    filename: 'static/js/[name].[contenthash].js'
  }
};

export default merge(common, prodConfig);
