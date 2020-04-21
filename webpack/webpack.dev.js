const merge = require("webpack-merge");
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    overlay: true,
    open: false,
    port: 8090,
    proxy:{
      '/': {
        target: "http://127.0.0.1:9000",
        // changeOrigin: true,
        // cookieDomainRewrite: {
        //     "360os.com": "",
        // },
        // "ws": false,
    }   
    }
  },
  watchOptions: {
    ignored: /node_modules/
  },
  plugins:[
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})