//webpack.config.js

const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');//vue处理插件
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        //rules為一個數組
        rules: [
            {
                //$->以.vue作為文件結尾的
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                //使用stylus預處理器
                test: /\.styl/,
                use: [
                    'style-loader',                     //将css的样式写入到html里面去
                    'css-loader',
                    'stylus-loader'
                ]
            }
            ,
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(gif|jpg|png|svg|jpeg)$/,
                use: [
                    //為loader配置一些選項，用option去聲明
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-wp.[ext]' //ext為檔案的副檔名<gif|jpg|png|svg|jpeg>
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 請確保引入這個插件
        new VueLoaderPlugin(),//vue组件，必须要加
        new HTMLPlugin(),
        //new webpack.DefinePlugin是用到框架時都要加上的，給他判段環境，而'"development"'的雙層引號是必要的
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        })
    ]
}

//因為使用於測試和正式環境，故寫判斷看環境為何

if (isDev) {
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',
        overlay: {
            //錯誤會顯示在網頁上
            errors: true,
        },
        //hot是只更改改過的地方
        hot: true,
        //open:true -> 會直接幫你打開瀏覽器 
        //historyFallback:{}
    }
    config.plugins.push(
        //添加兩個插件用於 hot:true 的配置
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;