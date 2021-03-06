const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  // entry: path.resolve(__dirname, '../index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory({
                  libraryName: 'antd',
                  libraryDirectory: 'lib',
                  style: true
                })]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            },
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            }
          }
        ]
      },
      {
        test: /\.png|jpg|gif$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, '../src/utils'),
      src: path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components'),
      store: path.resolve(__dirname, '../src/store'),
      public: path.resolve(__dirname, '../public'),
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.less', '.scss']
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'ts-react-demo',
    template: path.resolve(__dirname, '../public/index.html')
  })]
}