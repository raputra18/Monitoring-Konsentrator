const path = require('path');

module.exports = {
  entry: './src/index.js',  // File JavaScript utama yang akan di-bundle
  output: {
    filename: 'bundle.js',  // Nama file output yang dihasilkan
    path: path.resolve(__dirname, 'dist'),  // Folder tempat file output akan disimpan
  },
  mode: 'development', // Mode bisa 'development' atau 'production'
  module: {
    rules: [
      {
        test: /\.js$/,  // Menggunakan Babel untuk file .js
        exclude: /node_modules/, // Mengabaikan folder node_modules
        use: {
          loader: 'babel-loader',  // Loader untuk Babel
        },
      },
    ],
  },
};
