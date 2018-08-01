module.exports = {
  mode: 'development',
  devtool : 'eval-source-map',
  entry: './src/main.js',
  devServer: {
    after : app => {

      app.get('*', function(req, res){
        res.sendFile(__dirname + '/index.html')
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
            'env'
          ],
          plugins: [
            "babel-plugin-transform-class-properties"
          ]

        }
      }]
    }]
  }

}