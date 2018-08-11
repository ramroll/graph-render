const express = require('express')
module.exports = {
  mode: 'development',
  devtool : 'eval-source-map',
  entry: './src/main.js',
  devServer: {
    after : app => {

      app.use('/assets', express.static(__dirname + '/assets'))
      app.get('/*', function(req, res){
        res.sendFile(__dirname + '/graph.html')
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