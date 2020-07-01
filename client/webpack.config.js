const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const BUILD_DIR = path.join(__dirname, "dist");
const APP_DIR = path.join(__dirname, "src");

const VENDOR_LIBS = ["react", "react-dom", "react-hot-loader"];

const config = {
  //Entry Point
  entry: {
    app: APP_DIR + "/index.js",
    vendor: VENDOR_LIBS
  },
  //Output
  output: {
    path: path.resolve(__dirname + "/dist"),
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  //Loader
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          }
        ][("css-loader", "sass-loader")]
      },
      {
        // For images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            //Using File-loader for these files
            loader: "file-loader",
            /*In options we can set different things like format
            and directory to save*/
            options: {
              outputPath: "images"
            }
          }
        ]
      },
      {
        //For fonts
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            //using file-loader too
            loader: "file-loader",
            options: {
              outputPath: "fonts"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: "html-loader"
      }
    ]
  },
  //plugin
  plugins: [
    new Dotenv(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      publicPath: "/"
    }),
    new MiniCssExtractPlugin({
      filename: "app.css",
      disable: false,
      allChunks: true
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["dist"]
    })
  ]
};
module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
    config.mode = "development";
    //webpack dev server
    config.devServer = {
      contentBase: BUILD_DIR,
      compress: true,
      port: 3000,
      stats: "errors-only",
      open: true,
      /* Don't refresh if hot loading fails. Good while implementing the       client interface*/
      hotOnly: true,
      historyApiFallback: true
    };
  }
  if (argv.mode === "production") {
    config.mode = "production";
    config.optimization = {
      splitChunks: {
        chunks: "all"
      },
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true
        })
      ]
    };
  }
  return config;
};
