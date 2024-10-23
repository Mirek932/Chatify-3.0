const path = require('path');

module.exports = {
  entry: './main.ts',  // Pfad zu deiner Hauptdatei
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../js'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
};
