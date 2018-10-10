var pkg = require('./package.json')
var path = require('path')
var webpack = require('webpack')
var HtmlWebPackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    entry: {
        app: path.join(__dirname, "src/index.jsx"),
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name]-[hash:8].js"
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
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "postcss-loader"
                        }
                    ]
                }),
            },
            {
                test:/\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use: [
                        {
                            loader: "css-loader" 
                        },
                        {
                            loader: "less-loader"
                        },
                        {
                            loader: "postcss-loader"
                        }
                    ],
                }),
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, "src/index.html"),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.DefinePlugin({
            __NODE_ENV__: '"production"'
        }),
        new ExtractTextPlugin({
            filename: 'css/index-[hash:6].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        }),
        new webpack.optimize.SplitChunksPlugin({
            chunks: "all",
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: 'common'
        })
    ],
}