import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import common from './webpack.common';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    allowedHosts: ['all'],
    hot: true,
    open: true,
    proxy: {
      '/local': {
        changeOrigin: true,
        pathRewrite: {
          '^/local': ''
        },
        target: 'http://localhost:8080'
      }
    }
  }
};

export default merge(common, devConfig);
