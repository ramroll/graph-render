module.exports = {
  mode: 'development',
  devtool : 'eval-source-map',
  entry: ['babel-polyfill', __dirname + '/plot-src/plot.js'],
  output : {
    filename : 'plot.js'
  },
  devServer: {
    after : app => {
      app.get('/*', function(req, res){
        res.sendFile(__dirname + '/plot.html')
      })

    },
    port: 5000,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /\/node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            'env',
            'stage-0'
          ],
          plugins: [
            "babel-plugin-transform-class-properties",
            "transform-object-rest-spread",
            ["transform-react-jsx", {
              "pragma" : "jsx"
            }]

          ]
        }
      }]
    }, {
      test : /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    }]
  }

}