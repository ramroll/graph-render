module.exports = {
  mode: 'development',
  devtool : 'eval-source-map',
  entry: ['babel-polyfill', __dirname + '/programming-src/main.js'],
  devServer: {
    after : app => {

      app.get('/*', function(req, res){
        res.sendFile(__dirname + '/programming.html')
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