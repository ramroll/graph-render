module.exports = {
  mode: 'development',
  devtool : 'source-map',
  entry: ['babel-polyfill', __dirname + '/array-viz/main.js'],
  devServer: {
    after : app => {

      app.get('/*', function(req, res){
        res.sendFile(__dirname + '/array-viz.html')
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
            'stage-0',
            'react'
          ],
          plugins: [
            "babel-plugin-transform-class-properties",
            "transform-object-rest-spread"
          ]
        }
      }]
    }, {
      test : /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    }]
  }

}