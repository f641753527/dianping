var path = require('path')
var webpack = require('webpack')
var HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: path.join(__dirname, "src/index.jsx"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name]-[hash:6].js"
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                       loader: "style-loader" 
                    }, 
                    {
                        loader: "css-loader" 
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader: "style-loader" 
                    }, 
                    {
                        loader: "css-loader" 
                    },
                    {
                        loader: "less-loader"
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, "src/index.html"),
        }),
        new webpack.DefinePlugin({
            __NODE_ENV__: JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9907,
        host: "localhost",
    }
}