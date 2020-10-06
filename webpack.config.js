const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'web',
    mode: 'production',
    entry: './display/index.js',
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_component)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/preset-env']}
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'public/'),
        port: 3000,
        publicPath: 'http://localhost3000/dist/',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}