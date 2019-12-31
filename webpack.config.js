const path = require('path');

module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, './index.js'),
  node: {
    fs: "empty",
    tls: 'empty',
    net: 'empty'
  },
  // target: 'node',
  // entry: path.join(__dirname, '/client/src/app.js'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bebedio-components.dev-bundle.js',
    publicPath: '/'
  },

  devServer: {
    historyApiFallback: true,
  },

  module: {
    // preLoaders: [
    //     { test: /\.json$/,
    //       include: [
    //                 path.join(__dirname, '/node_modules/aframe-extras/lib/default-hex-grid.json')
    //               ],
    //       loader: 'json'},
    // ],
    // apply loaders to files that meet given conditions
    rules: [

      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        // loader: 'file-loader?outputPath=../images/',
        // options: {
        //   name: './images/[name].[ext]'
        // },
        test: /\.(png|jpg|gif|svg)$/,
        // loader: 'file-loader'
        loader: 'file-loader?outputPath=../images/'
      }


      , { test: /\.json$/, loader: "json-loader" },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '/client/src'),
        // loader: 'babel',
        loader: 'babel-loader',
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
        options: {
          attrs: [':data-src']
        }
      },
      {
        test: /\.jsx?$/,
        include: [path.join(__dirname, '/client/src/inspector/src/'),
          path.join(__dirname, '/modified_modules/aframe-inspector/'),
          path.join(__dirname, '/modified_modules/aframe-firebase-component/index.js'),
          path.join(__dirname, '/modified_modules/aframe-firebase-component/firebaseWrapper.js'),
          path.join(__dirname, '/client/src/containers/'),
          path.join(__dirname, '/client/src/components/'),
          path.join(__dirname, '/client/src/styles.js'),
          path.join(__dirname, '/client/src/app.jsx'),
          path.join(__dirname, '/client/src/SignUp/'),
          path.join(__dirname, '/client/src/Login/')
        ],
        // path.join(__dirname, '/client/src/components/EntityList.jsx'),
        // path.join(__dirname, '/client/src/components/ModeList.jsx'),
        // path.join(__dirname, '/client/src/containers/ZonesPage.jsx'),
        // path.join(__dirname, '/client/src/containers/SitePage.jsx'),
        // path.join(__dirname, '/client/src/components/Player.jsx')],


        // loader: 'babel',
        loader: 'babel-loader',
        query: {
          presets: ["es2015", "stage-0", "react"]
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },

      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      // }
    ],
  }//,

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  // watch: true
};
