module.exports = {
  mode: 'development',
  devtool : 'eval-source-map',
  entry: ['babel-polyfill', __dirname + '/tree-plot/main.js'],
  devServer: {
    after : app => {

      app.get('/*', function(req, res){
        res.sendFile(__dirname + '/tree-plot.html')
      })

    },
    port: 5001,
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