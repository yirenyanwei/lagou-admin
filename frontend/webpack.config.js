const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    //开发环境
    mode: 'development',
    //目标文件件创建source-map
    devtool: 'source-map',
    //配置入口
    entry: {
        'js/app': './src/app.js'
    },
    //出口
    output: {
        path: path.resolve(__dirname, './dist'),
        //name 是路径 js/app
        filename: '[name]-[hash:6].js'
    },
    //加载器
    module: {
        rules: [
            {
                test: /\.art$/,//解析.art
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "art-template-loader",
                    options: {
                        // art-template options (if necessary)
                        // @see https://github.com/aui/art-template
                    }
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    //配置插件
    plugins: [
        //删除目标文件夹
        new CleanWebpackPlugin(),
        //简化html 创建
        new HtmlWebpackPlugin({
            //参考哪个文件
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html',
            inject: true
        }),
        //拷贝文件
        new CopyPlugin({
            patterns:[
                { 
                    from: "public/favicon.ico", 
                    to: path.resolve(__dirname, './dist/favicon.ico') 
                },
                { 
                    from: "public/libs", 
                    to: path.resolve(__dirname, './dist/libs/') 
                },
            ]
        }),

    ],
    //配置server
    devServer: {
        //用内存中的文件
        contentBase: path.join(__dirname, 'dist'),
        compress: true,//是否压缩
        port: 8080,
        //前端跨域代理配置
        proxy: {
            '/api': {
              target: 'http://localhost:3000',
            //   pathRewrite: { '^/api': '' },
            },
        }
    }
}