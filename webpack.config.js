const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let htmlPageNames = ['main'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/pages/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

module.exports = {
  mode: 'development',
  performance: {
    maxEntrypointSize: 5120000,
    maxAssetSize: 5120000
  },
  entry: {
    main: './src/js/main.js',
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets/img',
          to: './assets/img',
          noErrorOnMissing: true
        },
        {
          from: './src/assets/svg',
          to: './assets/svg',
          noErrorOnMissing: true
        }
      ]
    }),
    new HtmlWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'Main',
    //   filename: 'main.html',
    //   template: './src/main.html',
    //   chunks: ['main']
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Pets',
    //   filename: 'pets.html',
    //   template: './src/pets.html',
    //   chunks: ['pets']
    // }),
    new MiniCssExtractPlugin()
  ]
    .concat(multipleHtmlPlugins),
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
        generator: {
          outputPath: './assets/img/'
        }
      },
      {
        test: /\.(svg)$/,
        type: 'asset/resource',
        generator: {
          outputPath: './assets/svg/'
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          // Disables attributes processing
          sources: false,
        },
      }
    ]
  }
};