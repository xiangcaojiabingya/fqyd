module.exports = {

  devServer: {
    proxy: {
      '/api': {
        target: 'https://188.185.101.83:20002', //对应自己后端服务地址 这里一定要完全一致，不是https的一定不要写成https，配置过后不生效要来这里仔细对比下是不是写错了
        changeOrigin: true,//是否允许跨域，true是
        secure: false,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  publicPath: './',
  // 输出文件目录   文件夹名
  outputDir: 'dist/www',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。    资源放的目录
  assetsDir: "./static",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径    index的路劲和名字
  indexPath: './index.html',

  // 打包时不生成.map文件
  productionSourceMap: false
}
